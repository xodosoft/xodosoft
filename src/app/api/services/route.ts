import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { ServiceSchema } from "@/lib/validationSchemas";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const id = searchParams.get('id');
        if (id) {
            const service = await prisma.service.findUnique({
                where: { id },
            });

            if (!service) {
                return NextResponse.json({ error: 'Service not found' }, { status: 404 });
            }

            return NextResponse.json(service, { status: 200 });
        }

        const services = await prisma.service.findMany();

        return NextResponse.json(services, { status: 200 });

    } catch (error) {
        console.error("Error fetching services:", error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const parsedData = ServiceSchema.safeParse(body);

        if (!parsedData.success) {

            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { title, description, image, serviceDetails } = parsedData.data;

        const existingService = await prisma.service.findFirst({
            where: { title },
        });

        if (existingService) {
            return NextResponse.json({ error: 'Service with this title already exists' }, { status: 409 });
        }

        await prisma.service.create({
            data: {
                title,
                description,
                serviceDetails,
                image,
            },
        });

        return NextResponse.json({ message: "Service created successfully", status: 201 });

    } catch (error) {
        console.error("Error creating service:", error);
        return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();

        const serviceId = new URL(request.url).searchParams.get("id");

        if (!serviceId) {
            return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
        }

        const existingService = await prisma.service.findUnique({
            where: { id: serviceId },
        });

        if (!existingService) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        const parsedData = ServiceSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { title, description, serviceDetails, image } = parsedData.data;

        const existingTitle = await prisma.service.findFirst({
            where: { title, NOT: { id: serviceId } },
        });

        if (existingTitle) {
            return NextResponse.json({ error: 'A service with the same title already exists' }, { status: 400 });
        }

        await prisma.service.update({
            where: { id: serviceId },
            data: {
                title,
                description,
                serviceDetails,
                image,
            },
        });

        return NextResponse.json({ message: "Service updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating service:", error);
        return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const serviceId = searchParams.get("id");

        if (!serviceId) {
            return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
        }

        const existingService = await prisma.service.findUnique({
            where: { id: serviceId },
        });

        if (!existingService) {
            return NextResponse.json({ error: "Service not found" }, { status: 404 });
        }

        await prisma.service.delete({
            where: { id: serviceId },
        });

        return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting service:", error);
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}