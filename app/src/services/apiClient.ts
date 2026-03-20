import axios from "axios";
import type { AxiosInstance } from "axios";
import { clearAuth, getToken } from "../utils/authStorage";
import type { ApiResponse } from "../types/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "https://localhost:7293/api/",
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || "30000"),
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach JWT token automatically
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await clearAuth();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

/**
 * Typed API call wrapper with error handling
 */
export async function apiCall<T>(
  fn: () => Promise<{ data: T }>
): Promise<ApiResponse<T>> {
  try {
    const response = await fn();
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    const apiError = error as any;
    const message =
      apiError?.response?.data?.message || apiError?.message || "An error occurred";

    return {
      success: false,
      message,
      errors: apiError?.response?.data?.errors,
    };
  }
}

export default apiClient;