export enum FeedbackCategory {
    GENERAL = "GENERAL",
    BUG = "BUG",
    FEATURE = "FEATURE",
    CONTENT_QUALITY = "CONTENT_QUALITY",
}

export interface IFeedback {
    _id?: string;
    authUserId: string;
    email: string;
    userName?: string;
    category: FeedbackCategory;
    rating: number;
    message: string;
    createdAt?: Date;
}
