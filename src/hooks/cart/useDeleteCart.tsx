import axios from "axios";
import { useState } from "react";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import { toast } from "../use-toast";

const useDeleteCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const removeItem = async (cartId: string) => {
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.delete(
        `${BASE_URL.API}${END_POINT.DELETE_CART}/${cartId}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
          data: { cartId },
        }
      );

      if (response.data.code === "200") {
        toast({
          title: "Success",
          description: "Item has been removed from your cart",
        });
        setIsSuccess(true);
        return true;
      }

      toast({
        title: "Error",
        description: response.data.message || "Failed to remove item",
        variant: "destructive",
      });
      return false;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to remove item",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { removeItem, isLoading, isSuccess };
};

export default useDeleteCart;
