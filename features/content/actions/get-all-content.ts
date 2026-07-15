"use server"

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import Content from "@/features/content/models/content.model";

export async function getAllContent({ page = 1, limit = 6 }) {
    try {
        await connectDB();

        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session?.user.id) {
            return {
                success: false,
                error: "Unauthorized"
            }
        }

        const skip = (page - 1) * limit as any;

        const aggregationResult = await Content.aggregate([
            {
                $lookup: {
                    from: "projects",
                    localField: "projectId",
                    foreignField: "_id",
                    as: "projectInfo"
                }
            },
            {
                $unwind: "$projectInfo"
            },
            {
                $match: { "projectInfo.userId": session.user.id }
            },
            {
                $facet: {
                    metadata: [{ $count: "total" }],

                    data: [
                        { $sort: { createdAt: -1 } },
                        { $skip: skip },
                        { $limit: limit },
                        {
                            $addFields: {
                                projectId: {
                                    _id: "$projectInfo._id",
                                    name: "$projectInfo.name"
                                }
                            }
                        },
                        {
                            $project: { projectInfo: 0 }
                        }
                    ]
                }
            }
        ])

        const totalContent = aggregationResult[0]?.metadata[0]?.total || 0;
        const contents = aggregationResult[0]?.data || [];

        return {
            success: true,
            data: JSON.parse(JSON.stringify(contents)),
            pagination: {
                total: totalContent,
                pages: Math.ceil(totalContent / limit),
                page,
                limit
            }
        }
    } catch (error) {
        console.error("Error getting all content:", error);
        return {
            success: false,
            error: "Internal server error"
        }
    }
}
