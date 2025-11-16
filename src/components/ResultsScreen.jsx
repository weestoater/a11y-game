import { useEffect, useRef } from "react";
import { formatTime } from "../utils/leaderboard";

function ResultsScreen({
  score,
  answers,
  difficulty,
  completionTime,
  studentID,
  onPlayAgain,
  onChangeDifficulty,
  onViewLeaderboard,
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
    <section className="container my-5" aria-labelledby="results-heading">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h2
            id="results-heading"
            ref={headingRef}
            tabIndex="-1"
            className="text-center mb-4"
          >
            Case Closed!
          </h2>

          <div className="card shadow mb-4">
            <div className="card-body text-center p-5">
              <div className="mb-4">
                <p className="text-muted mb-2">Your Score</p>
                <h3 className="display-1 mb-2">{score}</h3>
                <p className="h4 text-primary mb-2">{percentage}%</p>
                <p className="text-muted">Time: {formatTime(completionTime)}</p>
              </div>

              <div className="alert alert-info mb-4" role="status">
                <div className="display-3 mb-2">{badge.emoji}</div>
                <p className="mb-0">{badge.message}</p>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">
                        Standard ID
                      </h6>
                      <p className="card-text fw-bold">{studentID}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">Correct</h6>
                      <p className="card-text fw-bold text-success">
                        {correctAnswers}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">
                        Incorrect
                      </h6>
                      <p className="card-text fw-bold text-danger">
                        {incorrectAnswers}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card bg-light">
                    <div className="card-body">
                      <h6 className="card-subtitle mb-2 text-muted">
                        Difficulty
                      </h6>
                      <p className="card-text fw-bold">
                        {capitalizeFirst(difficulty)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-4">
            <button
              id="play-again"
              className="btn btn-primary btn-lg"
              onClick={onPlayAgain}
            >
              Play Again
            </button>
            <button
              id="change-difficulty"
              className="btn btn-outline-secondary btn-lg"
              onClick={onChangeDifficulty}
            >
              Change Difficulty
            </button>
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={onViewLeaderboard}
            >
              View Leaderboard
            </button>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="card-title h5 mb-3">Continue Learning</h3>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <a
                    href="https://www.w3.org/WAI/WCAG21/quickref/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    📚 WCAG 2.1 Quick Reference
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://www.a11yproject.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    🌐 The A11Y Project
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/Accessibility"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    📖 MDN Accessibility Guide
                  </a>
                </li>
                <li className="mb-0">
                  <a
                    href="https://www.w3.org/WAI/ARIA/apg/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-decoration-none"
                  >
                    🎯 ARIA Authoring Practices Guide
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultsScreen;
