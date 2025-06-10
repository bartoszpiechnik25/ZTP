import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { useTodosStore } from "../store/todosStore";
import type { Filter } from "@/features/research/types";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { Blockquote } from "@/shared/components/ui/typography/Blockquote";
import { Button } from "@/shared/components/ui/Button";
import { Small } from "@/shared/components/ui/typography/Paragraph";
import { Input } from "@/shared/components/ui/Input";
import { H3 } from "@/shared/components/ui/typography/Headings";
import { Pagination } from "@/shared/components/Pagination";

const todosFilters: Filter[] = ["all", "active", "completed"];

const TestTodos = () => {
  const { todosQuery, addTodo, updateTodo, deleteTodo, pagination, isLoading, error } = useTodos();
  const { filter, setFilter } = useTodosStore();
  const [newTitle, setNewTitle] = useState("");

  const filteredTodos = todosQuery.data?.data?.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    return !todo.completed;
  });

  const handleAdd = () => {
    if (newTitle.trim()) {
      addTodo({ title: newTitle, completed: false });
      setNewTitle("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  // Error handling - can check for specific types of errors
  if (error) {
    return <Blockquote>Error loading todos</Blockquote>;
  }
  // TODO: Consider more specific error handling
  // if (error) {
  //   if (error instanceof Error && error.message.includes("validation")) {
  //     return <Blockquote>Data validation error: {error.message}</Blockquote>;
  //   }
  //   return <Blockquote>Error loading todos: {error instanceof Error ? error.message : "Unknown error"}</Blockquote>;
  // }

  return (
    <div className="mx-auto flex flex-col gap-4 items-center">
      <H3>Todos</H3>
      <div className="flex flex-row gap-2">
        <Input
          className="w-50"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          disabled={isLoading}
        />
        <Button onClick={handleAdd} disabled={isLoading || !newTitle.trim()}>
          {isLoading ? <LoadingSpinner size={16} /> : "Add"}
        </Button>
      </div>

      <div className="flex gap-2 items-center">
        <Small>Filter:</Small>
        {todosFilters.map((f) => (
          <Button key={f} onClick={() => setFilter(f)} variant={filter === f ? "default" : "outline"}>
            {f}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <LoadingSpinner animating={true} size={32} />
      ) : (
        <>
          {filteredTodos && filteredTodos.length > 0 ? (
            <ul className="flex flex-col gap-2 w-full max-w-md">
              {filteredTodos.map((todo) => (
                <li key={todo.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => updateTodo({ id: todo.id, updated: { completed: !todo.completed } })}
                    />
                    <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.title}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    {/* <Small>{new Date(todo.createdAt).toLocaleDateString()}</Small> */}
                    <Button onClick={() => deleteTodo(todo.id)} size="sm" variant="destructive">
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Blockquote>No todos found</Blockquote>
          )}
        </>
      )}

      {/* Pagination controls */}
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={pagination.changePage}
        />
      )}

      {/* Page size selector */}
      <div className="flex gap-2 items-center mt-4">
        <Small>Items per page:</Small>
        {[5, 10, 20].map((size) => (
          <Button
            key={size}
            onClick={() => pagination.changePageSize(size)}
            variant={pagination.pageSize === size ? "default" : "outline"}
            size="sm"
          >
            {size}
          </Button>
        ))}
      </div>

      {/* Show total items count */}
      <Small className="text-muted-foreground">
        Showing {filteredTodos?.length || 0} of {pagination.totalItems} todos
      </Small>
    </div>
  );
};

export default TestTodos;
