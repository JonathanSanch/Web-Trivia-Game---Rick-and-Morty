// grabs the question bank and saves it as a type of variable
// json just stands for a notation of javascript code
import bank from "./questionbank.json" assert { type: "json" };

// document.getelement goes to the HTML and grabs whatever doc has that ID and saves within the variable
const quizWrapper = document.getElementById("quiz");

// querySelector is like getlement but it is more powerful and versatile in order to get with a filter
// so this grabs the label for each answer (a,b,c,d
const questionElem = document.querySelector("#question");
const answerA = document.querySelector("label[for='a']");
const answerB = document.querySelector("label[for='b']");
const answerC = document.querySelector("label[for='c']");
const answerD = document.querySelector("label[for='d']");

// grab the submit button
const submitBtn = document.getElementById("submitBtn");

// grabs all the answer choices and stores within answerchoice
// queryselectorALL selects all the instance - queryseector selects the first instance
const answerChoices = document.querySelectorAll("input[name='answer']");
const scoreLabel = document.getElementById("score");

// saves the question in the bank in this variable quizData
const quizData = bank.questionBank;


let questionShown = 0;
let score = 0;

// start at 0 and want to show the questions in order
function loadQuestion() {
  resetSelection();

//   set the question to quizData and indexing to question 0 (1st one) 
  let currentQuestion = quizData[questionShown];

//   this means that we're changing the innerHTML code and changing it to the currentQuestion
  questionElem.innerHTML = currentQuestion.question;
  answerA.innerHTML = currentQuestion.a;
  answerB.innerHTML = currentQuestion.b;
  answerC.innerHTML = currentQuestion.c;
  answerD.innerHTML = currentQuestion.d;
}

// this is waiting for something to happen to this button (click)
submitBtn.addEventListener("click", () => {

    // gets the user selected answer (using this function)
  let selectedAnswer = getSelection();

//   checks if the answer is correct and then increases the score
  if (selectedAnswer == quizData[questionShown].correctAnswer) {
    score++;
  }

  scoreLabel.textContent = `Score: ${score}`;

//   if the answer is not empty, then move one, because if it is, do not move on
  if (selectedAnswer != "") {
    questionShown++;
  }

//   checking if the length is less than the total number of questions, because if not it will break
  if (questionShown < quizData.length) {
    if (selectedAnswer != "") {
      loadQuestion();
    }
  } else {
    quizWrapper.innerHTML = `<h1>Quiz completed!</h1><h1>You scored ${score}/${quizData.length} points!</h1><button id="retryBtn" onclick="location.reload();">Try again?</button>`;
  }
});

// this is the function to get the selection that the user selects
const getSelection = () => {
  let selectedAnswer = "";

  answerChoices.forEach((e) => {

    // checked just checks if it is checked or not
    if (e.checked) {
      selectedAnswer = e.id;
    }
  });

  return selectedAnswer;
};

// this resets the selection so that nothing is selected when you go to the next question
const resetSelection = () => {
  answerChoices.forEach((e) => {
    e.checked = false;
  });
};

loadQuestion();