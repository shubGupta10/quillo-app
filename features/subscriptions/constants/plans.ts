import { PlanType } from "../model/subscriptions.interface";
import { USAGE_QUOTAS } from "@/lib/constants/limits";

export const PLAN_LIMITS: Record<PlanType, number> = USAGE_QUOTAS.AI_GENERATIONS_PER_MONTH;

export const PLAN_PERIOD_DAYS = USAGE_QUOTAS.PLAN_PERIOD_DAYS;
