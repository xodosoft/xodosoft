export const dynamic = 'force-dynamic';

import { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "./data-table";
import { columns, Service } from "./columns";
import axios from "axios";
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
    title: 'Services - Xodosoft'
};

async function getServices(): Promise<Service[]> {

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/services`;
    const response = await axios.get(url);

    return response.data;

}

export default async function ServicesPage() {

    const data = await getServices();

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="View All Services" url="/dashboard/services/create" value="Create Service" />
                <div className="flex flex-1 flex-col px-4">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-2 md:gap-6">
                            <DataTable columns={columns} data={data} />
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
