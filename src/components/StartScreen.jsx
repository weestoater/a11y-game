import { useEffect, useRef } from "react";

function StartScreen({ onStartGame, onViewLeaderboard }) {
  const headingRef = useRef(null);

  useEffect(() => {
    // Focus on heading when screen loads
    headingRef.current?.focus();
  }, []);

  return (
    <section className="screen active" aria-labelledby="start-heading">
      <h2 id="start-heading" ref={headingRef} tabIndex="-1">
        Welcome, Detective!
      </h2>
      <p className="intro-text">
        Test your accessibility knowledge by reviewing code snippets and
        identifying issues. Each challenge presents real-world scenarios where
        accessibility improvements are needed.
      </p>

      <div className="difficulty-selection">
        <h3>Choose Your Difficulty</h3>
        <div
          className="difficulty-buttons"
          role="group"
          aria-label="Difficulty selection"
        >
          <button
            className="btn btn-large btn-beginner"
            onClick={() => onStartGame("beginner")}
          >
            <span className="btn-title">Beginner</span>
            <span className="btn-description">Common accessibility issues</span>
          </button>
          <button
            className="btn btn-large btn-intermediate"
            onClick={() => onStartGame("intermediate")}
          >
            <span className="btn-title">Intermediate</span>
            <span className="btn-description">ARIA and semantic HTML</span>
          </button>
          <button
            className="btn btn-large btn-advanced"
            onClick={() => onStartGame("advanced")}
          >
            <span className="btn-title">Advanced</span>
            <span className="btn-description">Complex patterns & WCAG</span>
          </button>
        </div>
      </div>

      <div className="secondary-actions">
        <button className="btn btn-secondary" onClick={onViewLeaderboard}>
          View Leaderboards
        </button>
      </div>
    </section>
  );
}

export default StartScreen;
