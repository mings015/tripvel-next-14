import axios, { AxiosError } from "axios";
import { API_KEY, BASE_URL, END_POINT } from "../helper/endpoint";
import { ApiResponse } from "../types/api";

interface ValidationResponse {
  isValid: boolean;
  role?: string;
  error?: string;
}

export async function validateToken(
  token: string
): Promise<ValidationResponse> {
  try {
    const response = await axios.get<ApiResponse>(
      `${BASE_URL.API}${END_POINT.GET_LOGGED_USER}`,
      {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      isValid: response.data?.code === "200",
      role: response.data?.data?.role,
      error: response.data?.code !== "200" ? "Invalid token" : undefined,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        isValid: false,
        error: error.response?.data?.message || "Token validation failed",
      };
    }
    return {
      isValid: false,
      error: "Unknown error occurred",
    };
  }
}
