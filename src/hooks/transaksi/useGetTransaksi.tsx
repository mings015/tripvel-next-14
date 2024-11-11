import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";

export interface GetTransaksiItem {
  id: string;
  userId: string;
  paymentMethodId: string;
  invoiceId: string;
  status: string;
  totalAmount: number;
  proofPaymentUrl?: string;
  orderDate: string;
  expiredDate: string;
  createdAt: string;
  updatedAt: string;
  payment_method: PaymentMethod;
  transaction_items: TransactionItem[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  virtual_account_number: string;
  virtual_account_name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionItem {
  imageUrls: string[];
  id: string;
  transactionId: string;
  title: string;
  description: string;
  price: number;
  price_discount: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

const useGetTransaksi = () => {
  const [data, setData] = useState<GetTransaksiItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTransaksiList = async () => {
    setIsLoading(true);
    setError(null);
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.MY_TRANSAKSI}`,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
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
    getTransaksiList();
  }, []);

  return { data, isLoading, error };
};

export default useGetTransaksi;
