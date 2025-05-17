"use client"

import { signIn } from "next-auth/react";
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { loginFormSchema } from "@/lib/validationSchemas"
import { toast } from "sonner";

type LoginFormValues = z.infer<typeof loginFormSchema>

export default function LoginForm() {

    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: LoginFormValues) {
        setLoading(true);
        const { email, password } = data;

        try {
            const res = await signIn("credentials", {
                email,
                password,
                callbackUrl: "/dashboard",
                redirect: false,
            });

            if (res?.error) {
                console.log(res.error);
                toast.error(res.error);
            }
            else {
                // redirect("/dashboard");
                window.location.href = "/dashboard";
            }
        } catch (err) {
            console.log(err);

            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader className="text-center text-2xl">
                <CardTitle className="mb-2">Login</CardTitle>
                <CardDescription>Enter your credentials to sign in to your account</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...field} />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <div className="flex justify-end">
                            <a href="/forgot-password" className="text-sm text-primary hover:underline">
                                Forgot password?
                            </a>
                        </div> */}
                        <br />
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

