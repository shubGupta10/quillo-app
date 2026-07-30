"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import Feedback, { FeedbackCategory } from "../models/feedback.model";
import { z } from "zod";
import mongoose from "mongoose";
import { InformAdmin, sendEmail } from "@/lib/email/mailer";
import { getFeedbackNotificationEmailHtml } from "@/lib/email/templates";
import { after } from "next/server";

const submitFeedbackSchema = z.object({
    rating: z.number().min(1, "Please select a star rating").max(5),
    category: z.nativeEnum(FeedbackCategory).default(FeedbackCategory.GENERAL),
    message: z.string().min(3, "Feedback message must be at least 3 characters").max(2000),
});

export type SubmitFeedbackInput = z.infer<typeof submitFeedbackSchema>;

export async function submitFeedback(input: SubmitFeedbackInput) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id || !session.user.email) {
            return { success: false, error: "Unauthorized. Please sign in." };
        }

        const validated = submitFeedbackSchema.safeParse(input);
        if (!validated.success) {
            return {
                success: false,
                error: validated.error.issues[0]?.message || "Invalid feedback input",
            };
        }

        await connectDB();

        const authUserId = mongoose.Types.ObjectId.isValid(session.user.id)
            ? new mongoose.Types.ObjectId(session.user.id)
            : new mongoose.Types.ObjectId();

        const userName = session.user.name || "User";

        await Feedback.create({
            authUserId: authUserId,
            email: session.user.email,
            userName: userName,
            category: validated.data.category,
            rating: validated.data.rating,
            message: validated.data.message,
        });

        after(async () => {
            await InformAdmin({
                subject: `[New Feedback] ${validated.data.category} - ${userName}`,
                html: getFeedbackNotificationEmailHtml(
                    userName,
                    session.user.email,
                    validated.data.category,
                    validated.data.rating,
                    validated.data.message
                )
            })
        })

        return {
            success: true,
            message: "Thank you for your feedback!",
        };
    } catch (error: any) {
        console.error("Error submitting feedback:", error);
        return {
            success: false,
            error: error.message || "Failed to submit feedback",
        };
    }
}