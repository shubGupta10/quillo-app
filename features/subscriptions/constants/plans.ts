import { PlanType } from "../model/subscriptions.interface";

export const PLAN_LIMITS: Record<PlanType, number> = {
    [PlanType.FREE]: 20,
    [PlanType.BETA_PRO]: 100,
    [PlanType.ADMIN]: Number.MAX_SAFE_INTEGER, // Unlimited — but usage is still tracked
};

export const PLAN_PERIOD_DAYS = 30;
