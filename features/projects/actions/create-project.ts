"use server"

import { connectDB } from "@/lib/db";
import Project from "../models/project.model";
import { CreateProjectInput, createProjectSchema } from "../schemas/project.schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createProject(data: CreateProjectInput) {
    try {
        const validatedFields = createProjectSchema.safeParse(data);
        if (!validatedFields.success) {
            return {
                success: false,
                error: "Invalid project data"
            }
        }

        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        await connectDB();
        const project = await Project.create({
            ...validatedFields.data,
            userId: session.user.id
        });
        return {
            success: true,
            data: JSON.parse(JSON.stringify(project))
        }
    } catch (error) {
        return {
            success: false,
            error: "Failed to create project"
        }
    }
}