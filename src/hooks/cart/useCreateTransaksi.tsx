import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState } from "react";
import { toast } from "../use-toast";
import { useRouter } from "next/router";

interface CreateTransaksiResponse {
  code: string;
  status: string;
  message: string;
}

const useCreateTransaksi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createTransaksi = async (
    cartIds: string[],
    paymentMethodId: string
  ) => {
    try {
      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<CreateTransaksiResponse>(
        `${BASE_URL.API}${END_POINT.CREATE_TRANSAKSI}`,
        { cartIds, paymentMethodId },
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
        router.push("/user/transaksi");
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
        title: "Success",
        description: "Something went wrong",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTransaksi, isLoading };
};

export default useCreateTransaksi;
