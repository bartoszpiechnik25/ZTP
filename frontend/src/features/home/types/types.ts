import type {
  TodoSchema,
  CreateTodoSchema,
  UpdateTodoSchema,
  PaginatedTodosSchema,
} from "@/features/home/types/schemas";
import type z from "zod";

// TypeScript types derived from the schemas
export type Todo = z.infer<typeof TodoSchema>;
export type CreateTodo = z.infer<typeof CreateTodoSchema>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;
export type PaginatedTodos = z.infer<typeof PaginatedTodosSchema>;

// Type for the filter
export type Filter = "all" | "active" | "completed";
