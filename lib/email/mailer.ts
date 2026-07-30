import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS || process.env.EMAIL_KEY,
    },
});

interface SendEmailProps {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
    try {
        const info = await transporter.sendMail({
            from: `"Quillo" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        })

        console.log("Email sent successfully", info);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.log("Error sending email:", error);
        return { success: false, error };
    }
}

export interface InformAdminProps {
    subject: string;
    html: string;
}

export async function InformAdmin({ subject, html }: InformAdminProps) {
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL!
    if (!adminEmail) {
        return {
            success: false,
            error: "Admin email is not configured"
        }
    }

    try {
        await sendEmail({
            to: adminEmail,
            subject: subject,
            html: html
        })
    } catch (error) {
        console.error("informAdmin: Failed to send notification email to admin:", error);
        return { success: false, error };
    }
}