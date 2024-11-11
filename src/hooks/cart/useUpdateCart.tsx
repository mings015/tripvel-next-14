// hooks/cart/useUpdateCart.ts
import { useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import { toast } from "../use-toast";

interface UpdateCartResponse {
  code: string;
  status: string;
  message: string;
}

const useUpdateCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const updateQuantity = async (
    cartId: string,
    quantity: number
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        toast({
          title: "Error",
          description: "Please login to update cart",
          variant: "destructive",
        });
        return false;
      }

      const response = await axios.post<UpdateCartResponse>(
        `${BASE_URL.API}${END_POINT.UPDATE_CART}/${cartId}`,
        {
          quantity: quantity,
        },
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "OK") {
        toast({
          title: "Success",
          description: "Cart quantity updated successfully",
        });
        return true;
      }

      toast({
        title: "Error",
        description: response.data.message || "Failed to update cart quantity",
        variant: "destructive",
      });
      return false;
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update cart quantity",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateQuantity, isLoading };
};

export default useUpdateCart;
