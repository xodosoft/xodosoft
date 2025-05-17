import { Metadata } from "next"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import ProjectForm from "@/components/project-form"

export const metadata: Metadata = {
    title: 'Create Project - Xodosoft'
}

export default async function Page() {

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Create Project" />
                <div className="flex flex-1 flex-col px-4">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-2 md:gap-6">
                            <ProjectForm />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}