import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { client } from "./mongodb-client"
import { sendEmail } from "./email/mailer";
import { getWelcomeEmailHtml } from "./email/templates";

const db = client.db();

export const auth = betterAuth({

    //core settup
    appName: "Quillo",
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,

    database: mongodbAdapter(db, { client }),

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
                    await sendEmail({
                        to: user.email as string,
                        subject: "Welcome to Quillo!",
                        html: getWelcomeEmailHtml(user.name as string)
                    })
                }
            }
        }
    }
});