import api from "@/app/axiosClient";
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
      const userResponse = await api.get(`/user/${credentials.username}`);
      const user = validateResponse(UserResponseSchema, userResponse);

      return { user, token };
    } catch (error) {
      // check if the error has status code 401, if so, throw a specific error if not throw a generic error
      if (isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Invalid username or password. Provide correct credentials and try again.");
      }
      throw new Error("An error occurred during sign-in. Please try again.");
    }
  },

  signUp: async (userData: SignUpRequest): Promise<void> => {
    try {
      SignUpRequestSchema.parse(userData);

      const userDataWithRole = { ...userData, role: "user" }; // TODO: Handle user role at server side

      await api.post("/user/create", userDataWithRole);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        throw new Error("Invalid input. Please check your details and try again.");
      }
      throw new Error("An error occurred during registration. Please try again.");
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
      if (isAxiosError(error) && error.response?.status === 404) {
        throw new Error("User not found. Please check the email and try again.");
      }
      throw new Error("Failed to fetch user by email. Please try again");
    }
  },

  getUserByUsername: async (username: string): Promise<UserResponse> => {
    try {
      const response = await api.get(`/user/${username}`);
      return validateResponse(UserResponseSchema, response);
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 404) {
        throw new Error("User not found. Please check the username and try again.");
      }
      throw new Error("Failed to fetch user by username. Please try again");
    }
  },
};

export default authApi;
