// components/cart/QuantityControl.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Loader2 } from "lucide-react";
import useUpdateCart from "@/hooks/cart/useUpdateCart";
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
import useGetCart from "@/hooks/cart/useGetCart";

interface QuantityControlProps {
  cartId: string;
  initialQuantity: number;
  minQuantity?: number;
  maxQuantity?: number;
  activityName?: string;
}

const QuantityControl: React.FC<QuantityControlProps> = ({
  cartId,
  initialQuantity,
  minQuantity = 1,
  maxQuantity = 99,
  activityName = "this item",
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [pendingQuantity, setPendingQuantity] = useState(initialQuantity);
  const { updateQuantity, isLoading } = useUpdateCart();
  const { mutate: refreshCart } = useGetCart();

  const handleUpdateConfirm = async () => {
    const success = await updateQuantity(cartId, pendingQuantity);
    if (success) {
      setQuantity(pendingQuantity);
      refreshCart();
    }
    setIsAlertOpen(false);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < minQuantity || newQuantity > maxQuantity) return;

    setPendingQuantity(newQuantity);
    setIsAlertOpen(true);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="variant"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={isLoading || quantity <= minQuantity}
        >
          <Minus className="h-4 w-4" />
        </Button>

        <div className="w-12 text-center">
          <span className="font-medium">{quantity}</span>
        </div>

        <Button
          variant="variant"
          size="icon"
          className="h-8 w-8"
          onClick={() => handleQuantityChange(quantity + 1)}
          disabled={isLoading || quantity >= maxQuantity}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Update Quantity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to change the quantity of {activityName} to{" "}
              {pendingQuantity}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleUpdateConfirm}
              disabled={isLoading}
              className={`${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update Quantity"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default QuantityControl;
