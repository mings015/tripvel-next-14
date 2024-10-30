import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const UseLogin = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.LOGIN}`,
        loginData,
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );
      const token = response.data?.token;
      setCookie("token", token);
      setSuccess(true);
      setError("");

      setTimeout(() => {
        router.push("/");
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setSuccess(false);
      setError(e.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    handleLogin,
    success,
  };
};

export default UseLogin;
