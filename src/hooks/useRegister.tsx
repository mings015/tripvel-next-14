import { API_KEY, BASE_URL, END_POINT } from "@/helper/endpoint";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const UseRegister = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const passwordRepeat = formData.get("passwordRepeat");

    if (password !== passwordRepeat) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const registerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: password,
      passwordRepeat: passwordRepeat,
      role: formData.get("role"),
      profilePictureUrl:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80",
      phoneNumber: formData.get("phoneNumber"),
    };

    try {
      await axios.post(`${BASE_URL.API}${END_POINT.REGISTER}`, registerData, {
        headers: {
          apiKey: API_KEY,
        },
      });

      setSuccess(true);
      setError("");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setSuccess(false);
      setError(
        e.response?.data?.message ||
          e.response?.data?.errors[0]?.message ||
          "An error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    success,
    error,
    isLoading,
    handleRegister,
  };
};

export default UseRegister;
