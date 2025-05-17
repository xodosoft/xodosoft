"use client"

import * as React from "react"
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LayoutList,
  Wrench,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import WithAuth from "@/hocs/withAuth"

const data = {
  navMain: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Applications",
      url: "/dashboard/applications",
      icon: FileText,
    },
    {
      name: "Jobs",
      url: "/dashboard/jobs",
      icon: Briefcase,
    },
    {
      name: "Services",
      url: "/dashboard/services",
      icon: Wrench,
    },
    {
      name: "Projects",
      url: "/dashboard/projects",
      icon: LayoutList,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base uppercase font-semibold">XodoSoft Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <WithAuth>
          <NavUser />
        </WithAuth>
      </SidebarFooter>
    </Sidebar>
  )
}
