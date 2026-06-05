"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import Project from "../models/project.model";
import { UpdateProjectInput, updateProjectSchema } from "../schemas/project.schema";

export async function updateProject(data: UpdateProjectInput) {
    try {
        const validatedFields = updateProjectSchema.safeParse(data);
        if (!validatedFields.success) {
            return {
                success: false,
                error: "Invalid project data"
            }
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
        const { projectId, ...updateData } = validatedFields.data;

        const existProject = await Project.findOne({
            _id: projectId,
            userId: session.user.id
        })

        if (!existProject) {
            return {
                success: false,
                error: "Project not found"
            }
        }

        const updatedProject = await Project.findByIdAndUpdate(existProject._id, updateData, {
            new: true,
        });

        return {
            success: true,
            data: JSON.parse(JSON.stringify(updatedProject))
        }

    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: "Failed to update project"
        }
    }
}