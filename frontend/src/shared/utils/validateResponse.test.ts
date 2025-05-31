import { describe, it, expect, vi, beforeEach } from "vitest";
import validateResponse from "./validateResponse";
import { z } from "zod";

describe("validateResponse", () => {
  // Mock console.error
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("should successfully validate valid data", async () => {
    // Arrange
    const schema = z.object({
      id: z.number(),
      name: z.string(),
    });
    const response = {
      data: {
        id: 1,
        name: "Test",
      },
    };

    // Act
    const result = await validateResponse(schema, response);

    // Assert
    expect(result).toEqual(response.data);
  });

  it("should throw an error for invalid data", async () => {
    // Arrange
    const schema = z.object({
      id: z.number(),
      name: z.string(),
    });
    const response = {
      data: {
        id: "invalid", // should be a number
        name: 123, // should be a string
      },
    };

    // Act & Assert
    await expect(validateResponse(schema, response)).rejects.toThrow("Invalid data received from the server.");
    expect(console.error).toHaveBeenCalledWith("Validation error:", expect.any(Array));
  });

  it("should pass through non-ZodError errors", async () => {
    // Arrange
    const schema = z.object({
      id: z.number(),
    });
    const originalError = new Error("Network error");

    // Mock the parse method to throw a non-ZodError
    vi.spyOn(schema, "parse").mockImplementation(() => {
      throw originalError;
    });

    // Act & Assert
    await expect(validateResponse(schema, { data: {} })).rejects.toBe(originalError);
  });

  it("should handle nested object validation", async () => {
    // Arrange
    const schema = z.object({
      user: z.object({
        id: z.number(),
        profile: z.object({
          name: z.string(),
        }),
      }),
    });

    const response = {
      data: {
        user: {
          id: 1,
          profile: {
            name: "John Doe",
          },
        },
      },
    };

    // Act
    const result = await validateResponse(schema, response);

    // Assert
    expect(result).toEqual(response.data);
  });
});
