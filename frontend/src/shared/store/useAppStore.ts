import type { User } from "@/features/auth/types";
import type { Theme } from "@/shared/types/theme";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  user: User | undefined;
  isAuthenticated: boolean;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setAuth: (user: User) => void;
  clearAuth: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: undefined,
      isAuthenticated: false,
      theme: "light",
      setAuth: (user) => set({ user, isAuthenticated: true }),
      clearAuth: () => set({ user: undefined, isAuthenticated: false }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
