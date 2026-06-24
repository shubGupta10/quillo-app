import mongoose from "mongoose";
import { ISubscription, PlanType } from "./subscriptions.interface";

const subscriptionSchema = new mongoose.Schema<ISubscription>(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        planType: {
            type: String,
            enum: Object.values(PlanType),
            default: PlanType.FREE,
        },
        generationsUsed: {
            type: Number,
            default: 0,
        },
        periodStartDate: {
            type: Date,
            required: true,
        },
        periodEndDate: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

const Subscription =
    mongoose.models.subscription ||
    mongoose.model<ISubscription>("subscription", subscriptionSchema);

export default Subscription;
