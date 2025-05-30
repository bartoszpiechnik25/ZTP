import { vi } from "vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/vitest"; // for jest-dom matchers

// Mock react-router
vi.mock("react-router", () => ({
  Link: (props: { to: string; children: React.ReactNode }) =>
    React.createElement("a", { href: props.to }, props.children),
}));

// Cleanup after each test to remove any rendered components
afterEach(() => {
  cleanup();
});
