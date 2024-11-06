"use client";

import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { deleteCookie } from "cookies-next";
import { useToast } from "./use-toast";

const UseLogout = () => {
  const [success, setSuccess] = useState(false);
  const [errorLogout, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await axios.get(
        `${BASE_URL.API}${END_POINT.LOGOUT}`,

        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.code === "200") {
        setSuccess(true);
        deleteCookie("token");
        router.push("/login");
        toast({
          title: "Success Logout",
        });
      }
    } catch (err: any) {
      setError(err.response.data?.message);
      toast({
        variant: "destructive",
        title: errorLogout,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogout,
  };
};

export default UseLogout;
