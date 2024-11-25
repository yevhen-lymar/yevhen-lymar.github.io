const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motoboats",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const quizStart = document.getElementById("quiz_start");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const startBtn = document.getElementById("start");
const userNameInput = document.getElementById("userName");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");

let currentQuiz = 0;
let score = 0;
let result = [];
let userName = "";
let userAge = "";
let userEmail = "";

startBtn.addEventListener("click", () => {
  const name = userNameInput.value.trim(); // trim обрізає зайві пробіли
  const age = ageInput.value.trim();
  const email = emailInput.value.trim();
  // console.log(name, age, email);

  if (name !== "" && age !== "" && email !== "") {
    userName = name;
    userAge = age;
    userEmail = email;

    quizStart.style.display = "none";
    quiz.style.display = "block";

    loadQuiz();
  } else {
    alert("Please enter your name, age & email");
  }
});

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function getSelected() {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  //   console.log(answer);

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;

    result.push(answer);

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `
      <div class="quiz-header">
      <h2>You answered correctly at <br /> 
      ${score}/${quizData.length} questions <br />
      ${(score / quizData.length) * 100}% / 100%
      </h2>
      <h3> Your answers ${userName}:</h3>
        <ul>
        <li> 1 question: ${result[0]}</li>
        <li> 2 question: ${result[1]}</li>
        <li> 3 question: ${result[2]}</li>
        <li> 4 question: ${result[3]}</li>
        </ul>
        </div>
        <button id="reloadBtn">Reload</button>
        `;
    }
    const reloadBtn = document.getElementById("reloadBtn");
    reloadBtn.addEventListener("click", () => location.reload());
  }
});
