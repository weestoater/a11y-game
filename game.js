// A11y Code Detective - Game Logic
// Main game controller and state management

class A11yGame {
  constructor() {
    this.currentDifficulty = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];
    this.selectedAnswer = null;

    this.initializeElements();
    this.attachEventListeners();
  }

  initializeElements() {
    // Screens
    this.startScreen = document.getElementById("start-screen");
    this.gameScreen = document.getElementById("game-screen");
    this.resultsScreen = document.getElementById("results-screen");

    // Game elements
    this.currentQuestionSpan = document.getElementById("current-question");
    this.totalQuestionsSpan = document.getElementById("total-questions");
    this.currentScoreSpan = document.getElementById("current-score");
    this.progressBar = document.querySelector(".progress-fill");
    this.progressBarContainer = document.querySelector(".progress-bar");

    this.questionTitle = document.getElementById("question-title");
    this.codeDisplay = document.getElementById("code-display");
    this.questionText = document.getElementById("question-text");
    this.answerOptions = document.querySelector(".answer-options");
    this.submitButton = document.getElementById("submit-answer");
    this.feedbackPanel = document.getElementById("feedback-panel");
    this.nextButton = document.getElementById("next-question");

    // Results elements
    this.finalScoreSpan = document.getElementById("final-score");
    this.scorePercentageSpan = document.getElementById("score-percentage");
    this.correctAnswersSpan = document.getElementById("correct-answers");
    this.incorrectAnswersSpan = document.getElementById("incorrect-answers");
    this.difficultyPlayedSpan = document.getElementById("difficulty-played");
    this.badgeDisplay = document.getElementById("badge-display");
    this.badgeMessage = document.getElementById("badge-message");
  }

  attachEventListeners() {
    // Difficulty selection
    document.querySelectorAll("[data-difficulty]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const difficulty = e.currentTarget.getAttribute("data-difficulty");
        this.startGame(difficulty);
      });
    });

    // Submit answer
    this.submitButton.addEventListener("click", () => this.submitAnswer());

    // Next question
    this.nextButton.addEventListener("click", () => this.nextQuestion());

    // Play again / Change difficulty
    document.getElementById("play-again").addEventListener("click", () => {
      this.startGame(this.currentDifficulty);
    });

    document
      .getElementById("change-difficulty")
      .addEventListener("click", () => {
        this.showScreen("start");
        this.resetGame();
      });
  }

  startGame(difficulty) {
    this.currentDifficulty = difficulty;
    this.questions = this.getQuestions(difficulty);
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];

    this.showScreen("game");
    this.loadQuestion();
    this.updateGameUI();
  }

  getQuestions(difficulty) {
    // Get all questions for the difficulty and shuffle them
    const questions = [...questionDatabase[difficulty]];
    return this.shuffleArray(questions);
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  loadQuestion() {
    const question = this.questions[this.currentQuestionIndex];
    this.selectedAnswer = null;

    // Update question content
    this.questionTitle.textContent = question.title;
    this.codeDisplay.textContent = question.code;
    this.questionText.textContent = question.question;

    // Shuffle answer options to randomize their order
    const shuffledOptions = question.options.map((option, index) => ({
      text: option,
      originalIndex: index,
    }));
    this.shuffleArray(shuffledOptions);

    // Store the mapping for answer validation
    this.currentAnswerMapping = shuffledOptions.map((opt) => opt.originalIndex);

    // Create answer options
    this.answerOptions.innerHTML = "";
    shuffledOptions.forEach((option, displayIndex) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "answer-option";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.id = `option-${displayIndex}`;
      radio.value = displayIndex;

      const label = document.createElement("label");
      label.setAttribute("for", `option-${displayIndex}`);
      label.textContent = option.text;

      radio.addEventListener("change", () => this.selectAnswer(displayIndex));

      optionDiv.appendChild(radio);
      optionDiv.appendChild(label);
      this.answerOptions.appendChild(optionDiv);
    });

    // Reset UI state
    this.submitButton.disabled = true;
    this.feedbackPanel.style.display = "none";
    this.feedbackPanel.className = "feedback-panel";

    // Update progress
    this.updateGameUI();

    // Focus on the question title for screen reader announcement
    this.questionTitle.focus();
  }

  selectAnswer(index) {
    this.selectedAnswer = index;
    this.submitButton.disabled = false;
  }

  submitAnswer() {
    if (this.selectedAnswer === null) return;

    const question = this.questions[this.currentQuestionIndex];

    // Map the displayed answer index back to the original index
    const originalAnswerIndex = this.currentAnswerMapping[this.selectedAnswer];
    const isCorrect = originalAnswerIndex === question.correctAnswer;

    // Store answer
    this.answers.push({
      questionId: question.id,
      userAnswer: originalAnswerIndex,
      correctAnswer: question.correctAnswer,
      isCorrect: isCorrect,
    });

    // Update score
    if (isCorrect) {
      this.score += 10;
      this.currentScoreSpan.textContent = this.score;
    }

    // Show feedback
    this.showFeedback(isCorrect, question);

    // Disable answer options
    document.querySelectorAll('input[name="answer"]').forEach((radio) => {
      radio.disabled = true;
    });

    this.submitButton.disabled = true;
  }

  showFeedback(isCorrect, question) {
    this.feedbackPanel.style.display = "block";
    this.feedbackPanel.className = `feedback-panel ${
      isCorrect ? "correct" : "incorrect"
    }`;

    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackMessage = document.getElementById("feedback-message");
    const feedbackExplanation = document.getElementById("feedback-explanation");

    if (isCorrect) {
      feedbackTitle.textContent = "✓ Correct!";
      feedbackMessage.textContent =
        "Great job! You identified the accessibility issue.";
    } else {
      feedbackTitle.textContent = "✗ Incorrect";
      feedbackMessage.textContent = `The correct answer was: ${
        question.options[question.correctAnswer]
      }`;
    }

    feedbackExplanation.innerHTML = `
            <p><strong>Explanation:</strong> ${question.explanation}</p>
            <p><strong>WCAG Reference:</strong> ${question.wcagReference}</p>
        `;

    // Focus on feedback for screen reader announcement
    this.feedbackPanel.focus();
  }

  nextQuestion() {
    this.currentQuestionIndex++;

    if (this.currentQuestionIndex < this.questions.length) {
      this.loadQuestion();
    } else {
      this.showResults();
    }
  }

  showResults() {
    this.showScreen("results");

    const totalQuestions = this.questions.length;
    const correctAnswers = this.answers.filter((a) => a.isCorrect).length;
    const incorrectAnswers = totalQuestions - correctAnswers;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Update results
    this.finalScoreSpan.textContent = this.score;
    this.scorePercentageSpan.textContent = `${percentage}%`;
    this.correctAnswersSpan.textContent = correctAnswers;
    this.incorrectAnswersSpan.textContent = incorrectAnswers;
    this.difficultyPlayedSpan.textContent = this.capitalizeFirst(
      this.currentDifficulty
    );

    // Show badge
    this.showBadge(percentage);

    // Focus on results heading
    document.getElementById("results-heading").focus();
  }

  showBadge(percentage) {
    let badge, message;

    if (percentage === 100) {
      badge = "🏆";
      message = "Perfect Score! You're an accessibility champion!";
    } else if (percentage >= 80) {
      badge = "🌟";
      message = "Excellent! You have strong accessibility knowledge!";
    } else if (percentage >= 60) {
      badge = "👍";
      message = "Good job! Keep learning to improve further!";
    } else if (percentage >= 40) {
      badge = "📚";
      message = "Not bad! Review the explanations to strengthen your skills.";
    } else {
      badge = "🔰";
      message = "Keep practicing! Accessibility is a journey.";
    }

    this.badgeDisplay.innerHTML = `<div class="badge">${badge}</div>`;
    this.badgeMessage.textContent = message;
  }

  updateGameUI() {
    const current = this.currentQuestionIndex + 1;
    const total = this.questions.length;
    const progress = (this.currentQuestionIndex / total) * 100;

    this.currentQuestionSpan.textContent = current;
    this.totalQuestionsSpan.textContent = total;
    this.currentScoreSpan.textContent = this.score;
    this.progressBar.style.width = `${progress}%`;
    this.progressBarContainer.setAttribute("aria-valuenow", progress);
  }

  showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });

    // Show selected screen
    const screens = {
      start: this.startScreen,
      game: this.gameScreen,
      results: this.resultsScreen,
    };

    screens[screenName].classList.add("active");
  }

  resetGame() {
    this.currentDifficulty = null;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.answers = [];
    this.selectedAnswer = null;
  }

  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Initialize game when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const game = new A11yGame();

  // Add keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    // Press 'R' to restart (when on results screen)
    if (e.key === "r" || e.key === "R") {
      if (
        document.getElementById("results-screen").classList.contains("active")
      ) {
        document.getElementById("play-again").click();
      }
    }
  });
});
