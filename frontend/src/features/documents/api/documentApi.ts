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
  Document,
} from "@/features/documents/types";
import validateResponse from "@/shared/utils/validateResponse";

export const documentApi = {
  getCategories: async (): Promise<DocumentCategoryResponse> => {
    try {
      const response = await api.get("/document/categories");
      const categories = validateResponse(DocumentCategoryResponseSchema, response);
      return {
        categories: [...categories.categories, { id: "0", name: "All" }],
      };
    } catch {
      throw new Error("An error occurred during fetching document categories.");
    }
  },

  getTypes: async (): Promise<DocumentTypeResponse> => {
    try {
      const response = await api.get("/document/types");
      const types = validateResponse(DocumentTypeResponseSchema, response);
      return {
        types: [...types.types, { id: "0", name: "All" }],
      };
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
  getAllUserDocuments: async (): Promise<Document[]> => {
    try {
      const response = await api.get("/user/documents");
      const validatedResponse = validateResponse(GetAllUserDocumentsResponseSchema, response);
      const documents = validatedResponse.documents;
      // TODO: Provide real data from the backend
      return documents.map((doc) => {
        const randomSize = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
        return {
          ...doc,
          status: "processed", // Default status, can be updated based on actual processing logic
          extension: "pdf", // Default extension, can be updated based on actual file type
          size: `${randomSize} KB`, // Default size, can be updated based on actual file size
          uploadedAt: new Date().toISOString(), // Default uploaded date, can be updated based on actual upload time
          modifiedAt: new Date().toISOString(), // Default modified date, can be updated based on actual modification time
        };
      });
    } catch (error) {
      console.error("Error fetching user documents:", error);
      throw new Error("An error occurred while fetching documents.");
    }
  },
  // TODO: Add deleteDocument and getDocumentById etc
};
