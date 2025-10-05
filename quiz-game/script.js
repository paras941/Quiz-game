const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// Quiz questions
const quizQuestions = [
  {
    question: "Which of the following is a correct identifier in C++?",
    answers: [
      { text: "7var_name", correct: false },
      { text: "$var_name", correct: false },
      { text: "VAR_1234", correct: true },
      { text: " 7var_name", correct: false },
    ],
  },
  {
    question: "Which of the following is not a type of Constructor in C++?",
    answers: [
      { text: "Copy constructo", correct: false },
      { text: "Friend constructor", correct: true },
      { text: "Parameterized constructor", correct: false },
      { text: "Default constructor", correct: false },
    ],
  },
  {
    question: "Which is more effective while calling the C++ functions?",
    answers: [
      { text: "call by object", correct: false },
      { text: "call by pointer", correct: false },
      { text: "call by value", correct: false },
      { text: "call by reference", correct: true },
    ],
  },
  {
    question: "Which of the following symbol is used to declare the preprocessor directives in C++?",
    answers: [
      { text: "$", correct: false },
      { text: "*", correct: false },
      { text: "#", correct: true },
      { text: "^", correct: false },
    ],
  },
  {
    question: "Which of the following type is provided by C++ but not C?",
    answers: [
      { text: "double", correct: false },
      { text: "float", correct: false },
      { text: "bool", correct: true },
      { text: "int", correct: false },
    ],
  },

  {
    question: "Which of the following is the default return value of functions in C++?",
    answers: [
      { text: "char", correct: false },
      { text: "int", correct: true },
      { text: "float", correct: false },
      { text: "void", correct: false },
    ],
  },

  {
    question: "Which operator is having the highest precedence?",
    answers: [
      { text: "equality", correct: false },
      { text: "unary", correct: false },
      { text: "shift", correct: false },
      { text: "postfix", correct: true },
    ],
  },

  
];

// Quiz STATE VARS

let currentQuestionIndex =0;
let score =0;
let answersDisabled = false;

totalQuestionsSpan.textContent= quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event Listerner

startButton.addEventListener("click",startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
   currentQuestionIndex =0;
   scoreSpan.textContent =0 ;

   startScreen.classList.remove("active");
   quizScreen.classList.add("active");

   showQuestions()
}

function showQuestions(){
    answersDisabled = false;
    const  currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex +1;

    const progressPercent = (currentQuestionIndex  / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%"

    questionText.textContent= currentQuestion.question

    // explain this in a second
    answersContainer.innerHTML ="";

    currentQuestion.answers.forEach(answer=>{
      const button = document.createElement("button")
      button.textContent = answer.text
      button.classList.add("answer-btn")

      // datset stores the custom data
      button.dataset.correct = answer.correct

      button.addEventListener("click", selectAnswer);
      answersContainer.appendChild(button);
    } );
}

function selectAnswer(event){
        if(answersDisabled) return 

        answersDisabled = true

        const selectButton = event.target;
        const isCorrect = selectButton.dataset.correct ==="true"

        Array.from(answersContainer.children).forEach((button) =>{
              if(button.dataset.correct==="true"){
                button.classList.add("correct")
              }else if (button === selectButton) {
                button.classList.add("incorrect");
              }
        });

        if(isCorrect){
          score++;
          scoreSpan.textContent=score;
        }

        setTimeout(() => {
          currentQuestionIndex++;

          if(currentQuestionIndex<quizQuestions.length){
            showQuestions()
          }else{
              showResults()

          }
        }, 1000);
}

function showResults(){
  quizScreen.classList.remove("active")
  resultScreen.classList.add("active")

  finalScoreSpan.textContent=score;

  const percentage = (score/quizQuestions.length)*100

  if(percentage==100){
    resultMessage.textContent = " Perfect! You are a genius!";
  }else if(percentage>=80){
    resultMessage.textContent = " Greatjob! You know your stuff";
  }else if(percentage>=60){
    resultMessage.textContent = " Good effort! keep Learning";
  }else if(percentage>=40){
    resultMessage.textContent = " Not bad! try again to improve";
  }else{
    resultMessage.textContent = " Keep Studying! You will get better  ";
  }
}

function restartQuiz(){
    resultScreen.classList.remove("active")

    startQuiz();

}