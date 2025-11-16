import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StartScreen from "../StartScreen";

describe("StartScreen Component", () => {
  it("renders difficulty selection title", () => {
    render(<StartScreen onStartGame={vi.fn()} onViewLeaderboard={vi.fn()} />);
    expect(screen.getByText(/Choose Your Difficulty/i)).toBeInTheDocument();
  });

  it("renders three difficulty levels", () => {
    render(<StartScreen onStartGame={vi.fn()} onViewLeaderboard={vi.fn()} />);
    const startButtons = screen.getAllByRole("button", { name: /Start/i });
    expect(startButtons).toHaveLength(3);
    expect(screen.getByText("Beginner")).toBeInTheDocument();
    expect(screen.getByText("Intermediate")).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
  });

  it('calls onStartGame with "beginner" when Beginner Start is clicked', () => {
    const mockStart = vi.fn();
    render(<StartScreen onStartGame={mockStart} onViewLeaderboard={vi.fn()} />);

    const startButtons = screen.getAllByRole("button", { name: /Start/i });
    fireEvent.click(startButtons[0]); // First Start button is Beginner
    expect(mockStart).toHaveBeenCalledWith("beginner", "combined");
  });

  it('calls onStartGame with "intermediate" when Intermediate Start is clicked', () => {
    const mockStart = vi.fn();
    render(<StartScreen onStartGame={mockStart} onViewLeaderboard={vi.fn()} />);

    const startButtons = screen.getAllByRole("button", { name: /Start/i });
    fireEvent.click(startButtons[1]); // Second Start button is Intermediate
    expect(mockStart).toHaveBeenCalledWith("intermediate", "combined");
  });

  it('calls onStartGame with "advanced" when Advanced Start is clicked', () => {
    const mockStart = vi.fn();
    render(<StartScreen onStartGame={mockStart} onViewLeaderboard={vi.fn()} />);

    const startButtons = screen.getAllByRole("button", { name: /Start/i });
    fireEvent.click(startButtons[2]); // Third Start button is Advanced
    expect(mockStart).toHaveBeenCalledWith("advanced", "combined");
  });

  it("displays difficulty descriptions", () => {
    render(<StartScreen onStartGame={vi.fn()} onViewLeaderboard={vi.fn()} />);
    expect(
      screen.getByText(/Common accessibility issues/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/ARIA and semantic HTML/i)).toBeInTheDocument();
    expect(screen.getByText(/Complex patterns & WCAG/i)).toBeInTheDocument();
  });

  it("calls onViewLeaderboard when View Leaderboards button is clicked", () => {
    const mockViewLeaderboard = vi.fn();
    render(
      <StartScreen
        onStartGame={vi.fn()}
        onViewLeaderboard={mockViewLeaderboard}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /View Leaderboards/i }));
    expect(mockViewLeaderboard).toHaveBeenCalledTimes(1);
  });

  it("renders WCAG version selection buttons", () => {
    render(<StartScreen onStartGame={vi.fn()} onViewLeaderboard={vi.fn()} />);
    expect(
      screen.getByRole("button", { name: "WCAG 2.1" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "WCAG 2.2" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "WCAG 2.1 & 2.2" })
    ).toBeInTheDocument();
  });

  it("defaults to combined WCAG version", () => {
    render(<StartScreen onStartGame={vi.fn()} onViewLeaderboard={vi.fn()} />);
    const combinedButton = screen.getByRole("button", {
      name: "WCAG 2.1 & 2.2",
    });
    expect(combinedButton).toHaveAttribute("aria-pressed", "true");
  });

  it("changes WCAG version when button is clicked", () => {
    const mockStart = vi.fn();
    render(<StartScreen onStartGame={mockStart} onViewLeaderboard={vi.fn()} />);

    // Click WCAG 2.1 button
    const wcag21Button = screen.getByRole("button", { name: "WCAG 2.1" });
    fireEvent.click(wcag21Button);

    // Now start a game and verify it uses WCAG 2.1
    const startButtons = screen.getAllByRole("button", { name: /Start/i });
    fireEvent.click(startButtons[0]);
    expect(mockStart).toHaveBeenCalledWith("beginner", "2.1");
  });

  it("displays question count for selected WCAG version", () => {
    render(<StartScreen onStartGame={vi.fn()} onViewLeaderboard={vi.fn()} />);
    expect(screen.getByText(/questions available/i)).toBeInTheDocument();
  });

  it("updates question count when WCAG version changes", () => {
    render(<StartScreen onStartGame={vi.fn()} onViewLeaderboard={vi.fn()} />);

    const wcag21Button = screen.getByRole("button", { name: "WCAG 2.1" });
    fireEvent.click(wcag21Button);

    // Should still show question count text
    expect(screen.getByText(/questions available/i)).toBeInTheDocument();
  });
});
