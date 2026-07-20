import { unstable_cache } from "next/cache";
import Project from "../models/project.model";

export const getCachedProjects = unstable_cache(
    async (userId: string) => {
        const projects = await Project.aggregate([
            { $match: { userId: userId } },
            { $sort: { updatedAt: -1 } },
            {
                $lookup: {
                    from: 'dailyupdates',
                    localField: '_id',
                    foreignField: 'projectId',
                    as: 'updates'
                }
            },
            {
                $lookup: {
                    from: 'contents',
                    localField: '_id',
                    foreignField: 'projectId',
                    as: 'content'
                }
            },
            {
                $addFields: {
                    updatesCount: { $size: "$updates" },
                    contentCount: { $size: "$content" }
                }
            },
            {
                $project: { updates: 0, content: 0 }
            }
        ]);
        return projects;
    },
    ["all-projects"],
    {
        tags: ["projects"],
        revalidate: 3600
    }
);

export const getCachedProjectById = unstable_cache(
    async (projectId: string, userId: string) => {
        const project = await Project.findOne({
            _id: projectId,
            userId: userId
        }).lean();
        return project;
    },
    ["single-project"],
    {
        tags: ["projects"],
        revalidate: 3600
    }
);
