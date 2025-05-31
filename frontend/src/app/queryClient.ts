import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        // Type guard to check if it's an AxiosError
        if (error instanceof Error && "response" in error) {
          const axiosError = error as AxiosError;
          console.log(`[LOG][queryClient] Retrying query due to error:`, axiosError);
          return axiosError.response?.status !== undefined && axiosError.response?.status >= 500 && failureCount < 3;
        }
        // For non-axios errors, only retry a few times
        return failureCount < 2;
      },
    },
  },
});

export default queryClient;
