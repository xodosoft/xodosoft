import LoginForm from "@/components/login-form"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login - Xodosoft"
}

export default function Page() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4 py-12 mt-[65px]">
            <div className="w-full max-w-md space-y-6">
                <LoginForm />
            </div>
        </div>
    )
}

