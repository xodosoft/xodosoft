import { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "./data-table";
import { columns, Project } from "./columns";
import axios from "axios";
import FilterProjects from "@/components/filter-projects";
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export const metadata: Metadata = {
    title: 'Projects - Xodosoft'
};

async function getProjects(categoryId?: string): Promise<Project[]> {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/projects`;

    if (categoryId) {
        url += `?categoryId=${categoryId}`;
    }

    const response = await axios.get(url);

    return response.data;

}
export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

    const { categoryId } = await searchParams;
    const data = await getProjects(categoryId as string | undefined);

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader title="View All Projects" url="/dashboard/projects/create" value="Create Project" />
                <div className="flex flex-1 flex-col px-4">
                    <FilterProjects />
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
