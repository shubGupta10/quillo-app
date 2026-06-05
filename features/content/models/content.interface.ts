import { ObjectId } from "mongoose";

export enum Status {
    DRAFT = "DRAFT",
    PUBLISHED = "PUBLISHED",
    SCHEDULED = "SCHEDULED"
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

export interface IContent {
    projectId: ObjectId;
    sourceUpdates: ObjectId[];
    platform: Platform;
    perspective: Perspective;
    tone: Tone;
    contentLength: ContentLength;
    title?: string;
    content: string;
    status: Status;
    scheduledFor?: Date;
    updatedAt: Date;
    createdAt: Date;
}