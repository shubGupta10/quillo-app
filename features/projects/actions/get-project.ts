"use server"

import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { headers } from "next/headers"
import Project from "../models/project.model"

export async function getProject(projectId: string) {
    try {
        if (!projectId) {
            return {
                success: false,
                error: "Project ID is required"
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

        await connectDB();
        const fetchProject = await Project.findOne({
            _id: projectId,
            userId: session.user.id
        }).lean()

        if (!fetchProject) {
            return {
                success: false,
                error: "Project not found"
            }
        }
        return {
            success: true,
            data: JSON.parse(JSON.stringify(fetchProject))
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: "Failed to get project"
        }
    }
}