import { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useAppStore } from "@/shared/store/useAppStore";
import authApi from "@/features/auth/api/authApi";
import type { ForgotPasswordRequest, SignInRequest, SignUpRequest } from "@/features/auth/types";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, setAuth, clearAuth, isAuthenticated } = useAppStore();

  const signInMutation = useMutation({
    mutationFn: (credentials: SignInRequest) => authApi.signIn(credentials),
    onSuccess: (data) => {
      setAuth(data.user);
      localStorage.setItem("authToken", data.token);
      queryClient.setQueryData(["user"], data.user);
      navigate("/about"); // TODO: Change to a more appropriate route after registration
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (credentials: SignUpRequest) => authApi.signUp(credentials),
    onSuccess: () => {
      navigate("/sign-in", { state: { status: "signed-up-success" } });
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (credentials: ForgotPasswordRequest) => authApi.forgotPassword(credentials),
    onSuccess: () => {
      navigate("/forgot-password/success");
    },
  });

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => (user ? Promise.resolve(user) : authApi.getUserByEmail({ email: user!.email })),
    enabled: isAuthenticated && !!user,
    initialData: user,
  });

  const signOut = useCallback(() => {
    clearAuth();
    localStorage.removeItem("authToken");
    queryClient.removeQueries({ queryKey: ["user"] });
    navigate("/sign-in");
  }, [clearAuth, navigate, queryClient]);

  return {
    user: userQuery.data,
    isAuthenticated,
    signIn: signInMutation.mutate,
    signUp: signUpMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,
    signOut,
    isLoading: signInMutation.isPending || signUpMutation.isPending || userQuery.isLoading,
    isSignInError: signInMutation.isError,
    isSignUpError: signUpMutation.isError,
    isForgotPasswordError: forgotPasswordMutation.isError,
    signInError: signInMutation.error,
    signUpError: signUpMutation.error,
    forgotPasswordError: forgotPasswordMutation.error,
  };
};
