"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import Auth from "@/features/auth/model/auth.model";

export async function getSettings() {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        await connectDB();

        const userDoc = await Auth.findOne({ email: session.user.email }).lean();

        return {
            success: true,
            data: {
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
                preferences: userDoc?.preferences ?? {
                    defaultPlatform: null,
                    defaultPerspective: null,
                    defaultTone: null,
                    defaultLength: null,
                },
            },
        };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
