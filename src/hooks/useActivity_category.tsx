import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface ActivityItem {
  id: string;
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
}

const useActivityCategory = () => {
  const [dataActivity, setData] = useState<ActivityItem[]>([]);
  const [isLoadingActivity, setIsLoading] = useState(false);
  const [errorActivity, setError] = useState<string | null>(null);

  const router = useRouter();

  const getUsersList = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_ACTIVITIES_BY_CATEGORY}/${id}`,
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
    if (router.isReady && router.query.category) {
      getUsersList(router.query.category as string);
    }
  }, [router.isReady, router.query.category]);

  return { dataActivity, isLoadingActivity, errorActivity };
};

export default useActivityCategory;
