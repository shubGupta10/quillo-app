"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import Project from "@/features/projects/models/project.model";
import DailyUpdate from "@/features/daily-updates/models/dailyUpdate.model";
import Content from "@/features/content/models/content.model";

export async function getDashboardData() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        await connectDB();
        const userId = session.user.id;

        // 1. Get all user's projects
        const projects = await Project.find({ userId }).sort({ updatedAt: -1 }).lean();
        const projectIds = projects.map(p => p._id);

        // 2. Fetch everything else in parallel
        const [
            totalUpdates,
            totalContent,
            contentThisWeek,
            recentContent,
            recentUpdates,
            recentProjects
        ] = await Promise.all([
            DailyUpdate.countDocuments({ projectId: { $in: projectIds } }),
            Content.countDocuments({ projectId: { $in: projectIds } }),
            Content.countDocuments({
                projectId: { $in: projectIds },
                createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
            }),
            Content.find({ projectId: { $in: projectIds } })
                .sort({ createdAt: -1 })
                .limit(5)
                .select("title platform createdAt status projectId")
                .populate("projectId", "name")
                .lean(),
            DailyUpdate.find({ projectId: { $in: projectIds } })
                .sort({ createdAt: -1 })
                .limit(5)
                .select("createdAt projectId")
                .populate("projectId", "name")
                .lean(),
            Promise.all(projects.slice(0, 3).map(async (p) => {
                const [updatesCount, contentCount] = await Promise.all([
                    DailyUpdate.countDocuments({ projectId: p._id }),
                    Content.countDocuments({ projectId: p._id })
                ]);
                return { ...p, updatesCount, contentCount };
            }))
        ]);

        const timeline = [
            ...projects.slice(0, 3).map(p => ({
                type: 'PROJECT',
                title: `Created project: ${p.name}`,
                date: p.createdAt
            })),
            ...recentUpdates.map(u => ({
                type: 'UPDATE',
                title: `Added update to ${(u.projectId as any)?.name || 'Project'}`,
                date: u.createdAt
            })),
            ...recentContent.map(c => ({
                type: 'CONTENT',
                title: `Generated ${c.platform} post for ${(c.projectId as any)?.name || 'Project'}`,
                date: c.createdAt
            }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

        return {
            success: true,
            data: {
                stats: {
                    projects: projects.length,
                    updates: totalUpdates,
                    generatedContent: totalContent,
                    weeklyPosts: contentThisWeek
                },
                timeline: JSON.parse(JSON.stringify(timeline)),
                recentProjects: JSON.parse(JSON.stringify(recentProjects)),
                recentContent: JSON.parse(JSON.stringify(recentContent))
            }
        };

    } catch (error) {
        console.error("Dashboard data error:", error);
        return { success: false, error: "Failed to load dashboard data" };
    }
}
