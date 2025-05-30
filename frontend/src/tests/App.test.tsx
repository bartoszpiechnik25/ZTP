import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

// Mock the dependencies
vi.mock("@/shared/providers/AppProviders", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="app-providers">{children}</div>,
}));

vi.mock("@/pages/TestPage", () => ({
  default: () => <div data-testid="test-page">Test Page Content</div>,
}));

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(screen.getByTestId("app-providers")).toBeInTheDocument();
  });

  it("renders the TestPage component", () => {
    render(<App />);
    expect(screen.getByTestId("test-page")).toBeInTheDocument();
    expect(screen.getByText("Test Page Content")).toBeInTheDocument();
  });

  it("properly nests TestPage inside AppProviders", () => {
    render(<App />);
    const providers = screen.getByTestId("app-providers");
    const testPage = screen.getByTestId("test-page");
    expect(providers).toContainElement(testPage);
  });
});
