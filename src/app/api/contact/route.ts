import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";
import { ContactTemplate } from "@/lib/emailTemplates";
import { ContactSchema } from "@/lib/validationSchemas";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsedData = ContactSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { name, email, subject, message } = parsedData.data;
        const emailContent = await render(ContactTemplate({ name, email, subject, message }));

        await sendEmail(email, "New Contact Form Submission", emailContent);

        return NextResponse.json({ message: "Form submitted successfully", status: 201 });
    } catch (error) {
        console.error("Server Error:", error);
        return NextResponse.json(
            { message: "Something went wrong. Please try again later" },
            { status: 500 }
        );
    }
}
