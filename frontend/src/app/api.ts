import axios, { type AxiosInstance } from "axios";
// import { useAuthStore } from "./store";

const DEFAULT_TIMEOUT_IN_MS = 1000;

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:2137",
  timeout: DEFAULT_TIMEOUT_IN_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

// TODO: Implement authentication and token management

// // Add auth token to requests
// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle token refresh or logout on 401
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       useAuthStore.getState().clearAuth();
//       window.location.href = "/login";
//     }
//     throw error;
//   }
// );

export default api;
