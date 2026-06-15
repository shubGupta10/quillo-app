import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const aiRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(500, "1 d"),
    analytics: true
})