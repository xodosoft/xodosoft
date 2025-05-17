import { ProjectSchema } from "@/lib/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const categoryId = searchParams.get('categoryId');

        if (id) {
            const project = await prisma.project.findUnique({
                where: { id },
                include: {
                    category: {
                        select: {
                            name: true,
                        },
                    },
                },
            });

            if (!project) {
                return NextResponse.json({ error: 'Project not found' }, { status: 404 });
            }

            return NextResponse.json(project, { status: 200 });
        }

        const projects = await prisma.project.findMany({
            where: categoryId ? { categoryId } : {},
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return NextResponse.json(projects, { status: 200 });

    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsedData = ProjectSchema.safeParse(body);

        if (!parsedData.success) {

            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { title, description, categoryId, image, headerImage, images, projectDetails, optionalImagesOne, optionalImagesTwo, optionalImagesThree, optionalDescriptionOne, optionalDescriptionTwo, optionalDescriptionThree } = parsedData.data;
        const existingProject = await prisma.project.findFirst({
            where: { title },
        });

        if (existingProject) {
            return NextResponse.json({ error: 'A project with the same title already exists' }, { status: 409 });
        }

        await prisma.project.create({
            data: {
                title,
                description,
                image,
                headerImage,
                images,
                projectDetails,
                optionalDescriptionOne: optionalDescriptionOne as string,
                optionalDescriptionTwo: optionalDescriptionTwo as string,
                optionalDescriptionThree: optionalDescriptionThree as string,
                optionalImagesOne,
                optionalImagesTwo,
                optionalImagesThree,
                categoryId
            },
        });

        return NextResponse.json({ message: "Project created successfully", status: 201 });

    } catch (error) {
        console.error("Error creating project:", error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();

        const projectId = new URL(request.url).searchParams.get("id");

        if (!projectId) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        const existingProject = await prisma.project.findUnique({
            where: { id: projectId },
        });

        if (!existingProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        const parsedData = ProjectSchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { title, description, categoryId, image, headerImage, images, projectDetails, optionalImagesOne, optionalImagesTwo, optionalImagesThree, optionalDescriptionOne, optionalDescriptionTwo, optionalDescriptionThree } = parsedData.data;

        const existingProjectWithTitle = await prisma.project.findFirst({
            where: { title, NOT: { id: projectId } },
        });

        if (existingProjectWithTitle) {
            return NextResponse.json({ error: 'A project with the same title already exists' }, { status: 409 });
        }


        await prisma.project.update({
            where: { id: projectId },
            data: {
                title,
                description,
                image,
                headerImage,
                images,
                projectDetails,
                optionalDescriptionOne: optionalDescriptionOne as string,
                optionalDescriptionTwo: optionalDescriptionTwo as string,
                optionalDescriptionThree: optionalDescriptionThree as string,
                optionalImagesOne,
                optionalImagesTwo,
                optionalImagesThree,
                categoryId
            },
        });

        return NextResponse.json({ message: "Project updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating project:", error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const projectId = searchParams.get("id");

        if (!projectId) {
            return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }

        const existingProject = await prisma.project.findUnique({
            where: { id: projectId },
        });

        if (!existingProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        await prisma.project.delete({
            where: { id: projectId },
        });

        return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}