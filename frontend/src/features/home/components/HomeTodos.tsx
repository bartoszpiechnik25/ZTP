import { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import { useTodosStore } from "../store/todosStore";
import type { Filter } from "@/features/home/types";
import LoadingSpinner from "@/shared/components/LoadingSpinner";
import { Blockquote } from "@/shared/components/ui/typography/Blockquote";

const todosFilters: Filter[] = ["all", "active", "completed"];

const HomeTodos = () => {
  const { todosQuery, addTodo, updateTodo, deleteTodo } = useTodos();
  const { filter, setFilter } = useTodosStore();
  const [newTitle, setNewTitle] = useState("");

  const filteredTodos = todosQuery.data?.filter((todo) => {
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

  if (todosQuery.isLoading) return <LoadingSpinner animating={true} size={32} />;
  if (todosQuery.error) return <Blockquote>Error loading todos</Blockquote>;

  return (
    <div>
      <h2>Todos</h2>
      <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
      <button onClick={handleAdd}>Add</button>

      <div>
        Filter:
        {todosFilters.map((f) => (
          <button key={f} onClick={() => setFilter(f)} style={{ fontWeight: filter === f ? "bold" : "normal" }}>
            {f}
          </button>
        ))}
      </div>

      <ul>
        {filteredTodos?.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo({ id: todo.id, updated: { completed: !todo.completed } })}
            />
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeTodos;
