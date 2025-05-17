import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Dashboard - Xodosoft'
}

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Dashboard" />
            </SidebarInset>
        </SidebarProvider>
    )
}