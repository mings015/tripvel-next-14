import Layout from "@/components/Layout";
import useGetTransaksi from "@/hooks/transaksi/useGetTransaksi";
import { formatToIDR } from "@/helper/convertIDR";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  CreditCard,
  Loader2,
  AlertCircle,
  Receipt,
} from "lucide-react";
import { FORMAT_DATE } from "@/helper/convertTime";
import Link from "next/link";
import { TableSkeleton } from "@/components/content/Skeleton";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    case "pending":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    case "cancelled":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    default:
      return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
  }
};

const TransaksiPage = () => {
  const { data, isLoading, error } = useGetTransaksi();

  if (isLoading) {
    return (
      <Layout>
        <div className="mx-auto container items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
          <TableSkeleton />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-500">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Transaction History</h1>
          <Badge variant="outline" className="font-normal">
            {data.length} Transactions
          </Badge>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Transactions</p>
                  <p className="text-2xl font-bold">{data.length}</p>
                </div>
                <Receipt className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-2xl font-bold">
                    {formatToIDR(
                      data.reduce((sum, item) => sum + item.totalAmount, 0)
                    )}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Completed Transactions
                  </p>
                  <p className="text-2xl font-bold">
                    {
                      data.filter((t) => t.status.toLowerCase() === "success")
                        .length
                    }
                  </p>
                </div>
                <Badge variant="default">
                  {(
                    (data.filter((t) => t.status.toLowerCase() === "success")
                      .length /
                      data.length) *
                    100
                  ).toFixed(0)}
                  %
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expired Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-gray-50 cursor-pointer relative group"
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {transaction.invoiceId}
                        </span>
                        <Link
                          href={`transaksi/${transaction.id}`}
                          className="absolute inset-0 z-10"
                          aria-label={`View details for invoice ${transaction.invoiceId}`}
                        ></Link>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatToIDR(transaction.totalAmount)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        {transaction.payment_method.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {FORMAT_DATE(transaction.orderDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        {FORMAT_DATE(transaction.expiredDate)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TransaksiPage;
