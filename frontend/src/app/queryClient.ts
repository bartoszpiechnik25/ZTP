import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        // Don't retry validation errors
        if (error instanceof Error && error.message.includes("Invalid data")) {
          return false;
        }
        // Type guard for AxiosError
        // Retry on server errors (status 500 and above) up to 3 times
        if (error instanceof AxiosError) {
          return error.response?.status !== undefined && error.response?.status >= 500 && failureCount < 3;
        }
        // For non-axios errors or other cases, do not retry
        return false;
      },
    },
  },
});

export default queryClient;
