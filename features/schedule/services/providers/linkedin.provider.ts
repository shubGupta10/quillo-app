import { cookies } from "next/headers";
import { ISocialPublisher } from "../publisher.interface";
import SocialAccount from "../../model/socialAccount.model";
import { decrypt, encrypt } from "@/lib/encryption";
import Content from "@/features/content/models/content.model";
import { Status } from "@/features/content/models/content.interface";

export const getLinkedinPublisher = (): ISocialPublisher => {
    const clientId = process.env.LINKEDIN_CLIENT_ID!;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET!

    const callbackUrl = process.env.NEXT_PUBLIC_APP_URL
        ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/linkedin`
        : "http://localhost:3000/api/auth/callback/linkedin";


    return {
        getAuthUrl: async (userId: string) => {
            const state = Math.random().toString(36).substring(7);

            const scope = encodeURIComponent("openid profile w_member_social");

            const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${callbackUrl}&state=${state}&scope=${scope}`;

            const cookieStore = await cookies();
            cookieStore.set("linkedin_oauth_state", state, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 10,
                path: "/"
            });

            return authUrl;
        },

        exchangeCode: async (code: string, userId: string) => {
            const cookieStore = await cookies();
            const stateCookie = cookieStore.get("linkedin_oauth_state")?.value;

            if (!stateCookie) {
                console.error("Missing state cookie");
                return false;
            }

            try {
                const tokenResponse = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded",
                    },
                    body: new URLSearchParams({
                        grant_type: "authorization_code",
                        code: code,
                        client_id: clientId,
                        client_secret: clientSecret,
                        redirect_uri: callbackUrl,
                    }),
                });

                if (!tokenResponse.ok) {
                    const errorDetails = await tokenResponse.text();
                    console.error("LinkedIn token fetch failed:", errorDetails);
                    return false;
                }

                const tokenData = await tokenResponse.json();
                const accessToken = tokenData.access_token;
                const expiresIn = tokenData.expires_in;

                const profileResponse = await fetch("https://api.linkedin.com/v2/userinfo", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!profileResponse.ok) {
                    throw new Error("Failed to fetch LinkedIn profile");
                }

                const profileData = await profileResponse.json();

                const providerUserId = profileData.sub;

                cookieStore.delete("linkedin_oauth_state");

                await SocialAccount.findOneAndUpdate(
                    { userId, provider: "LINKEDIN" },
                    {
                        providerUserId: providerUserId,
                        accessToken: encrypt(accessToken),
                        expiresAt: new Date(Date.now() + (expiresIn * 1000))
                    },
                    { upsert: true, new: true })
                return true;
            } catch (error) {
                console.error("Failed to exchange LinkedIn code:", error);
                return false;
            }
        },

        publish: async (contentId: string, userId: string) => {
            try {
                const account = await SocialAccount.findOne({ userId, provider: "LINKEDIN" });
                if (!account || !account.accessToken || !account.providerUserId) {
                    throw new Error("LinkedIn account not connected or missing tokens");
                }

                const content = await Content.findById(contentId);
                if (!content) {
                    throw new Error("Content not found");
                }

                const decryptedAccess = decrypt(account.accessToken);

                console.log(`Publishing content ${contentId} to LinkedIn...`);
                const personUrn = `urn:li:person:${account.providerUserId}`;
                let imageUrn = null;

                if (content.attachment && content.attachment.length > 0) {
                    console.log("Image found! Uploading to LinkedIn...");

                    const initRes = await fetch("https://api.linkedin.com/rest/images?action=initializeUpload", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${decryptedAccess}`,
                            "Content-Type": "application/json",
                            "LinkedIn-Version": "202605",
                            "X-Restli-Protocol-Version": "2.0.0"
                        },
                        body: JSON.stringify({
                            initializeUploadRequest: { owner: personUrn }
                        })
                    });

                    if (!initRes.ok) throw new Error("Failed to initialize LinkedIn image upload");
                    const initData = await initRes.json();
                    const uploadUrl = initData.value.uploadUrl;
                    imageUrn = initData.value.image;

                    const imageFetch = await fetch(content.attachment[0].url);
                    const imageBuffer = await imageFetch.arrayBuffer();

                    const uploadRes = await fetch(uploadUrl, {
                        method: "PUT",
                        headers: { "Authorization": `Bearer ${decryptedAccess}` },
                        body: imageBuffer
                    });

                    if (!uploadRes.ok) throw new Error("Failed to upload image file to LinkedIn");
                }

                const payload: any = {
                    author: personUrn,
                    commentary: content.content,
                    visibility: "PUBLIC",
                    distribution: {
                        feedDistribution: "MAIN_FEED",
                        targetEntities: [],
                        thirdPartyDistributionChannels: []
                    },
                    lifecycleState: "PUBLISHED",
                    isReshareDisabledByAuthor: false
                };

                if (imageUrn) {
                    payload.content = {
                        media: { id: imageUrn }
                    };
                }


                const response = await fetch("https://api.linkedin.com/rest/posts", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${decryptedAccess}`,
                        "Content-Type": "application/json",
                        "LinkedIn-Version": "202605",
                        "X-Restli-Protocol-Version": "2.0.0"
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorDetails = await response.text();
                    throw new Error(errorDetails);
                }

                const postId = response.headers.get("x-restli-id") || "LINKEDIN_POST";

                await Content.updateOne(
                    { _id: contentId },
                    {
                        status: Status.PUBLISHED,
                        providerPostId: postId
                    }
                );

                return true;
            } catch (error: any) {
                console.error("LinkedIn Publish Error:", error);

                const errorMsg = error.message || "Failed to publish to LinkedIn";

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

    }
}