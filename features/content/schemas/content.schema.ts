import { z } from "zod"
import { ContentLength, Perspective, Platform, Tone } from "../models/content.interface"
import { VALIDATION_LIMITS } from "@/lib/constants/limits"

export const generateContentSchema = z.object({
    projectId: z
        .string()
        .min(1, "Project ID is required"),

    sourceUpdates: z
        .array(z.string())
        .min(1, "At least one source update is required")
        .max(VALIDATION_LIMITS.MAX_SOURCE_UPDATES, `Maximum ${VALIDATION_LIMITS.MAX_SOURCE_UPDATES} source updates allowed`),

    platform: z.enum(Platform),

    perspective: z.enum(Perspective),

    tone: z.enum(Tone),

    contentLength: z.enum(ContentLength),

})

export type GenerateContentInput =
    z.infer<typeof generateContentSchema>;

export const saveContentSchema = generateContentSchema.extend({
    title: z.string().min(1, "Title is required").max(VALIDATION_LIMITS.MAX_PROJECT_NAME_CHARS, "Title is too long"),
    content: z.string().min(1, "Content is required").max(VALIDATION_LIMITS.MAX_GENERATED_CONTENT_CHARS, "Content is too long"),
    attachment: z.array(
        z.object({
            url: z.string(),
            type: z.string(),
            fileName: z.string(),
            size: z.number(),
        })
    ).max(VALIDATION_LIMITS.UPLOAD_MAX_FILE_COUNT).optional(),
});

export type SaveContentInput =
    z.infer<typeof saveContentSchema>;