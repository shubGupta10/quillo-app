import { z } from "zod";

export const generatedContentResponseSchema = z.object({
    variations: z.array(z.object({
        title: z.string().min(1),
        content: z.string().min(1),
    })).length(2),
});

export type GeneratedContentResponse =
    z.infer<typeof generatedContentResponseSchema>;