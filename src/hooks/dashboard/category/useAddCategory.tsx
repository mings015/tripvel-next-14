import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import UseUploadImage from "@/hooks/useUploadImage";
import { useRouter } from "next/router";

interface AddCategoryResponse {
  code: string;
  status: string;
  message: string;
}

interface AddCategoryPayload {
  name: string;
  imageUrl: string;
}

interface FormData {
  name: string;
  imageUrl: string | null;
  pictureFile: File | null;
}

const useAddCategory = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const { uploadImage } = UseUploadImage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    imageUrl: null,
    pictureFile: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const addCategory = async (data: AddCategoryPayload) => {
    setIsLoading(true);
    setUploadProgress(0);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<AddCategoryResponse>(
        `${BASE_URL.API}${END_POINT.CREATE_CATEGORY}`,
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
          description: "Category added successfully",
        });
        return true;
      }

      throw new Error(response.data.message || "Failed to add Category");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to add Category",
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

    if (!formData.pictureFile || !formData.name) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields",
      });
      return;
    }

    const imageUrl = await handleImageUpload(formData.pictureFile);
    if (!imageUrl) return;

    const success = await addCategory({
      name: formData.name,
      imageUrl: imageUrl,
    });

    if (success) {
      router.push("/dashboard/category");
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

export default useAddCategory;
