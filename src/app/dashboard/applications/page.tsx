import { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import { columns, Application } from "./columns";
import axios from "axios";
import { DataTable } from "./data-table";
import FilterApplications from "@/components/filter-applications";
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
    title: 'Applications - Xodosoft'
};

async function getApplications(jobId?: string): Promise<Application[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/applications`;

    if (jobId) {
        url += `?jobId=${jobId === "others" ? "null" : jobId}`;
    }

    const response = await axios.get(url);
    return response.data;
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const { jobId } = await searchParams;
    const data = await getApplications(jobId as string | undefined);

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="Applications" />
                <div className="flex flex-1 flex-col px-4">
                    <FilterApplications />
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
