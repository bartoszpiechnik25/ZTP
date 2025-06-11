import api from "@/app/axiosClient";
import {
  DocumentCategoryResponseSchema,
  DocumentTypeResponseSchema,
  GetAllUserDocumentsResponseSchema,
} from "@/features/documents/schemas";
import type {
  CreateDocumentRequest,
  DocumentCategoryResponse,
  DocumentTypeResponse,
  GetAllUserDocumentsResponse,
} from "@/features/documents/types";
import validateResponse from "@/shared/utils/validateResponse";

export const documentApi = {
  getCategories: async (): Promise<DocumentCategoryResponse> => {
    try {
      const response = await api.get("/document/categories");
      return validateResponse(DocumentCategoryResponseSchema, response);
    } catch {
      throw new Error("An error occurred during fetching document categories.");
    }
  },

  getTypes: async (): Promise<DocumentTypeResponse> => {
    try {
      const response = await api.get("/document/types");
      return validateResponse(DocumentTypeResponseSchema, response);
    } catch {
      throw new Error("An error occurred during fetching document types.");
    }
  },

  createDocument: async (data: CreateDocumentRequest) => {
    try {
      await api.post("/document", data);
    } catch (error) {
      console.error("Error creating document:", error);
      throw new Error("An error occurred while adding the document. Please try again.");
    }
  },
  getAllUserDocuments: async (): Promise<GetAllUserDocumentsResponse> => {
    try {
      const response = await api.get("/user/documents");
      return validateResponse(GetAllUserDocumentsResponseSchema, response);
    } catch (error) {
      console.error("Error fetching user documents:", error);
      throw new Error("An error occurred while fetching documents.");
    }
  },
  // TODO: Add deleteDocument and getDocumentById etc
};
