import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import {
  getLeaderboardByDifficulty,
  formatTime,
  clearLeaderboard,
} from "../utils/leaderboard";

function LeaderboardScreen({ onBack, currentSID }) {
  const [selectedDifficulty, setSelectedDifficulty] = useState("beginner");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
    loadLeaderboard(selectedDifficulty);
  }, []);

  const loadLeaderboard = (difficulty) => {
    const data = getLeaderboardByDifficulty(difficulty);
    setLeaderboardData(data);
    setSelectedDifficulty(difficulty);
  };

  const handleClearLeaderboard = () => {
    if (
      window.confirm(
        "Are you sure you want to clear all leaderboard data? This cannot be undone."
      )
    ) {
      clearLeaderboard();
      setLeaderboardData([]);
    }
  };

  const handleExportToExcel = () => {
    // Get data for all difficulty levels
    const beginnerData = getLeaderboardByDifficulty("beginner");
    const intermediateData = getLeaderboardByDifficulty("intermediate");
    const advancedData = getLeaderboardByDifficulty("advanced");

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Helper function to format data for Excel
    const formatDataForExcel = (data) => {
      return data.map((entry, index) => ({
        Rank: index + 1,
        "Standard ID": entry.sid,
        Score: entry.score,
        "Correct Answers": entry.correct,
        "Total Questions": entry.total,
        "Accuracy (%)": entry.percentage,
        "Time (MM:SS)": formatTime(entry.timeInSeconds),
        "Time (seconds)": entry.timeInSeconds,
        Date: new Date(entry.timestamp).toLocaleString(),
      }));
    };

    // Create worksheets for each difficulty level
    if (beginnerData.length > 0) {
      const beginnerSheet = XLSX.utils.json_to_sheet(
        formatDataForExcel(beginnerData)
      );
      XLSX.utils.book_append_sheet(workbook, beginnerSheet, "Beginner");
    }

    if (intermediateData.length > 0) {
      const intermediateSheet = XLSX.utils.json_to_sheet(
        formatDataForExcel(intermediateData)
      );
      XLSX.utils.book_append_sheet(workbook, intermediateSheet, "Intermediate");
    }

    if (advancedData.length > 0) {
      const advancedSheet = XLSX.utils.json_to_sheet(
        formatDataForExcel(advancedData)
      );
      XLSX.utils.book_append_sheet(workbook, advancedSheet, "Advanced");
    }

    // Generate filename with current date
    const today = new Date().toISOString().split("T")[0];
    const filename = `a11y-leaderboard-${today}.xlsx`;

    // Write and download the file
    XLSX.writeFile(workbook, filename);
  };

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const getRankBadge = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}`;
  };

  return (
    <section className="screen active" aria-labelledby="leaderboard-heading">
      <h2 id="leaderboard-heading" ref={headingRef} tabIndex="-1">
        Leaderboards
      </h2>

      <div className="leaderboard-controls">
        <div
          className="difficulty-tabs"
          role="tablist"
          aria-label="Difficulty level tabs"
        >
          <button
            role="tab"
            aria-selected={selectedDifficulty === "beginner"}
            aria-controls="leaderboard-panel"
            className={`tab-button ${
              selectedDifficulty === "beginner" ? "active" : ""
            }`}
            onClick={() => loadLeaderboard("beginner")}
          >
            Beginner
          </button>
          <button
            role="tab"
            aria-selected={selectedDifficulty === "intermediate"}
            aria-controls="leaderboard-panel"
            className={`tab-button ${
              selectedDifficulty === "intermediate" ? "active" : ""
            }`}
            onClick={() => loadLeaderboard("intermediate")}
          >
            Intermediate
          </button>
          <button
            role="tab"
            aria-selected={selectedDifficulty === "advanced"}
            aria-controls="leaderboard-panel"
            className={`tab-button ${
              selectedDifficulty === "advanced" ? "active" : ""
            }`}
            onClick={() => loadLeaderboard("advanced")}
          >
            Advanced
          </button>
        </div>
      </div>

      <div
        id="leaderboard-panel"
        role="tabpanel"
        aria-labelledby="leaderboard-heading"
        className="leaderboard-panel"
      >
        <h3>{capitalizeFirst(selectedDifficulty)} Level</h3>

        {leaderboardData.length === 0 ? (
          <div className="empty-leaderboard">
            <p>No scores yet for this difficulty level.</p>
            <p>Be the first to complete a game and set a record!</p>
          </div>
        ) : (
          <div className="leaderboard-table-container">
            <table className="leaderboard-table">
              <caption className="sr-only">
                Leaderboard for {selectedDifficulty} difficulty, sorted by score
                and time
              </caption>
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Standard ID</th>
                  <th scope="col">Score</th>
                  <th scope="col">Accuracy</th>
                  <th scope="col">Time</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr
                    key={index}
                    className={entry.sid === currentSID ? "current-user" : ""}
                  >
                    <td className="rank-cell">
                      <span
                        className="rank-badge"
                        aria-label={`Rank ${index + 1}`}
                      >
                        {getRankBadge(index)}
                      </span>
                    </td>
                    <td className="sid-cell">
                      {entry.sid}
                      {entry.sid === currentSID && (
                        <span className="you-badge" aria-label="This is you">
                          You
                        </span>
                      )}
                    </td>
                    <td className="score-cell">{entry.score}</td>
                    <td className="accuracy-cell">{entry.percentage}%</td>
                    <td className="time-cell">
                      {formatTime(entry.timeInSeconds)}
                    </td>
                    <td className="date-cell">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="leaderboard-info">
          <p>
            <strong>Ranking:</strong> Sorted by highest score first, then
            fastest time.
          </p>
          <p className="total-entries">
            Total entries: {leaderboardData.length}
          </p>
        </div>
      </div>

      <div className="leaderboard-actions">
        <button className="btn btn-primary btn-large" onClick={onBack}>
          Back to Game
        </button>
        <button
          className="btn btn-secondary btn-large"
          onClick={handleExportToExcel}
          aria-label="Download leaderboard as Excel file"
        >
          📊 Export to Excel
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleClearLeaderboard}
          aria-label="Clear all leaderboard data"
        >
          Clear Leaderboard
        </button>
      </div>
    </section>
  );
}

export default LeaderboardScreen;
