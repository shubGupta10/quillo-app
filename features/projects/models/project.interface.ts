import { ObjectId } from "mongoose";

export enum projectStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export interface IProjectOnboarding {
    loggedUpdate: boolean;
    generatedContent: boolean;
    savedContent: boolean;
}

export interface IProject {
    userId: string,
    name: string;
    status: projectStatus;
    description: string;
    audience: [string];
    industry: [string];
    tags: [string];
    onboarding?: IProjectOnboarding;
    updatedAt: Date;
    createdAt: Date;
}