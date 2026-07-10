"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import DailyUpdate from "../models/dailyUpdate.model";
import Project from "@/features/projects/models/project.model";

export async function getDailyUpdates(projectId: string, page = 1, limit = 5) {
    try {
        await connectDB();
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) {
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
            }
        }

        if (project.userId.toString() !== session.user.id) {
            return {
                success: false,
                error: "Unauthorized",
            };
        }

        const skip = (page - 1) * limit;

        const [updates, totalUpdates] = await Promise.all([
            DailyUpdate.find({
                projectId,
            }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            DailyUpdate.countDocuments({ projectId })
        ]);

        if (!updates) {
            return {
                success: false,
                error: "No updates found"
            }
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updates)),
            pagination: {
                total: totalUpdates,
                pages: Math.ceil(totalUpdates / limit),
                page,
                limit,
                hasMore: skip + updates.length < totalUpdates
            }
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        }
    }
}