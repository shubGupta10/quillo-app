"use server"

import { connectDB } from "@/lib/db";
import DailyUpdate from "../models/dailyUpdate.model";
import { CreateDailyUpdateInput, createDailyUpdateSchema } from "../schemas/daily-updates.schema";
import { revalidateTag, revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Project from "@/features/projects/models/project.model";
import { checkDailyUpdateLimit } from "@/features/subscriptions/services/usage.service";
import Auth from "@/features/auth/model/auth.model";
import { calculateStreak } from "@/lib/streak-engine";

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

        const authUser = await Auth.findOne({
            authUserId: session.user.id
        })
        if (!authUser) {
            return {
                success: false,
                error: "User not found",
            }
        }

        const newUpdate = await DailyUpdate.create({
            ...validatedFields.data,
            projectId: project._id,
        });

        // Mark onboarding step 1 as done (only if not already)
        if (!project.onboarding?.loggedUpdate) {
            await Project.updateOne(
                { _id: project._id },
                { $set: { "onboarding.loggedUpdate": true } }
            );
        }

        const userProjects = await Project.find({ userId: session.user.id }).select("_id").lean();
        const projectIds = userProjects.map((p: any) => p._id);
        const allUpdates = await DailyUpdate.find({ projectId: { $in: projectIds } }).select("createdAt").lean();
        const updateDates = allUpdates.map((u: any) => u.createdAt);
        const computedStreak = calculateStreak(updateDates);

        await Auth.updateOne(
            { _id: authUser._id },
            {
                $set: {
                    "streak.currentStreak": computedStreak.currentStreak,
                    "streak.lastUpdateDate": computedStreak.lastUpdateDate || new Date(),
                    ...(computedStreak.longestStreak > (authUser.streak?.longestStreak || 0)
                        ? { "streak.longestStreak": computedStreak.longestStreak }
                        : {})
                }
            }
        );

        revalidatePath(`/projects/${validatedFields.data.projectId}`);
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