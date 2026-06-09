export interface ISocialPublisher {
    getAuthUrl(userId: string): Promise<string>;

    exchangeCode(code: string, userId: string): Promise<boolean>

    publish(contentId: string, userId: string): Promise<boolean>;
}