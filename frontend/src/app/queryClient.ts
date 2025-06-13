import { MutationCache, QueryCache, QueryClient, type QueryMeta } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Log error for debugging
      console.error("Query Error:", {
        queryKey: query.queryKey,
        error,
        meta: query.meta,
      });
      if (query.meta?.suppressGlobalToast) {
        return;
      }
      toast.error("Something went wrong", {
        description: error?.message || "An unexpected error occurred.",
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      const meta = mutation.meta as QueryMeta | undefined;
      // Log error for debugging
      console.error("Mutation Error:", {
        mutation: meta?.mutationId,
        error,
      });
      if (mutation.meta?.suppressGlobalToast) {
        return;
      }
      toast.error("Something went wrong", {
        description: error?.message || "An unexpected error occurred.",
      });
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2, // 2 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error: unknown) => {
        // Don't retry validation errors
        if (error instanceof Error && error.message.includes("Invalid data")) {
          return false;
        }
        // TODO: Consider handling 401 errors with clearing auth state

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
