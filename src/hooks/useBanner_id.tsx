import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface BannerItem {
  id: string;
  imageUrl: string;
  name: string;
}

const useBannerId = (bannerId?: string) => {
  const [data, setData] = useState<BannerItem>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getUsersList = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_BANNER_BY_ID}/${id}`,
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
    if (router.isReady && router.query.banner) {
      getUsersList(router.query.banner as string);
    }
  }, [router.isReady, router.query.banner]);

  return { data, isLoading, error };
};

export default useBannerId;
