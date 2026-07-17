// //logic flow
// 1. Validate input
// 2. Get session
// 3. Verify project ownership
// 4. Fetch project
// 5. Fetch selected daily updates
// 6. Fetch recent generated content
// 7. Build prompt
// 8. Call Gemini
// 9. Save Content document
// 10. Return generated content


"use server"

import { auth } from "@/lib/auth";
import { GenerateContentInput, generateContentSchema } from "../schemas/content.schema";
import { headers } from "next/headers";
import { connectDB } from "@/lib/db";
import Project from "@/features/projects/models/project.model";
import DailyUpdate from "@/features/daily-updates/models/dailyUpdate.model";
import Content from "../models/content.model";
import { buildPrompt } from "../components/build-prompt";
import { generatedContentResponseSchema } from "../schemas/content-response.schema";
import { aiRateLimit } from "@/lib/rate-limit";
import { checkGenerationLimit, incrementGenerationUsage } from "@/features/subscriptions/services/usage.service";
import { getPreferenceMemory } from "../services/preference-memory.service";
import { ai } from "@/lib/ai";


export async function generateContent(
    data: GenerateContentInput
) {
    try {
        const validatedFields = generateContentSchema.safeParse(data);
        if (!validatedFields.success) {
            return {
                success: false,
                message: "Invalid input",
                errors:
                    validatedFields.error.flatten()
                        .fieldErrors,
            };
        }

        const session = await auth.api.getSession({
            headers: await headers()
        })

        if (!session?.user?.id) {
            return {
                success: false,
                message: "Unauthorized"
            }
        }

        const { success: rateLimitSuccess } = await aiRateLimit.limit(session.user.id)

        if (!rateLimitSuccess) {
            return {
                success: false,
                error: "You have reached your daily limit for AI generation. Please try again tomorrow.",
            }
        }

        // Check monthly quota (persistent, cost-protection layer)
        const quota = await checkGenerationLimit(session.user.id);
        if (!quota.allowed) {
            return {
                success: false,
                error: `You've used all ${quota.limit} generations for this month. Your quota resets on ${new Date(quota.resetDate).toLocaleDateString()}.`,
            };
        }

        await connectDB();

        const project = await Project.findById(
            validatedFields.data.projectId
        );
        if (!project) {
            return {
                success: false,
                message: "Project not found"
            }
        }

        if (project.userId.toString() !== session?.user?.id) {
            return {
                success: false,
                error: "Unauthorized",
            };
        }

        const updates = await DailyUpdate.find({
            _id: {
                $in: validatedFields.data.sourceUpdates,
            },
            projectId: validatedFields.data.projectId,
        });

        if (updates.length !== validatedFields.data.sourceUpdates.length) {
            return {
                success: false,
                error: "Some updates were not found",
            };
        }

        const recentContent = await Content.find({
            projectId: project._id,
        }).sort({ createdAt: -1 })
            .limit(3)


        const updateTexts = updates.map(u => u.content).join("\n");

        const searchEmbeddingResponse = await ai.models.embedContent({
            model: "gemini-embedding-2",
            contents: updateTexts,
            config: {
                outputDimensionality: 768,
            }
        });

        const searchVector = searchEmbeddingResponse.embeddings?.[0]?.values || [];

        const preferenceMemory = await getPreferenceMemory(
            validatedFields.data.projectId,
            validatedFields.data.platform,
            searchVector,
        );

        // Filter recent content based on the raw text to avoid coupling to MongoDB _ids.
        const preferenceTexts = new Set(preferenceMemory.map((p: any) => p.content));
        const filteredRecentContent = recentContent.filter(
            (c: any) => !preferenceTexts.has(c.content)
        );

        const prompt = buildPrompt({
            project,
            updates,
            recentContent: filteredRecentContent,
            preferenceMemory,
            platform: validatedFields.data.platform,
            perspective: validatedFields.data.perspective,
            tone: validatedFields.data.tone,
            contentLength: validatedFields.data.contentLength,
        })

        const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        })
        let generatedText = res.text;
        if (!generatedText) {
            return {
                success: false,
                error: "Failed to generate content",
            };
        }

        // Sanitize just in case it returns markdown JSON blocks
        generatedText = generatedText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        const parsedResponse = generatedContentResponseSchema.safeParse(JSON.parse(generatedText));
        if (!parsedResponse.success) {
            return {
                success: false,
                error: "Invalid AI response format",
            };
        }

        // Increment only after a confirmed successful generation
        await incrementGenerationUsage(session.user.id);

        return {
            success: true,
            data: parsedResponse.data.variations,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message,
        };
    }
}