import axios, { type AxiosInstance } from "axios";

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
    const token = localStorage.getItem("authToken");
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
  (response) => response
  // async (error) => {
  //   console.error("[api] Response error:", error);

  //   const statusCode = error.response?.status;
  //   switch (statusCode) {
  //     case 400: {
  //       console.error("Bad request. Please check your input.");
  //       break;
  //     }
  //     case 401: {
  //       console.error("Unauthorized. Please log in again.");
  //       localStorage.removeItem("authToken");
  //       window.location.href = "/sign-in";
  //       break;
  //     }
  //     case 403: {
  //       console.error("Access forbidden. You do not have permission to access this resource.");
  //       break;
  //     }
  //     case 404: {
  //       console.error("Resource not found. Please check the URL.");
  //       break;
  //     }
  //     case 409: {
  //       console.error(
  //         "Conflict error. The request could not be completed due to a conflict with the current state of the resource."
  //       );
  //       break;
  //     }
  //     case 429: {
  //       console.error("Too many requests. Please try again later.");
  //       break;
  //     }
  //     case 500: {
  //       console.error("Internal server error. Please try again later.");
  //       break;
  //     }
  //     default: {
  //       console.error(`Unexpected error: ${error.message}`);
  //     }
  //   }
  //   throw error;
  // }
);

export interface ApiError {
  message: string;
  code: string | number;
  details?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatApiError = (error: any, defaultMessage: string): ApiError => {
  if (error.request) {
    // No response received
    return {
      message: "Network error. Please check your connection",
      code: "NETWORK_ERROR",
    };
  }
  return {
    message: error.message || defaultMessage,
    code: "REQUEST_ERROR",
  };
};

export default api;
