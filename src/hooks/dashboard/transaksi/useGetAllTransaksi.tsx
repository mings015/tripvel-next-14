import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import React from "react";
import useSWR from "swr";

export interface ApiResponse {
  code: string;
  status: string;
  message: string;
  data: TransaksiItem[];
}

export interface TransaksiItem {
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

const fetcher = async (url: string): Promise<TransaksiItem[]> => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  const response = await axios.get<ApiResponse>(url, {
    headers: {
      apiKey: API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

const UseGetAllTransaksi = () => {
  const { data, error, isLoading, mutate } = useSWR<TransaksiItem[]>(
    `${BASE_URL.API}${END_POINT.ALL_TRANSAKSI}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      errorRetryCount: 3,
    }
  );
  const refreshTransaksiList = async () => {
    await mutate();
  };
  return {
    data: data || [],
    isLoading,
    error: error?.message || null,
    mutate,
    refreshTransaksiList,
  };
};

export default UseGetAllTransaksi;
