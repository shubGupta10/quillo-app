import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { client } from "./mongodb-client"
import { sendEmail } from "./email/mailer";
import { getWelcomeEmailHtml } from "./email/templates";
import { connectDB } from "./db";
import Auth from "@/features/auth/model/auth.model";

const db = client.db();

export const auth = betterAuth({

    appName: "Quillo",
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,

    database: mongodbAdapter(db),

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        },
    },

    databaseHooks: {
        user: {
            create: {
                after: async (user) => {
                    try {
                        await connectDB();
                        await Auth.create({
                            authUserId: user.id,
                            fullName: user.name,
                            email: user.email,
                            image: user.image,
                            createdAt: new Date(),
                            lastSeenAt: new Date(),
                            onboardingCompeleted: false,
                        });

                        await sendEmail({
                            to: user.email as string,
                            subject: "Welcome to Quillo!",
                            html: getWelcomeEmailHtml(user.name as string)
                        });
                    } catch (error) {
                        console.error("Failed to execute user creation hooks:", error);
                    }
                }
            }
        }
    }
});