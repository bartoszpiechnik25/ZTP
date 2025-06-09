import { z } from "zod";

// User schema matches the backend model
export const UserSchema = z.object({
  name: z.string().nullable().optional(),
  surname: z.string().nullable().optional(),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(1, "Phone number is required"),
  role: z.enum(["admin", "user"]),
});

// Schema for sign in request
export const SignInRequestSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for sign in response
export const SignInResponseSchema = z.object({
  token: z.string(),
});

// Schema for sign up (create user) request
export const SignUpRequestSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone_number: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Schema for forgot password request
export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Schema for getting user by email
export const GetUserByEmailRequestSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Schema for user response
export const UserResponseSchema = UserSchema;
