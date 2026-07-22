import mongoose from "mongoose";
import { IAuth, plan, status } from "./auth.interface";

const authSchema = new mongoose.Schema<IAuth>({
    authUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'authUsers'
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    onboardingCompeleted: {
        type: Boolean,
        default: false
    },
    subscription: {
        plan: {
            type: String,
            enum: Object.values(plan),
            default: 'FREE'
        },
        status: {
            type: String,
            enum: Object.values(status),
            default: 'ACTIVE'
        },
        credits: {
            type: Number,
            default: 0
        }
    },
    streak: {
        currentStreak: {
            type: Number,
            default: 0,
        },
        longestStreak: {
            type: Number,
            default: 0,
        },
        lastUpdateDate: {
            type: Date,
        }
    },
    preferences: {
        defaultPlatform: { type: String, default: null },
        defaultPerspective: { type: String, default: null },
        defaultTone: { type: String, default: null },
        defaultLength: { type: String, default: null },
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Auth = mongoose.models.auth || mongoose.model('auth', authSchema);

export default Auth;