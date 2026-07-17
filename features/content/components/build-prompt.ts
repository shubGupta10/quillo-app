type BuildPromptParams = {
    project: any;
    updates: any[];
    recentContent: any[];
    preferenceMemory?: any[];
    platform: string;
    perspective: string;
    tone: string;
    contentLength: string;
};

export function buildPrompt({
    project,
    updates,
    recentContent,
    preferenceMemory,
    platform,
    perspective,
    tone,
    contentLength,
}: BuildPromptParams) {
    const updatesText = updates
        .map(
            (update, index) =>
                `${index + 1}. ${update.content}`
        )
        .join("\n");

    const recentContentText =
        recentContent.length > 0
            ? recentContent
                .map(
                    (content, index) =>
                        `${index + 1}. ${content.content}`
                )
                .join("\n\n")
            : "No previous generated content.";

    const preferenceMemoryText =
        preferenceMemory && preferenceMemory.length > 0
            ? preferenceMemory
                .map(
                    (content, index) =>
                        `Example ${index + 1}:\n- Blueprint: ${JSON.stringify(content.contentProfile)}\n- Final Output: "${content.content}"`
                )
                .join("\n\n")
            : "No previous preference memory.";

    return `
You are helping a builder create content about their work.

PROJECT CONTEXT

Project Name:
${project.name}

Project Description:
${project.description}

Target Audience:
${project.audience.join(", ")}

Industry:
${project.industry.join(", ")}

Tags:
${project.tags.join(", ")}

CONTENT SETTINGS

Platform:
${platform}

Perspective:
${perspective}

Tone:
${tone}

Content Length:
${contentLength}

PLATFORM INSTRUCTIONS

${getPlatformInstructions(platform)}

${getPerspectiveInstructions(perspective)}

${getToneInstructions(tone)}

${getLengthInstructions(contentLength)}

CURRENT WORK UPDATES

${updatesText}

PREVIOUS GENERATED CONTENT

${recentContentText}

USER STYLE PREFERENCES

The user has previously selected the following generated content for similar updates. 
Use these as REFERENCE EXAMPLES for how the user prefers their content to be structured, hooked, and written.
Do not blindly copy them as templates. Learn the user's style and preferences while generating fresh content.

${preferenceMemoryText}

IMPORTANT INSTRUCTIONS

1. Create content primarily from the CURRENT WORK UPDATES.

2. Use the PROJECT CONTEXT only when it helps explain the updates.
Do not summarize the project unless the updates require that context.

3. Use the selected PERSPECTIVE consistently throughout the content.

4. Use the selected TONE consistently throughout the content.

5. Follow the style expected for the selected PLATFORM.

6. Avoid repeating hooks, phrases, wording, themes, openings, or conclusions from PREVIOUS GENERATED CONTENT.

7. Do not invent features, achievements, metrics, users, revenue, customers, outcomes, challenges, lessons, decisions, or results that are not explicitly mentioned.

8. If an update is simple, keep the content simple.

9. Do not expand small updates into long stories.

10. Do not assume motivations or technical decisions unless they are explicitly mentioned.

11. Write like a real builder sharing progress online.

12. Use simple English.

13. Use short and natural sentences.

14. Sound human.

15. Avoid sounding like:
- a marketer
- a startup founder pitching investors
- a consultant
- a blog writer
- an AI assistant

16. Avoid buzzwords completely.

18. Focus on what was actually completed.

19. Be specific.

20. The content should feel like it was written by the builder, not by AI.

21. Do not write like a LinkedIn influencer.

22. Do not use motivational language.

23. Do not add life lessons.

24. Do not add productivity advice.

25. Do not add generic takeaways.

26. Stay close to the updates provided.

27. Prefer sharing recent work completed over explaining how the product works.

28. Prefer concrete actions over descriptions.

29. If the update is small, the content should also be small.

30. Do not turn routine work into a milestone.

31. Focus on facts first, explanations second.

32. Do not repeat the updates verbatim.
Rewrite them naturally while staying faithful to the information provided.
Do not turn the content into a changelog or task list.

33. Format the content for readability.

34. Use short paragraphs separated by blank lines.

35. Most paragraphs should be 1-3 sentences long.

36. Break up dense blocks of text when appropriate.

37. Prioritize readability for social media platforms.

You MUST return the output as a valid JSON object containing exactly 2 natural variations of the content.
Both variations must use the same platform, tone, perspective, and length.
Variation 1 should be more direct and straightforward.
Variation 2 should use a different structure or angle while staying factual and grounded in the updates.
Additionally, you MUST generate a contentProfile for each variation explaining its blueprint. The contentProfile should contain topics, technologies, hookStyle, structure, contentAngle, writingTone, and detailLevel.
`;
}

function getPlatformInstructions(
    platform: string
) {
    switch (platform) {
        case "LINKEDIN":
            return `
LINKEDIN RULES

- Write like a professional sharing work completed.
- Do not write like a corporate announcement.
- Focus on the work completed.
- Mention lessons or insights only if they are present in the updates.
- Use clear paragraphs.
- Sound authentic and transparent.
- Avoid excessive emojis.
- Avoid clickbait.
`;

        case "TWITTER":
            return `
TWITTER RULES

- Write specifically for X/Twitter.
- Use concise language.
- Start with a strong opening.
- Use spacing naturally.
- Prefer multiple short paragraphs over one large paragraph.
- Make the post easy to scan on mobile devices.

If Content Length is SHORT:
- Keep the post under 280 characters.
- Create a single tweet.

If Content Length is MEDIUM:
- Create a detailed single tweet.
- Stay reasonably concise.

If Content Length is LONG:
- Always generate a single post.
- Never generate a thread.
- Never use tweet numbering.
- Never use 1/, 2/, 3/.
- Never use Thread: or 🧵.
- LONG means a longer single post, not a thread.
`;

        case "REDDIT":
            return `
REDDIT RULES

- Write like a builder sharing progress with a community.
- Tell a brief story: explain the context, the problem, what you tried, and the result.
- Keep it conversational, honest, and problem-focused.
- Do NOT use marketing language, startup buzzwords, or hype.
- Do not add artificial engagement bait.
- Prefer sharing a challenge you faced and how you solved it.
- Format with clear, short paragraphs.
`;

    }
}

function getPerspectiveInstructions(
    perspective: string
) {
    switch (perspective) {
        case "FIRST_PERSON":
            return `
PERSPECTIVE RULES

- Write from a first-person perspective.
- Use words like:
  - I
  - Me
  - My
`;

        case "TEAM":
            return `
PERSPECTIVE RULES

- Write from a team perspective.
- Use words like:
  - We
  - Us
  - Our
`;

        default:
            return "";
    }
}

function getToneInstructions(
    tone: string
) {
    switch (tone) {
        case "PROFESSIONAL":
            return `
TONE RULES

- Use a professional tone.
- Be clear and direct.
`;

        case "CASUAL":
            return `
TONE RULES

- Use a casual and approachable tone.
- Keep the writing conversational.
`;

        case "TECHNICAL":
            return `
TONE RULES

- Use a technical tone.
- Discuss implementation details when present.
- Discuss engineering decisions only if mentioned in the updates.
- Do not invent technical challenges.
`;

        case "STORYTELLING":
            return `
TONE RULES

- Use a storytelling style.
- Create a narrative around the work completed.
- Build a narrative around the completed work.
- Only mention challenges, decisions, or outcomes if they are explicitly present in the updates.
`;

        default:
            return "";
    }
}

function getLengthInstructions(
    contentLength: string
) {
    switch (contentLength) {
        case "SHORT":
            return `
LENGTH RULES

- Generate concise content.
- Remove unnecessary details.
`;

        case "MEDIUM":
            return `
LENGTH RULES

- Generate balanced content.
- Include enough detail to explain progress.
`;

        case "LONG":
            return `
LENGTH RULES

- Generate detailed content.
- Add more detail from the updates.
- Explain completed work more thoroughly.
- Do not invent challenges, decisions, lessons, or outcomes.
`;

        default:
            return "";
    }
}