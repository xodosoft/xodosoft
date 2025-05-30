import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
    },
});

export const sendEmail = async (from: string, subject: string, html: string) => {
    try {
        await transporter.sendMail({
            from: `"${from}" <${from}>`,
            to: process.env.ADMIN_EMAIL,
            subject,
            html,
        });
        return { success: true, message: "Form submitted successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
    }
};
