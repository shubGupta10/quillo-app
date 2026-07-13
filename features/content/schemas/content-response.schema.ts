import { z } from "zod";
import { USAGE_QUOTAS } from "@/lib/constants/limits";

export const generatedContentResponseSchema = z.object({
    variations: z.array(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
    })).length(USAGE_QUOTAS.AI_VARIATIONS_PER_GENERATION),
});

export type GeneratedContentResponse =
    z.infer<typeof generatedContentResponseSchema>;