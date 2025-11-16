import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SIDScreen from "../SIDScreen";

describe("SIDScreen Component", () => {
  it("renders Standard ID input", () => {
    render(<SIDScreen onSubmitSID={vi.fn()} />);
    expect(screen.getByLabelText(/Standard ID \(SID\)/i)).toBeInTheDocument();
  });

  it("accepts valid SID format (letter + 6 digits)", () => {
    const mockSubmit = vi.fn();
    render(<SIDScreen onSubmitSID={mockSubmit} />);

    const input = screen.getByLabelText(/Standard ID \(SID\)/i);
    const submitButton = screen.getByRole("button", { name: /Continue/i });

    fireEvent.change(input, { target: { value: "A123456" } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith("A123456");
  });

  it("converts lowercase letter to uppercase", () => {
    const mockSubmit = vi.fn();
    render(<SIDScreen onSubmitSID={mockSubmit} />);

    const input = screen.getByLabelText(/Standard ID \(SID\)/i);
    const submitButton = screen.getByRole("button", { name: /Continue/i });

    fireEvent.change(input, { target: { value: "a123456" } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith("A123456");
  });

  it("shows error for invalid SID format", () => {
    render(<SIDScreen onSubmitSID={vi.fn()} />);

    const input = screen.getByLabelText(/Standard ID \(SID\)/i);
    const submitButton = screen.getByRole("button", { name: /Continue/i });

    fireEvent.change(input, { target: { value: "1234567" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/SID must be one letter followed by 6 digits/i)).toBeInTheDocument();
  });

  it("shows error for SID with wrong number of digits", () => {
    render(<SIDScreen onSubmitSID={vi.fn()} />);

    const input = screen.getByLabelText(/Standard ID \(SID\)/i);
    const submitButton = screen.getByRole("button", { name: /Continue/i });

    fireEvent.change(input, { target: { value: "A12345" } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/SID must be one letter followed by 6 digits/i)).toBeInTheDocument();
  });

  it("shows error for empty SID", () => {
    render(<SIDScreen onSubmitSID={vi.fn()} />);

    const submitButton = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Please enter your SID/i)).toBeInTheDocument();
  });
});
