import { UploadSchema } from "@/lib/validationSchemas";
import { v4 as uuidv4 } from "uuid";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

interface CloudinaryResource {
    secure_url: string;
    public_id: string;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("images");

        const parsed = UploadSchema.safeParse({ images: files });
        if (!parsed.success) {
            return NextResponse.json({ message: "Invalid request." }, { status: 400 });
        }

        const uploadedResults: CloudinaryResource[] = [];

        for (const file of files) {
            if (!(file instanceof File)) continue;

            const buffer = Buffer.from(await file.arrayBuffer());

            const result = await new Promise<CloudinaryResource>((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            folder: "images",
                            resource_type: "image",
                            public_id: uuidv4(),
                        },
                        (error, res) => {
                            if (error || !res) return reject(error ?? new Error("No response from Cloudinary"));
                            resolve({ secure_url: res.secure_url, public_id: res.public_id });
                        }
                    )
                    .end(buffer);
            });

            uploadedResults.push(result);
        }

        return NextResponse.json(
            { message: "Upload successful.", images: uploadedResults },
            { status: 200 }
        );
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ message: "Upload failed." }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const nextCursor = searchParams.get("cursor") || undefined;

    try {
        const result = await cloudinary.api.resources({
            resource_type: "image",
            type: "upload",
            prefix: "images/",
            max_results: 10,
            next_cursor: nextCursor,
        });

        const images = result.resources.map((resource: CloudinaryResource) => ({
            secure_url: resource.secure_url,
            public_id: resource.public_id,
        }));

        return NextResponse.json(
            { images, nextCursor: result.next_cursor || null },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to fetch images:", error);
        return NextResponse.json({ message: "Failed to fetch images." }, { status: 500 });
    }
}
