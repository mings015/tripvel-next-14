import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import useTransaksiId from "@/hooks/transaksi/useGetTransaksi_id";
import { formatToIDR } from "@/helper/convertIDR";
import {
  Receipt,
  Clock,
  Upload,
  Loader2,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { FORMAT_DATE } from "@/helper/convertTime";
import CancelTransaksiButton from "@/components/views/Transaksi/CancelTransaksiButton";
import { useState } from "react";
import UploadProofPaymentDialog from "@/components/views/Transaksi/UploadProofPaymentDialog";
import { DashboardSkeleton } from "@/components/content/Skeleton";
import { CustomBreadcrumb } from "@/components/ui/custom-breadcrumb";
import { useBreadcrumb } from "@/hooks/useBreadcrumb";

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

const TransaksiDetail = () => {
  const { data, isLoading, error } = useTransaksiId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTransaksiId, setSelectedTransaksiId] = useState<string>("");
  const breadcrumbItems = useBreadcrumb();

  const handleUploadClick = (transaksiId: string) => {
    setSelectedTransaksiId(transaksiId);
    setIsDialogOpen(true);
  };
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <DashboardSkeleton />
          </div>
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

  if (!data) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        <CustomBreadcrumb items={breadcrumbItems} className="mb-6 flex" />

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Transaction Details</h1>
            <div className="flex items-center gap-2 text-gray-600">
              <Receipt className="h-4 w-4" />
              <span>{data.invoiceId}</span>
            </div>
          </div>
          <Badge className={getStatusColor(data.status)}>
            {data.status.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items Card */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.transaction_items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.imageUrls[0]}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-sm">
                          Quantity:
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div>
                          {item.price_discount > 0 ? (
                            <div>
                              <span className="text-green-600 font-medium">
                                {formatToIDR(item.price)}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                {formatToIDR(item.price_discount)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-medium">
                              {formatToIDR(item.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <img
                    src={data.payment_method.imageUrl}
                    alt={data.payment_method.name}
                    className="h-8 object-contain"
                  />
                  <div>
                    <p className="font-medium">{data.payment_method.name}</p>
                    <p className="text-sm text-gray-600">
                      VA Number: {data.payment_method.virtual_account_number}
                    </p>
                    <p className="text-sm text-gray-600">
                      Account Name: {data.payment_method.virtual_account_name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-medium">
                    {formatToIDR(data.totalAmount)}
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Order Date: {FORMAT_DATE(data.orderDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Expired Date: {FORMAT_DATE(data.expiredDate)}</span>
                  </div>
                </div>

                {data.status !== "cancelled" && data.status !== "success" && (
                  <>
                    <Separator />

                    <div className="space-y-3">
                      <Button
                        className="w-full"
                        onClick={() => handleUploadClick(data.id)}
                      >
                        <Upload className="h-4 w-4 mr-2" /> Upload Payment Proof
                      </Button>

                      <UploadProofPaymentDialog
                        isOpen={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                        transaksiId={selectedTransaksiId}
                      />

                      <CancelTransaksiButton
                        transaksiId={data.id}
                        invoiceId={data.invoiceId}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {data.proofPaymentUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Proof</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={data.proofPaymentUrl}
                    alt="Payment Proof"
                    className="w-full rounded-lg"
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransaksiDetail;
