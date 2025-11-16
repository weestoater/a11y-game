import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";

describe("Header Component", () => {
  it("renders header with title", () => {
    render(<Header />);
    expect(screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'h1' && content.includes('Code Detective');
    })).toBeInTheDocument();
    expect(screen.getByText("A11y")).toBeInTheDocument();
  });

  it("renders tagline", () => {
    render(<Header />);
    expect(screen.getByText(/Master digital accessibility/i)).toBeInTheDocument();
  });

  it("does not show navigation when showNav is false", () => {
    render(<Header showNav={false} />);
    expect(screen.queryByRole("button", { name: /Return to start screen/i })).not.toBeInTheDocument();
  });

  it("shows navigation when showNav is true", () => {
    render(<Header showNav={true} onNavigateHome={vi.fn()} />);
    expect(screen.getByRole("button", { name: /Return to start screen/i })).toBeInTheDocument();
  });

  it("calls onNavigateHome when Home button is clicked", () => {
    const mockNavigate = vi.fn();
    render(<Header showNav={true} onNavigateHome={mockNavigate} />);

    const homeButton = screen.getByRole("button", { name: /Return to start screen/i });
    fireEvent.click(homeButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });
});
