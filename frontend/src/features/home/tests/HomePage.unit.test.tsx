import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "@/app/providers/ThemeProvider";
import HomePage from "@/features/home/HomePage";

// Setup the mock with proper implementation
vi.mock("@/app/providers/ThemeProvider", () => ({
  useTheme: vi.fn(),
}));

describe("HomePage Unit Tests", () => {
  // Setup the mock before each test
  beforeEach(() => {
    vi.mocked(useTheme).mockReturnValue({
      setTheme: vi.fn(),
      theme: "light",
    });
  });

  it("renders CatDoc logo text", () => {
    render(<HomePage />);
    const logoText = screen.getByText("atDoc");
    expect(logoText).toBeInTheDocument();
    expect(logoText.parentElement).toHaveClass("flex flex-1 flex-row justify-center");
  });

  it("renders Lead text elements", () => {
    render(<HomePage />);
    expect(screen.getByText("Say goodbye to document chaos.")).toBeInTheDocument();
    expect(
      screen.getByText("CatDoc brings intelligent, effortless document management powered by AI 😻")
    ).toBeInTheDocument();
  });

  it("increments count when button is clicked", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const button = screen.getByRole("button", { name: /count is 0/i });
    await user.click(button);
    expect(screen.getByRole("button", { name: /count is 1/i })).toBeInTheDocument();
  });

  it("increments count multiple times when button is clicked repeatedly", async () => {
    const user = userEvent.setup();
    render(<HomePage />);
    const button = screen.getByRole("button", { name: /count is 0/i });
    await user.click(button);
    await user.click(button);
    await user.click(button);
    expect(screen.getByRole("button", { name: /count is 3/i })).toBeInTheDocument();
  });
});
