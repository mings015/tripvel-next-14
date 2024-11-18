"use client";

import * as React from "react";
import {
  Frame,
  Users,
  ShoppingCart,
  Image,
  LayoutGrid,
  Tag,
  MapPin,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";

// This is sample data.
const data = {
  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Data Banner",
      url: "/dashboard/banner",
      icon: Image,
    },
    {
      name: "Data Promo",
      url: "/dashboard/promo",
      icon: Tag,
    },
    {
      name: "Data Category",
      url: "/dashboard/category",
      icon: LayoutGrid,
    },
    {
      name: "Data Activity",
      url: "/dashboard/activity",
      icon: MapPin,
    },
    {
      name: "Data Transaksi",
      url: "/dashboard/transaksi",
      icon: ShoppingCart,
    },
    {
      name: "Data User",
      url: "/dashboard/users",
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <img src="/logo.svg" className="h-16"></img>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
