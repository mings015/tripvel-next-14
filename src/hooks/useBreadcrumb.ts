import { useRouter } from "next/router";
import { useMemo } from "react";

interface RouteConfig {
  label: string;
  href?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routesMap: Record<string, RouteConfig> = {
  promo: {
    label: "Promo",
    href: "",
  },
  banner: {
    label: "Banner",
    href: "",
  },
  category: {
    label: "Category",
    href: "",
  },
  activity: {
    label: "Activity",
    href: "",
  },
  user: {
    label: "My Cart",
    href: "/user/cart",
  },

  dashboard: {
    label: "Dashboard",
    href: "/dashboard",
  },
  databanner: {
    label: "Data Banner",
    href: "/dashboard/banner",
  },
  datapromo: {
    label: "Data Promo",
    href: "/dashboard/promo",
  },
  datacategory: {
    label: "Data Category",
    href: "/dashboard/category/",
  },

  dataactivity: {
    label: "Data Activity",
    href: "/dashboard/activity",
  },
  transaksi: {
    label: "Data Transaksi",
    href: "/dashboard/transaksi",
  },
  users: {
    label: "Data Users",
    href: "/dashboard/users/",
  },
};

export const useBreadcrumb = () => {
  const router = useRouter();

  const breadcrumbItems = useMemo((): BreadcrumbItem[] => {
    // Get path segments
    const pathSegments = router.asPath
      .split("/")
      .filter((segment) => segment !== "");

    const items: BreadcrumbItem[] = [];
    let currentPath = "";

    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;

      // Handle dynamic routes and query params
      const cleanSegment = segment.split("[")[0].split("?")[0];

      if (routesMap[cleanSegment]) {
        const { label, href } = routesMap[cleanSegment];
        items.push({
          label,
          href: href || currentPath,
        });
      } else if (segment.includes("[") || segment.includes("?")) {
        // Handle dynamic segments
        const paramName = cleanSegment.replace(/[\[\]]/g, "");
        const id = router.query[paramName] as string;
        if (id) {
          items.push({
            label: `${
              cleanSegment.charAt(0).toUpperCase() + cleanSegment.slice(1)
            } ${id}`,
          });
        }
      }
    });

    return items;
  }, [router.asPath, router.query]);

  return breadcrumbItems;
};
