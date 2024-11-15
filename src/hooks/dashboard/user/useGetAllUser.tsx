import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import useSWR from "swr";

export interface UserItem {
  id: string;
  email: string;
  name: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: UserItem[];
}
const fetcher = async (url: string): Promise<UserItem[]> => {
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

const UseGetAllUser = () => {
  const { data, error, isLoading, mutate } = useSWR<UserItem[]>(
    `${BASE_URL.API}${END_POINT.GET_ALL_USER}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
      errorRetryCount: 3,
    }
  );
  const refreshUserList = async () => {
    await mutate();
  };
  return {
    data: data || [],
    isLoading,
    error: error?.message || null,
    mutate,
    refreshUserList,
  };
};

export default UseGetAllUser;
