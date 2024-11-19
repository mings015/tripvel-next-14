import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import UseUploadImage from "@/hooks/useUploadImage";

interface EditPromoResponse {
  code: string;
  status: string;
  message: string;
}

interface EditPromoPayload {
  title: string;
  description: string;
  imageUrl: string;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
}

const useEditPromo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const { uploadImage } = UseUploadImage();

  const editPromo = async (promoId: string, data: EditPromoPayload) => {
    setIsLoading(true);
    setUploadProgress(0);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<EditPromoResponse>(
        `${BASE_URL.API}${END_POINT.EDIT_PROMO}/${promoId}`,
        data,
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
          description: "Promo updated successfully",
        });
        return true;
      }

      throw new Error(response.data.message || "Failed to update promo");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to update promo",
      });
      return false;
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      return imageUrl;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image",
      });
      return null;
    }
  };

  return {
    editPromo,
    handleImageUpload,
    isLoading,
    uploadProgress,
  };
};

export default useEditPromo;
