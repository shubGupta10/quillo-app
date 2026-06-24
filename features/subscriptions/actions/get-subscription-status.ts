"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { checkGenerationLimit } from "../services/usage.service";

/**
 * Server Action to fetch the current user's subscription status.
 * Used by server components (e.g. AppSidebar) to display live quota.
 */
export async function getSubscriptionStatus() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        return null;
    }

    const status = await checkGenerationLimit(session.user.id);

    return {
        used: status.used,
        limit: status.limit,
        resetDate: status.resetDate.toISOString(),
        planType: status.planType,
        allowed: status.allowed,
    };
}
