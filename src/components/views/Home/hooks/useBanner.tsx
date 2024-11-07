import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useEffect, useState } from "react";

export interface PromoItem {
  id: string;
  imageUrl: string;
  name: string;
}

const useBanner = () => {
  const [data, setData] = useState<PromoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUsersList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_BANNER}`,
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

  return { data, isLoading, error };
};

export default useBanner;
