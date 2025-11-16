// Leaderboard utilities for managing scores in localStorage

const LEADERBOARD_KEY = "a11y_game_leaderboard";

export const saveScore = (entry) => {
  const leaderboard = getLeaderboard();

  // Add new entry
  leaderboard.push({
    sid: entry.sid,
    difficulty: entry.difficulty,
    score: entry.score,
    totalQuestions: entry.totalQuestions,
    correctAnswers: entry.correctAnswers,
    timeInSeconds: entry.timeInSeconds,
    percentage: entry.percentage,
    timestamp: new Date().toISOString(),
  });

  // Save to localStorage
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(leaderboard));
    return true;
  } catch (e) {
    console.error("Failed to save leaderboard:", e);
    return false;
  }
};

export const getLeaderboard = () => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load leaderboard:", e);
    return [];
  }
};

export const getLeaderboardByDifficulty = (difficulty) => {
  const allScores = getLeaderboard();
  const filtered = allScores.filter((entry) => entry.difficulty === difficulty);

  // Sort by:
  // 1. Percentage (descending)
  // 2. Time (ascending - faster is better)
  return filtered.sort((a, b) => {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    return a.timeInSeconds - b.timeInSeconds;
  });
};

export const getBestScoreForUser = (sid, difficulty) => {
  const leaderboard = getLeaderboardByDifficulty(difficulty);
  const userScores = leaderboard.filter((entry) => entry.sid === sid);

  if (userScores.length === 0) return null;

  // Return the best score (already sorted)
  return userScores[0];
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const clearLeaderboard = () => {
  try {
    localStorage.removeItem(LEADERBOARD_KEY);
    return true;
  } catch (e) {
    console.error("Failed to clear leaderboard:", e);
    return false;
  }
};
