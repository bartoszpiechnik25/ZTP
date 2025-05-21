import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App", () => {
  it("should render the app title in h1", async () => {
    render(<App />);
    const titleElement = await screen.findByText(/vite \+ react/i);
    expect(titleElement).toBeInTheDocument();
  });
});
