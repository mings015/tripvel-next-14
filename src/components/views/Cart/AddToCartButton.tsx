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
import useAddCart from "@/hooks/cart/useAddCart";

interface AddToCartButtonProps {
  activityId: string;
  activityTitle?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  activityId,
  activityTitle,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { addToCart, isLoading } = useAddCart();

  const handleAddToCart = async () => {
    const success = await addToCart(activityId);
    if (success) {
      setIsAlertOpen(false);
    }
  };

  return (
    <>
      <Button className="w-full mt-6" onClick={() => setIsAlertOpen(true)}>
        Add to Cart
      </Button>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Add to Cart</AlertDialogTitle>
            <AlertDialogDescription>
              {activityTitle
                ? `Apakah Anda yakin ingin menambahkan "${activityTitle}" ke keranjang?`
                : "Apakah Anda yakin ingin menambahkan item ini ke keranjang?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAddToCart}
              disabled={isLoading}
              className={isLoading ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isLoading ? "Processing..." : "Add to Cart"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddToCartButton;
