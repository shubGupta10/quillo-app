import { ObjectId } from "mongoose";

export enum plan {
    FREE = 'FREE',
    PRO = 'PRO'
}

export enum status {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export interface IUserPreferences {
    defaultPlatform?: string;
    defaultPerspective?: string;
    defaultTone?: string;
    defaultLength?: string;
}

export interface IAuth {
    authUserId: ObjectId;
    fullName: string;
    email: string;
    image: string;
    onboardingCompeleted: boolean;
    subscription: {
        plan: plan,
        status: status,
        credits: Number;
    },
    streak: {
        currentStreak: Number;
        longestStreak: Number
        lastUpdateDate: Date,
    }
    lastSeenAt?: Date
    preferences?: IUserPreferences;
    updatedAt: Date,
    createdAt: Date,
}