import { useEffect, useRef } from "react";

function StartScreen({ onStartGame, onViewLeaderboard }) {
  const headingRef = useRef(null);

  useEffect(() => {
    // Focus on heading when screen loads
    headingRef.current?.focus();
  }, []);

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
                      onClick={() => onStartGame("beginner")}
                    >
                      Start
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-warning">
                  <div className="card-body text-center">
                    <h4 className="card-title" style={{ color: "#cc8800" }}>
                      Intermediate
                    </h4>
                    <p className="card-text">ARIA and semantic HTML</p>
                    <button
                      className="btn btn-warning text-dark w-100"
                      onClick={() => onStartGame("intermediate")}
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
                      onClick={() => onStartGame("advanced")}
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
