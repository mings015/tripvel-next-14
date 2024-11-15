import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import UseUploadImage from "@/hooks/useUploadImage";

interface EditCategoryResponse {
  code: string;
  status: string;
  message: string;
}

interface EditCategoryPayload {
  name: string;
  imageUrl: string;
}

const useEditCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const { uploadImage } = UseUploadImage();

  const editCategory = async (
    categoryId: string,
    data: EditCategoryPayload
  ) => {
    setIsLoading(true);
    setUploadProgress(0);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<EditCategoryResponse>(
        `${BASE_URL.API}${END_POINT.EDIT_CATEGORY}/${categoryId}`,
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
          description: "Category updated successfully",
        });
        return true;
      }

      throw new Error(response.data.message || "Failed to update Category");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update Category",
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

  return {
    editCategory,
    handleImageUpload,
    isLoading,
    uploadProgress,
  };
};

export default useEditCategory;
