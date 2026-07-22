import { cookies } from "next/headers";
import { ISocialPublisher } from "../publisher.interface";
import { TwitterApi } from "twitter-api-v2"
import SocialAccount from "../../model/socialAccount.model";
import Content from "@/features/content/models/content.model";
import { Status } from "@/features/content/models/content.interface";
import { encrypt, decrypt } from "@/lib/encryption";

export const getTwitterPublisher = (): ISocialPublisher => {
    const client = new TwitterApi({
        clientId: process.env.TWITTER_CLIENT_ID!,
        clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    })

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
    const callbackUrl = `${baseUrl}/api/auth/callback/twitter`;


    return {
        getAuthUrl: async (userId: string) => {

            const { url, codeVerifier, state } = client.generateOAuth2AuthLink(
                callbackUrl,
                { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
            );

            const cookieStore = await cookies();
            cookieStore.set("twitter_oauth_verifier", codeVerifier, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 10,
                path: "/"
            });
            return url;
        },

        exchangeCode: async (code: string, userId: string) => {
            const cookieStore = await cookies();
            const codeVerifier = cookieStore.get("twitter_oauth_verifier")?.value;

            if (!codeVerifier) {
                console.error("Missing codeVerifier from cookies");
                return false;
            }

            try {
                const { accessToken, refreshToken, expiresIn } = await client.loginWithOAuth2({
                    code,
                    codeVerifier,
                    redirectUri: callbackUrl
                })

                cookieStore.delete("twitter_oauth_verifier");

                await SocialAccount.findOneAndUpdate(
                    { userId, provider: "TWITTER" },
                    {
                        accessToken: encrypt(accessToken),
                        refreshToken: refreshToken ? encrypt(refreshToken) : undefined,
                        expiresAt: new Date(Date.now() + (expiresIn * 1000))
                    },
                    { upsert: true, new: true }
                )

                return true;
            } catch (error) {
                console.error("Failed to exchange Twitter code:", error);
                return false;
            }
        },

        publish: async (contentId: string, userId: string) => {
            try {
                const account = await SocialAccount.findOne({ userId, provider: "TWITTER" });
                if (!account || !account.accessToken || !account.refreshToken) {
                    throw new Error("X account not connected or missing tokens");
                }

                const content = await Content.findById(contentId);
                if (!content) {
                    throw new Error("Content not found");
                }

                // Decrypt the securely stored tokens in memory
                const decryptedAccess = decrypt(account.accessToken);
                const decryptedRefresh = decrypt(account.refreshToken);

                let activeClient = new TwitterApi(decryptedAccess);

                if (new Date(account.expiresAt).getTime() < Date.now() + (5 * 60 * 1000)) {
                    console.log(`Refreshing X token for user ${userId}...`);
                    const { client: refreshedClient, accessToken: newAccess, refreshToken: newRefresh, expiresIn } = await client.refreshOAuth2Token(decryptedRefresh);
                    activeClient = refreshedClient;

                    await SocialAccount.updateOne(
                        { _id: account._id },
                        {
                            accessToken: encrypt(newAccess),
                            refreshToken: newRefresh ? encrypt(newRefresh) : undefined,
                            expiresAt: new Date(Date.now() + (expiresIn * 1000))
                        }
                    );
                }

                console.log(`Publishing content ${contentId} to X...`);
                const response = await activeClient.v2.tweet(content.content);

                await Content.updateOne(
                    { _id: contentId },
                    {
                        status: Status.PUBLISHED,
                        providerPostId: response.data.id
                    }
                );

                return true;
            } catch (error: any) {
                console.error("X Publish Error:", error);

                const errorMsg = error.data?.detail || error.message || "Failed to publish to X";

                await Content.updateOne(
                    { _id: contentId },
                    {
                        status: Status.FAILED,
                        errorDetails: errorMsg
                    }
                );

                throw new Error(errorMsg);
            }
        }
    };
};
