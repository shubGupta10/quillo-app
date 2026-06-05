"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db"
import { headers } from "next/headers";
import DailyUpdate from "../models/dailyUpdate.model";
import Project from "@/features/projects/models/project.model";

export async function getDailyUpdate(id: string) {
    try {
        await connectDB();

        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user.id) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        const update = await DailyUpdate.findById(id);

        if (!update) {
            return {
                success: false,
                error: "Update not found"
            }
        }

        const project = await Project.findById(update.projectId);
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
            };
        }

        return {
            success: true,
            data: JSON.parse(JSON.stringify(update))
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}