import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppProviders from "@/app/providers/AppProviders";
import AppRouter from "@/app/routes/AppRouter";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
);
