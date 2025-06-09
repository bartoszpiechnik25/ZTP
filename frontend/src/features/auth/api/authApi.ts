import api, { formatApiError } from "@/app/api";
import {
  SignInRequestSchema,
  SignUpRequestSchema,
  UserResponseSchema,
  GetUserByEmailRequestSchema,
  SignInResponseSchema,
  ForgotPasswordRequestSchema,
} from "@/features/auth/schemas";
import type {
  SignInRequest,
  SignUpRequest,
  GetUserByEmailRequest,
  SignInResponse,
  AuthResponse,
  UserResponse,
  ForgotPasswordRequest,
} from "@/features/auth/types";
import validateResponse from "@/shared/utils/validateResponse";
import { isAxiosError } from "axios";

const authApi = {
  signIn: async (credentials: SignInRequest): Promise<AuthResponse> => {
    try {
      SignInRequestSchema.parse(credentials);

      const response = await api.post<SignInResponse>("/login", credentials);
      const { token } = validateResponse(SignInResponseSchema, response);

      // After login, fetch user data to return both user and token
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const userResponse = await api.get("/user/", {
        params: { username: credentials.username },
      });
      const user = validateResponse(UserResponseSchema, userResponse);

      return { user, token };
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw error.response?.status === 401
          ? new Error("Invalid username or password. Please try again.")
          : new Error("An error occurred while signing in. Please try again.");
      }
      throw formatApiError(error, "Sign-in failed. Please try again");
    }
  },

  signUp: async (userData: SignUpRequest): Promise<void> => {
    try {
      SignUpRequestSchema.parse(userData);

      await api.post("/user/create", userData);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw error.response?.status === 400
          ? new Error("Invalid input. Please check your details and try again.")
          : new Error("An error occurred during registration. Please try again.");
      }
      throw formatApiError(error, "Sign-up failed. Please try again");
    }
  },

  forgotPassword: async (request: ForgotPasswordRequest): Promise<void> => {
    try {
      ForgotPasswordRequestSchema.parse(request);

      await api.post("/user/forgot-password", request);
    } catch {
      throw new Error("An error occurred while sending the reset email. Please try again.");
    }
  },

  getUserByEmail: async (request: GetUserByEmailRequest): Promise<UserResponse> => {
    try {
      GetUserByEmailRequestSchema.parse(request);

      const response = await api.get("/user", {
        params: { email: request.email },
      });
      return validateResponse(UserResponseSchema, response);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw error.response?.status === 404
          ? new Error("User not found. Please check the email and try again.")
          : new Error("An error occurred while fetching user data. Please try again.");
      }
      throw formatApiError(error, "Failed to fetch user by email. Please try again");
    }
  },

  getUserByUsername: async (username: string): Promise<UserResponse> => {
    try {
      const response = await api.get(`/user/${username}`);
      return validateResponse(UserResponseSchema, response);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw error.response?.status === 404
          ? new Error("User not found. Please check the username and try again.")
          : new Error("An error occurred while fetching user data. Please try again.");
      }
      throw formatApiError(error, "Failed to fetch user by username. Please try again");
    }
  },
};

export default authApi;
