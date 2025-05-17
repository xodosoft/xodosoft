import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/nodemailer";
import { QuoteTemplate } from "@/lib/emailTemplates";
import { QuoteSchema } from "@/lib/validationSchemas";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const parsedDate = new Date(body.date);
        const parsedData = QuoteSchema.safeParse({ ...body, date: parsedDate });

        if (!parsedData.success) {
            console.log(parsedData.error.flatten().fieldErrors);
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { firstName, lastName, email, phone, service, date, subject, message } = parsedData.data;

        const emailContent = await render(
            QuoteTemplate({
                firstName,
                lastName,
                email,
                phone,
                service,
                date: date.toDateString(),
                subject,
                message
            })
        );

        await sendEmail(email, "New Quote Form Submission", emailContent);

        return NextResponse.json({ message: "Form submitted successfully", status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong. Please try again later" }, { status: 500 });
    }
}
