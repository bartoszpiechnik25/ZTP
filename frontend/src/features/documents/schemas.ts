import { z } from "zod";

export const DocumentCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const DocumentTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const DocumentCategoryResponseSchema = z.object({
  categories: z.array(DocumentCategorySchema),
});

export const DocumentTypeResponseSchema = z.object({
  types: z.array(DocumentTypeSchema),
});

export const DocumentPageSchema = z.object({
  page_number: z.number(),
  content_type: z.string().optional(),
  document_content: z.string(),
});

export const CreateDocumentRequestSchema = z.object({
  title: z.string(),
  notes: z.string().optional(),
  document_type: z.string(),
  document_category: z.string(),
  document_pages: z.array(DocumentPageSchema),
});

export const UserDocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  notes: z.string().optional(),
  category: z.string(),
  type: z.string(),
});

export const GetAllUserDocumentsResponseSchema = z.object({
  documents: z.array(UserDocumentSchema),
});
