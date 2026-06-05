import { z } from "zod"
import { ContentLength, Perspective, Platform, Tone } from "../models/content.interface"

export const generateContentSchema = z.object({
    projectId: z
        .string()
        .min(1, "Project ID is required"),

    sourceUpdates: z
        .array(z.string())
        .min(1, "At least one source update is required"),

    platform: z.enum(Platform),

    perspective: z.enum(Perspective),

    tone: z.enum(Tone),

    contentLength: z.enum(ContentLength),

})

export type GenerateContentInput =
    z.infer<typeof generateContentSchema>;

export const saveContentSchema = generateContentSchema.extend({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
});

export type SaveContentInput =
    z.infer<typeof saveContentSchema>;