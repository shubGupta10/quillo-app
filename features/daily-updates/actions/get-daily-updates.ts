"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import Project from "@/features/projects/models/project.model";
import { getCachedDailyUpdates } from "../queries/queries";

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

        const { updates, totalUpdates } = await getCachedDailyUpdates(projectId, page, limit);

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
                hasMore: ((page - 1) * limit) + updates.length < totalUpdates
            }
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        }
    }
}