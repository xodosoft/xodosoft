import CallToAction from "@/components/call-to-action";
import { ImageCarousel } from "@/components/image-carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import Image from "next/image";

export interface Project {
    id: string;
    title: string;
    image: string;
    images: string[];
    projectDetails: string;
    optionalImagesOne: string[];
    optionalImagesTwo: string[];
    optionalImagesThree: string[];
    optionalDescriptionOne: string;
    optionalDescriptionTwo: string;
    optionalDescriptionThree: string;
    headerImage: string;
    description: string;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = await getProject(id);
    return {
        title: `${project.title} - Xodosoft`,
        description: project.description,
    };
}

async function getProject(projectId: string): Promise<Project> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/projects?id=${projectId}`;
    const response = await axios.get(url);
    return response.data;
}

function stripHtml(html: string): string {
    return html?.replace(/<[^>]*>/g, "") || "";
}

function OptionalBlock({ description, images }: { description: string; images: string[] }) {
    const hasDescription = stripHtml(description).trim().length > 0;
    const hasImages = images.length > 0;

    if (!hasDescription && !hasImages) return null;

    return (
        <div className="px-4 md:px-6 lg:px-8 py-8 flex flex-col items-center gap-y-5">
            {hasDescription && (
                <div
                    className="prose max-w-none text-gray-700 text-sm/7 prose-li:leading-tight"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            )}
            {hasImages &&
                images.map((src, index) => (
                    <div key={index} className="w-full max-w-5xl">
                        <div className="relative w-full" style={{ aspectRatio: "auto" }}>
                            <Image
                                src={src}
                                alt={`Image ${index + 1}`}
                                layout="responsive"
                                width={1280}
                                height={720}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getProject(id);

    return (
        <section className="mt-[65px]">
            {/* Hero Section */}
            <div className="relative min-h-[400px] w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image src={data.headerImage} alt="Background" fill className="object-cover" priority />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(98, 188, 234, 0.85) 0%, rgba(73, 94, 125, 0.9) 100%)",
                        }}
                    />
                </div>
                <div className="max-w-4xl text-white relative z-10 flex min-h-[400px] w-full items-center justify-start px-4 py-20 sm:px-6 lg:px-8">
                    <div>
                        <h1 className="mb-6 text-3xl md:text-4xl font-bold">{data.title}</h1>
                        <p className="mb-10 tracking-wide leading-8 font-light">{data.description}</p>
                    </div>
                </div>
            </div>

            {/* Image Carousel and Project Details */}
            <div className="px-4 md:px-6 lg:px-8 py-12 bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <ImageCarousel images={data.images} />
                    </div>
                    <ScrollArea className="h-[400px] pe-4">
                        <div
                            className="prose max-w-none text-gray-700 text-sm/7 prose-li:leading-tight"
                            dangerouslySetInnerHTML={{ __html: data.projectDetails }}
                        />
                    </ScrollArea>
                </div>
            </div>

            {/* Optional Sections */}
            <OptionalBlock
                description={data.optionalDescriptionOne}
                images={data.optionalImagesOne}
            />
            <OptionalBlock
                description={data.optionalDescriptionTwo}
                images={data.optionalImagesTwo}
            />
            <OptionalBlock
                description={data.optionalDescriptionThree}
                images={data.optionalImagesThree}
            />

            {/* CTA */}
            <CallToAction text="Interested? Request a Demo" />
        </section>
    );
}
