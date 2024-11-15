import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import UseUploadImage from "@/hooks/useUploadImage";
import { useRouter } from "next/router";

interface AddPromoResponse {
  code: string;
  status: string;
  message: string;
}

interface AddPromoPayload {
  title: string;
  description: string;
  imageUrl: string;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
}

interface FormData {
  title: string;
  description: string;
  imageUrl: string | null;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: string;
  minimum_claim_price: string;
  pictureFile: File | null;
}

const useAddPromo = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const { uploadImage } = UseUploadImage();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    imageUrl: null,
    terms_condition: "",
    promo_code: "",
    promo_discount_price: "",
    minimum_claim_price: "",
    pictureFile: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "File size should not exceed 5MB",
        });
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        pictureFile: file,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const addPromo = async (data: AddPromoPayload) => {
    setIsLoading(true);
    setUploadProgress(0);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<AddPromoResponse>(
        `${BASE_URL.API}${END_POINT.CREATE_PROMO}`,
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
          description: "Promo added successfully",
        });
        return true;
      }

      throw new Error(response.data.message || "Failed to add Promo");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to add Promo",
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
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image",
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.pictureFile ||
      !formData.title ||
      !formData.description ||
      !formData.terms_condition ||
      !formData.promo_code ||
      !formData.promo_discount_price ||
      !formData.minimum_claim_price
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      });
      return;
    }

    const imageUrl = await handleImageUpload(formData.pictureFile);
    if (!imageUrl) return;

    const success = await addPromo({
      title: formData.title,
      description: formData.description,
      imageUrl: imageUrl,
      terms_condition: formData.terms_condition,
      promo_code: formData.promo_code,
      promo_discount_price: Number(formData.promo_discount_price),
      minimum_claim_price: Number(formData.minimum_claim_price),
    });

    if (success) {
      router.push("/dashboard/promo");
    }
  };

  return {
    formData,
    isLoading,
    uploadProgress,
    handleInputChange,
    handleFileChange,
    handleSubmit,
  };
};

export default useAddPromo;
