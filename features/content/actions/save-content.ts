"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import Content from "../models/content.model";
import Project from "@/features/projects/models/project.model";
import { SaveContentInput, saveContentSchema } from "../schemas/content.schema";
import DailyUpdate from "@/features/daily-updates/models/dailyUpdate.model";

export async function saveContent(data: SaveContentInput) {
    try {
        const validatedFields = saveContentSchema.safeParse(data);
        if (!validatedFields.success) {
            return {
                success: false,
                error: "Invalid content data"
            };
        }

        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized"
            };
        }

        await connectDB();

        const project = await Project.findOne({
            _id: validatedFields.data.projectId,
            userId: session.user.id
        });

        if (!project) {
            return {
                success: false,
                error: "Project not found or unauthorized"
            };
        }

        const souceUpdatesList = await DailyUpdate.find({
            _id: { $in: validatedFields.data.sourceUpdates }
        });

        const extractedAttachments = souceUpdatesList.flatMap(update => update.attachment || []);

        const createdContent = await Content.create({
            projectId: project._id,
            sourceUpdates: validatedFields.data.sourceUpdates,
            platform: validatedFields.data.platform,
            perspective: validatedFields.data.perspective,
            tone: validatedFields.data.tone,
            contentLength: validatedFields.data.contentLength,
            title: validatedFields.data.title,
            content: validatedFields.data.content,
            contentProfile: validatedFields.data.contentProfile,
            attachment: extractedAttachments
        });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(createdContent)),
        };
    } catch (error: any) {
        console.error("Error saving content:", error);
        return {
            success: false,
            error: error.message || "Failed to save content",
        };
    }
}
