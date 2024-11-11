import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import UseCancelTransaksi from "@/hooks/transaksi/useCancelTransaksi";
import { XCircle } from "lucide-react";

interface CancelTransaksiProps {
  transaksiId: string;
  invoiceId?: string;
}

const CancelTransaksiButton: React.FC<CancelTransaksiProps> = ({
  transaksiId,
  invoiceId,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { cancelTransaksi, isLoading } = UseCancelTransaksi();

  const handleCancelTransaksi = async () => {
    const success = await cancelTransaksi(transaksiId);
    if (success) {
      setIsAlertOpen(false);
    }
  };

  return (
    <>
      <Button
        className="w-full mt-6 text-black"
        variant="neutral"
        onClick={() => setIsAlertOpen(true)}
      >
        <XCircle className="h-4 w-4 mr-2" />
        Batalkan Transaksi
      </Button>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Batalkan transaksi</AlertDialogTitle>
            <AlertDialogDescription>
              {invoiceId
                ? `Apakah Anda yakin ingin membatalkan transaksi "${invoiceId}"?`
                : "Apakah Anda yakin ingin membatalkan transaksi?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelTransaksi}
              disabled={isLoading}
              className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isLoading ? "Processing..." : "Cancel Transaksi"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CancelTransaksiButton;
