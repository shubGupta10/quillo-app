import { connectDB } from "@/lib/db";
import Subscription from "../model/subscriptions.model";
import { PlanType } from "../model/subscriptions.interface";
import { PLAN_LIMITS, PLAN_PERIOD_DAYS } from "../constants/plans";
import Project from "@/features/projects/models/project.model";
import { USAGE_QUOTAS } from "@/lib/constants/limits";
import DailyUpdate from "@/features/daily-updates/models/dailyUpdate.model";


/**
 * Fetch or create a subscription record for the given user.
 * Automatically rolls the billing period forward if it has expired.
 */
export async function getOrCreateSubscription(userId: string) {
    await connectDB();

    let subscription = await Subscription.findOne({ userId });

    const now = new Date();

    if (!subscription) {
        const periodStartDate = now;
        const periodEndDate = new Date(now);
        periodEndDate.setDate(periodEndDate.getDate() + PLAN_PERIOD_DAYS);

        subscription = await Subscription.create({
            userId,
            planType: PlanType.FREE,
            generationsUsed: 0,
            periodStartDate,
            periodEndDate,
        });
    } else if (now > subscription.periodEndDate) {
        const newStart = new Date(subscription.periodEndDate);
        const newEnd = new Date(newStart);
        newEnd.setDate(newEnd.getDate() + PLAN_PERIOD_DAYS);

        subscription = await Subscription.findOneAndUpdate(
            { userId },
            {
                generationsUsed: 0,
                periodStartDate: newStart,
                periodEndDate: newEnd,
            },
            { new: true }
        );
    }

    return subscription!;
}

/**
 * Check whether a user is allowed to generate content.
 * Returns full quota details so the UI can display accurate usage.
 */
export async function checkGenerationLimit(userId: string): Promise<{
    allowed: boolean;
    used: number;
    limit: number;
    resetDate: Date;
    planType: PlanType;
}> {
    const subscription = await getOrCreateSubscription(userId);
    const limit = PLAN_LIMITS[subscription.planType as PlanType];

    return {
        allowed: subscription.generationsUsed < limit,
        used: subscription.generationsUsed,
        limit,
        resetDate: subscription.periodEndDate,
        planType: subscription.planType as PlanType,
    };
}

/**
 * Atomically increment the generation counter.
 * Call this ONLY after a successful Gemini response.
 */
export async function incrementGenerationUsage(userId: string) {
    await connectDB();
    await Subscription.updateOne(
        { userId },
        { $inc: { generationsUsed: 1 } }
    );
}

export async function checkProjectLimit(userId: string): Promise<{ allowed: boolean; limit: number; current: number }> {
    const subscription = await getOrCreateSubscription(userId);
    const limit = USAGE_QUOTAS.PROJECTS_PER_USER[subscription.planType as PlanType] || 0;

    await connectDB();
    const current = await Project.countDocuments({ userId });

    return {
        allowed: current < limit,
        limit,
        current
    };
}

export async function checkDailyUpdateLimit(userId: string): Promise<{ allowed: boolean; limit: number; current: number }> {
    const subscription = await getOrCreateSubscription(userId);
    const limit = USAGE_QUOTAS.DAILY_UPDATES_PER_USER[subscription.planType as PlanType] || 0;

    await connectDB();

    const userProjects = await Project.find({ userId }, '_id');
    const projectIds = userProjects.map(p => p._id);

    // Check updates created today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const current = await DailyUpdate.countDocuments({
        projectId: { $in: projectIds },
        createdAt: { $gte: today }
    });

    return {
        allowed: current < limit,
        limit,
        current
    };
}
