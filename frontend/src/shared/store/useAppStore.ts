import type { User } from "@/features/auth/types";
import type { Theme } from "@/shared/types/theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  user: User | undefined;
  authToken?: string;
  isAuthenticated: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: undefined,
      isAuthenticated: false,
      theme: "light",
      setAuth: (user, token) => set({ user, isAuthenticated: true, authToken: token }),
      clearAuth: () => set({ user: undefined, isAuthenticated: false, authToken: undefined }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        authToken: state.authToken,
      }),
    }
  )
);
