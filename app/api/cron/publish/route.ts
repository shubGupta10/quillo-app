import { Status } from "@/features/content/models/content.interface";
import Content from "@/features/content/models/content.model";
import Project from "@/features/projects/models/project.model";
import { getPublisher } from "@/features/schedule/services/publisher.factory";
import { connectDB } from "@/lib/db";
import { sendEmail } from "@/lib/email/mailer";
import { getPublishedEmailHtml } from "@/lib/email/templates";
import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const headersList = await headers();
        const authHeader = headersList.get("authorization");

        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectDB();

        const dueContent = await Content.find({
            status: Status.SCHEDULED,
            scheduledFor: { $lte: new Date() }
        }).populate({
            path: "projectId",
            model: Project
        });

        if (dueContent.length === 0) {
            return NextResponse.json({ success: true, message: "No content due for publishing" });
        }

        const results = [];

        for (const post of dueContent) {
            try {
                const userId = post.projectId.userId;

                const publiser = getPublisher(post.platform);

                const success = await publiser.publish(post._id.toString(), userId);

                if (success) {
                    const userDoc = await mongoose.connection.collection("user").findOne({ _id: userId.toString() });

                    if (userDoc?.email) {
                        await sendEmail({
                            to: userDoc.email as string,
                            subject: "Post Published Successfully! 🚀",
                            html: getPublishedEmailHtml(post.title || "Your Content", post.platform),
                        })
                    }
                }

                results.push({
                    contentId: post._id, success
                })
            } catch (error: any) {
                console.error(`Error publishing content ${post._id}:`, error);

                // If the factory throws an error or publishing fails, mark it
                await Content.updateOne(
                    { _id: post._id },
                    {
                        status: Status.FAILED,
                        errorDetails: error.message || "Failed to publish"
                    }
                );

                results.push({ contentId: post._id, success: false, error: error.message });
            }
        }
        return NextResponse.json({ success: true, results });
    } catch (error) {
        console.error("Cron Execution Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}