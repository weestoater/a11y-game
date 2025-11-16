import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  saveScore,
  getLeaderboard,
  clearLeaderboard,
  getLeaderboardByDifficulty,
  getBestScoreForUser,
  formatTime,
} from "../../utils/leaderboard";

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

describe("Leaderboard Utilities", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("saveScore", () => {
    it("saves a new score to localStorage", () => {
      const entry = {
        sid: "A123456",
        difficulty: "beginner",
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        timeInSeconds: 120,
        percentage: 80,
      };

      saveScore(entry);

      const saved = JSON.parse(localStorage.getItem("a11y_game_leaderboard"));
      expect(saved).toHaveLength(1);
      expect(saved[0]).toMatchObject({
        sid: entry.sid,
        difficulty: entry.difficulty,
        score: entry.score,
        percentage: entry.percentage,
      });
      expect(saved[0]).toHaveProperty("timestamp");
    });

    it("appends scores to existing leaderboard", () => {
      saveScore({
        sid: "A123456",
        difficulty: "beginner",
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        timeInSeconds: 120,
        percentage: 80,
      });

      saveScore({
        sid: "B234567",
        difficulty: "intermediate",
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        timeInSeconds: 150,
        percentage: 90,
      });

      const saved = JSON.parse(localStorage.getItem("a11y_game_leaderboard"));
      expect(saved).toHaveLength(2);
    });
  });

  describe("getLeaderboard", () => {
    it("returns empty array when no scores exist", () => {
      const leaderboard = getLeaderboard();
      expect(leaderboard).toEqual([]);
    });

    it("returns all saved scores", () => {
      const entry1 = {
        sid: "A123456",
        difficulty: "beginner",
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        timeInSeconds: 120,
        percentage: 80,
      };
      const entry2 = {
        sid: "B234567",
        difficulty: "intermediate",
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        timeInSeconds: 150,
        percentage: 90,
      };

      saveScore(entry1);
      saveScore(entry2);

      const leaderboard = getLeaderboard();
      expect(leaderboard).toHaveLength(2);
      expect(leaderboard[0]).toMatchObject({
        sid: entry1.sid,
        difficulty: entry1.difficulty,
        score: entry1.score,
        percentage: entry1.percentage,
      });
      expect(leaderboard[1]).toMatchObject({
        sid: entry2.sid,
        difficulty: entry2.difficulty,
        score: entry2.score,
        percentage: entry2.percentage,
      });
    });
  });

  describe("getLeaderboardByDifficulty", () => {
    it("sorts scores by percentage descending, then time ascending", () => {
      saveScore({
        sid: "A123456",
        difficulty: "beginner",
        score: 70,
        totalQuestions: 10,
        correctAnswers: 7,
        timeInSeconds: 100,
        percentage: 70,
      });
      saveScore({
        sid: "B234567",
        difficulty: "beginner",
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        timeInSeconds: 150,
        percentage: 90,
      });
      saveScore({
        sid: "C345678",
        difficulty: "beginner",
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        timeInSeconds: 120,
        percentage: 90,
      });

      const leaderboard = getLeaderboardByDifficulty("beginner");
      expect(leaderboard[0].sid).toBe("C345678"); // 90%, 120 seconds
      expect(leaderboard[1].sid).toBe("B234567"); // 90%, 150 seconds
      expect(leaderboard[2].sid).toBe("A123456"); // 70%
    });

    it("filters by difficulty", () => {
      saveScore({
        sid: "A123456",
        difficulty: "beginner",
        score: 70,
        totalQuestions: 10,
        correctAnswers: 7,
        timeInSeconds: 100,
        percentage: 70,
      });
      saveScore({
        sid: "B234567",
        difficulty: "intermediate",
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        timeInSeconds: 150,
        percentage: 90,
      });

      const beginnerScores = getLeaderboardByDifficulty("beginner");
      expect(beginnerScores).toHaveLength(1);
      expect(beginnerScores[0].sid).toBe("A123456");
    });
  });

  describe("clearLeaderboard", () => {
    it("clears all leaderboard data", () => {
      saveScore({
        sid: "A123456",
        difficulty: "beginner",
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        timeInSeconds: 120,
        percentage: 80,
      });

      clearLeaderboard();

      const leaderboard = getLeaderboard();
      expect(leaderboard).toEqual([]);
    });
  });

  describe("getBestScoreForUser", () => {
    it("returns the best score for a user in a difficulty", () => {
      saveScore({
        sid: "A123456",
        difficulty: "beginner",
        score: 70,
        totalQuestions: 10,
        correctAnswers: 7,
        timeInSeconds: 150,
        percentage: 70,
      });
      saveScore({
        sid: "A123456",
        difficulty: "beginner",
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        timeInSeconds: 120,
        percentage: 90,
      });
      saveScore({
        sid: "B234567",
        difficulty: "beginner",
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        timeInSeconds: 100,
        percentage: 80,
      });

      const bestScore = getBestScoreForUser("A123456", "beginner");
      expect(bestScore).toMatchObject({
        sid: "A123456",
        percentage: 90,
        timeInSeconds: 120,
      });
    });

    it("returns null when user has no scores", () => {
      saveScore({
        sid: "B234567",
        difficulty: "beginner",
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        timeInSeconds: 100,
        percentage: 80,
      });

      const bestScore = getBestScoreForUser("A123456", "beginner");
      expect(bestScore).toBeNull();
    });

    it("filters by difficulty", () => {
      saveScore({
        sid: "A123456",
        difficulty: "beginner",
        score: 90,
        totalQuestions: 10,
        correctAnswers: 9,
        timeInSeconds: 120,
        percentage: 90,
      });
      saveScore({
        sid: "A123456",
        difficulty: "intermediate",
        score: 100,
        totalQuestions: 10,
        correctAnswers: 10,
        timeInSeconds: 100,
        percentage: 100,
      });

      const bestScore = getBestScoreForUser("A123456", "beginner");
      expect(bestScore.difficulty).toBe("beginner");
      expect(bestScore.percentage).toBe(90);
    });
  });

  describe("formatTime", () => {
    it("formats seconds into MM:SS format", () => {
      expect(formatTime(65)).toBe("1:05");
      expect(formatTime(125)).toBe("2:05");
      expect(formatTime(0)).toBe("0:00");
    });

    it("pads single digit seconds with leading zero", () => {
      expect(formatTime(61)).toBe("1:01");
      expect(formatTime(9)).toBe("0:09");
    });

    it("handles large time values", () => {
      expect(formatTime(599)).toBe("9:59");
      expect(formatTime(3661)).toBe("61:01");
    });
  });

  describe("error handling", () => {
    it("returns false when saveScore fails", () => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn(() => {
        throw new Error("Storage full");
      });

      const result = saveScore({
        sid: "A123456",
        difficulty: "beginner",
        score: 80,
        totalQuestions: 10,
        correctAnswers: 8,
        timeInSeconds: 120,
        percentage: 80,
      });

      expect(result).toBe(false);
      localStorage.setItem = originalSetItem;
    });

    it("returns empty array when getLeaderboard fails", () => {
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = vi.fn(() => {
        throw new Error("Storage error");
      });

      const result = getLeaderboard();
      expect(result).toEqual([]);
      localStorage.getItem = originalGetItem;
    });

    it("returns false when clearLeaderboard fails", () => {
      const originalRemoveItem = localStorage.removeItem;
      localStorage.removeItem = vi.fn(() => {
        throw new Error("Storage error");
      });

      const result = clearLeaderboard();
      expect(result).toBe(false);
      localStorage.removeItem = originalRemoveItem;
    });
  });
});
