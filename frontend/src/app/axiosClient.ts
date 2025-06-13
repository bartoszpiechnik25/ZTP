import { useAppStore } from "@/shared/store/useAppStore";
import axios, { isAxiosError, type AxiosInstance } from "axios";

const DEFAULT_TIMEOUT_IN_MS = 1000;

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:2137",
  timeout: DEFAULT_TIMEOUT_IN_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = useAppStore.getState().authToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("[api] Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isAxiosError(error) && error.response?.status === 401) {
      console.error("User is not authorized.");
      localStorage.removeItem("app-storage");
      window.location.href = "/sign-in?not-authorized";
    }

    throw error;
  }
);

export default api;
