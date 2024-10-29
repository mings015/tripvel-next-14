import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

const UseLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL.API}${END_POINT.LOGIN}`,
        formData,
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
    formData,
    success,
    error,
    isLoading,
    handleChange,
    handleLogin,
  };
};

export default UseLogin;
