// components/views/Transaksi/UpdateStatusButton.tsx
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { BASE_URL, END_POINT, API_KEY } from "@/helper/endpoint";
import { Loader2 } from "lucide-react";

type TransactionStatus = "success" | "failed";

interface UpdateStatusButtonProps {
  transaksiId: string;
  currentStatus: string;
}

const UpdateStatusButton = ({
  transaksiId,
  currentStatus,
}: UpdateStatusButtonProps) => {
  const [status, setStatus] = useState<TransactionStatus | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateStatus = async () => {
    if (!status) return;

    setIsLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.UPDATE_TRANSAKSI_STATUS}/${transaksiId}`,
        { status },
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === "200") {
        toast({
          title: "Success",
          description: "Status transaksi berhasil diperbarui",
        });
        window.location.reload();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Gagal memperbarui status",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (currentStatus !== "pending") return null;

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <Label htmlFor="status">Update Status</Label>
        <Select
          value={status}
          onValueChange={(value: TransactionStatus) => setStatus(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pilih status baru" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        className="w-full"
        onClick={handleUpdateStatus}
        disabled={!status || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Memperbarui...
          </div>
        ) : (
          "Update Status"
        )}
      </Button>
    </div>
  );
};

export default UpdateStatusButton;
