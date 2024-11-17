import React from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import usePromo from "@/components/views/Home/hooks/usePromo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { TableSkeleton } from "@/components/content/Skeleton";
import DeletePromoAlert from "@/hooks/dashboard/promo/deletePromoAlert";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

// Definisikan interface untuk tipe data promo
interface Promo {
  id: string;
  title: string;
  promo_code: string;
  imageUrl: string;
  // createdAt: string;
  // updatedAt: string;
}

const PromoDashboard = () => {
  const { data, isLoading, error } = usePromo();

  // Definisikan kolom-kolom untuk tabel
  const columns: ColumnDef<Promo>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => {
        return (
          <img
            src={row.original.imageUrl}
            alt={row.original.title}
            className="w-36 h-20 object-cover rounded"
          />
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("title")}</span>
      ),
    },
    {
      accessorKey: "promo_code",
      header: "Promo Code",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("promo_code")}</span>
      ),
    },
    // {
    //   accessorKey: "createdAt",
    //   header: "Created At",
    //   cell: ({ row }) => FORMAT_DATE(row.getValue("createdAt")),
    // },
    // {
    //   accessorKey: "updatedAt",
    //   header: "Updated At",
    //   cell: ({ row }) => FORMAT_DATE(row.getValue("updatedAt")),
    // },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const promo = row.original;
        return (
          <div className="flex justify-end gap-2">
            <Link href={`/dashboard/promo/${promo.id}`}>
              <Button variant="variant" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <DeletePromoAlert promoId={promo.id} />
          </div>
        );
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Promo Management</h1>
            <Link href="/dashboard/promo/add-promo">
              <Button
                className="flex items-center gap-2 text-black"
                variant="neutral"
              >
                <Plus className="h-4 w-4" />
                Add Promo
              </Button>
            </Link>
          </div>
          {isLoading && <TableSkeleton />}
          {error && <div>{error}</div>}
          {data && (
            <div className="space-y-4">
              <DataTable columns={columns} data={data} />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PromoDashboard;
