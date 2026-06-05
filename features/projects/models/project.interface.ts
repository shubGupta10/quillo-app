import { ObjectId } from "mongoose";

export enum projectStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
}

export interface IProject {
    userId: string,
    name: string;
    status: projectStatus;
    description: string;
    audience: [string];
    industry: [string];
    tags: [string];
    updatedAt: Date;
    createdAt: Date;
}