import { ThemeProvider } from "@/providers/ThemeProvider";
import type { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
