import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import useSWR from "swr";

interface Activity {
  imageUrls: string[];
  id: string;
  categoryId: string;
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

interface CartItem {
  id: string;
  userId: string;
  activityId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  activity: Activity;
}

interface ApiResponse {
  status: string;
  message: string;
  data: CartItem[];
}

const getToken = (): string | null => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1] || null
  );
};

const fetcher = async (url: string): Promise<CartItem[]> => {
  const token = getToken();

  const response = await axios.get<ApiResponse>(url, {
    headers: {
      apiKey: API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};

const useGetCart = () => {
  const { data, error, isLoading, mutate } = useSWR<CartItem[]>(
    `${BASE_URL.API}${END_POINT.GET_CART}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      errorRetryCount: 3,
    }
  );

  const refreshCart = async () => {
    await mutate();
  };

  const updateCartOptimistically = async (
    updater: (currentData: CartItem[]) => CartItem[]
  ) => {
    try {
      await mutate((currentData) => updater(currentData || []), {
        revalidate: false,
      });
      await mutate();
    } catch (error) {
      console.error("Failed to update cart:");
      await mutate();
    }
  };

  const addToCart = async (newItem: CartItem) => {
    await updateCartOptimistically((currentItems) => [
      ...(currentItems || []),
      newItem,
    ]);
  };

  return {
    data: data || [],
    isLoadingCart: isLoading,
    errorCart: error?.message || null,
    mutate,
    refreshCart,
    addToCart,
    updateCartOptimistically,
  };
};

export default useGetCart;
