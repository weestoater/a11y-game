import { useState, useEffect, useRef } from "react";

function SIDScreen({ onSubmitSID }) {
  const [sid, setSID] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus on input when screen loads
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate SID - one letter followed by 6 digits (e.g., A123456)
    const trimmedSID = sid.trim().toUpperCase();

    if (!trimmedSID) {
      setError("Please enter your SID");
      return;
    }

    if (!/^[A-Z]\d{6}$/.test(trimmedSID)) {
      setError("SID must be one letter followed by 6 digits (e.g., A123456)");
      return;
    }

    // Store SID and proceed
    onSubmitSID(trimmedSID);
  };

  const handleChange = (e) => {
    setSID(e.target.value);
    if (error) setError("");
  };

  return (
    <section className="container my-5" aria-labelledby="sid-heading">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2
                id="sid-heading"
                className="card-title text-center mb-4"
                tabIndex="-1"
              >
                Enter Your Standard ID
              </h2>
              <p className="text-muted text-center mb-4">
                Your SID will be used to track your progress on the
                leaderboards. Your best scores for each difficulty level will be
                saved.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="sid-input" className="form-label">
                    Standard ID (SID)
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    id="sid-input"
                    className={`form-control form-control-lg ${
                      error ? "is-invalid" : ""
                    }`}
                    value={sid}
                    onChange={handleChange}
                    placeholder="e.g., A123456"
                    aria-describedby={error ? "sid-error" : "sid-help"}
                    aria-invalid={error ? "true" : "false"}
                    maxLength="7"
                  />
                  <div id="sid-help" className="form-text">
                    One letter followed by 6 digits
                  </div>
                  {error && (
                    <div
                      id="sid-error"
                      className="invalid-feedback d-block"
                      role="alert"
                      aria-live="polite"
                    >
                      {error}
                    </div>
                  )}
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SIDScreen;
