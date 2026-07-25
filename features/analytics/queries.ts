"use server";

import { connectDB } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Auth from "@/features/auth/model/auth.model";
import Feedback, { FeedbackCategory } from "@/features/feedback/models/feedback.model";

export interface ActivityFeedItem {
    type: "USER_JOINED" | "PROJECT_CREATED" | "DAILY_UPDATE_LOGGED" | "CONTENT_GENERATED";
    title: string;
    description: string;
    timestamp: Date;
}

export interface AnalyticsUserItem {
    id: string;
    fullName: string;
    email: string;
    image: string;
    joinedAt: Date;
    lastSeenAt: Date | null;
    status: "ACTIVE" | "INACTIVE";
}

export interface AnalyticsFeedbackItem {
    id: string;
    email: string;
    userName: string;
    category: FeedbackCategory;
    rating: number;
    message: string;
    createdAt: Date;
}

export interface AnalyticsData {
    metrics: {
        totalUsers: number;
        activeUsers: number;
        inactiveUsers: number;
    };
    users: AnalyticsUserItem[];
    activityFeed: ActivityFeedItem[];
    feedbacks: AnalyticsFeedbackItem[];
    feedbackStats: {
        totalFeedbacks: number;
        averageRating: number;
    };
}

export async function getAnalytics() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" };
        }

        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        if (adminEmail && session.user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
            return { success: false, error: "Unauthorized: Admin access required." };
        }

        await connectDB();

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const [result] = await Auth.aggregate([
            {
                $facet: {
                    // Metric 1: Total Users Count
                    totalUsers: [{ $count: "count" }],

                    // Metric 2: Active Users Count (last 30 days)
                    activeUsers: [
                        {
                            $match: {
                                $or: [
                                    { lastSeenAt: { $gte: thirtyDaysAgo } },
                                    { createdAt: { $gte: thirtyDaysAgo } },
                                ],
                            },
                        },
                        { $count: "count" },
                    ],

                    // Metric 3: Users List with Status
                    usersList: [
                        { $sort: { createdAt: -1 } },
                        {
                            $project: {
                                _id: 1,
                                fullName: 1,
                                email: 1,
                                image: 1,
                                createdAt: 1,
                                lastSeenAt: 1,
                                status: {
                                    $cond: {
                                        if: {
                                            $or: [
                                                { $gte: ["$lastSeenAt", thirtyDaysAgo] },
                                                { $gte: ["$createdAt", thirtyDaysAgo] },
                                            ],
                                        },
                                        then: "ACTIVE",
                                        else: "INACTIVE",
                                    },
                                },
                            },
                        },
                    ],

                    // Metric 4: Combined Live Activity Feed using $unionWith
                    activityFeed: [
                        { $sort: { createdAt: -1 } },
                        { $limit: 10 },
                        {
                            $project: {
                                type: "USER_JOINED",
                                title: "New User Joined",
                                description: { $concat: ["$fullName", " signed up for Quillo"] },
                                timestamp: "$createdAt",
                            },
                        },
                        // Union 1: Projects
                        {
                            $unionWith: {
                                coll: "projects",
                                pipeline: [
                                    { $sort: { createdAt: -1 } },
                                    { $limit: 10 },
                                    {
                                        $project: {
                                            type: "PROJECT_CREATED",
                                            title: "Project Created",
                                            description: {
                                                $concat: ['New project "', "$name", '" created'],
                                            },
                                            timestamp: "$createdAt",
                                        },
                                    },
                                ],
                            },
                        },
                        // Union 2: Daily Updates
                        {
                            $unionWith: {
                                coll: "dailyupdates",
                                pipeline: [
                                    { $sort: { createdAt: -1 } },
                                    { $limit: 10 },
                                    {
                                        $lookup: {
                                            from: "projects",
                                            localField: "projectId",
                                            foreignField: "_id",
                                            as: "project",
                                        },
                                    },
                                    {
                                        $project: {
                                            type: "DAILY_UPDATE_LOGGED",
                                            title: "Daily Update Logged",
                                            description: {
                                                $concat: [
                                                    'Daily update logged in "',
                                                    { $ifNull: [{ $arrayElemAt: ["$project.name", 0] }, "Project"] },
                                                    '"',
                                                ],
                                            },
                                            timestamp: "$createdAt",
                                        },
                                    },
                                ],
                            },
                        },
                        // Union 3: Generated Content
                        {
                            $unionWith: {
                                coll: "contents",
                                pipeline: [
                                    { $sort: { createdAt: -1 } },
                                    { $limit: 10 },
                                    {
                                        $lookup: {
                                            from: "projects",
                                            localField: "projectId",
                                            foreignField: "_id",
                                            as: "project",
                                        },
                                    },
                                    {
                                        $project: {
                                            type: "CONTENT_GENERATED",
                                            title: "Content Generated",
                                            description: {
                                                $concat: [
                                                    "$platform",
                                                    ' post generated in "',
                                                    { $ifNull: [{ $arrayElemAt: ["$project.name", 0] }, "Project"] },
                                                    '"',
                                                ],
                                            },
                                            timestamp: "$createdAt",
                                        },
                                    },
                                ],
                            },
                        },
                        // Sort combined activity stream by timestamp
                        { $sort: { timestamp: -1 } },
                        { $limit: 15 },
                    ],
                },
            },
        ]);

        const totalUsers = result?.totalUsers[0]?.count || 0;
        const activeUsers = result?.activeUsers[0]?.count || 0;
        const inactiveUsers = Math.max(0, totalUsers - activeUsers);

        const formattedUsers: AnalyticsUserItem[] = (result?.usersList || []).map(
            (u: any) => ({
                id: u._id?.toString() || "",
                fullName: u.fullName || "User",
                email: u.email,
                image: u.image || "",
                joinedAt: u.createdAt,
                lastSeenAt: u.lastSeenAt || null,
                status: u.status as "ACTIVE" | "INACTIVE",
            })
        );

        const formattedFeed: ActivityFeedItem[] = (result?.activityFeed || []).map(
            (item: any) => ({
                type: item.type,
                title: item.title,
                description: item.description,
                timestamp: item.timestamp,
            })
        );

        const rawFeedbacks = await Feedback.find({}).sort({ createdAt: -1 }).lean();

        const formattedFeedbacks: AnalyticsFeedbackItem[] = rawFeedbacks.map((fb: any) => ({
            id: fb._id?.toString() || "",
            email: fb.email,
            userName: fb.userName || "User",
            category: fb.category as FeedbackCategory,
            rating: fb.rating,
            message: fb.message,
            createdAt: fb.createdAt,
        }));

        const totalFeedbacks = formattedFeedbacks.length;
        const totalRatingSum = formattedFeedbacks.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = totalFeedbacks > 0 ? Number((totalRatingSum / totalFeedbacks).toFixed(1)) : 0;

        const rawData: AnalyticsData = {
            metrics: {
                totalUsers,
                activeUsers,
                inactiveUsers,
            },
            users: formattedUsers,
            activityFeed: formattedFeed,
            feedbacks: formattedFeedbacks,
            feedbackStats: {
                totalFeedbacks,
                averageRating,
            },
        };

        return {
            success: true,
            data: JSON.parse(JSON.stringify(rawData)),
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Failed to fetch analytics",
        };
    }
}
