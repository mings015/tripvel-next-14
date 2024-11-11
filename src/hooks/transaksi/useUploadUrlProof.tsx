import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "../use-toast";

interface UploadProofResponse {
  code: string;
  status: string;
  message: string;
}

const useUploadUrlProof = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const uploadProofPayment = async (
    transaksiId: string,
    proofPaymentUrl: string
  ) => {
    try {
      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<UploadProofResponse>(
        `${BASE_URL.API}${END_POINT.UPDATE_PAYMENT_PROOF}/${transaksiId}`,
        {
          proofPaymentUrl: proofPaymentUrl,
        },
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
          description: "Proof of payment uploaded successfully",
        });
        router.push("/user/transaksi");
        return true;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description:
            error.response?.data?.message ||
            "Failed to upload proof of payment",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadProofPayment, isLoading };
};

export default useUploadUrlProof;
