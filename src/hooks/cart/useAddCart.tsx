import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useState } from "react";
import { toast } from "../use-toast";

interface AddCartResponse {
  code: string;
  status: string;
  message: string;
}

const useAddCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (activityId: string) => {
    try {
      setIsLoading(true);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<AddCartResponse>(
        `${BASE_URL.API}${END_POINT.ADD_CART}`,
        { activityId },
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

  return { addToCart, isLoading };
};

export default useAddCart;
