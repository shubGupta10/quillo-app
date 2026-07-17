import { ObjectId } from "mongoose";

export enum Status {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    SCHEDULED = "SCHEDULED",
    FAILED = "FAILED"
}

export enum Platform {
    LINKEDIN = "LINKEDIN",
    TWITTER = "TWITTER",
    BLOG = "BLOG",
    REDDIT = "REDDIT",
    INSTAGRAM = "INSTAGRAM",
}

export enum Perspective {
    FIRST_PERSON = "FIRST_PERSON",
    TEAM = "TEAM",
}

export enum Tone {
    PROFESSIONAL = "PROFESSIONAL",
    CASUAL = "CASUAL",
    TECHNICAL = "TECHNICAL",
    STORYTELLING = "STORYTELLING",
}

export enum ContentLength {
    SHORT = "SHORT",
    MEDIUM = "MEDIUM",
    LONG = "LONG",
}

export interface IContentProfile {
    topics?: string[];
    technologies?: string[];
    hookStyle?: string;
    structure?: string;
    contentAngle?: string;
    writingTone?: string;
    detailLevel?: string;
}

export interface IContent {
    projectId: ObjectId;
    sourceUpdates: ObjectId[];
    platform: Platform;
    perspective: Perspective;
    tone: Tone;
    contentLength: ContentLength;
    title?: string;
    content: string;
    contentProfile?: IContentProfile;
    embedding?: number[]
    attachment?: {
        url: string;
        type: string;
        fileName: string;
        size: number;
    }[];
    status: Status;
    providerPostId?: string
    errorDetails: string;
    scheduledFor?: Date;
    publishedAt?: Date
    updatedAt: Date;
    createdAt: Date;
}