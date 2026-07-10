"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db"
import { headers } from "next/headers";
import Content from "../models/content.model";
import Project from "@/features/projects/models/project.model";

export async function getContents(projectId: string) {
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

        const project = await Project.findById(projectId).lean();

        if (!project) {
            return {
                success: false,
                error: "Project not found"
            };
        }

        if (project.userId !== session.user.id) {
            return {
                success: false,
                error: "Unauthorized"
            };
        }

        const contents = await Content.find({
            projectId
        }).sort({ createdAt: -1 }).lean();

        return {
            success: true,
            data: JSON.parse(JSON.stringify(contents))
        }
    } catch (error) {
        console.error("Error getting contents:", error);
        return {
            success: false,
            error: "Internal server error"
        }
    }
}