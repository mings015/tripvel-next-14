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
import useBanner from "@/components/views/Home/hooks/useBanner";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
  bannerId: string;
  onSuccess?: () => void;
}

const DeleteBannerAlert: React.FC<DeleteButtonProps> = ({
  bannerId,
  onSuccess,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: refreshBanner } = useBanner();

  const removeItem = async () => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.delete(
        `${BASE_URL.API}${END_POINT.DELETE_BANNER}/${bannerId}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
          data: { bannerId },
        }
      );

      if (response.data.code === "200") {
        toast({
          title: "Success",
          description: "Banner has been deleted successfully",
        });
        setIsSuccess(true);
        setIsAlertOpen(false); // Tutup dialog setelah berhasil
        onSuccess?.();
        refreshBanner();
        onSuccess?.();
        return true;
      }

      toast({
        title: "Error",
        description: response.data.message || "Failed to delete banner",
        variant: "destructive",
      });
      return false;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete banner",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
      console.log(isSuccess);
    }
  };

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="variant"
          size="icon"
          className=" text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Banner</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this banner? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={removeItem}
            disabled={isLoading}
            className={`bg-red-500 hover:bg-red-600 focus:ring-red-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Banner
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteBannerAlert;
