import React from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import useCategory from "@/components/views/Home/hooks/useCategory";
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
import { FORMAT_DATE } from "@/helper/convertTime";
import DeleteCategoryAlert from "@/hooks/dashboard/category/deleteCategoryAlert";

const CategoryDashboard = () => {
  const { data, isLoading, error } = useCategory();

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Category Management</h1>
            <Link href="/dashboard/category/add-category">
              <Button
                className="flex items-center gap-2 text-black"
                variant="neutral"
              >
                <Plus className="h-4 w-4" />
                Add Category
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
                  <TableHead>Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Updated At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-36 h-20 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {category.name}
                    </TableCell>
                    <TableCell>{FORMAT_DATE(category.createdAt)}</TableCell>
                    <TableCell>{FORMAT_DATE(category.updatedAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/dashboard/category/${category.id}`}>
                          <Button variant="variant" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DeleteCategoryAlert categoryId={category.id} />
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

export default CategoryDashboard;
