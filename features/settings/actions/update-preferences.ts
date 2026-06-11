"use server"

import mongoose from "mongoose";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import Auth from "@/features/auth/model/auth.model";
import { UpdatePreferencesInput, updatePreferencesSchema } from "../schemas/settings.schema";
import { revalidatePath } from "next/cache";

export async function updatePreferences(data: UpdatePreferencesInput) {
    try {
        const validated = updatePreferencesSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, error: "Invalid input" };
        }

        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        await connectDB();

        await Auth.findOneAndUpdate(
            { email: session.user.email },
            { 
                $set: { 
                    preferences: validated.data,
                    fullName: session.user.name,
                    image: session.user.image || "",
                },
                $setOnInsert: {
                    authUserId: mongoose.Types.ObjectId.isValid(session.user.id) ? new mongoose.Types.ObjectId(session.user.id) : new mongoose.Types.ObjectId()
                }
            },
            { upsert: true }
        );
        revalidatePath("/", "layout")

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
