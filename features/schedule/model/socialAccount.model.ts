import mongoose from "mongoose";
import { ISocialAccount } from "./socialAccount.interface";

export const socialAccountSchema = new mongoose.Schema<ISocialAccount>({
    userId: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    providerUserId: {
        type: String,
        required: true
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    },
    expiresAt: {
        type: Date,
    }
})

const SocialAccount = mongoose.models.socialAccount || mongoose.model('socialAccount', socialAccountSchema);

export default SocialAccount