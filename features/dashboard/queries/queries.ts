import { unstable_cache } from "next/cache";
import Project from "@/features/projects/models/project.model";
import Auth from "@/features/auth/model/auth.model";
import DailyUpdate from "@/features/daily-updates/models/dailyUpdate.model";
import { calculateStreak } from "@/lib/streak-engine";

export const getCachedDashboardData = unstable_cache(
    async (userId: string) => {
        const [projects, authUser] = await Promise.all([
            Project.aggregate([
                {
                    $match: {
                        userId: userId
                    }
                },
                {
                    $lookup: {
                        from: "dailyupdates",
                        localField: "_id",
                        foreignField: "projectId",
                        as: "updates"
                    }
                },
                {
                    $lookup: {
                        from: "contents",
                        localField: "_id",
                        foreignField: "projectId",
                        as: "contents"
                    }
                },
                {
                    $facet: {
                        stats: [
                            {
                                $group: {
                                    _id: null,
                                    totalProjects: { $sum: 1 },
                                    totalUpdates: { $sum: { $size: "$updates" } },
                                    totalContent: { $sum: { $size: "$contents" } }
                                }
                            }
                        ],

                        recentProjects: [
                            {
                                $sort: { createdAt: -1 },
                            },
                            {
                                $limit: 3
                            },
                            {
                                $project: {
                                    name: 1,
                                    createdAt: 1,
                                    updatedAt: 1,
                                    updatesCount: { $size: "$updates" },
                                    contentCount: { $size: "$contents" }
                                }
                            }
                        ],

                        recentUpdates: [
                            { $unwind: "$updates" },
                            {
                                $sort: {
                                    "updates.createdAt": -1
                                }
                            },
                            { $limit: 5 },
                            {
                                $project: {
                                    _id: "$updates._id",
                                    createdAt: "$updates.createdAt",
                                    projectId: {
                                        _id: "$_id",
                                        name: "$name"
                                    }
                                }
                            }
                        ],


                        recentContent: [
                            { $unwind: "$contents" },
                            { $sort: { "contents.createdAt": -1 } },
                            { $limit: 5 },
                            {
                                $project: {
                                    _id: "$contents._id",
                                    title: "$contents.title",
                                    platform: "$contents.platform",
                                    status: "$contents.status",
                                    createdAt: "$contents.createdAt",
                                    projectId: { _id: "$_id", name: "$name" }
                                }
                            }
                        ],

                        upcomingScheduleContent: [
                            { $unwind: "$contents" },
                            { $match: { "contents.status": "SCHEDULED" } },
                            { $sort: { "contents.scheduledFor": 1 } },
                            { $limit: 5 },
                            {
                                $project: {
                                    _id: "$contents._id",
                                    title: "$contents.title",
                                    platform: "$contents.platform",
                                    status: "$contents.status",
                                    scheduledAt: "$contents.scheduledFor",
                                    projectId: { _id: "$_id", name: "$name" }
                                }
                            }
                        ]
                    }
                }
            ]),
            Auth.findOne({ authUserId: userId }).lean()
        ]);

        const userProjects = await Project.find({ userId }).select("_id").lean();
        const projectIds = userProjects.map((p: any) => p._id);
        const allUpdates = await DailyUpdate.find({ projectId: { $in: projectIds } }).select("createdAt").lean();
        const updateDates = allUpdates.map((u: any) => u.createdAt);
        const computedStreak = calculateStreak(updateDates);

        const dashboardData = projects[0] || { stats: [], recentProjects: [], recentUpdates: [], recentContent: [] };

        return {
            ...dashboardData,
            streak: {
                currentStreak: computedStreak.currentStreak,
                longestStreak: Math.max(computedStreak.longestStreak, authUser?.streak?.longestStreak || 0),
                lastUpdateDate: computedStreak.lastUpdateDate || authUser?.streak?.lastUpdateDate
            }
        };
    },
    ["dashboard-data"],
    {
        tags: ["dashboard"],
        revalidate: 3600
    }
);
