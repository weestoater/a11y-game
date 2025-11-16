import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SIDScreen from "./components/SIDScreen";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultsScreen from "./components/ResultsScreen";
import LeaderboardScreen from "./components/LeaderboardScreen";
import SkipLink from "./components/SkipLink";
import { saveScore } from "./utils/leaderboard";

function App() {
  const [screen, setScreen] = useState("sid");
  const [studentID, setStudentID] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completionTime, setCompletionTime] = useState(0);

  const handleSubmitSID = (sid) => {
    setStudentID(sid);
    setScreen("start");
  };

  const handleStartGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setAnswers([]);
    setCompletionTime(0);
    setScreen("game");
  };

  const handleGameComplete = (finalScore, gameAnswers, timeInSeconds) => {
    setScore(finalScore);
    setAnswers(gameAnswers);
    setCompletionTime(timeInSeconds);

    // Save to leaderboard
    const correctAnswers = gameAnswers.filter((a) => a.isCorrect).length;
    const totalQuestions = gameAnswers.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    saveScore({
      sid: studentID,
      difficulty: difficulty,
      score: finalScore,
      totalQuestions: totalQuestions,
      correctAnswers: correctAnswers,
      timeInSeconds: timeInSeconds,
      percentage: percentage,
    });

    setScreen("results");
  };

  const handlePlayAgain = () => {
    setScore(0);
    setAnswers([]);
    setCompletionTime(0);
    setScreen("game");
  };

  const handleChangeDifficulty = () => {
    setDifficulty(null);
    setScore(0);
    setAnswers([]);
    setCompletionTime(0);
    setScreen("start");
  };

  const handleViewLeaderboard = () => {
    setScreen("leaderboard");
  };

  const handleBackFromLeaderboard = () => {
    if (answers.length > 0) {
      setScreen("results");
    } else {
      setScreen("start");
    }
  };

  useEffect(() => {
    // Add keyboard shortcut for restart
    const handleKeyPress = (e) => {
      if ((e.key === "r" || e.key === "R") && screen === "results") {
        handlePlayAgain();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [screen]);

  return (
    <div className="app">
      <SkipLink />
      <Header />

      <main id="main-content" role="main">
        <div className="container">
          {screen === "sid" && <SIDScreen onSubmitSID={handleSubmitSID} />}

          {screen === "start" && (
            <StartScreen
              onStartGame={handleStartGame}
              onViewLeaderboard={handleViewLeaderboard}
            />
          )}

          {screen === "game" && (
            <GameScreen
              difficulty={difficulty}
              onGameComplete={handleGameComplete}
            />
          )}

          {screen === "results" && (
            <ResultsScreen
              score={score}
              answers={answers}
              difficulty={difficulty}
              completionTime={completionTime}
              studentID={studentID}
              onPlayAgain={handlePlayAgain}
              onChangeDifficulty={handleChangeDifficulty}
              onViewLeaderboard={handleViewLeaderboard}
            />
          )}

          {screen === "leaderboard" && (
            <LeaderboardScreen
              onBack={handleBackFromLeaderboard}
              currentSID={studentID}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
