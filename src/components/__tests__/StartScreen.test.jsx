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
    expect(mockStart).toHaveBeenCalledWith("beginner");
  });

  it('calls onStartGame with "intermediate" when Intermediate Start is clicked', () => {
    const mockStart = vi.fn();
    render(<StartScreen onStartGame={mockStart} onViewLeaderboard={vi.fn()} />);

    const startButtons = screen.getAllByRole("button", { name: /Start/i });
    fireEvent.click(startButtons[1]); // Second Start button is Intermediate
    expect(mockStart).toHaveBeenCalledWith("intermediate");
  });

  it('calls onStartGame with "advanced" when Advanced Start is clicked', () => {
    const mockStart = vi.fn();
    render(<StartScreen onStartGame={mockStart} onViewLeaderboard={vi.fn()} />);

    const startButtons = screen.getAllByRole("button", { name: /Start/i });
    fireEvent.click(startButtons[2]); // Third Start button is Advanced
    expect(mockStart).toHaveBeenCalledWith("advanced");
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
});
