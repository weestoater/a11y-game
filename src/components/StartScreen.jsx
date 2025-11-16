import { useEffect, useRef, useState } from "react";
import { WCAG_VERSIONS, getQuestionStats } from "../data/questionManager";

function StartScreen({ onStartGame, onViewLeaderboard }) {
  const headingRef = useRef(null);
  const [wcagVersion, setWcagVersion] = useState("combined");

  useEffect(() => {
    // Focus on heading when screen loads
    headingRef.current?.focus();
  }, []);

  const handleStartGame = (difficulty) => {
    onStartGame(difficulty, wcagVersion);
  };

  // Get question statistics for display
  const stats = getQuestionStats();
  const currentStats =
    stats[
      wcagVersion === "2.1"
        ? "wcag21"
        : wcagVersion === "2.2"
        ? "wcag22"
        : "combined"
    ];

  return (
    <section className="container my-5" aria-labelledby="start-heading">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h2
            id="start-heading"
            ref={headingRef}
            tabIndex="-1"
            className="text-center mb-4"
          >
            Welcome, Detective!
          </h2>
          <p className="lead text-center mb-5">
            Test your accessibility knowledge by reviewing code snippets and
            identifying issues. Each challenge presents real-world scenarios
            where accessibility improvements are needed.
          </p>

          <div className="mb-4">
            <h3 className="text-center mb-3">WCAG Version</h3>
            <div className="row justify-content-center mb-4">
              <div className="col-md-8">
                <div
                  className="btn-group w-100"
                  role="group"
                  aria-label="WCAG version selection"
                >
                  {Object.entries(WCAG_VERSIONS).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      className={`btn ${
                        wcagVersion === key
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setWcagVersion(key)}
                      aria-pressed={wcagVersion === key}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="text-center mt-2 text-muted small">
                  {currentStats.total} questions available (Beginner:{" "}
                  {currentStats.beginner}, Intermediate:{" "}
                  {currentStats.intermediate}, Advanced: {currentStats.advanced}
                  )
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-center mb-4">Choose Your Difficulty</h3>
            <div
              className="row g-3"
              role="group"
              aria-label="Difficulty selection"
            >
              <div className="col-md-4">
                <div className="card h-100 border-success">
                  <div className="card-body text-center">
                    <h4 className="card-title text-success">Beginner</h4>
                    <p className="card-text">Common accessibility issues</p>
                    <button
                      className="btn btn-success w-100"
                      onClick={() => handleStartGame("beginner")}
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-warning">
                  <div className="card-body text-center">
                    <h4 className="card-title" style={{ color: "#996600" }}>
                      Intermediate
                    </h4>
                    <p className="card-text">ARIA and semantic HTML</p>
                    <button
                      className="btn btn-warning text-dark w-100"
                      onClick={() => handleStartGame("intermediate")}
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-danger">
                  <div className="card-body text-center">
                    <h4 className="card-title text-danger">Advanced</h4>
                    <p className="card-text">Complex patterns & WCAG</p>
                    <button
                      className="btn btn-danger w-100"
                      onClick={() => handleStartGame("advanced")}
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={onViewLeaderboard}
            >
              View Leaderboards
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StartScreen;
