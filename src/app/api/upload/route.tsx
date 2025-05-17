import path from "path";
import { writeFile, unlink } from "fs/promises";
import { UploadSchema } from "@/lib/validationSchemas";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";


interface CloudinaryResource {
    secure_url: string;
    public_id: string;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const files = formData.getAll("images");

        const data = {
            images: files,
        };


        const parsed = UploadSchema.safeParse(data);
        if (!parsed.success) {
            return NextResponse.json({ message: "Invalid request." }, { status: 400 });
        }

        const uploadedResults = [];

        for (const file of files) {
            if (!(file instanceof File)) continue;

            // Create unique filename
            const ext = path.extname(file.name);
            const uniqueName = `${uuidv4()}${ext}`;
            const localPath = path.join("/tmp", uniqueName);
            // const localPath = path.join(process.cwd(), "public/uploads", uniqueName);

            // Save locally
            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(localPath, buffer);

            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(localPath, {
                folder: "images",
                resource_type: "auto",
                use_filename: true,
                unique_filename: false,
            });


            await unlink(localPath);

            uploadedResults.push({
                secure_url: result.secure_url,
                public_id: result.public_id,
            });
        }

        return NextResponse.json({ message: "Upload successful.", images: uploadedResults }, { status: 200 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ message: "Upload failed." }, { status: 500 });
    }
}


export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const nextCursor = searchParams.get("cursor") || undefined

    try {
        const result = await cloudinary.api.resources({
            resource_type: "image",
            type: "upload",
            prefix: "images/",
            max_results: 10,
            next_cursor: nextCursor,
        })

        const images = result.resources.map((resource: CloudinaryResource) => ({
            secure_url: resource.secure_url,
            public_id: resource.public_id,
        }))

        return NextResponse.json({
            images,
            nextCursor: result.next_cursor || null,
        }, { status: 200 })

    } catch (error) {
        console.error("Failed to fetch images:", error)
        return NextResponse.json({ message: "Failed to fetch images." }, { status: 500 })
    }
}