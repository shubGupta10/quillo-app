"use server"

import { connectDB } from "@/lib/db";
import { UpdateContentInput, updateContentSchema } from "../schemas/updateContent.schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Content from "../models/content.model";
import Project from "@/features/projects/models/project.model";
import { revalidateTag } from "next/cache";

export async function updateContent(contentId: string, data: UpdateContentInput) {
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

        const validatedFields = updateContentSchema.safeParse(data);

        if (!validatedFields.success) {
            return {
                message: "Invalid input",
                errors: validatedFields.error.flatten().fieldErrors,
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
            }
        }

        if (project.userId.toString() !== session.user.id) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        const updatedContent = await Content.findByIdAndUpdate(contentId, validatedFields.data, {
            new: true,
        })

        revalidateTag("contents", "default");
        revalidateTag("dashboard", "default");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedContent))
        }
    } catch (error) {
        console.error("Error updating content:", error);
        return {
            success: false,
            error: "Internal server error"
        }
    }
}