"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import Content from "@/features/content/models/content.model";
import Project from "@/features/projects/models/project.model";

export async function getAllContent() {
    try {
        await connectDB();

        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user.id) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        const projects = await Project.find({ userId: session.user.id });
        const projectIds = projects.map(p => p._id);

        const contents = await Content.find({
            projectId: { $in: projectIds }
        })
        .populate("projectId", "name")
        .sort({ createdAt: -1 });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(contents))
        }
    } catch (error) {
        console.error("Error getting all content:", error);
        return {
            success: false,
            error: "Internal server error"
        }
    }
}
