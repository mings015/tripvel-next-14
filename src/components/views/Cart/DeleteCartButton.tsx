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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import useDeleteCart from "@/hooks/cart/useDeleteCart";
import useGetCart from "@/hooks/cart/useGetCart";

interface DeleteCartButtonProps {
  cartId: string;
  onSuccess?: () => void;
}

const DeleteCartButton: React.FC<DeleteCartButtonProps> = ({
  cartId,
  onSuccess,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const { removeItem, isLoading } = useDeleteCart();
  const { mutate: refreshCart } = useGetCart();

  const handleDeleteCart = async () => {
    try {
      await removeItem(cartId);
      setIsAlertOpen(false);
      onSuccess?.();
      refreshCart();
    } catch (error: any) {
      console.error("Failed to delete cart item:", error.message);
      setIsAlertOpen(false);
    }
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="variant"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove Item from Cart</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this item from your cart? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteCart}
            disabled={isLoading}
            className={`bg-red-500 hover:bg-red-600 focus:ring-red-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Item
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCartButton;
