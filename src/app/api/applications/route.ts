import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { ApplicationSchema } from '@/lib/validationSchemas';
import cloudinary from '@/lib/cloudinary';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const jobId = searchParams.get("jobId");

        let applications;

        if (id) {
            applications = await prisma.application.findUnique({
                where: { id },
            });

            if (!applications) {
                return NextResponse.json({ error: "Application not found" }, { status: 404 });
            }
        } else if (jobId) {
            applications = await prisma.application.findMany({
                where: { jobId: jobId === "null" ? null : jobId },
            });
        } else {
            applications = await prisma.application.findMany();
        }

        return NextResponse.json(applications, { status: 200 });
    } catch (error) {
        console.error("Error fetching applications:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get("id") || undefined;

        const data = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            coverLetter: formData.get('coverLetter') as string,
            resume: formData.get('resume') as File,
        };

        const parsedData = ApplicationSchema.safeParse(data);

        if (!parsedData.success) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const resumeFile = data.resume as File;
        const arrayBuffer = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'auto', folder: 'resumes' },
                (error, result) => (error ? reject(error) : resolve(result))
            ).end(buffer);
        });

        const resumeUrl = (uploadResult as { secure_url: string }).secure_url;

        await prisma.application.create({
            data: {
                jobId,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                resume: resumeUrl,
                coverLetter: data.coverLetter,
            },
        });

        return NextResponse.json({ message: "Your application has been submitted successfully", status: 201 });

    } catch (error) {
        console.error("Error posting application:", error);
        return NextResponse.json({ error: 'Failed to apply for the job' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const applicationId = searchParams.get("id");

        if (!applicationId) {
            return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
        }

        const existingApplication = await prisma.application.findUnique({
            where: { id: applicationId },
        });

        if (!existingApplication) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        const resumeUrl = existingApplication.resume;

        if (!resumeUrl) {
            return NextResponse.json({ error: "No resume found for this application" }, { status: 400 });
        }

        const publicIdMatch = resumeUrl.match(/\/resumes\/([^/.]+)\./);
        const publicId = publicIdMatch ? `resumes/${publicIdMatch[1]}` : null;

        if (!publicId) {
            return NextResponse.json({ error: "Invalid Cloudinary URL" }, { status: 400 });
        }

        const result = await cloudinary.uploader.destroy(publicId);

        if (result.result !== "ok") {
            return NextResponse.json({ error: "Failed to delete file from Cloudinary" }, { status: 500 });
        }

        await prisma.application.delete({
            where: { id: applicationId },
        });

        return NextResponse.json({ message: "Application deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting application:", error);
        return NextResponse.json({ error: "Failed to delete Application" }, { status: 500 });
    }
}