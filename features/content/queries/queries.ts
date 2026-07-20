import { unstable_cache } from "next/cache";
import Content from "../models/content.model";
import Project from "@/features/projects/models/project.model";

export const getCachedAllContent = unstable_cache(
    async (userId: string, page: number, limit: number) => {
        const projects = await Project.find({ userId }).lean();
        const projectIds = projects.map(p => p._id);
        const skip = (page - 1) * limit;

        const [contents, totalContent] = await Promise.all([
            Content.find({ projectId: { $in: projectIds } })
                .populate("projectId", "name")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            Content.countDocuments({ projectId: { $in: projectIds } })
        ]);

        return { contents, totalContent };
    },
    ["all-content"],
    {
        tags: ["contents"],
        revalidate: 3600
    }
);


export const getCachedProjectContent = unstable_cache(
    async (projectId: string) => {
        const contents = await Content.find({ projectId })
            .sort({ createdAt: -1 })
            .lean();
        return contents;
    },
    ['project-content'],
    {
        tags: ['contents'],
        revalidate: 3600
    }
);