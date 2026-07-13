import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";
import { INFRA_RATE_LIMITS } from "./constants/limits";

export const aiRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(INFRA_RATE_LIMITS.AI_GENERATION_DAILY_REQUESTS, "1 d"),
    analytics: true
})