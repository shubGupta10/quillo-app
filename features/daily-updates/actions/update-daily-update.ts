"use server"

import { connectDB } from "@/lib/db";
import { UpdateDailyUpdateInput, updateDailyUpdateSchema } from "../schemas/daily-updates.schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import DailyUpdate from "../models/dailyUpdate.model";
import Project from "@/features/projects/models/project.model";
import { revalidateTag } from "next/cache";

export async function updateDailyUpdate(data: UpdateDailyUpdateInput, updateId: string) {
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

        const validatedFields = updateDailyUpdateSchema.safeParse(data);
        if (!validatedFields.success) {
            return {
                success: false,
                message: "Invalid input",
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const update = await DailyUpdate.findById(updateId);
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
            }
        }

        const updatedUpdate = await DailyUpdate.findByIdAndUpdate(
            updateId,
            {
                ...validatedFields.data
            },
            {
                new: true
            }
        );

        if (!updatedUpdate) {
            return {
                success: false,
                error: "Failed to update daily update"
            }
        }

        revalidateTag("daily-updates", "default");
        revalidateTag("dashboard", "default");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedUpdate)),
        }
    } catch (error: any) {
        return {
            success: false,
            error: error.message
        }
    }
}