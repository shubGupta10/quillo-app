"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import DailyUpdate from "../models/dailyUpdate.model";
import Project from "@/features/projects/models/project.model";

export async function getDailyUpdates(projectId: string) {
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

        const project = await Project.findById(projectId);

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

        const updates = await DailyUpdate.find({
            projectId,
        }).sort({ createdAt: -1 })

        if (!updates) {
            return {
                success: false,
                error: "No updates found"
            }
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updates)),
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        }
    }
}