import { ObjectId } from "mongoose";

export interface IDailyUpdate {
    projectId: ObjectId;
    content: string;
    attachment?: {
        url: string;
        type: string;
        fileName: string;
        size: number;
    }[];
    updatedAt: Date;
    createdAt: Date;
}