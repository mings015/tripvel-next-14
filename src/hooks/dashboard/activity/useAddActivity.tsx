import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import UseUploadImage from "@/hooks/useUploadImage";
import { useRouter } from "next/router";

interface AddActivityResponse {
  code: string;
  status: string;
  message: string;
}

interface AddActivityPayload {
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

interface FormData extends AddActivityPayload {
  pictureFiles: File[];
}

const useAddActivity = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const { uploadImage } = UseUploadImage();
  const [formData, setFormData] = useState<FormData>({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: [],
    price: 0,
    price_discount: 0,
    rating: 0,
    total_reviews: 0,
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
    pictureFiles: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Validate file sizes
      const invalidFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
      if (invalidFiles.length > 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "One or more files exceed the 5MB size limit",
        });
        e.target.value = "";
        return;
      }

      // Create temporary URLs for preview
      const tempUrls = files.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        pictureFiles: [...prev.pictureFiles, ...files],
        imageUrls: [...prev.imageUrls, ...tempUrls],
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pictureFiles: prev.pictureFiles.filter((_, i) => i !== index),
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const uploadImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    let progress = 0;
    const progressIncrement = 100 / files.length;

    for (const file of files) {
      try {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          uploadedUrls.push(imageUrl);
          progress += progressIncrement;
          setUploadProgress(Math.round(progress));
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to upload image: ${file.name}`,
        });
      }
    }

    return uploadedUrls;
  };

  const addActivity = async (data: AddActivityPayload) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<AddActivityResponse>(
        `${BASE_URL.API}${END_POINT.CREATE_ACTIVITY}`,
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
          description: "Activity added successfully",
        });
        return true;
      }

      throw new Error(response.data.message || "Failed to add activity");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to add activity",
      });
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.pictureFiles.length) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please upload at least one image",
        });
        return;
      }

      const uploadedUrls = await uploadImages(formData.pictureFiles);
      if (!uploadedUrls.length) return;

      const success = await addActivity({
        ...formData,
        imageUrls: uploadedUrls,
      });

      if (success) {
        router.push("/dashboard/activity");
      }
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  return {
    formData,
    isLoading,
    uploadProgress,
    handleInputChange,
    handleTextAreaChange,
    handleCategoryChange,
    handleFileChange,
    handleRemoveImage,
    handleSubmit,
  };
};

export default useAddActivity;
