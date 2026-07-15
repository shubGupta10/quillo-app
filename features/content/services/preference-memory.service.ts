import Content from "../models/content.model";
import { Platform } from "../models/content.interface";

export async function getPreferenceMemory(projectId: string, platform: Platform) {
    return await Content.find({
        projectId,
        platform,
        contentProfile: { $exists: true }
    })
    .sort({ createdAt: -1 })
    .limit(3)
    .select("content contentProfile title")
    .lean();
}
