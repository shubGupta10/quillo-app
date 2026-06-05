import { z } from "zod";
import { Platform, Perspective, Tone, ContentLength } from "@/features/content/models/content.interface";

export const updatePreferencesSchema = z.object({
    defaultPlatform: z.enum(Platform).nullable().optional(),
    defaultPerspective: z.enum(Perspective).nullable().optional(),
    defaultTone: z.enum(Tone).nullable().optional(),
    defaultLength: z.enum(ContentLength).nullable().optional(),
});

export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;
