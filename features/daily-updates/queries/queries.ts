import { unstable_cache } from "next/cache";
import DailyUpdate from "../models/dailyUpdate.model";
import Project from "@/features/projects/models/project.model";

export const getCachedDailyUpdates = unstable_cache(
    async (projectId: string, page: number, limit: number) => {
        const skip = (page - 1) * limit;

        const [updates, totalUpdates] = await Promise.all([
            DailyUpdate.find({
                projectId,
            }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            DailyUpdate.countDocuments({ projectId })
        ]);

        return { updates, totalUpdates };
    },
    ["daily-updates-list"],
    {
        tags: ["daily-updates"],
        revalidate: 3600
    }
);

export const getCachedDailyUpdateById = unstable_cache(
    async (updateId: string) => {
        const update = await DailyUpdate.findById(updateId).lean();
        return update;
    },
    ["single-daily-update"],
    {
        tags: ["daily-updates"],
        revalidate: 3600
    }
);
