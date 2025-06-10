import type {
  CreateDocumentRequestSchema,
  DocumentCategoryResponseSchema,
  DocumentCategorySchema,
  DocumentPageSchema,
  DocumentTypeResponseSchema,
  DocumentTypeSchema,
  GetAllUserDocumentsResponseSchema,
  UserDocumentSchema,
} from "@/features/documents/schemas";
import { z } from "zod";

export type DocumentCategory = z.infer<typeof DocumentCategorySchema>;
export type DocumentType = z.infer<typeof DocumentTypeSchema>;
export type DocumentCategoryResponse = z.infer<typeof DocumentCategoryResponseSchema>;
export type DocumentTypeResponse = z.infer<typeof DocumentTypeResponseSchema>;
export type DocumentPage = z.infer<typeof DocumentPageSchema>;
export type CreateDocumentRequest = z.infer<typeof CreateDocumentRequestSchema>;
export type UserDocument = z.infer<typeof UserDocumentSchema>;
export type GetAllUserDocumentsResponse = z.infer<typeof GetAllUserDocumentsResponseSchema>;
