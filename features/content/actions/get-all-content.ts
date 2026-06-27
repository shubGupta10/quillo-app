"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import Content from "@/features/content/models/content.model";
import Project from "@/features/projects/models/project.model";

export async function getAllContent({ page = 1, limit = 6 }) {
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
        const skip = (page - 1) * limit as any;

        const contents = await Content.find({
            projectId: { $in: projectIds }
        })
            .populate("projectId", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean()

        const totalContent = await Content.countDocuments({
            projectId: { $in: projectIds }
        })

        return {
            success: true,
            data: JSON.parse(JSON.stringify(contents)),
            pagination: {
                total: totalContent,
                pages: Math.ceil(totalContent / limit),
                page,
                limit
            }
        }
    } catch (error) {
        console.error("Error getting all content:", error);
        return {
            success: false,
            error: "Internal server error"
        }
    }
}
