"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import Footer from "./footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");

    return (
        <>
            {!isDashboard && <Navbar />}
            <main className="overflow-x-hidden">
                {children}
            </main>
            {!isDashboard && <Footer />}
        </>
    );
}
