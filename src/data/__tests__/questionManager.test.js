import { describe, it, expect } from "vitest";
import {
  WCAG_VERSIONS,
  DIFFICULTY_LEVELS,
  getQuestions,
  getAllQuestions,
  getQuestionsByCriteria,
  getQuestionsByVersion,
  shuffleArray,
  getQuestionStats,
  questionDatabase,
} from "../questionManager";

describe("Question Manager", () => {
  describe("Constants", () => {
    it("exports WCAG_VERSIONS with correct keys", () => {
      expect(WCAG_VERSIONS).toHaveProperty("2.1");
      expect(WCAG_VERSIONS).toHaveProperty("2.2");
      expect(WCAG_VERSIONS).toHaveProperty("combined");
      expect(WCAG_VERSIONS["2.1"]).toBe("WCAG 2.1");
      expect(WCAG_VERSIONS["2.2"]).toBe("WCAG 2.2");
      expect(WCAG_VERSIONS["combined"]).toBe("WCAG 2.1 & 2.2");
    });

    it("exports DIFFICULTY_LEVELS with correct keys", () => {
      expect(DIFFICULTY_LEVELS).toHaveProperty("beginner");
      expect(DIFFICULTY_LEVELS).toHaveProperty("intermediate");
      expect(DIFFICULTY_LEVELS).toHaveProperty("advanced");
      expect(DIFFICULTY_LEVELS.beginner).toBe("Beginner");
      expect(DIFFICULTY_LEVELS.intermediate).toBe("Intermediate");
      expect(DIFFICULTY_LEVELS.advanced).toBe("Advanced");
    });
  });

  describe("getQuestions", () => {
    it('returns WCAG 2.1 questions only when version is "2.1"', () => {
      const questions = getQuestions("beginner", "2.1");
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q.wcagVersion).toBe("2.1");
      });
    });

    it('returns WCAG 2.2 questions only when version is "2.2"', () => {
      const questions = getQuestions("beginner", "2.2");
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q.wcagVersion).toBe("2.2");
      });
    });

    it('returns combined questions when version is "combined"', () => {
      const questions = getQuestions("beginner", "combined");
      expect(questions.length).toBeGreaterThan(0);
      const has21 = questions.some((q) => q.wcagVersion === "2.1");
      const has22 = questions.some((q) => q.wcagVersion === "2.2");
      expect(has21 || has22).toBe(true);
    });

    it("defaults to combined when no version specified", () => {
      const questions = getQuestions("beginner");
      expect(questions.length).toBeGreaterThan(0);
    });

    it("returns questions for intermediate difficulty", () => {
      const questions = getQuestions("intermediate", "combined");
      expect(questions.length).toBeGreaterThan(0);
    });

    it("returns questions for advanced difficulty", () => {
      const questions = getQuestions("advanced", "combined");
      expect(questions.length).toBeGreaterThan(0);
    });

    it("returns empty array for invalid difficulty", () => {
      const questions = getQuestions("invalid", "combined");
      expect(questions).toEqual([]);
    });

    it("returns subset of questions when count is specified", () => {
      const count = 3;
      const questions = getQuestions("beginner", "combined", count);
      expect(questions.length).toBeLessThanOrEqual(count);
    });

    it("returns all questions when count is 0", () => {
      const allQuestions = getQuestions("beginner", "combined", 0);
      const defaultQuestions = getQuestions("beginner", "combined");
      expect(allQuestions.length).toBe(defaultQuestions.length);
    });

    it("shuffles questions when count is specified", () => {
      const count = 5;
      const questions1 = getQuestions("beginner", "2.1", count);
      const questions2 = getQuestions("beginner", "2.1", count);

      // With shuffling, order might be different (though not guaranteed)
      expect(questions1.length).toBe(questions2.length);
      expect(questions1.length).toBeLessThanOrEqual(count);
    });
  });

  describe("getAllQuestions", () => {
    it("returns questions organized by difficulty", () => {
      const questions = getAllQuestions();
      expect(questions).toHaveProperty("beginner");
      expect(questions).toHaveProperty("intermediate");
      expect(questions).toHaveProperty("advanced");
      expect(Array.isArray(questions.beginner)).toBe(true);
      expect(Array.isArray(questions.intermediate)).toBe(true);
      expect(Array.isArray(questions.advanced)).toBe(true);
    });

    it("caches questions on subsequent calls", () => {
      const questions1 = getAllQuestions();
      const questions2 = getAllQuestions();
      expect(questions1).toBe(questions2); // Same reference due to caching
    });

    it("combines WCAG 2.1 and 2.2 questions", () => {
      const questions = getAllQuestions();
      const beginnerQuestions = questions.beginner;
      const has21 = beginnerQuestions.some((q) => q.wcagVersion === "2.1");
      const has22 = beginnerQuestions.some((q) => q.wcagVersion === "2.2");
      expect(has21).toBe(true);
      expect(has22).toBe(true);
    });
  });

  describe("getQuestionsByCriteria", () => {
    it("returns questions matching specific WCAG criteria", () => {
      const questions = getQuestionsByCriteria("1.1.1");
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q.wcagReference).toContain("1.1.1");
      });
    });

    it("returns empty array for non-existent criteria", () => {
      const questions = getQuestionsByCriteria("9.9.9");
      expect(questions).toEqual([]);
    });

    it("finds questions across different difficulties", () => {
      // Test with a criterion that might appear in multiple difficulties
      const questions = getQuestionsByCriteria("4.1.2");
      expect(questions.length).toBeGreaterThan(0);
    });

    it("returns questions from WCAG 2.2 criteria", () => {
      const questions = getQuestionsByCriteria("2.4.11");
      expect(questions.length).toBeGreaterThan(0);
      questions.forEach((q) => {
        expect(q.wcagVersion).toBe("2.2");
      });
    });
  });

  describe("getQuestionsByVersion", () => {
    it("returns WCAG 2.1 questions", () => {
      const questions = getQuestionsByVersion("2.1");
      expect(questions).toHaveProperty("beginner");
      expect(questions).toHaveProperty("intermediate");
      expect(questions).toHaveProperty("advanced");

      const allQuestions = [
        ...questions.beginner,
        ...questions.intermediate,
        ...questions.advanced,
      ];
      allQuestions.forEach((q) => {
        expect(q.wcagVersion).toBe("2.1");
      });
    });

    it("returns WCAG 2.2 questions", () => {
      const questions = getQuestionsByVersion("2.2");
      expect(questions).toHaveProperty("beginner");
      expect(questions).toHaveProperty("intermediate");
      expect(questions).toHaveProperty("advanced");

      const allQuestions = [
        ...questions.beginner,
        ...questions.intermediate,
        ...questions.advanced,
      ];
      allQuestions.forEach((q) => {
        expect(q.wcagVersion).toBe("2.2");
      });
    });

    it("returns different question sets for different versions", () => {
      const wcag21 = getQuestionsByVersion("2.1");
      const wcag22 = getQuestionsByVersion("2.2");

      expect(wcag21.beginner[0].id).not.toBe(wcag22.beginner[0].id);
    });
  });

  describe("shuffleArray", () => {
    it("returns array with same length", () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      expect(shuffled.length).toBe(original.length);
    });

    it("contains all original elements", () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      original.forEach((item) => {
        expect(shuffled).toContain(item);
      });
    });

    it("does not modify original array", () => {
      const original = [1, 2, 3, 4, 5];
      const copy = [...original];
      shuffleArray(original);
      expect(original).toEqual(copy);
    });

    it("handles empty array", () => {
      const shuffled = shuffleArray([]);
      expect(shuffled).toEqual([]);
    });

    it("handles single element array", () => {
      const original = [1];
      const shuffled = shuffleArray(original);
      expect(shuffled).toEqual([1]);
    });

    it("shuffles array (probabilistic test)", () => {
      const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      let sameOrder = 0;
      const iterations = 10;

      for (let i = 0; i < iterations; i++) {
        const shuffled = shuffleArray(original);
        if (JSON.stringify(shuffled) === JSON.stringify(original)) {
          sameOrder++;
        }
      }

      // It's extremely unlikely all shuffles will be in the same order
      expect(sameOrder).toBeLessThan(iterations);
    });
  });

  describe("getQuestionStats", () => {
    it("returns statistics for all WCAG versions", () => {
      const stats = getQuestionStats();
      expect(stats).toHaveProperty("wcag21");
      expect(stats).toHaveProperty("wcag22");
      expect(stats).toHaveProperty("combined");
    });

    it("includes difficulty breakdowns for WCAG 2.1", () => {
      const stats = getQuestionStats();
      expect(stats.wcag21).toHaveProperty("beginner");
      expect(stats.wcag21).toHaveProperty("intermediate");
      expect(stats.wcag21).toHaveProperty("advanced");
      expect(stats.wcag21).toHaveProperty("total");

      expect(typeof stats.wcag21.beginner).toBe("number");
      expect(typeof stats.wcag21.intermediate).toBe("number");
      expect(typeof stats.wcag21.advanced).toBe("number");
      expect(typeof stats.wcag21.total).toBe("number");
    });

    it("includes difficulty breakdowns for WCAG 2.2", () => {
      const stats = getQuestionStats();
      expect(stats.wcag22).toHaveProperty("beginner");
      expect(stats.wcag22).toHaveProperty("intermediate");
      expect(stats.wcag22).toHaveProperty("advanced");
      expect(stats.wcag22).toHaveProperty("total");
    });

    it("calculates correct totals", () => {
      const stats = getQuestionStats();

      const wcag21Total =
        stats.wcag21.beginner +
        stats.wcag21.intermediate +
        stats.wcag21.advanced;
      expect(stats.wcag21.total).toBe(wcag21Total);

      const wcag22Total =
        stats.wcag22.beginner +
        stats.wcag22.intermediate +
        stats.wcag22.advanced;
      expect(stats.wcag22.total).toBe(wcag22Total);

      const combinedTotal =
        stats.combined.beginner +
        stats.combined.intermediate +
        stats.combined.advanced;
      expect(stats.combined.total).toBe(combinedTotal);
    });

    it("combined stats equal sum of WCAG 2.1 and 2.2", () => {
      const stats = getQuestionStats();

      expect(stats.combined.beginner).toBe(
        stats.wcag21.beginner + stats.wcag22.beginner
      );
      expect(stats.combined.intermediate).toBe(
        stats.wcag21.intermediate + stats.wcag22.intermediate
      );
      expect(stats.combined.advanced).toBe(
        stats.wcag21.advanced + stats.wcag22.advanced
      );
      expect(stats.combined.total).toBe(
        stats.wcag21.total + stats.wcag22.total
      );
    });

    it("has at least some questions in each category", () => {
      const stats = getQuestionStats();

      expect(stats.wcag21.total).toBeGreaterThan(0);
      expect(stats.wcag22.total).toBeGreaterThan(0);
      expect(stats.combined.total).toBeGreaterThan(0);
    });
  });

  describe("questionDatabase (backward compatibility)", () => {
    it("exports questionDatabase for backward compatibility", () => {
      expect(questionDatabase).toBeDefined();
      expect(questionDatabase).toHaveProperty("beginner");
      expect(questionDatabase).toHaveProperty("intermediate");
      expect(questionDatabase).toHaveProperty("advanced");
    });

    it("questionDatabase matches getAllQuestions", () => {
      const allQuestions = getAllQuestions();
      expect(questionDatabase).toBe(allQuestions);
    });
  });

  describe("Question Structure Validation", () => {
    it("all questions have required properties", () => {
      const allQuestions = getAllQuestions();
      const difficulties = ["beginner", "intermediate", "advanced"];

      difficulties.forEach((difficulty) => {
        allQuestions[difficulty].forEach((question) => {
          expect(question).toHaveProperty("id");
          expect(question).toHaveProperty("title");
          expect(question).toHaveProperty("code");
          expect(question).toHaveProperty("question");
          expect(question).toHaveProperty("options");
          expect(question).toHaveProperty("correctAnswer");
          expect(question).toHaveProperty("explanation");
          expect(question).toHaveProperty("wcagReference");
          expect(question).toHaveProperty("wcagVersion");

          expect(Array.isArray(question.options)).toBe(true);
          expect(question.options.length).toBeGreaterThan(0);
          expect(typeof question.correctAnswer).toBe("number");
          expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
          expect(question.correctAnswer).toBeLessThan(question.options.length);
        });
      });
    });

    it("all question IDs are unique", () => {
      const allQuestions = getAllQuestions();
      const ids = new Set();

      ["beginner", "intermediate", "advanced"].forEach((difficulty) => {
        allQuestions[difficulty].forEach((question) => {
          expect(ids.has(question.id)).toBe(false);
          ids.add(question.id);
        });
      });
    });
  });
});
