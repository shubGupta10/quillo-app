"use server"

import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { headers } from "next/headers"
import Project from "../models/project.model"

export async function getProjects() {
    try {
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

        const projects = await Project.aggregate([
            { $match: { userId: session.user.id } },
            { $sort: { updatedAt: -1 } },
            {
                $lookup: {
                    from: 'dailyupdates',
                    localField: '_id',
                    foreignField: 'projectId',
                    as: 'updates'
                }
            },
            {
                $lookup: {
                    from: 'contents',
                    localField: '_id',
                    foreignField: 'projectId',
                    as: 'content'
                }
            },
            {
                $addFields: {
                    updatesCount: { $size: "$updates" },
                    contentCount: { $size: "$content" }
                }
            },
            {
                $project: { updates: 0, content: 0 }
            }
        ]);

        return {
            success: true,
            data: JSON.parse(JSON.stringify(projects))
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: "Failed to get projects"
        }
    }
}