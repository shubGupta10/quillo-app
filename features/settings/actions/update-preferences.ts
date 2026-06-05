"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import Auth from "@/features/auth/model/auth.model";
import { UpdatePreferencesInput, updatePreferencesSchema } from "../schemas/settings.schema";

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
            { authUserId: session.user.id },
            { $set: { preferences: validated.data } },
            { upsert: false }
        );

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
