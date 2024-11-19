"use client";

import Image from "next/image";

import * as React from "react";
import {
  Frame,
  Users,
  ShoppingCart,
  LayoutGrid,
  Tag,
  MapPin,
  ImageMinus,
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
      icon: ImageMinus,
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
        <Image
          src="/logo.svg"
          alt="Profile Preview"
          width={64}
          height={64}
          priority={true}
          className="w-fit mt-6"
        />
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
