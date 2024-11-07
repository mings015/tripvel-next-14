import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface PromoItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
}

const usePromoId = () => {
  const [data, setData] = useState<PromoItem>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const getUsersList = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.GET_PROMO_BY_ID}/${id}`,
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
    if (router.isReady && router.query.promo) {
      getUsersList(router.query.promo as string);
    }
  }, [router.isReady, router.query.promo]);

  return { data, isLoading, error };
};

export default usePromoId;
