import { Platform } from "@/features/content/models/content.interface";
import { ISocialPublisher } from "./publisher.interface";
import { getTwitterPublisher } from "./providers/twitter.provider";

export const getPublisher = (platform: Platform): ISocialPublisher => {
    switch (platform) {
        case Platform.TWITTER:
            return getTwitterPublisher();
        case Platform.LINKEDIN:
            throw new Error("LinkedIn publisher is not implemented yet.");
        default:
            throw new Error(`Unsupported platform: ${platform}`);
            ``
    }
}