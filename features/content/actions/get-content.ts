"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db"
import { headers } from "next/headers";
import Content from "../models/content.model";
import Project from "@/features/projects/models/project.model";

export async function getContent(contentId: string) {
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

        const project = await Project.findById(content.projectId);

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

        const contentData = JSON.parse(JSON.stringify(content));
        contentData.projectId = { _id: project._id.toString(), name: project.name };

        return {
            success: true,
            data: contentData
        }
    } catch (error) {
        console.error("Error getting content:", error);
        return {
            success: false,
            error: "Internal server error"
        }
    }
}