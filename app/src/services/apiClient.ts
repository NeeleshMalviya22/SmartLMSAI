import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7293/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
