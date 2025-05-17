import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { JobSchema } from '@/lib/validationSchemas';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();

        const parsedData = JobSchema.safeParse(body);

        if (!parsedData.success) {

            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { title, description, jobDetails, location, salaryMin, salaryMax, jobType, status } = parsedData.data;

        const existingJob = await prisma.job.findFirst({
            where: { title, location },
        });

        if (existingJob) {
            return NextResponse.json({ error: 'A job with the same title and location already exists' }, { status: 400 });
        }

        await prisma.job.create({
            data: { title, description, location, salaryMin, salaryMax, jobType, status, jobDetails },
        });

        return NextResponse.json({ message: "New job created successfully", status: 201 });

    } catch (error) {
        console.error("Error creating job:", error);
        return NextResponse.json({ error: 'Failed to create job' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const id = searchParams.get('id');
        if (id) {
            const job = await prisma.job.findUnique({
                where: { id },
            });

            if (!job) {
                return NextResponse.json({ error: 'Job not found' }, { status: 404 });
            }

            return NextResponse.json(job, { status: 200 });
        }

        const status = searchParams.get('status');
        let whereCondition = {};
        if (status === 'ACTIVE' || status === 'INACTIVE') {
            whereCondition = { status };
        }

        const jobs = await prisma.job.findMany({ where: whereCondition });

        return NextResponse.json(jobs, { status: 200 });

    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();

        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get("id");

        if (!jobId) {
            return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
        }

        const parsedData = JobSchema.safeParse(body);
        if (!parsedData.success) {

            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { title, description, jobDetails, location, salaryMin, salaryMax, jobType, status } = parsedData.data;

        const existingJob = await prisma.job.findFirst({
            where: {
                title,
                location,
                NOT: { id: jobId },
            },
        });

        if (existingJob) {
            return NextResponse.json({ error: 'A job with the same title and location already exists' }, { status: 400 });
        }

        const updatedJob = await prisma.job.update({
            where: { id: jobId },
            data: { title, description, jobDetails, location, salaryMin, salaryMax, jobType, status },
        });

        return NextResponse.json({ message: "Job has been updated", updatedJob, status: 200 });

    } catch (error) {
        console.error("Error updating job:", error);
        return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get("id");

        if (!jobId) {
            return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
        }

        const existingJob = await prisma.job.findUnique({
            where: { id: jobId },
        });

        if (!existingJob) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        await prisma.job.delete({
            where: { id: jobId },
        });

        return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
    }
}