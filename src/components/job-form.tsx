"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRef, useState } from "react"
import { ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ApplicationSchema } from "@/lib/validationSchemas"
import { toast } from "sonner"
import axios from "axios"

interface JobPostingFormProps {
    jobId?: string;
}

export function JobApplicationForm({ jobId }: JobPostingFormProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const form = useForm<z.infer<typeof ApplicationSchema>>({
        resolver: zodResolver(ApplicationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            coverLetter: "",
        },
    });

    async function onSubmit(data: z.infer<typeof ApplicationSchema>) {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("coverLetter", data.coverLetter || "");
            formData.append("resume", data.resume);

            const apiUrl = jobId ? `/api/applications?id=${jobId}` : "/api/applications";

            const response = await axios.post(apiUrl, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.data) {
                toast.success(response.data.message);
                form.reset();
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response?.data) {
                toast.error(error.response.data.error);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" {...field} placeholder="example@mail.com" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="123 456 7890" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps */}
                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                        <FormItem>
                            <FormLabel>Resume</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            onChange(file);
                                        }
                                    }}
                                    {...fieldProps}
                                    ref={fileInputRef}
                                />
                            </FormControl>
                            <FormDescription>Upload your resume (PDF only, max 5MB)</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* eslint-enable @typescript-eslint/no-unused-vars, react-hooks/exhaustive-deps */}

                <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cover Letter (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us why you're interested in this position..."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Share additional information about your qualifications and interest in the position.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="relative inline-flex items-center justify-center gap-4 group" style={{ marginTop: "50px" }}>
                    <div
                        className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
                    ></div>
                    <Button type="submit" size="lg" className="z-10 flex items-center gap-2 rounded-xl" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Please wait
                            </>
                        ) : (
                            <>
                                Submit
                                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

