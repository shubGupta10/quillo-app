"use server";

import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { headers } from "next/headers";
import Feedback, { FeedbackCategory } from "../models/feedback.model";

export interface FeedbackItem {
  id: string;
  authUserId: string;
  email: string;
  userName: string;
  category: FeedbackCategory;
  rating: number;
  message: string;
  createdAt: string;
}

export interface FeedbackStats {
  totalFeedbacks: number;
  averageRating: number;
  categoryCounts: Record<string, number>;
}

export async function getFeedbacks() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized. Please sign in." };
    }

    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    if (adminEmail && session.user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
      return { success: false, error: "Unauthorized: Admin access required to view feedbacks." };
    }

    await connectDB();

    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 }).lean();

    const formattedFeedbacks: FeedbackItem[] = feedbacks.map((fb: any) => ({
      id: fb._id.toString(),
      authUserId: fb.authUserId.toString(),
      email: fb.email,
      userName: fb.userName || "User",
      category: fb.category as FeedbackCategory,
      rating: fb.rating,
      message: fb.message,
      createdAt: fb.createdAt ? new Date(fb.createdAt).toISOString() : new Date().toISOString(),
    }));

    const totalFeedbacks = formattedFeedbacks.length;
    const totalRatingSum = formattedFeedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalFeedbacks > 0 ? Number((totalRatingSum / totalFeedbacks).toFixed(1)) : 0;

    const categoryCounts: Record<string, number> = {
      [FeedbackCategory.GENERAL]: 0,
      [FeedbackCategory.BUG]: 0,
      [FeedbackCategory.FEATURE]: 0,
      [FeedbackCategory.CONTENT_QUALITY]: 0,
    };

    formattedFeedbacks.forEach((fb) => {
      if (categoryCounts[fb.category] !== undefined) {
        categoryCounts[fb.category]++;
      }
    });

    return {
      success: true,
      data: {
        feedbacks: formattedFeedbacks,
        stats: {
          totalFeedbacks,
          averageRating,
          categoryCounts,
        },
      },
    };
  } catch (error: any) {
    console.error("Error fetching feedbacks:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch feedbacks",
    };
  }
}
