import { z, ZodError } from "zod";

// Utility function to validate API responses
async function validateResponse<T>(schema: z.ZodSchema<T>, response: { data: unknown }): Promise<T> {
  try {
    return schema.parse(response.data);
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation error:", error.errors);
      throw new Error("Invalid data received from the server.");
    }
    throw error;
  }
}

export default validateResponse;
