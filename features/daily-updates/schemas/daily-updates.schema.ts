import { z } from "zod";

export const createDailyUpdateSchema = z.object({
    projectId: z
        .string()
        .min(1, "Project ID is required"),

    content: z
        .string()
        .min(10, "Daily update content must be at least 10 characters long")
        .max(1000, "Daily update content cannot exceed 1000 characters"),

    attachment: z.array(
        z.object({
            url: z.string(),
            type: z.string(),
            fileName: z.string(),
            size: z.number(),
        })
    ).optional(),
});

export const updateDailyUpdateSchema =
    createDailyUpdateSchema.partial();

export type CreateDailyUpdateInput =
    z.infer<typeof createDailyUpdateSchema>;

export type UpdateDailyUpdateInput =
    z.infer<typeof updateDailyUpdateSchema>;