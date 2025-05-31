import api from "@/app/api";
import type { Todo } from "@/features/home/types";

export const todosApi = {
  getTodos: () => api.get<Todo[]>("/todos"),
  addTodo: (newTodo: Omit<Todo, "id">) => api.post<Todo>("/todos", newTodo),
  updateTodo: (id: string, updated: Partial<Todo>) => api.patch<Todo>(`/todos/${id}`, updated),
  deleteTodo: (id: string) => api.delete(`/todos/${id}`),
};
