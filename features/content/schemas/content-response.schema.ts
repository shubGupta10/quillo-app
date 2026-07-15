import { z } from "zod";
import { USAGE_QUOTAS } from "@/lib/constants/limits";

export const generatedContentResponseSchema = z.object({
    variations: z.array(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        contentProfile: z.object({
            topics: z.array(z.string()).optional(),
            technologies: z.array(z.string()).optional(),
            hookStyle: z.string().optional(),
            structure: z.string().optional(),
            contentAngle: z.string().optional(),
            writingTone: z.string().optional(),
            detailLevel: z.string().optional(),
        }).optional()
    })).length(USAGE_QUOTAS.AI_VARIATIONS_PER_GENERATION),
});

export type GeneratedContentResponse =
    z.infer<typeof generatedContentResponseSchema>;