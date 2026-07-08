import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
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
            from: `"Quillo" <${process.env.SMTP_FROM_EMAIL}>`,
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