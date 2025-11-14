import { useEffect, useRef } from "react";

function ResultsScreen({
  score,
  answers,
  difficulty,
  onPlayAgain,
  onChangeDifficulty,
}) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const totalQuestions = answers.length;
  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getBadge = () => {
    if (percentage === 100) {
      return {
        emoji: "🏆",
        message: "Perfect Score! You're an accessibility champion!",
      };
    } else if (percentage >= 80) {
      return {
        emoji: "🌟",
        message: "Excellent! You have strong accessibility knowledge!",
      };
    } else if (percentage >= 60) {
      return {
        emoji: "👍",
        message: "Good job! Keep learning to improve further!",
      };
    } else if (percentage >= 40) {
      return {
        emoji: "📚",
        message: "Not bad! Review the explanations to strengthen your skills.",
      };
    } else {
      return {
        emoji: "🔰",
        message: "Keep practicing! Accessibility is a journey.",
      };
    }
  };

  const badge = getBadge();
  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <section className="screen active" aria-labelledby="results-heading">
      <h2 id="results-heading" ref={headingRef} tabIndex="-1">
        Case Closed!
      </h2>

      <div className="results-summary">
        <div className="final-score">
          <p className="score-text">Your Score</p>
          <p className="score-number">{score}</p>
          <p className="score-percentage">{percentage}%</p>
        </div>

        <div className="performance-badge">
          <div className="badge">{badge.emoji}</div>
          <p>{badge.message}</p>
        </div>

        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Correct</span>
            <span className="stat-value">{correctAnswers}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Incorrect</span>
            <span className="stat-value">{incorrectAnswers}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Difficulty</span>
            <span className="stat-value">{capitalizeFirst(difficulty)}</span>
          </div>
        </div>
      </div>

      <div className="results-actions">
        <button
          id="play-again"
          className="btn btn-primary btn-large"
          onClick={onPlayAgain}
        >
          Play Again
        </button>
        <button
          id="change-difficulty"
          className="btn btn-secondary btn-large"
          onClick={onChangeDifficulty}
        >
          Change Difficulty
        </button>
      </div>

      <div className="learning-resources">
        <h3>Continue Learning</h3>
        <ul>
          <li>
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
            >
              WCAG 2.1 Quick Reference
            </a>
          </li>
          <li>
            <a
              href="https://www.a11yproject.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The A11Y Project
            </a>
          </li>
          <li>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/Accessibility"
              target="_blank"
              rel="noopener noreferrer"
            >
              MDN Accessibility Guide
            </a>
          </li>
          <li>
            <a
              href="https://www.w3.org/WAI/ARIA/apg/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARIA Authoring Practices Guide
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default ResultsScreen;
