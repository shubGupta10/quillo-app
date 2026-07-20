"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import { getCachedAllContent } from "../queries/queries";

export async function getAllContent({ page = 1, limit = 6 }) {
    try {
        await connectDB();
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user.id) return { success: false, error: "Unauthorized" };

        const { contents, totalContent } = await getCachedAllContent(session.user.id, page, limit);

        return {
            success: true,
            data: JSON.parse(JSON.stringify(contents)),
            pagination: {
                total: totalContent,
                pages: Math.ceil(totalContent / limit),
                page,
                limit
            }
        }
    } catch (error) {
        return { success: false, error: "Internal server error" }
    }
}
