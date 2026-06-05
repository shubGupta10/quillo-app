"use server"

import { auth } from "@/lib/auth"
import { connectDB } from "@/lib/db"
import { headers } from "next/headers"
import Project from "../models/project.model"

export async function deleteProject(projectId: string) {
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

        const project = await Project.findOne({
            _id: projectId,
            userId: session.user.id
        })

        if (!project) {
            return {
                success: false,
                error: "Project not found"
            }
        }

        await Project.findByIdAndDelete(
            project._id
        );

        return {
            success: true,
            data: JSON.parse(JSON.stringify(project))
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: "Failed to delete project"
        }
    }
}