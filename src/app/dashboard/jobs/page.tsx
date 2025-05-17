import { Metadata } from "next";
import { DataTable } from "./data-table";
import { columns, Job } from "./columns";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
    title: 'Jobs - Xodosoft'
};

async function getJobs(status?: string): Promise<Job[]> {

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/jobs` + (status ? `?status=${status}` : '');
    const response = await axios.get(url);

    return response.data;

}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const status = (await searchParams).status

    const statusValue = Array.isArray(status) ? status[0] : status;
    const data = await getJobs(statusValue === "ALL" ? undefined : statusValue);


    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="All Jobs" url="/dashboard/jobs/create" value="Create job" />
                <div className="flex flex-1 flex-col px-4">
                    <div className="flex gap-2 mt-4">
                        <Link href="/dashboard/jobs?status=ALL">
                            <Button variant={status === "ALL" ? "default" : "outline"} size={"sm"}>All</Button>
                        </Link>
                        <Link href="/dashboard/jobs?status=ACTIVE">
                            <Button variant={status === "ACTIVE" ? "default" : "outline"} size={"sm"}>Active</Button>
                        </Link>
                        <Link href="/dashboard/jobs?status=INACTIVE">
                            <Button variant={status === "INACTIVE" ? "default" : "outline"} size={"sm"}>Inactive</Button>
                        </Link>
                    </div>
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
