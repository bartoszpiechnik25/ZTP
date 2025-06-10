import { useState } from "react";
import todosApi from "@/features/research/api/todosApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "@/features/research/types";

export const useTodos = (initialPage = 1, initialPageSize = 10) => {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({ page: initialPage, pageSize: initialPageSize });

  // Query for fetching todos with pagination
  const todosQuery = useQuery({
    queryKey: ["todos", pagination.page, pagination.pageSize],
    queryFn: () => todosApi.getTodos(pagination),
  });

  // Mutation for adding a new todo
  const addTodoMutation = useMutation({
    mutationFn: todosApi.addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Mutation for updating a todo
  const updateTodoMutation = useMutation({
    mutationFn: ({ id, updated }: { id: string; updated: Partial<Todo> }) => todosApi.updateTodo(id, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Mutation for deleting a todo
  const deleteTodoMutation = useMutation({
    mutationFn: todosApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // Function to change pagination
  const changePage = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const changePageSize = (newPageSize: number) => {
    setPagination(() => ({ page: 1, pageSize: newPageSize }));
  };

  return {
    todosQuery,
    addTodo: addTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    pagination: {
      ...pagination,
      totalPages: todosQuery.data?.totalPages || 0,
      totalItems: todosQuery.data?.totalItems || 0,
      changePage,
      changePageSize,
    },
    isLoading:
      todosQuery.isLoading || addTodoMutation.isPending || updateTodoMutation.isPending || deleteTodoMutation.isPending,
    error: todosQuery.error || addTodoMutation.error || updateTodoMutation.error || deleteTodoMutation.error,
  };
};
