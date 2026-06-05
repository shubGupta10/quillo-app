import { z } from "zod";
import { Status } from "../models/content.interface";

export const updateContentSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .optional(),

    content: z
        .string()
        .min(1, "Content is required")
        .optional(),

    status: z
        .enum(Status)
        .optional(),

    scheduledFor: z
        .date()
        .optional(),
});

export type UpdateContentInput =
    z.infer<typeof updateContentSchema>;