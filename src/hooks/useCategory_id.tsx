import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface CategoryItem {
  id: string;
  imageUrl: string;
  name: string;
}

const useCaregoryId = () => {
  const [data, setData] = useState<CategoryItem>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getUsersList = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_CATEGORY_BY_ID}/${id}`,
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

  return { data, isLoading, error };
};

export default useCaregoryId;
