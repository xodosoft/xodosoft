import { CategorySchema } from "@/lib/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                projects: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });

        return NextResponse.json(categories, { status: 200 })
    } catch (error) {
        console.error("Error fetching categories:", error)
        return NextResponse.json({ error: "Failed to load categories" }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsedData = CategorySchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { name } = parsedData.data;


        const existingCategory = await prisma.category.findFirst({
            where: { name },
        });

        if (existingCategory) {
            return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
        }

        await prisma.category.create({
            data: {
                name
            },
        });

        return NextResponse.json({ message: "Category created successfully", status: 201 });

    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();

        const categoryId = new URL(request.url).searchParams.get("id");

        if (!categoryId) {
            return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
        }

        const existingCategory = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!existingCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        const parsedData = CategorySchema.safeParse(body);

        if (!parsedData.success) {
            return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
        }

        const { name } = parsedData.data;

        await prisma.category.update({
            where: { id: categoryId },
            data: {
                name
            },
        });

        return NextResponse.json({ message: "Category updated successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get("id");

        if (!categoryId) {
            return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
        }

        const existingCategory = await prisma.category.findUnique({
            where: { id: categoryId },
            include: { projects: true }
        });

        if (!existingCategory) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        if (existingCategory.projects.length) {
            return NextResponse.json(
                { error: `Category in use (${existingCategory.projects.length} projects)` },
                { status: 400 }
            );
        }

        await prisma.category.delete({
            where: { id: categoryId },
        });

        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}