import axios from "axios";
import { clearAuth, getToken } from "../utils/authStorage";

const apiClient = axios.create({
  baseURL: "https://localhost:7293/api/",
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
       await  clearAuth();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  });

export default apiClient;