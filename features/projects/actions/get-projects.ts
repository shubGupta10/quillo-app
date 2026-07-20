"use server"

import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { headers } from "next/headers"
import { getCachedProjects } from "../queries/queries"

export async function getProjects() {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized"
            };
        }
        await connectDB();

        const projects = await getCachedProjects(session.user.id);

        return {
            success: true,
            data: JSON.parse(JSON.stringify(projects))
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: "Failed to get projects"
        }
    }
}