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
export type Document = UserDocument & {
  status: DocumentStatus;
  extension: DocumentExtension;
  size: string;
  uploadedAt: string;
  modifiedAt: string;
  // thumbnail: string;
};

export const DOCUMENT_EXTENSIONS = [
  "All",
  "pdf",
  "docx",
  "doc",
  "xlsx",
  "pptx",
  "txt",
  "md",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "svg",
] as const;
export const DOCUMENT_STATUSES = ["All", "processed", "processing", "failed"] as const;

export type DocumentStatus = (typeof DOCUMENT_STATUSES)[number];
export type DocumentExtension = (typeof DOCUMENT_EXTENSIONS)[number];
