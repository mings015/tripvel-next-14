import React from "react";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil } from "lucide-react";
import { TableSkeleton } from "@/components/content/Skeleton";
import UseGetAllTransaksi from "@/hooks/dashboard/transaksi/useGetAllTransaksi";
import { DataTable } from "@/components/ui/data-table";
import { FORMAT_DATE } from "@/helper/convertTime";
import { Badge } from "@/components/ui/badge";
import { formatToIDR } from "@/helper/convertIDR";

interface Transaksi {
  id: string;
  invoiceId: string;
  payment_method: {
    name: string;
  };
  status: string;
  totalAmount: number;
  orderDate: string;
}

const baseColumns: ColumnDef<Transaksi>[] = [
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
  },
  {
    accessorKey: "payment_method.name",
    header: "Payment Method",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => formatToIDR(row.getValue("totalAmount")),
  },

  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => FORMAT_DATE(row.getValue("orderDate")),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const transaksi = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Link href={`/dashboard/transaksi/${transaksi.id}`}>
            <Button variant="variant" className="text-black" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

const StatusBadge = ({ status }: { status: string }) => {
  let badgeStyle = "";

  if (status.toLowerCase() === "pending") {
    badgeStyle = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
  } else if (status.toLowerCase() === "success") {
    badgeStyle = "bg-green-100 text-green-800 hover:bg-green-100";
  } else if (status.toLowerCase() === "cancelled") {
    badgeStyle = "bg-gray-100 text-gray-800 hover:bg-gray-100";
  } else if (status.toLowerCase() === "failed") {
    badgeStyle = "bg-red-100 text-red-800 hover:bg-red-100";
  } else {
    badgeStyle = "bg-gray-100 text-gray-800"; // default style
  }

  return (
    <Badge className={badgeStyle}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const TransactionTable = ({
  data,
  status,
  isLoading,
}: {
  data: Transaksi[];
  status: string;
  isLoading: boolean;
}) => {
  const filteredData = data.filter(
    (transaction) => transaction.status.toLowerCase() === status.toLowerCase()
  );

  const columns: ColumnDef<Transaksi>[] = [
    ...baseColumns,
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
  ];

  if (isLoading) return <TableSkeleton />;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">
              {status.charAt(0).toUpperCase() + status.slice(1)} Transactions
            </CardTitle>
            <CardDescription>
              Total: {filteredData.length} transactions
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={filteredData} />
      </CardContent>
    </Card>
  );
};

const TransaksiDashboard = () => {
  const { data, isLoading, error } = UseGetAllTransaksi();

  if (error) {
    return (
      <DashboardLayout>
        <div className="p-4">
          <Card className="bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">Error</CardTitle>
              <CardDescription className="text-red-600">
                {error}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Transaction Management</h1>
          <p className="text-gray-500 mt-1">
            Manage and monitor all transactions across different statuses
          </p>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">
              Pending
              {data && (
                <Badge variant="secondary" className="ml-2">
                  {
                    data.filter((t) => t.status.toLowerCase() === "pending")
                      .length
                  }
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="success">
              Success
              {data && (
                <Badge variant="secondary" className="ml-2">
                  {
                    data.filter((t) => t.status.toLowerCase() === "success")
                      .length
                  }
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled
              {data && (
                <Badge variant="secondary" className="ml-2">
                  {
                    data.filter((t) => t.status.toLowerCase() === "cancelled")
                      .length
                  }
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="failed">
              Failed
              {data && (
                <Badge variant="secondary" className="ml-2">
                  {
                    data.filter((t) => t.status.toLowerCase() === "failed")
                      .length
                  }
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <TransactionTable
              data={data || []}
              status="pending"
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="success">
            <TransactionTable
              data={data || []}
              status="success"
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="cancelled">
            <TransactionTable
              data={data || []}
              status="cancelled"
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="failed">
            <TransactionTable
              data={data || []}
              status="failed"
              isLoading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default TransaksiDashboard;
