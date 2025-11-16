import { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { Nav, Tab, Table, Button, Container, Row, Col } from "react-bootstrap";
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
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          <h2
            id="leaderboard-heading"
            ref={headingRef}
            tabIndex="-1"
            className="text-center mb-4"
          >
            Leaderboards
          </h2>

          <Tab.Container
            activeKey={selectedDifficulty}
            onSelect={(k) => loadLeaderboard(k)}
          >
            <Nav variant="tabs" className="mb-4" role="tablist">
              <Nav.Item>
                <Nav.Link eventKey="beginner">Beginner</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="intermediate">Intermediate</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="advanced">Advanced</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey={selectedDifficulty}>
                <h3 className="h5 mb-3">
                  {capitalizeFirst(selectedDifficulty)} Level
                </h3>

                {leaderboardData.length === 0 ? (
                  <div className="alert alert-info text-center">
                    <p className="mb-2">
                      No scores yet for this difficulty level.
                    </p>
                    <p className="mb-0">
                      Be the first to complete a game and set a record!
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="table-responsive">
                      <Table striped bordered hover className="mb-4">
                        <caption className="visually-hidden">
                          Leaderboard for {selectedDifficulty} difficulty,
                          sorted by score and time
                        </caption>
                        <thead className="table-dark">
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
                              className={
                                entry.sid === currentSID ? "table-primary" : ""
                              }
                            >
                              <td>
                                <span aria-label={`Rank ${index + 1}`}>
                                  {getRankBadge(index)}
                                </span>
                              </td>
                              <td>
                                {entry.sid}
                                {entry.sid === currentSID && (
                                  <span
                                    className="badge bg-success ms-2"
                                    aria-label="This is you"
                                  >
                                    You
                                  </span>
                                )}
                              </td>
                              <td className="fw-bold">{entry.score}</td>
                              <td>{entry.percentage}%</td>
                              <td>{formatTime(entry.timeInSeconds)}</td>
                              <td>
                                {new Date(entry.timestamp).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    <div className="alert alert-light">
                      <p className="mb-1">
                        <strong>Ranking:</strong> Sorted by highest score first,
                        then fastest time.
                      </p>
                      <p className="mb-0 text-muted">
                        Total entries: {leaderboardData.length}
                      </p>
                    </div>
                  </>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>

          <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
            <Button variant="primary" size="lg" onClick={onBack}>
              Back to Game
            </Button>
            <Button variant="info" size="lg" onClick={handleExportToExcel}>
              📊 Export to Excel
            </Button>
            <Button variant="outline-danger" onClick={handleClearLeaderboard}>
              Clear Leaderboard
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LeaderboardScreen;
