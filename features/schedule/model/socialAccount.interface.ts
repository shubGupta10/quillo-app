export interface ISocialAccount {
    userId: string;
    provider: string;
    providerUserId: string
    accessToken: string;
    refreshToken?: string;
    expiresAt?: Date;
}