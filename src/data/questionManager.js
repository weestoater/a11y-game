// Question Manager - Central hub for managing questions across WCAG versions
// Provides performance optimizations and flexible question selection

import { wcag21Questions } from "./questions-wcag-2.1";
import { wcag22Questions } from "./questions-wcag-2.2";

// Configuration for question sets
export const WCAG_VERSIONS = {
  2.1: "WCAG 2.1",
  2.2: "WCAG 2.2",
  combined: "WCAG 2.1 & 2.2",
};

export const DIFFICULTY_LEVELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

// Cache for combined question sets (performance optimization)
let questionCache = null;

/**
 * Get questions for a specific difficulty and WCAG version
 * @param {string} difficulty - 'beginner', 'intermediate', or 'advanced'
 * @param {string} wcagVersion - '2.1', '2.2', or 'combined'
 * @param {number} count - Number of questions to return (0 = all)
 * @returns {Array} Array of question objects
 */
export const getQuestions = (
  difficulty,
  wcagVersion = "combined",
  count = 0
) => {
  let questions = [];

  switch (wcagVersion) {
    case "2.1":
      questions = wcag21Questions[difficulty] || [];
      break;
    case "2.2":
      questions = wcag22Questions[difficulty] || [];
      break;
    case "combined":
    default:
      // Combine 2.1 and 2.2 questions
      const wcag21 = wcag21Questions[difficulty] || [];
      const wcag22 = wcag22Questions[difficulty] || [];
      questions = [...wcag21, ...wcag22];
      break;
  }

  // Return subset if count specified
  if (count > 0 && count < questions.length) {
    return shuffleArray([...questions]).slice(0, count);
  }

  return questions;
};

/**
 * Get all questions combined (used for caching)
 * Memoized for performance
 */
export const getAllQuestions = () => {
  if (questionCache) {
    return questionCache;
  }

  questionCache = {
    beginner: [...wcag21Questions.beginner, ...wcag22Questions.beginner],
    intermediate: [
      ...wcag21Questions.intermediate,
      ...wcag22Questions.intermediate,
    ],
    advanced: [...wcag21Questions.advanced, ...wcag22Questions.advanced],
  };

  return questionCache;
};

/**
 * Get questions by specific WCAG success criteria
 * @param {string} criteria - e.g., "1.1.1", "2.4.11"
 * @returns {Array} Matching questions
 */
export const getQuestionsByCriteria = (criteria) => {
  const allQuestions = getAllQuestions();
  const results = [];

  Object.values(allQuestions).forEach((difficultyQuestions) => {
    difficultyQuestions.forEach((question) => {
      if (question.wcagReference.includes(criteria)) {
        results.push(question);
      }
    });
  });

  return results;
};

/**
 * Get questions by WCAG version only
 * @param {string} version - '2.1' or '2.2'
 * @returns {Object} Questions organized by difficulty
 */
export const getQuestionsByVersion = (version) => {
  return version === "2.1" ? wcag21Questions : wcag22Questions;
};

/**
 * Shuffle array utility (Fisher-Yates algorithm)
 * Performance: O(n) time complexity
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get question statistics
 * @returns {Object} Statistics about question database
 */
export const getQuestionStats = () => {
  return {
    wcag21: {
      beginner: wcag21Questions.beginner.length,
      intermediate: wcag21Questions.intermediate.length,
      advanced: wcag21Questions.advanced.length,
      total:
        wcag21Questions.beginner.length +
        wcag21Questions.intermediate.length +
        wcag21Questions.advanced.length,
    },
    wcag22: {
      beginner: wcag22Questions.beginner.length,
      intermediate: wcag22Questions.intermediate.length,
      advanced: wcag22Questions.advanced.length,
      total:
        wcag22Questions.beginner.length +
        wcag22Questions.intermediate.length +
        wcag22Questions.advanced.length,
    },
    combined: {
      beginner:
        wcag21Questions.beginner.length + wcag22Questions.beginner.length,
      intermediate:
        wcag21Questions.intermediate.length +
        wcag22Questions.intermediate.length,
      advanced:
        wcag21Questions.advanced.length + wcag22Questions.advanced.length,
      total:
        wcag21Questions.beginner.length +
        wcag22Questions.beginner.length +
        (wcag21Questions.intermediate.length +
          wcag22Questions.intermediate.length) +
        (wcag21Questions.advanced.length + wcag22Questions.advanced.length),
    },
  };
};

// For backward compatibility with existing code
export const questionDatabase = getAllQuestions();
