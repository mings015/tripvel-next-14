import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import UseUploadImage from "@/hooks/useUploadImage";

interface EditActivityResponse {
  code: string;
  status: string;
  message: string;
}

interface EditActivityPayload {
  categoryId: string;
  title: string;
  description: string;
  imageUrls: string[];
  price: number;
  price_discount: number;
  rating: number;
  total_reviews: number;
  facilities: string;
  address: string;
  province: string;
  city: string;
  location_maps: string;
}

const useEditActivity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const { uploadImage } = UseUploadImage();

  const editActivity = async (
    activityId: string,
    data: EditActivityPayload
  ) => {
    setIsLoading(true);
    setUploadProgress(0);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<EditActivityResponse>(
        `${BASE_URL.API}${END_POINT.EDIT_ACTIVITY}/${activityId}`,
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
          description: "Activity updated successfully",
        });
        return true;
      }

      throw new Error(response.data.message || "Failed to update activity");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update activity",
      });
      return false;
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleImagesUpload = async (files: File[]) => {
    try {
      const uploadedUrls: string[] = [];
      let progress = 0;
      const progressIncrement = 100 / files.length;

      for (const file of files) {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          uploadedUrls.push(imageUrl);
          progress += progressIncrement;
          setUploadProgress(Math.round(progress));
        }
      }

      return uploadedUrls;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload images",
      });
      return null;
    }
  };

  return {
    editActivity,
    handleImagesUpload,
    isLoading,
    uploadProgress,
  };
};

export default useEditActivity;
