import { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import ApplicationDetails from "@/components/application-details"

export const metadata: Metadata = {
    title: 'View Application - Xodosoft'
}

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {

    const { id } = await params;

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="View Application" />
                <div className="flex flex-1 flex-col px-4">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-2 md:gap-6">
                            <ApplicationDetails applicationId={id} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}