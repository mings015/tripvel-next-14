import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import useSWR from "swr";

export interface CategoryItem {
  id: string;
  imageUrl: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: CategoryItem[];
}

const fetcher = async (url: string): Promise<CategoryItem[]> => {
  const response = await axios.get<ApiResponse>(url, {
    headers: {
      apiKey: API_KEY,
    },
  });
  return response.data.data;
};
const useCategory = () => {
  //   const [data, setData] = useState<PromoItem[]>([]);
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState<string | null>(null);

  const { data, error, isLoading, mutate } = useSWR<CategoryItem[]>(
    `${BASE_URL.API}${END_POINT.GET_CATEGORY}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      errorRetryCount: 3,
      revalidateOnReconnect: false,
    }
  );

  const refreshCategory = async () => {
    await mutate();
  };
  //   const getUsersList = async () => {
  //     setIsLoading(true);
  //     setError(null);
  //     try {
  //       const response = await axios.get(
  //         `${BASE_URL.API}${END_POINT.GET_CATEGORY}`,
  //         {
  //           headers: {
  //             apiKey: API_KEY,
  //           },
  //         }
  //       );
  //       setData(response.data.data);
  //     } catch (error: any) {
  //       setError(
  //         error.response?.data?.message ||
  //           "An error occurred while fetching users."
  //       );
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     getUsersList();
  //   }, []);

  return {
    data: data || [],
    isLoading,
    error: error?.message || null,
    mutate,
    refreshCategory,
  };
};

export default useCategory;
