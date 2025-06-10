import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../api/documentApi";
import { useAppStore } from "@/shared/store/useAppStore";

export const useDocument = () => {
  const { user, isAuthenticated } = useAppStore();

  const documentCategoriesQuery = useQuery({
    queryKey: ["document-categories"],
    queryFn: documentApi.getCategories,
    enabled: isAuthenticated && !!user,
    initialData: { categories: [] },
  });

  const documentTypesQuery = useQuery({
    queryKey: ["document-types"],
    queryFn: documentApi.getTypes,
    enabled: isAuthenticated && !!user,
    initialData: { types: [] },
  });

  return {
    documentCategories: documentCategoriesQuery.data?.categories,
    documentTypes: documentTypesQuery.data?.types,
    isLoading: documentCategoriesQuery.isLoading || documentTypesQuery.isLoading,
    isError: documentCategoriesQuery.isError || documentTypesQuery.isError,
    error: documentCategoriesQuery.error || documentTypesQuery.error,
  };
};
