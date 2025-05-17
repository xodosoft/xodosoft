"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TipTapEditor from "./tiptap-editor";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, X } from 'lucide-react';
import { ProjectSchema } from "@/lib/validationSchemas";
import { Textarea } from "./ui/textarea";
import ImagesModal from "./images-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CategorySelect from "./category-select";
import UpdateProjectFormSkeleton from "./project-form-skeleton";

interface ProjectFormProps {
    projectId?: string;
}

export default function ProjectForm({ projectId }: ProjectFormProps) {

    const [editorKey, setEditorKey] = useState(0);
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [initialLoad, setInitialLoad] = useState<boolean>(!!projectId);

    const router = useRouter();

    const form = useForm<z.infer<typeof ProjectSchema>>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            title: "",
            description: "",
            categoryId: undefined,
            image: undefined,
            headerImage: undefined,
            images: [],
            projectDetails: "<p></p>",
            optionalImagesOne: [],
            optionalDescriptionOne: "<p></p>",
            optionalImagesTwo: [],
            optionalDescriptionTwo: "<p></p>",
            optionalImagesThree: [],
            optionalDescriptionThree: "<p></p>",
        },
    });

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`/api/projects?id=${projectId}`);
            if (response.data) {
                router.push("/dashboard/projects");
                toast.success(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        } finally {
            setIsDeleting(false);
        }
        setOpen(false);
    };

    useEffect(() => {
        if (projectId && initialLoad) {
            const fetchProject = async () => {
                try {
                    const response = await axios.get(`/api/projects?id=${projectId}`);
                    const project = response.data;

                    form.reset({
                        title: project.title,
                        description: project.description,
                        image: project.image,
                        categoryId: project.categoryId,
                        headerImage: project.headerImage,
                        images: project.images,
                        projectDetails: project.projectDetails,
                        optionalImagesOne: project.optionalImagesOne,
                        optionalDescriptionOne: project.optionalDescriptionOne,
                        optionalImagesTwo: project.optionalImagesTwo,
                        optionalDescriptionTwo: project.optionalDescriptionTwo,
                        optionalImagesThree: project.optionalImagesThree,
                        optionalDescriptionThree: project.optionalDescriptionThree,
                    });

                    setInitialLoad(false);
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to fetch project data");
                }
            };
            fetchProject();
        }
    }, [projectId, form, initialLoad]);

    async function onSubmit(data: z.infer<typeof ProjectSchema>) {

        setIsSubmitting(true);
        try {
            const response = projectId
                ? await axios.patch(`/api/projects?id=${projectId}`, data)
                : await axios.post("/api/projects", data);

            if (response.data) {

                toast.success(response.data.message);
                if (!projectId) {
                    form.reset();
                    setEditorKey(prev => prev + 1);
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An error occurred while processing the project");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    if (initialLoad) {
        return UpdateProjectFormSkeleton();
    }

    return (
        <div className="max-w-3xl py-8">
            <h1 className="text-2xl font-bold mb-6">{projectId ? "Update Project" : "Create Project"}</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Textile ERP" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <CategorySelect value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormDescription>Select a category or create a new one.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Brief overview of your project" className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-wrap gap-4 justify-between">
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1">Image</FormLabel>
                                    <FormControl>
                                        <>
                                            {!value && (
                                                <ImagesModal
                                                    text="Select Image"
                                                    multiple={false}
                                                    onSelect={(images) => {
                                                        if (images.length > 0) {
                                                            onChange(images[0].secure_url);
                                                        }
                                                    }}
                                                />
                                            )}

                                            {value && (
                                                <div className="relative w-40 h-40 mt-2">
                                                    <Image

                                                        src={value}
                                                        alt="Selected"
                                                        fill
                                                        className="w-full h-full object-cover rounded-md border"

                                                    />
                                                    <span
                                                        role="button"
                                                        onClick={() => onChange("")}
                                                        className="absolute m-2 end-0 bg-red-500 w-6 h-6 flex items-center justify-center text-white rounded-full p-[2px]"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </span>
                                                </div>
                                            )}
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="headerImage"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1">Header Image</FormLabel>
                                    <FormControl>
                                        <>
                                            {!value && (
                                                <ImagesModal
                                                    text="Select Image"
                                                    multiple={false}
                                                    onSelect={(images) => {
                                                        if (images.length > 0) {
                                                            onChange(images[0].secure_url);
                                                        }
                                                    }}
                                                />
                                            )}

                                            {value && (
                                                <div className="relative w-40 h-40 mt-2">
                                                    <Image

                                                        src={value}
                                                        alt="Selected"
                                                        fill
                                                        className="w-full h-full object-cover rounded-md border"

                                                    />
                                                    <span
                                                        role="button"
                                                        onClick={() => onChange("")}
                                                        className="absolute m-2 end-0 bg-red-500 w-6 h-6 flex items-center justify-center text-white rounded-full p-[2px]"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </span>
                                                </div>
                                            )}
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="images"
                        render={({ field: { value = [], onChange } }) => (
                            <FormItem>
                                <FormLabel className="block mb-1">Slider Images</FormLabel>
                                <FormControl>
                                    <>
                                        <ImagesModal
                                            text="Select Images"
                                            multiple={true}
                                            onSelect={(images) => {
                                                if (images.length > 0) {
                                                    onChange(images.map((img) => img.secure_url));
                                                }
                                            }}
                                        />

                                        {value.length > 0 && (
                                            <div className="flex flex-wrap gap-4 mt-4">
                                                {value.map((url: string, index: number) => (
                                                    <div key={url} className="relative w-32 h-32">
                                                        <Image

                                                            src={url}
                                                            alt={`Selected image ${index + 1}`}
                                                            fill
                                                            className="w-full h-full object-cover rounded-md border"
                                                        />
                                                        <span
                                                            role="button"
                                                            onClick={() => {
                                                                const updated = value.filter((_, i) => i !== index);
                                                                onChange(updated);
                                                            }}
                                                            className="absolute top-1 right-1 bg-red-500 w-6 h-6 flex items-center justify-center text-white rounded-full p-[2px]"
                                                        >
                                                            <X className="w-3.5 h-3.5" />
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="projectDetails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project details</FormLabel>
                                <FormControl>
                                    <TipTapEditor
                                        content={field.value}
                                        onChange={field.onChange}
                                        key={editorKey}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="bg-gray-50 rounded-lg p-6 shadow-lg space-y-6 relative">
                        <FormField
                            control={form.control}
                            name="optionalImagesOne"
                            render={({ field: { value = [], onChange } }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1">Images</FormLabel>
                                    <FormControl>
                                        <>
                                            <ImagesModal
                                                text="Select Images"
                                                multiple={true}
                                                onSelect={(images) => {
                                                    if (images.length > 0) {
                                                        onChange(images.map((img) => img.secure_url));
                                                    }
                                                }}
                                            />

                                            {value.length > 0 && (
                                                <div className="flex flex-wrap gap-4 mt-4">
                                                    {value.map((url: string, index: number) => (
                                                        <div key={url} className="relative w-32 h-32">
                                                            <Image

                                                                src={url}
                                                                alt={`Selected image ${index + 1}`}
                                                                fill
                                                                className="w-full h-full object-cover rounded-md border"
                                                            />
                                                            <span
                                                                role="button"
                                                                onClick={() => {
                                                                    const updated = value.filter((_, i) => i !== index);
                                                                    onChange(updated);
                                                                }}
                                                                className="absolute top-1 right-1 bg-red-500 w-6 h-6 flex items-center justify-center text-white rounded-full p-[2px]"
                                                            >
                                                                <X className="w-3.5 h-3.5" />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="optionalDescriptionOne"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <TipTapEditor
                                            content={field.value as string}
                                            onChange={field.onChange}
                                            key={editorKey}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 shadow-lg space-y-6 relative">
                        <FormField
                            control={form.control}
                            name="optionalImagesTwo"
                            render={({ field: { value = [], onChange } }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1">Images</FormLabel>
                                    <FormControl>
                                        <>
                                            <ImagesModal
                                                text="Select Images"
                                                multiple={true}
                                                onSelect={(images) => {
                                                    if (images.length > 0) {
                                                        onChange(images.map((img) => img.secure_url));
                                                    }
                                                }}
                                            />

                                            {value.length > 0 && (
                                                <div className="flex flex-wrap gap-4 mt-4">
                                                    {value.map((url: string, index: number) => (
                                                        <div key={url} className="relative w-32 h-32">
                                                            <Image

                                                                src={url}
                                                                alt={`Selected image ${index + 1}`}
                                                                fill
                                                                className="w-full h-full object-cover rounded-md border"
                                                            />
                                                            <span
                                                                role="button"
                                                                onClick={() => {
                                                                    const updated = value.filter((_, i) => i !== index);
                                                                    onChange(updated);
                                                                }}
                                                                className="absolute top-1 right-1 bg-red-500 w-6 h-6 flex items-center justify-center text-white rounded-full p-[2px]"
                                                            >
                                                                <X className="w-3.5 h-3.5" />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="optionalDescriptionTwo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <TipTapEditor
                                            content={field.value as string}
                                            onChange={field.onChange}
                                            key={editorKey}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6 shadow-lg space-y-6 relative">
                        <FormField
                            control={form.control}
                            name="optionalImagesThree"
                            render={({ field: { value = [], onChange } }) => (
                                <FormItem>
                                    <FormLabel className="block mb-1">Images</FormLabel>
                                    <FormControl>
                                        <>
                                            <ImagesModal
                                                text="Select Images"
                                                multiple={true}
                                                onSelect={(images) => {
                                                    if (images.length > 0) {
                                                        onChange(images.map((img) => img.secure_url));
                                                    }
                                                }}
                                            />

                                            {value.length > 0 && (
                                                <div className="flex flex-wrap gap-4 mt-4">
                                                    {value.map((url: string, index: number) => (
                                                        <div key={url} className="relative w-32 h-32">
                                                            <Image

                                                                src={url}
                                                                alt={`Selected image ${index + 1}`}
                                                                fill
                                                                className="w-full h-full object-cover rounded-md border"
                                                            />
                                                            <span
                                                                role="button"
                                                                onClick={() => {
                                                                    const updated = value.filter((_, i) => i !== index);
                                                                    onChange(updated);
                                                                }}
                                                                className="absolute top-1 right-1 bg-red-500 w-6 h-6 flex items-center justify-center text-white rounded-full p-[2px]"
                                                            >
                                                                <X className="w-3.5 h-3.5" />
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="optionalDescriptionThree"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <TipTapEditor
                                            content={field.value as string}
                                            onChange={field.onChange}
                                            key={editorKey}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-between">
                        <Button type="submit" disabled={isSubmitting || isDeleting} size="sm">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    {projectId ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                projectId ? "Update Project" : "Create Project"
                            )}
                        </Button>

                        {
                            projectId && (
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant={"destructive"} disabled={isSubmitting || isDeleting} size={"sm"}>
                                            {isDeleting ? (
                                                <>
                                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                                    Deleting...
                                                </>
                                            ) : (
                                                "Delete"
                                            )}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Delete Project</DialogTitle>
                                            <DialogDescription>Are you sure you want to delete this project? This action cannot be undone.</DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter className="gap-2 sm:justify-end">
                                            <Button size={"sm"} variant="outline" onClick={() => setOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button size={"sm"} variant="destructive" disabled={isSubmitting || isDeleting} onClick={handleDelete}>
                                                {isDeleting ? (
                                                    <>
                                                        <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                                        Deleting...
                                                    </>
                                                ) : (
                                                    "Delete"
                                                )}
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            )
                        }
                    </div>
                </form>
            </Form>
        </div>
    );
}
