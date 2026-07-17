import Content from "../models/content.model";
import { Platform } from "../models/content.interface";
import mongoose from "mongoose";

export async function getPreferenceMemory(projectId: string, platform: Platform, searchVector?: number[]) {

    if (searchVector && searchVector.length > 0) {
        const result = await Content.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: searchVector,
                    numCandidates: 100,
                    limit: 3,
                    filter: {
                        projectId: new mongoose.Types.ObjectId(projectId),
                        platform: platform,
                        contentProfile: {
                            $exists: true
                        }
                    }
                }
            },
            {
                $project: {
                    content: 1,
                    contentProfile: 1,
                    title: 1
                }
            }
        ])

        if (result.length > 0) {
            return result;
        }
    }

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
