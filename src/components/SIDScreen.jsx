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
    <section className="screen active" aria-labelledby="sid-heading">
      <h2 id="sid-heading" tabIndex="-1">
        Enter Your SID
      </h2>
      <p className="intro-text">
        Your SID will be used to track your progress on the leaderboards. Your
        best scores for each difficulty level will be saved.
      </p>

      <form onSubmit={handleSubmit} className="sid-form">
        <div className="form-group">
          <label htmlFor="sid-input">SID</label>
          <input
            ref={inputRef}
            type="text"
            id="sid-input"
            value={sid}
            onChange={handleChange}
            placeholder="e.g., A123456"
            aria-describedby={error ? "sid-error" : undefined}
            aria-invalid={error ? "true" : "false"}
            maxLength="7"
          />
          {error && (
            <div
              id="sid-error"
              className="error-message"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-large">
          Continue
        </button>
      </form>
    </section>
  );
}

export default SIDScreen;
