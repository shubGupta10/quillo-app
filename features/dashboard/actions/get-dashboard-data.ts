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

        //get projects belong to this current user
        const projects = await Project.aggregate([
            {
                $match: {
                    userId: userId
                }
            },
            {
                $lookup: {
                    from: "dailyupdates",
                    localField: "_id",
                    foreignField: "projectId",
                    pipeline: [{
                        $count: "count"
                    }],
                    as: "updates"
                }
            },
            {
                $lookup: {
                    from: "contents",
                    localField: "_id",
                    foreignField: "projectId",
                    as: "contents"
                }
            },
            {
                $facet: {
                    stats: [
                        {
                            $group: {
                                _id: null,
                                totalProjects: { $sum: 1 },
                                totalUpdates: { $sum: { $size: "$updates" } },
                                totalContent: { $sum: { $size: "$contents" } }
                            }
                        }
                    ],

                    recentProjects: [
                        {
                            $sort: { createdAt: -1 },
                        },
                        {
                            $limit: 3
                        },
                        {
                            $project: {
                                name: 1,
                                createdAt: 1,
                                updatesCount: { $size: "$updates" },
                                contentCount: { $size: "$contents" }
                            }
                        }
                    ],

                    recentUpdates: [
                        { $unwind: "$updates" },
                        {
                            $sort: {
                                "updates.createdAt": -1
                            }
                        },
                        { $limit: 5 },
                        {
                            $project: {
                                _id: "$updates._id",
                                createdAt: "$updates.createdAt",
                                projectId: {
                                    _id: "$_id",
                                    name: "$name"
                                }
                            }
                        }
                    ],

                    recentContent: [
                        { $unwind: "$contents" },
                        { $sort: { "contents.createdAt": -1 } },
                        { $limit: 5 },
                        {
                            $project: {
                                _id: "$contents._id",
                                title: "$contents.title",
                                platform: "$contents.platform",
                                status: "$contents.status",
                                createdAt: "$contents.createdAt",
                                projectId: { _id: "$_id", name: "$name" }
                            }
                        }
                    ]
                }
            }
        ])
        const result = projects[0];

        const timeline = [
            ...result.recentProjects.map((p: any) => ({
                type: "PROJECT",
                title: `Created project ${p.name}`,
                date: p.createdAt
            })),
            ...result.recentUpdates.map((u: any) => ({
                type: "UPDATE",
                title: `Added update to ${u.projectId?.name || "Project"}`,
                date: u.createdAt
            })),
            ...result.recentContent.map((c: any) => ({
                type: "CONTENT",
                title: `Generated ${c.platform} post for ${c.projectId?.name || "Project"}`,
                date: c.createdAt
            }))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

        return {
            success: true,
            data: {
                stats: {
                    projects: result.stats[0]?.totalProjects || 0,
                    updates: result.stats[0]?.totalUpdates || 0,
                    generatedContent: result.stats[0]?.totalContent || 0,
                    weeklyPosts: 0
                },
                timeline: JSON.parse(JSON.stringify(timeline)),
                recentProjects: JSON.parse(JSON.stringify(result.recentProjects)),
                recentContent: JSON.parse(JSON.stringify(result.recentContent))
            }
        };


    } catch (error) {
        console.error("Dashboard data error:", error);
        return {
            success: false, error: "Failed to load dashboard data"

        };
    }
}

//i am putting this here, u leave it dont touch it.
// const projects = await Project.find({ userId }).sort({ updatedAt: -1 }).lean();
//         const projectIds = projects.map(p => p._id);

//         const [
//             totalUpdates,
//             totalContent,
//             contentThisWeek,
//             recentContent,
//             recentUpdates,
//             recentProjects
//         ] = await Promise.all([
//             DailyUpdate.countDocuments({ projectId: { $in: projectIds } }),
//             Content.countDocuments({ projectId: { $in: projectIds } }),
//             Content.countDocuments({
//                 projectId: { $in: projectIds },
//                 createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
//             }),
//             Content.find({ projectId: { $in: projectIds } })
//                 .sort({ createdAt: -1 })
//                 .limit(5)
//                 .select("title platform createdAt status projectId")
//                 .populate("projectId", "name")
//                 .lean(),
//             DailyUpdate.find({ projectId: { $in: projectIds } })
//                 .sort({ createdAt: -1 })
//                 .limit(5)
//                 .select("createdAt projectId")
//                 .populate("projectId", "name")
//                 .lean(),
//             Promise.all(projects.slice(0, 3).map(async (p) => {
//                 const [updatesCount, contentCount] = await Promise.all([
//                     DailyUpdate.countDocuments({ projectId: p._id }),
//                     Content.countDocuments({ projectId: p._id })
//                 ]);
//                 return { ...p, updatesCount, contentCount };
//             }))
//         ]);

//         const timeline = [
//             ...projects.slice(0, 3).map(p => ({
//                 type: 'PROJECT',
//                 title: `Created project: ${p.name}`,
//                 date: p.createdAt
//             })),
//             ...recentUpdates.map(u => ({
//                 type: 'UPDATE',
//                 title: `Added update to ${(u.projectId as any)?.name || 'Project'}`,
//                 date: u.createdAt
//             })),
//             ...recentContent.map(c => ({
//                 type: 'CONTENT',
//                 title: `Generated ${c.platform} post for ${(c.projectId as any)?.name || 'Project'}`,
//                 date: c.createdAt
//             }))
//         ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);

//         return {
//             success: true,
//             data: {
//                 stats: {
//                     projects: projects.length,
//                     updates: totalUpdates,
//                     generatedContent: totalContent,
//                     weeklyPosts: contentThisWeek
//                 },
//                 timeline: JSON.parse(JSON.stringify(timeline)),
//                 recentProjects: JSON.parse(JSON.stringify(recentProjects)),
//                 recentContent: JSON.parse(JSON.stringify(recentContent))
//             }
//         };

//     } catch (error) {
//         console.error("Dashboard data error:", error);
//         return { success: false, error: "Failed to load dashboard data" };
//     }