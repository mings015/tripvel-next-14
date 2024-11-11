import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import React, { useEffect, useState } from "react";

export interface PaymentItem {
  id: string;
  imageUrl: string;
  name: string;
}

const PaymentMethod = () => {
  const [ListPayment, setData] = useState<PaymentItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsersList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_PAYMENT_METHOD}`,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      setData(response.data.data);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching users."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return { ListPayment, isLoading, error };
};

export default PaymentMethod;
