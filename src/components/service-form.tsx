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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import TipTapEditor from "./tiptap-editor";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, X } from 'lucide-react';
import { ServiceSchema } from "@/lib/validationSchemas";
import { Textarea } from "./ui/textarea";
import ImagesModal from "./images-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ServiceFormSkeleton from "./service-form-skeleton";

interface ServiceFormProps {
    serviceId?: string;
}

export default function ServiceForm({ serviceId }: ServiceFormProps) {

    const [editorKey, setEditorKey] = useState(0);
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [initialLoad, setInitialLoad] = useState<boolean>(!!serviceId);

    const router = useRouter();

    const form = useForm<z.infer<typeof ServiceSchema>>({
        resolver: zodResolver(ServiceSchema),
        defaultValues: {
            title: "",
            description: "",
            serviceDetails: "<p></p>",
            image: undefined,
        },
    });

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`/api/services?id=${serviceId}`);
            if (response.data) {
                router.push("/dashboard/services");
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
        if (serviceId && initialLoad) {
            const fetchService = async () => {
                try {
                    const response = await axios.get(`/api/services?id=${serviceId}`);
                    const service = response.data;

                    form.reset({
                        title: service.title,
                        description: service.description,
                        serviceDetails: service.serviceDetails,
                        image: service.image,
                    });

                    setInitialLoad(false);
                } catch (error) {
                    console.error(error);
                    toast.error("Failed to fetch service data");
                }
            };
            fetchService();
        }
    }, [serviceId, form, initialLoad]);

    async function onSubmit(data: z.infer<typeof ServiceSchema>) {
        setIsSubmitting(true);
        try {
            const response = serviceId
                ? await axios.patch(`/api/services?id=${serviceId}`, data)
                : await axios.post("/api/services", data);

            if (response.data) {
                toast.success(response.data.message);
                if (!serviceId) {
                    form.reset();
                    setEditorKey(prev => prev + 1);
                }
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            } else {
                toast.error("An error occurred while processing the service");
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    if (initialLoad) {
        return ServiceFormSkeleton();
    }

    return (
        <div className="max-w-3xl py-8">
            <h1 className="text-2xl font-bold mb-6">{serviceId ? "Update Service" : "Create Service"}</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Graphic Designing" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Short Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Brief overview of your service" className="min-h-[100px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                                                    loading="lazy"
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
                        name="serviceDetails"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service details</FormLabel>
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

                    <div className="flex justify-between">
                        <Button type="submit" disabled={isSubmitting || isDeleting} size="sm">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    {serviceId ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                serviceId ? "Update Service" : "Create Service"
                            )}
                        </Button>

                        {
                            serviceId && (
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
                                            <DialogTitle>Delete Service</DialogTitle>
                                            <DialogDescription>Are you sure you want to delete this service? This action cannot be undone.</DialogDescription>
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
