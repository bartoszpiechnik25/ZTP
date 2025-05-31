import type { Filter } from "@/features/home/types";
import { create } from "zustand";

type TodosStore = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const useTodosStore = create<TodosStore>((set) => ({
  filter: "all",
  setFilter: (filter) => set({ filter }),
}));
