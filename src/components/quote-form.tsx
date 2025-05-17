"use client"

import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ArrowRight, CalendarIcon, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import { QuoteSchema } from "@/lib/validationSchemas"
import { useServiceStore } from "@/store/useServices"

export function QuoteForm() {

    const { services } = useServiceStore();

    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof QuoteSchema>>({
        resolver: zodResolver(QuoteSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            service: "",
            subject: "",
            message: "",
        },
    });

    async function onSubmit(data: z.infer<typeof QuoteSchema>) {
        setLoading(true);
        try {
            const { firstName, lastName, email, phone, service, date, subject, message } = data;

            const formattedService = service
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

            const response = await axios.post("/api/quote", {
                firstName,
                lastName,
                email,
                phone,
                service: formattedService,
                date,
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
                <div className="grid md:grid-cols-2 md:gap-x-8 gap-y-6">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="John" />
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
                                    <Input {...field} placeholder="Doe" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid md:grid-cols-2 md:gap-x-8 gap-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="example@mail.com" />
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
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="123 456 7890" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid md:grid-cols-2 md:gap-x-8 gap-y-6">
                    <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>What service are you looking for?</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a service" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            services && services.map(({ id, title }) => (
                                                <SelectItem key={id} value={title}>{title}</SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="flex flex-col md:mt-[10px]">
                                <FormLabel>Preferred date for a call?</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) => date.getTime() < new Date().setHours(0, 0, 0, 0)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Enter your subject" />
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
                                    className="resize-none min-h-36"
                                    {...field}
                                    placeholder="Enter your message"
                                />
                            </FormControl>
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
    );
}
