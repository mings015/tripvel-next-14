import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState } from "react";

interface UploadImageResponse {
  code: string;
  status: string;
  message: string;
  url: string;
}

const UseUploadImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadImage = async (file: File): Promise<string> => {
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<UploadImageResponse>(
        `${BASE_URL.API}${END_POINT.UPLOAD_IMAGE}`,
        imageFormData,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress =
                (progressEvent.loaded / progressEvent.total) * 100;
              setUploadProgress(Math.round(progress));
            }
          },
        }
      );

      if (response.data?.code === "200") {
        return response.data.url;
      }
      throw new Error("Failed to upload image");
    } catch (error) {
      throw error;
    }
  };

  return { uploadImage, uploadProgress };
};

export default UseUploadImage;
