import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultsScreen from "./components/ResultsScreen";
import SkipLink from "./components/SkipLink";

function App() {
  const [screen, setScreen] = useState("start");
  const [difficulty, setDifficulty] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleStartGame = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setScore(0);
    setAnswers([]);
    setScreen("game");
  };

  const handleGameComplete = (finalScore, gameAnswers) => {
    setScore(finalScore);
    setAnswers(gameAnswers);
    setScreen("results");
  };

  const handlePlayAgain = () => {
    setScore(0);
    setAnswers([]);
    setScreen("game");
  };

  const handleChangeDifficulty = () => {
    setDifficulty(null);
    setScore(0);
    setAnswers([]);
    setScreen("start");
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
          {screen === "start" && <StartScreen onStartGame={handleStartGame} />}

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
              onPlayAgain={handlePlayAgain}
              onChangeDifficulty={handleChangeDifficulty}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
