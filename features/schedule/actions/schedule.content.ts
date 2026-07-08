"use server"

import { Status } from "@/features/content/models/content.interface";
import Content from "@/features/content/models/content.model";
import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db";
import SocialAccount from "@/features/schedule/model/socialAccount.model";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import Project from "@/features/projects/models/project.model";
import { redis } from "@/lib/redis";
import { sendEmail } from "@/lib/email/mailer";
import { getScheduledEmailHtml } from "@/lib/email/templates";

export async function scheduleContent(contentId: string, scheduledFor: Date) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });
        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        const lockKey = `schedule_lock_${contentId}`;
        const locked = await redis.set(lockKey, "locked", {
            nx: true, ex: 5
        });

        if (!locked) {
            return {
                success: false,
                error: "Action already in progres. Please wait...."
            }
        }

        await connectDB();

        if (new Date(scheduledFor) <= new Date()) {
            return { success: false, error: "Scheduled time must be in the future" };
        }

        const contentToSchedule = await Content.findById(contentId).populate({
            path: "projectId",
            model: Project
        });

        if (!contentToSchedule) {
            return { success: false, error: "Content not found" };
        }

        if (contentToSchedule.platform === "REDDIT") {
            return { success: false, error: "Reddit content cannot be scheduled." };
        }


        if (contentToSchedule.projectId.userId.toString() !== session.user.id) {
            return { success: false, error: "Unauthorized: You do not own this content" };
        }

        const accountExists = await SocialAccount.findOne({
            userId: session.user.id,
            provider: contentToSchedule.platform
        });

        if (!accountExists) {
            return { success: false, error: `Please connect your ${contentToSchedule.platform} account in Settings before scheduling.` };
        }

        const content = await Content.findOneAndUpdate(
            { _id: contentId },
            {
                status: Status.SCHEDULED,
                scheduledFor: new Date(scheduledFor),
                errorDetails: null
            },
            { new: true }
        );

        if (!content) {
            return { success: false, error: "Content not found" }
        }

        revalidatePath(`/content/${contentId}`);
        revalidatePath("/content");

        await sendEmail({
            to: session.user.email as string,
            subject: "Your post is scheduled! 📅",
            html: getScheduledEmailHtml(content.title || "Your Scheduled Content", new Date(scheduledFor))
        })

        return {
            success: true,
            data: JSON.parse(JSON.stringify(content))
        }

    } catch (error) {
        console.error("Failed to schedule content:", error);
        return { success: false, error: "Failed to schedule content" };
    }
}