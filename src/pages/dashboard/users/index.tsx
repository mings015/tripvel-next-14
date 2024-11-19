import React, { useState } from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import UseGetAllUser from "@/hooks/dashboard/user/useGetAllUser";
import { TableSkeleton } from "@/components/content/Skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UpdateRoleDialog from "@/components/views/dashboard/users/UpdateRoleDialog";
import UseUpdateRole from "@/hooks/dashboard/user/useUpdateRole";

const ITEMS_PER_PAGE = 10;

const UsersDashboard = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const updateUserRole = UseUpdateRole();

  const handleUpdateRole = async (newRole: string) => {
    if (!selectedUserId) return;

    setIsLoading(true);
    const success = await updateUserRole(selectedUserId, { role: newRole });

    if (success) {
      setIsUpdateDialogOpen(false);
      mutate();
    }

    setIsLoading(false);
  };

  const { data, isLoading, error, mutate } = UseGetAllUser();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = data ? Math.ceil(data.length / ITEMS_PER_PAGE) : 0;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = data ? data.slice(startIndex, endIndex) : [];

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <div>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">User Management</h1>
          </div>
          {isLoading && <TableSkeleton />}
          {error && <TableSkeleton />}
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Nomor Hp</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentData.map((userList) => (
                  <TableRow key={userList.id}>
                    <TableCell>
                      <img
                        src={
                          userList.profilePictureUrl ||
                          "https://placehold.co/40x40/png"
                        }
                        alt={userList.name}
                        className="w-36 h-20 object-cover rounded"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = "https://placehold.co/40x40/png";
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {userList.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      {userList.email}
                    </TableCell>

                    <TableCell className="font-medium">{userList.id}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <UpdateRoleDialog
                          userId={userList.id}
                          currentRole={userList.role}
                          isLoading={loading && selectedUserId === userList.id}
                          isDialogOpen={
                            isUpdateDialogOpen && selectedUserId === userList.id
                          }
                          setDialogOpen={(open) => {
                            setIsUpdateDialogOpen(open);
                            if (open) {
                              setSelectedUserId(userList.id);
                            } else {
                              setSelectedUserId(null);
                            }
                          }}
                          onUpdate={handleUpdateRole}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {renderPaginationItems()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersDashboard;
