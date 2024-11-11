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
import useCreateTransaksi from "@/hooks/cart/useCreateTransaksi";

interface CreateTransaksiProps {
  cartIds: string[];
  paymentMethodId: string;
}

const CreateTransaksi: React.FC<CreateTransaksiProps> = ({
  cartIds,
  paymentMethodId,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { createTransaksi, isLoading } = useCreateTransaksi();

  const handleCreateTransaksi = async () => {
    const success = await createTransaksi(cartIds, paymentMethodId);
    if (success) {
      setIsAlertOpen(false);
    }
  };

  return (
    <>
      <Button className="w-full mt-6" onClick={() => setIsAlertOpen(true)}>
        Lanjutkan Pembayaran
      </Button>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Proceed to Checkout</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin melanjutkan pembayaran?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCreateTransaksi}
              disabled={isLoading}
              className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isLoading ? "Processing..." : "Lanjutkan Pembayaran"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateTransaksi;
