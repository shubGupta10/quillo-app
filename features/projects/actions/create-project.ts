"use server"

import { connectDB } from "@/lib/db";
import Project from "../models/project.model";
import { CreateProjectInput, createProjectSchema } from "../schemas/project.schema";
import { auth } from "@/lib/auth";
import { checkProjectLimit } from "@/features/subscriptions/services/usage.service";
import { headers } from "next/headers";
import { revalidateTag } from "next/cache";

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

        const limitCheck = await checkProjectLimit(session.user.id);
        if (!limitCheck.allowed) {
            return {
                success: false,
                error: `Project limit reached. You can only create up to ${limitCheck.limit} projects on your current plan.`
            }
        }

        await connectDB();
        const project = await Project.create({
            ...validatedFields.data,
            userId: session.user.id
        });
        revalidateTag("projects", "default");
        revalidateTag("dashboard", "default");
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