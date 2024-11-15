import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "@/components/ui/separator";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";

interface LayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: LayoutProps): JSX.Element => {
  const breadcrumbItems = useBreadcrumb();
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 text-black" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <CustomBreadcrumb items={breadcrumbItems} className="flex" />
          </div>
        </header>
        <div>
          <main>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
