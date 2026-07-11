"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Platform } from "@/features/content/models/content.interface";
import { getPublisher } from "../services/publisher.factory";
import { redirect } from "next/navigation";
import SocialAccount from "../model/socialAccount.model";
import { connectDB } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function connectSocialAccount(platform: Platform) {
    let authUrl = "";

    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        // Dynamically get the right publisher (e.g., TwitterProvider)
        const publisher = getPublisher(platform);

        // Get the OAuth URL
        authUrl = await publisher.getAuthUrl(session.user.id);

    } catch (error: any) {
        console.error("Failed to start OAuth flow:", error);
        return { success: false, error: error.message };
    }

    if (authUrl) {
        redirect(authUrl);
    }
}

export async function disconnectSocialAccount(platform: Platform) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) {
            return { success: false, error: "Unauthorized" };
        }

        await connectDB();
        await SocialAccount.deleteOne({ 
            userId: session.user.id, 
            provider: platform.toUpperCase() 
        });

        revalidatePath("/settings");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to disconnect account:", error);
        return { success: false, error: error.message };
    }
}
