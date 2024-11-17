import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

export interface CategoryItem {
  id: string;
  imageUrl: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  category: CategoryItem;
  imageUrls: string;
  title: string;
  description: string;
  price: number;
  price_discount: number;
  rating: number;
  total_reviews: number;
  facilities: string;
  address: string;
  province: string;
  city: string;
  location_maps: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: ActivityItem[];
}

const fetcher = async (url: string): Promise<ActivityItem[]> => {
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

const useActivity = () => {
  const { data, error, isLoading, mutate } = useSWR<ActivityItem[]>(
    `${BASE_URL.API}${END_POINT.GET_ACTIVITIES}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      errorRetryCount: 3,
    }
  );

  const refreshActivity = async () => {
    await mutate();
  };

  return {
    data: data || [],
    isLoading,
    error: error?.message || null,
    mutate,
    refreshActivity,
  };
};

export default useActivity;
