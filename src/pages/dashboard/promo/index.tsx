import React from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import usePromo from "@/components/views/Home/hooks/usePromo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import { TableSkeleton } from "@/components/content/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeletePromoAlert from "@/hooks/dashboard/promo/deletePromoAlert";

const PromoDashboard = () => {
  const { data, isLoading, error } = usePromo();

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
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Promo Code</TableHead>
                  {/* <TableHead>Created At</TableHead> */}
                  {/* <TableHead>Updated At</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell>
                      <img
                        src={promo.imageUrl}
                        alt={promo.title}
                        className="w-36 h-20 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{promo.title}</TableCell>
                    <TableCell className="font-medium">
                      {promo.promo_code}
                    </TableCell>
                    {/* <TableCell>{FORMAT_DATE(promo.createdAt)}</TableCell> */}
                    {/* <TableCell>{FORMAT_DATE(promo.updatedAt)}</TableCell> */}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/promo/${promo.id}`}>
                          <Button variant="variant" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeletePromoAlert promoId={promo.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PromoDashboard;
