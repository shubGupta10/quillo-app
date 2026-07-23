import Auth from "@/features/auth/model/auth.model";
import { connectDB } from "../db";
import { redis } from "../redis";

export async function ModifyLastSeen(userId: string) {
    if (!userId) {
        return;
    }

    try {
        const rediskey = `user:lastseen:${userId}`;

        const exists = await redis.get(rediskey);
        if (exists) {
            return;
        }

        await redis.set(rediskey, "1", { ex: 300 });

        await connectDB();
        await Auth.updateOne(
            { authUserId: userId },
            { $set: { lastSeenAt: new Date() } },
            { upsert: true }
        );
    } catch (error) {
        console.error("Failed to update lastSeenAt:", error);
    }
}