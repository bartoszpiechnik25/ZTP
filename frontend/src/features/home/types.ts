import { z } from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  completed: z.boolean(),
});

// Type inferred from the schema
export type Todo = z.infer<typeof TodoSchema>;

export type Filter = "all" | "completed" | "active";
