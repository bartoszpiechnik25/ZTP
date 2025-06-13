import api from "@/app/axiosClient";
import { PaginatedTodosSchema, CreateTodoSchema, TodoSchema, UpdateTodoSchema } from "@/features/home/schemas";
import type { CreateTodo, Todo } from "@/features/home/types";
import validateResponse from "@/shared/utils/validateResponse";

const todosApi = {
  // Get todos with pagination
  getTodos: async ({ page = 1, pageSize = 10 } = {}) => {
    const response = await api.get("/todos", {
      params: { page, pageSize },
    });
    return validateResponse(PaginatedTodosSchema, response);
  },

  // Add a new todo
  addTodo: async (newTodo: CreateTodo) => {
    // Validate request data
    CreateTodoSchema.parse(newTodo);

    const response = await api.post("/todos", newTodo);
    return validateResponse(TodoSchema, response);
  },

  // Update a todo
  updateTodo: async (id: string, updated: Partial<Todo>) => {
    // Validate request data
    UpdateTodoSchema.parse({ id, ...updated });

    const response = await api.put(`/todos/${id}`, updated);
    return validateResponse(TodoSchema, response);
  },

  // Delete a todo
  deleteTodo: async (id: string) => {
    await api.delete(`/todos/${id}`);
    return { success: true };
  },

  // Search todos
  searchTodos: async (query: string, { page = 1, pageSize = 10 } = {}) => {
    const response = await api.get("/todos/search", {
      params: { q: query, page, pageSize },
    });
    return validateResponse(PaginatedTodosSchema, response);
  },

  // Get todo by slug
  getTodoBySlug: async (slug: string) => {
    const response = await api.get(`/todos/${slug}`);
    return validateResponse(TodoSchema, response);
  },
};

export default todosApi;
