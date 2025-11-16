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
      setScore(score + 10);
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
      // Pass elapsed time to parent
      onGameComplete(score + (isCorrect ? 10 : 0), answers, elapsedTime);
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
    <section className="screen active" aria-labelledby="game-heading">
      <div className="game-header">
        <div className="progress-info">
          <h2 id="game-heading">
            Question <span>{currentQuestionIndex + 1}</span> of{" "}
            <span>{questions.length}</span>
          </h2>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label="Quiz progress"
          >
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="score-timer-container">
          <div className="score-display">
            <span className="score-label">Score:</span>
            <span className="score-value">{score}</span>
          </div>
          <div className="timer-display">
            <span className="timer-label">Time:</span>
            <span className="timer-value">{formatTime(elapsedTime)}</span>
          </div>
        </div>
      </div>

      <div className="challenge-content">
        <h3
          id="question-title"
          className="question-title"
          ref={questionTitleRef}
          tabIndex="-1"
        >
          {question.title}
        </h3>

        <div
          className="code-snippet"
          role="region"
          aria-labelledby="code-label"
        >
          <h4 id="code-label">Code to Review:</h4>
          <pre>
            <code>{question.code}</code>
          </pre>
        </div>

        <div className="question-prompt">
          <p id="question-text">{question.question}</p>
        </div>

        <div
          className="answer-options"
          role="radiogroup"
          aria-labelledby="question-text"
        >
          {shuffledOptions.map((option, displayIndex) => (
            <div key={displayIndex} className="answer-option">
              <input
                type="radio"
                name="answer"
                id={`option-${displayIndex}`}
                value={displayIndex}
                checked={selectedAnswer === displayIndex}
                onChange={() => handleAnswerSelect(displayIndex)}
                disabled={showFeedback}
              />
              <label htmlFor={`option-${displayIndex}`}>{option.text}</label>
            </div>
          ))}
        </div>

        <div className="button-group">
          <button
            id="submit-answer"
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selectedAnswer === null || showFeedback}
          >
            Submit Answer
          </button>
        </div>
      </div>

      {showFeedback && (
        <div
          className={`feedback-panel ${isCorrect ? "correct" : "incorrect"}`}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
          ref={feedbackPanelRef}
          tabIndex="-1"
        >
          <div className="feedback-content">
            <h4>{isCorrect ? "✓ Correct!" : "✗ Incorrect"}</h4>
            <p>
              {isCorrect
                ? "Great job! You identified the accessibility issue."
                : `The correct answer was: ${
                    question.options[question.correctAnswer]
                  }`}
            </p>
            <div className="explanation">
              <p>
                <strong>Explanation:</strong> {question.explanation}
              </p>
              <p>
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
        </div>
      )}
    </section>
  );
}

export default GameScreen;
