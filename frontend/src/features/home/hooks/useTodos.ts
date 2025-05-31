import { todosApi } from "@/features/home/api/todosApi";
import type { Todo } from "@/features/home/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useTodos = () => {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const { data } = await todosApi.getTodos();
      return data;
    },
    retry: false, // Disable automatic retries
  });

  const addTodoMutation = useMutation({
    mutationFn: todosApi.addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, updated }: { id: string; updated: Partial<Todo> }) => todosApi.updateTodo(id, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: todosApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todosQuery,
    addTodo: addTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
  };
};
