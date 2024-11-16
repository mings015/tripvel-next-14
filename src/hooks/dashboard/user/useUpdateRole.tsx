import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";

interface UpdateUserResponse {
  code: string;
  status: string;
  message: string;
}

interface UpdateUserPayload {
  role: string;
}

const UseUpdateRole = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateUser = async (userId: string, data: UpdateUserPayload) => {
    setIsLoading(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.post<UpdateUserResponse>(
        `${BASE_URL.API}${END_POINT.UPDATE_USER_ROLE}/${userId}`,
        data,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === "200") {
        toast({
          title: "Success",
          description: "User updated successfully",
        });
        return true;
      }

      throw new Error(response.data.message || "Failed to update user");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.message || "Failed to update user",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return updateUser;
};

export default UseUpdateRole;
