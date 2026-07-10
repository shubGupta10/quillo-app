"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import Content from "@/features/content/models/content.model";
import Project from "@/features/projects/models/project.model";
import { Status } from "@/features/content/models/content.interface";

export async function getScheduledContent() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        await connectDB();

        const userProjects = await Project.find({
            userId: session.user.id
        }, '_id').lean();

        const projectIds = userProjects.map(p => p._id);

        const schedulePosts = await Content.find({
            status: Status.SCHEDULED,
            projectId: { $in: projectIds }
        }).populate({ path: "projectId", model: Project, select: "name" }).sort({ scheduledFor: 1 }).lean();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(schedulePosts))
        };

    } catch (error: any) {
        console.error("Failed to fetch scheduled content:", error);
        return { success: false, error: error.message };
    }
}
