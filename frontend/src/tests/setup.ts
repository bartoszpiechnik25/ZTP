import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"; // for jest-dom matchers

// Cleanup after each test to remove any rendered components
afterEach(() => {
  cleanup();
});
