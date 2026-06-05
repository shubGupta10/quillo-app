"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db"
import { headers } from "next/headers";
import DailyUpdate from "../models/dailyUpdate.model";
import Project from "@/features/projects/models/project.model";

export async function deleteDailyUpdate(updateId: string) {
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

        const dailyUpdate = await DailyUpdate.findById(updateId);
        if (!dailyUpdate) {
            return {
                success: false,
                error: "Daily update not found"
            }
        }

        const project = await Project.findById(dailyUpdate.projectId);
        if (!project) {
            return {
                success: false,
                error: "Project not found"
            };
        }

        if (project.userId.toString() !== session.user.id) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        await DailyUpdate.findByIdAndDelete(updateId);

        return {
            success: true,
            message: "Daily update deleted successfully"
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}