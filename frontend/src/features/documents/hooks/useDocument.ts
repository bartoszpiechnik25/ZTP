import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { documentApi } from "../api/documentApi";
import { useAppStore } from "@/shared/store/useAppStore";

export const useDocument = () => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAppStore();

  // TODO: Combine these queries into one if possible
  const documentCategoriesQuery = useQuery({
    queryKey: ["document-categories"],
    queryFn: documentApi.getCategories,
    enabled: isAuthenticated && !!user,
    initialData: { categories: [] },
    staleTime: 0,
  });

  const documentTypesQuery = useQuery({
    queryKey: ["document-types"],
    queryFn: documentApi.getTypes,
    enabled: isAuthenticated && !!user,
    initialData: { types: [] },
    staleTime: 0,
  });

  const createDocumentMutation = useMutation({
    mutationFn: documentApi.createDocument,
    onSuccess: () => {
      console.log(`[LOG][useDocument] Document created successfully`);
      queryClient.invalidateQueries({ queryKey: ["userDocuments"] });
    },
  });

  const userDocumentsQuery = useQuery({
    queryKey: ["userDocuments"],
    queryFn: documentApi.getAllUserDocuments,
    enabled: isAuthenticated && !!user,
    initialData: [],
    staleTime: 0,
  });

  return {
    documentCategories: documentCategoriesQuery.data?.categories,
    documentTypes: documentTypesQuery.data?.types,
    createDocument: createDocumentMutation.mutate,
    resetCreatingDocument: createDocumentMutation.reset,
    userDocuments: userDocumentsQuery.data,
    isUserDocumentsLoading: userDocumentsQuery.isLoading,
    isCreatingDocument: createDocumentMutation.isPending,
    isCreateDocumentSuccess: createDocumentMutation.isSuccess,
    isDocumentCategoriesLoading: documentCategoriesQuery.isLoading,
    isDocumentTypesLoading: documentTypesQuery.isLoading,
    documentCategoriesError: documentCategoriesQuery.error,
    documentTypesError: documentTypesQuery.error,
    isDocumentCategoriesError: documentCategoriesQuery.isError,
    isDocumentTypesError: documentTypesQuery.isError,
    isDocumentLoading: documentCategoriesQuery.isLoading || documentTypesQuery.isLoading,
  };
};
