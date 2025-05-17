"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { Button } from "./ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import axios from "axios"
import { toast } from "sonner"
import { ContactSchema } from "@/lib/validationSchemas"

export function ContactForm() {

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    async function onSubmit(data: z.infer<typeof ContactSchema>) {
        setLoading(true);
        try {
            const { name, email, subject, message } = data;

            const response = await axios.post("/api/contact", {
                name,
                email,
                subject,
                message
            });

            if (response.data) {
                toast.success(response.data.message);
                form.reset();
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="border-2"
                                    placeholder="Enter your name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} className="border-2" placeholder="Enter your email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input {...field} className="border-2" placeholder="Enter your subject" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="resize-none min-h-36 border-2"
                                    {...field}
                                    placeholder="Enter your message"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="relative inline-flex items-center justify-center gap-4 group w-full" style={{ marginTop: "50px" }}>
                    <div
                        className="absolute inset-0 duration-1000 opacity-60 transition-all bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 rounded-xl blur-lg filter group-hover:opacity-100 group-hover:duration-200"
                    ></div>
                    <Button type="submit" size="lg" className="z-10 flex items-center gap-2 w-full rounded-xl" disabled={loading}>
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
    );
}
