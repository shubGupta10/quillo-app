export enum PlanType {
    FREE = "FREE",
    BETA_PRO = "BETA_PRO",
    ADMIN = "ADMIN",
}

export interface ISubscription {
    userId: string;
    planType: PlanType;
    generationsUsed: number;
    periodStartDate: Date;
    periodEndDate: Date;
    createdAt: Date;
    updatedAt: Date;
}