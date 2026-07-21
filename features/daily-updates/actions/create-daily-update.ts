"use server"

import { connectDB } from "@/lib/db";
import DailyUpdate from "../models/dailyUpdate.model";
import { CreateDailyUpdateInput, createDailyUpdateSchema } from "../schemas/daily-updates.schema";
import { revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Project from "@/features/projects/models/project.model";
import { checkDailyUpdateLimit } from "@/features/subscriptions/services/usage.service";

export async function createDailyUpdate(data: CreateDailyUpdateInput) {
    try {
        const validatedFields = createDailyUpdateSchema.safeParse(data);
        if (!validatedFields.success) {
            return {
                success: false,
                message: "Invalid input",
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        await connectDB()

        const project = await Project.findById(
            validatedFields.data.projectId
        );
        if (!project) {
            return {
                success: false,
                error: "Project not found"
            }
        }
        if (project?.userId.toString() !== session.user.id) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        const limitCheck = await checkDailyUpdateLimit(session.user.id);
        if (!limitCheck.allowed) {
            return {
                success: false,
                error: `Daily limit reached. You can only create up to ${limitCheck.limit} updates per day on your current plan.`
            }
        }

        const newUpdate = await DailyUpdate.create({
            ...validatedFields.data,
            projectId: project._id,
        });

        revalidateTag("daily-updates", "default");
        revalidateTag("dashboard", "default");

        return {
            success: true,
            data: JSON.parse(JSON.stringify(newUpdate)),
        };

    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        };
    }
}