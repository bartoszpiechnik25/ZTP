import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
