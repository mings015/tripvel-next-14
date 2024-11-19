import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState } from "react";
import { toast } from "../use-toast";

interface CancelTransaksiResponse {
  code: string;
  status: string;
  message: string;
}

const UseCancelTransaksi = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cancelTransaksi = async (transaksiId: string) => {
    try {
      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<CancelTransaksiResponse>(
        `${BASE_URL.API}${END_POINT.CANCEL_TRANSAKSI}/${transaksiId}`,
        {},
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
          description: response.data.message,
        });
        // router.push("/user/transaksi");
        window.location.reload();
      } else {
        toast({
          title: "Error",
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  return { cancelTransaksi, isLoading };
};

export default UseCancelTransaksi;
