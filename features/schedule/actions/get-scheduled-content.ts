"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import Content from "@/features/content/models/content.model";
import { Status } from "@/features/content/models/content.interface";

export async function getScheduledContent() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        await connectDB();

        const scheduledPosts = await Content.aggregate([
            {
                $match: {
                    status: Status.SCHEDULED
                }
            },
            {
                $lookup: {
                    from: "projects",
                    localField: "projectId",
                    foreignField: "_id",
                    as: "projectId"
                }
            },
            {
                $unwind: "$projectId"
            },
            {
                $match: {
                    "projectId.userId": session.user.id
                }
            },
            {
                $sort: {
                    scheduledFor: 1
                }
            }
        ])

        if (!scheduledPosts) {
            return { success: false, error: "Failed to fetch scheduled content" };
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(scheduledPosts))
        };

    } catch (error: any) {
        console.error("Failed to fetch scheduled content:", error);
        return { success: false, error: error.message };
    }
}
