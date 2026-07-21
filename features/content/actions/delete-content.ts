"use server"

import Project from "@/features/projects/models/project.model";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db"
import { headers } from "next/headers";
import Content from "../models/content.model";
import { revalidateTag } from "next/cache";

export async function deleteContent(contentId: string) {
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

        const content = await Content.findById(contentId);

        if (!content) {
            return {
                success: false,
                error: "Content not found"
            }
        }

        const project = await Project.findById(content.projectId)

        if (!project) {
            return {
                success: false,
                error: "Project not found"
            }
        }

        if (project.userId.toString() !== session.user.id) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        await Content.findByIdAndDelete(contentId)

        revalidateTag("contents", "default");
        revalidateTag("dashboard", "default");

        return {
            success: true,
            message: "Content deleted successfully"
        }
    } catch (error) {
        console.error("Error deleting content:", error);
        return {
            success: false,
            error: "Internal server error"
        }
    }
}