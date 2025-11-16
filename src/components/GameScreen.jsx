import { useState, useEffect, useRef } from "react";
import { questionDatabase } from "../data/questions";

function GameScreen({ difficulty, onGameComplete }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [answerMapping, setAnswerMapping] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const questionTitleRef = useRef(null);
  const feedbackPanelRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Shuffle array utility
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialize questions
  useEffect(() => {
    const allQuestions = [...questionDatabase[difficulty]];
    setQuestions(shuffleArray(allQuestions));
    // Start timer when game begins
    setStartTime(Date.now());
  }, [difficulty]);

  // Timer effect
  useEffect(() => {
    if (startTime) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => {
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
        }
      };
    }
  }, [startTime]);

  // Load current question
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      loadQuestion();
    }
  }, [currentQuestionIndex, questions]);

  const loadQuestion = () => {
    const question = questions[currentQuestionIndex];

    // Shuffle answer options
    const optionsWithIndex = question.options.map((option, index) => ({
      text: option,
      originalIndex: index,
    }));
    const shuffled = shuffleArray(optionsWithIndex);

    setShuffledOptions(shuffled);
    setAnswerMapping(shuffled.map((opt) => opt.originalIndex));
    setSelectedAnswer(null);
    setShowFeedback(false);

    // Focus on question title
    setTimeout(() => {
      questionTitleRef.current?.focus();
    }, 100);
  };

  const handleAnswerSelect = (displayIndex) => {
    setSelectedAnswer(displayIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const question = questions[currentQuestionIndex];
    const originalAnswerIndex = answerMapping[selectedAnswer];
    const correct = originalAnswerIndex === question.correctAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);

    const newAnswers = [
      ...answers,
      {
        questionId: question.id,
        userAnswer: originalAnswerIndex,
        correctAnswer: question.correctAnswer,
        isCorrect: correct,
      },
    ];
    setAnswers(newAnswers);

    if (correct) {
      setScore((prevScore) => prevScore + 10);
    }

    // Focus on feedback
    setTimeout(() => {
      feedbackPanelRef.current?.focus();
    }, 100);
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      // Stop timer
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Calculate final score from answers array to ensure accuracy
      const finalScore = answers.filter((a) => a.isCorrect).length * 10;

      // Pass final score and elapsed time to parent
      onGameComplete(finalScore, answers, elapsedTime);
    }
  };

  if (questions.length === 0) {
    return <div className="screen active">Loading...</div>;
  }

  const question = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <section className="container my-4" aria-labelledby="game-heading">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="flex-grow-1 me-3">
              <h2 id="game-heading" className="h5 mb-2">
                Question <span>{currentQuestionIndex + 1}</span> of{" "}
                <span>{questions.length}</span>
              </h2>
              <div className="progress" style={{ height: "20px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Quiz progress"
                  style={{ width: `${progress}%` }}
                >
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
            <div className="d-flex gap-3">
              <div className="badge bg-primary fs-6 p-2">Score: {score}</div>
              <div className="badge bg-info fs-6 p-2">
                Time: {formatTime(elapsedTime)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-body p-4">
          <h3
            id="question-title"
            className="card-title h4 mb-4"
            ref={questionTitleRef}
            tabIndex="-1"
          >
            {question.title}
          </h3>

          <div className="mb-4" role="region" aria-labelledby="code-label">
            <h4 id="code-label" className="h6 mb-2">
              Code to Review:
            </h4>
            <pre className="bg-light p-3 border rounded">
              <code>{question.code}</code>
            </pre>
          </div>

          <div className="mb-4">
            <p id="question-text" className="lead">
              {question.question}
            </p>
          </div>

          <div
            className="mb-4"
            role="radiogroup"
            aria-labelledby="question-text"
          >
            {shuffledOptions.map((option, displayIndex) => (
              <div key={displayIndex} className="form-check mb-2">
                <input
                  type="radio"
                  name="answer"
                  className="form-check-input"
                  id={`option-${displayIndex}`}
                  value={displayIndex}
                  checked={selectedAnswer === displayIndex}
                  onChange={() => handleAnswerSelect(displayIndex)}
                  disabled={showFeedback}
                />
                <label
                  className="form-check-label"
                  htmlFor={`option-${displayIndex}`}
                >
                  {option.text}
                </label>
              </div>
            ))}
          </div>

          <div className="d-grid">
            <button
              id="submit-answer"
              className="btn btn-primary btn-lg"
              onClick={handleSubmit}
              disabled={selectedAnswer === null || showFeedback}
            >
              Submit Answer
            </button>
          </div>
        </div>
      </div>

      {showFeedback && (
        <div
          className={`alert ${
            isCorrect ? "alert-success" : "alert-danger"
          } mt-4`}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          ref={feedbackPanelRef}
          tabIndex="-1"
        >
          <h4 className="alert-heading">
            {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
          </h4>
          <p>
            {isCorrect
              ? "Great job! You identified the accessibility issue."
              : `The correct answer was: ${
                  question.options[question.correctAnswer]
                }`}
          </p>
          <hr />
          <div>
            <p className="mb-2">
              <strong>Explanation:</strong> {question.explanation}
            </p>
            <p className="mb-3">
              <strong>WCAG Reference:</strong> {question.wcagReference}
            </p>
          </div>
          <button
            id="next-question"
            className="btn btn-primary"
            onClick={handleNext}
          >
            {currentQuestionIndex + 1 < questions.length
              ? "Next Question"
              : "See Results"}
          </button>
        </div>
      )}
    </section>
  );
}

export default GameScreen;
