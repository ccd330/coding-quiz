//GIVEN I am taking a code quiz
//WHEN I click the start button
//THEN a timer starts and I am presented with a question
//WHEN I answer a question
//THEN I am presented with another question
//WHEN I answer a question incorrectly
//THEN time is subtracted from the clock
//WHEN all questions are answered or the timer reaches 0
//THEN the game is over
//WHEN the game is over
//THEN I can save my initials and score

// main variables
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// quiz variables
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // hide landing page
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // show questions section
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get current question from array
  var currentQuestion = questions[currentQuestionIndex];

  // update with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear old choices
  choicesEl.innerHTML = "";

  // loop
  currentQuestion.choices.forEach(function (choice, i) {
    // create new button for options
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // click listener
    choiceNode.onclick = questionClick;

    // show on page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if correct answer
  if (this.value !== questions[currentQuestionIndex].answer) {
    // remove time
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // show new time on page
    timerEl.textContent = time;
    feedbackEl.textContent = "Wrong!";
    feedbackEl.style.color = "grey";
    feedbackEl.style.fontSize = "25px";
  } else {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "grey";
    feedbackEl.style.fontSize = "25px";
  }

  // right or wrong
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // next question
  currentQuestionIndex++;

  // timer
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // show ending screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // get saved scores from localstorage
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // new score for current user
    var newScore = {
      score: time,
      initials: initials,
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
