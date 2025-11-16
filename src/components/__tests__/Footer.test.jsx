import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
  it("renders footer text", () => {
    render(<Footer />);
    expect(screen.getByText(/A11y Code Detective/i)).toBeInTheDocument();
  });

  it("renders current year", () => {
    render(<Footer />);
    expect(screen.getByText(/2025/)).toBeInTheDocument();
  });

  it("renders link to WCAG", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /Learn more about WCAG/i });
    expect(link).toHaveAttribute("href", "https://www.w3.org/WAI/standards-guidelines/wcag/");
  });

  it("link opens in new tab", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: /Learn more about WCAG/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
