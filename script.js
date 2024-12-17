const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Which programming language is used for web development?",
    answers: [
      { text: "Python", correct: false },
      { text: "C++", correct: false },
      { text: "JavaScript", correct: true },
      { text: "Java", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Creative Style Sheets", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Computer Style Sheets", correct: false },
      { text: "Colorful Style Sheets", correct: false },
    ],
  },
  {
    question: "What year was JavaScript created?",
    answers: [
      { text: "1995", correct: true },
      { text: "2000", correct: false },
      { text: "1990", correct: false },
      { text: "1985", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

// Start the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  resultElement.classList.add("hidden");
  nextButton.classList.add("hidden");
  nextButton.disabled = true;
  showQuestion();
}

// Display a question
function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () =>
      selectAnswer(button, answer.correct)
    );
    answerButtonsElement.appendChild(button);
  });
}

// Reset the answer buttons
function resetState() {
  answerButtonsElement.innerHTML = "";
  nextButton.disabled = true;
}

// Handle answer selection
function selectAnswer(selectedButton, correct) {
  const buttons = answerButtonsElement.querySelectorAll("button");

  buttons.forEach((button) => {
    button.disabled = true;
  });

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
  }

  nextButton.disabled = false;
  nextButton.classList.remove("hidden");
}

// Go to the next question
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

// Show the final result
function showResult() {
  resultElement.classList.remove("hidden");
  scoreElement.textContent = `${score} / ${questions.length}`;
  nextButton.classList.add("hidden");
}

// Restart the quiz
restartButton.addEventListener("click", startQuiz);

// Initialize the quiz
startQuiz();
