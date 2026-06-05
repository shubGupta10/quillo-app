import { z } from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .min(3, "Project name must be at least 3 characters")
        .max(100, "Project name cannot exceed 100 characters"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters")
        .max(5000, "Description cannot exceed 5000 characters"),

    industry: z
        .array(z.string())
        .min(1, "Select at least one industry"),

    audience: z
        .array(z.string())
        .min(1, "Select at least one audience"),

    tags: z
        .array(z.string())
        .max(10, "Maximum 10 tags")
        .default([]),
});

export const updateProjectSchema =
    createProjectSchema.partial().extend({
        projectId: z.string(),
    });

export type CreateProjectInput =
    z.infer<typeof createProjectSchema>;

export type UpdateProjectInput =
    z.infer<typeof updateProjectSchema>;