import { Platform } from "@/features/content/models/content.interface";
import { ISocialPublisher } from "./publisher.interface";
import { getTwitterPublisher } from "./providers/twitter.provider";
import { getLinkedinPublisher } from "./providers/linkedin.provider";

export const getPublisher = (platform: Platform): ISocialPublisher => {
    switch (platform) {
        case Platform.TWITTER:
            return getTwitterPublisher();
        case Platform.LINKEDIN:
            return getLinkedinPublisher();
        default:
            throw new Error(`Unsupported platform: ${platform}`);
            ``
    }
}