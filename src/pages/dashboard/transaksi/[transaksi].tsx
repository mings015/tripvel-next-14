import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useTransaksiId from "@/hooks/transaksi/useGetTransaksi_id";
import { formatToIDR } from "@/helper/convertIDR";
import {
  Receipt,
  Clock,
  Calendar,
  AlertCircle,
  User,
  FileText,
  History,
} from "lucide-react";
import { FORMAT_DATE } from "@/helper/convertTime";
import CancelTransaksiButton from "@/components/views/Transaksi/CancelTransaksiButton";
import { DashboardSkeleton } from "@/components/content/Skeleton";
import DashboardLayout from "@/components/dashboard/components/DashboardLayout";
import UpdateStatusButton from "@/hooks/dashboard/transaksi/updateStatusTransaksi";

const StatusBadge = ({ status }: { status: string }) => {
  let badgeStyle = "";

  switch (status.toLowerCase()) {
    case "pending":
      badgeStyle = "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      break;
    case "success":
      badgeStyle = "bg-green-100 text-green-800 hover:bg-green-100";
      break;
    case "cancelled":
      badgeStyle = "bg-gray-100 text-gray-800 hover:bg-gray-100";
      break;
    case "failed":
      badgeStyle = "bg-red-100 text-red-800 hover:bg-red-100";
      break;
    default:
      badgeStyle = "bg-gray-100 text-gray-800";
  }

  return <Badge className={badgeStyle}>{status.toUpperCase()}</Badge>;
};

const TransaksiDetail = () => {
  const { data, isLoading, error } = useTransaksiId();
  //   const [isDialogOpen, setIsDialogOpen] = useState(false);
  //   const [selectedTransaksiId, setSelectedTransaksiId] = useState<string>("");

  //   const handleUploadClick = (transaksiId: string) => {
  //     setSelectedTransaksiId(transaksiId);
  //     setIsDialogOpen(true);
  //   };

  if (isLoading) return <DashboardSkeleton />;
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }
  if (!data) return null;

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Detail Transaksi</h1>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Receipt className="h-4 w-4" />
                <span>{data.invoiceId}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4" />
                <span>ID User: {data.userId}</span>
              </div>
            </div>
          </div>
          <StatusBadge status={data.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items Card */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.transaction_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-4 pb-4 border-b last:border-0"
                  >
                    <img
                      src={item.imageUrls[0]}
                      alt={item.title}
                      className="w-full md:w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <div className="text-sm">
                          Jumlah:{" "}
                          <span className="font-medium">{item.quantity}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-green-600 font-medium">
                            {formatToIDR(item.price)}
                          </span>
                          {item.price_discount > 0 && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatToIDR(item.price_discount)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">ID: {item.id}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card>
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <img
                    src={data.payment_method.imageUrl}
                    alt={data.payment_method.name}
                    className="h-8 object-contain"
                  />
                  <div className="space-y-1">
                    <p className="font-medium">{data.payment_method.name}</p>
                    <p className="text-sm text-gray-600">
                      Nomor VA: {data.payment_method.virtual_account_number}
                    </p>
                    <p className="text-sm text-gray-600">
                      Nama Akun: {data.payment_method.virtual_account_name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Details Card */}
            <Card>
              <CardHeader>
                <CardTitle>Informasi Transaksi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Tanggal Order: {FORMAT_DATE(data.orderDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Kadaluarsa: {FORMAT_DATE(data.expiredDate)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Dibuat: {FORMAT_DATE(data.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <History className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">
                        Diperbarui: {FORMAT_DATE(data.updatedAt)}
                      </span>
                    </div>
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
                <CardTitle>Ringkasan Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Pembayaran</span>
                  <span className="font-medium text-lg">
                    {formatToIDR(data.totalAmount)}
                  </span>
                </div>

                {data.status === "pending" && (
                  <>
                    <Separator />
                    <UpdateStatusButton
                      transaksiId={data.id}
                      currentStatus={data.status}
                    />
                    <CancelTransaksiButton
                      transaksiId={data.id}
                      invoiceId={data.invoiceId}
                    />
                  </>
                )}
              </CardContent>
            </Card>

            {/* Payment Proof Card */}
            {data.proofPaymentUrl && (
              <Card>
                <CardHeader>
                  <CardTitle>Bukti Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <img
                        src={data.proofPaymentUrl}
                        alt="Bukti Pembayaran"
                        className="w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <img
                        src={data.proofPaymentUrl}
                        alt="Bukti Pembayaran"
                        className="w-full h-auto"
                      />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TransaksiDetail;
