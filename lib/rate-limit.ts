import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const aiRateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 d"),
    analytics: true
})