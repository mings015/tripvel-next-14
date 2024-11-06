import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { FormEvent, useState, useEffect } from "react";

interface LoginState {
  role: string | null;
  shouldRedirect: boolean;
}

const UseLogin = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, setLoginState] = useState<LoginState>({
    role: null,
    shouldRedirect: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (loginState.shouldRedirect && loginState.role) {
      const handleRedirect = async () => {
        const path = loginState.role === "admin" ? "/dashboard" : "/";
        await router.push(path);
        window.location.reload();
      };

      handleRedirect();
    }
  }, [loginState, router]);

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
      const role = response.data?.data.role;

      setCookie("token", token);
      setSuccess(true);
      setError("");

      setLoginState({
        role: role,
        shouldRedirect: true,
      });
    } catch (e: any) {
      setSuccess(false);
      setError(e.response?.data?.message || "An error occurred");
      setLoginState({
        role: null,
        shouldRedirect: false,
      });
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
