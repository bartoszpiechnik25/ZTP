import { z } from "zod";

// Basic Todo schema
export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  completed: z.boolean(),
  slug: z.string(),
  // createdAt: z.string().datetime({ message: "Invalid date format" }),
});

// Schema for creating a new todo (without id, slug, and createdAt which are server-generated)
export const CreateTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  completed: z.boolean().default(false),
});

// Schema for updating a todo (all fields optional except id)
export const UpdateTodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required").optional(),
  completed: z.boolean().optional(),
});

// Schema for pagination response from server
export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  totalItems: z.number().int().nonnegative(),
});

// Schema for paginated todos response
export const PaginatedTodosSchema = z.object({
  data: z.array(TodoSchema),
  page: z.number().int().positive(),
  pageSize: z.number().int().positive(),
  totalPages: z.number().int().nonnegative(),
  totalItems: z.number().int().nonnegative(),
});
