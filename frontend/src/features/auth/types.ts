import { ForgotPasswordRequestSchema } from "./schemas";
import type {
  UserSchema,
  SignInRequestSchema,
  SignInResponseSchema,
  SignUpRequestSchema,
  GetUserByEmailRequestSchema,
  UserResponseSchema,
} from "@/features/auth/schemas";
import type z from "zod";

// User type
export type User = z.infer<typeof UserSchema>;

// Auth request/response types
export type SignInRequest = z.infer<typeof SignInRequestSchema>;
export type SignInResponse = z.infer<typeof SignInResponseSchema>;
export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;
export type GetUserByEmailRequest = z.infer<typeof GetUserByEmailRequestSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type AuthResponse = {
  user: User;
  token: string;
}; // TODO: Add user to login response in the backend.

// Auth context type for the store - add this to the useAppStore.ts global store
export interface AuthState {
  user: User | undefined;
  token: string | undefined;
  isAuthenticated: boolean;
}
