import { z } from "zod";
import { VALIDATION_LIMITS } from "@/lib/constants/limits";

export const createDailyUpdateSchema = z.object({
    projectId: z
        .string()
        .min(1, "Project ID is required"),

    content: z
        .string()
        .min(10, "Daily update content must be at least 10 characters long")
        .max(VALIDATION_LIMITS.MAX_LOG_LENGTH_CHARS, `Daily update content cannot exceed ${VALIDATION_LIMITS.MAX_LOG_LENGTH_CHARS} characters`),

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