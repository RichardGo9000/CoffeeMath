quizLength = 10;
let correctAnswer = NaN;
let questionString = "";
let questionList = [];
questionNumber = 1;
let responseTrackingString = "";
let responseTracker = []; //use one string per question to track whether response was correct after n number of tries, or skipped (c=correct, i=incorrect, s=skipped[s Not implemented yet])
let responseList = []; //use one array per question to track actual responses
const questionDisplay = document.getElementById("question");

document.addEventListener("keydown", (e) => {
  e = e || window.event;
  var regex = /^[0-9.,\-]+$/;
  if (regex.test(e.key)) {
    document.getElementById("response").innerHTML = "";
    if (document.activeElement.tagName != "INPUT")
      document.getElementById("answer").value += e.key;
  } else if (e.key == "Backspace") {
    document.getElementById("response").innerHTML = "";
    if (document.activeElement.tagName != "INPUT")
      document.getElementById("answer").value = document
        .getElementById("answer")
        .value.slice(0, -1);
  }
  if (e.key == "Enter") submitCard();
  //could check for alt-tab and ctrl-shift-i here, these keystrokes on difficult questions could indicate cheating.
});

function randomProblem() {
  document.getElementById("response").innerHTML = "";
  document.getElementById("answer").value = "";
  document.getElementById("submit").value = "Check";

  //a:addition, s:subtraction, d:division, m:multiplication, f:factorial, p:percentage, po:percent of, e:exponent
  const possibleQuestions = [
    "a",
    "s",
    "s",
    "d",
    "d",
    "d",
    "m",
    "m",
    "f",
    "p",
    /*"po",*/
    "e"
  ];
  let random = Math.floor(Math.random() * possibleQuestions.length);
  let nextQuestion = possibleQuestions[random];

  switch (nextQuestion) {
    case "a":
      generateAdditionProblem(2, 2);
      break;
    case "s":
      generateSubtractionProblem(2, 2);
      break;
    case "m":
      generateMultiplicationProblem(1, 2);
      break;
    case "d":
      generateDivisionProblem(2, 1);
      break;
    case "f":
      generateFactorialProblem();
      break;
    case "p":
      generatePercentageProblem();
      break;
    case "po":
      generatePercentOfProblem();
      break;
    case "e":
      generateExponentProblem();
      break;
  }
  questionList.push(`${questionNumber}) ${questionString} = ${correctAnswer}`);
  console.log(`${questionNumber}) ${questionString} = ${correctAnswer}`); //DEBUGGING
  questionNumber++;
}

function generateFalseOverview() {
  //DEBUGGING function
  /* BROKEN, off by one error when incorrectAnswerCount === 1 
also the order of the overview seems wrong*/
  let incorrectAnswerCount = 2;
  for (let i = 0; i < quizLength; i++) {
    randomProblem();
    document.getElementById("answer").value = correctAnswer;
    incorrectAnswerCount--;
    if (incorrectAnswerCount > 0) {
      //   incorrectAnswerCount--;
      document.getElementById("answer").value++;
    }

    checkAnswer();
  }
}

function generateExponentProblem() {
  let base = NaN;
  let power = NaN;
  const possibleBases = [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const possiblePowers = [0, 1, 2, 2, 2, 2, 3, 3, 4];
  base = possibleBases[Math.floor(Math.random() * possibleBases.length)];//randomSingleDigit();
  power = possiblePowers[Math.floor(Math.random() * possiblePowers.length)]; //randomSingleDigit();
  correctAnswer = base ** power;
  questionString = `${base} ^ ${power}`;
  // document.getElementById("question").innerHTML = questionString;
  display(questionString);
}

function randomSingleDigit() {
  // returns 1-9
  let rNumber = Math.floor(Math.random() * 10); //0-9
  if (rNumber == 0) {
    rNumber += 1;
  }
  return rNumber;
}
function randomDoubleDigit() {
  //returns 10-99
  let number = Math.floor(Math.random() * 100);
  if (number < 10) number += 10;
  if (number > 99) number -= 7;
  return number;
}
function randomTripleDigit() {
  //100-999
  let number = Math.floor(Math.random() * 1000);
  if (number < 100) number += 110;
  if (number > 999) number -= 1;
  return number;
}
//incorporate a round to 3 digits function

function generatePercentageProblem() {
  // `What percentage is ${a} of ${b}`
  // (part / the whole) * 100
  let a = NaN;
  let b = NaN;
  a = randomSingleDigit();
  b = randomDoubleDigit();

  correctAnswer = (a / b) * 100;
  correctAnswer = Math.round(correctAnswer * 1000) / 1000; //round to 3 decimals
  correctAnswer = `${correctAnswer}%`;
  questionString = `What percentage of ${b} is the number ${a}? (__%)`;

  // document.getElementById("question").innerHTML = questionString;
  display(questionString, "");
}


// Percent Of problem needs to be worded correctly
function generatePercentOfProblem() {
  // `What number is ${a}% of ${b}?`
  // (part / the whole) * 100
  let a = NaN;
  let b = NaN;
  a = randomSingleDigit();
  b = randomDoubleDigit();

  correctAnswer = (a / 100) * b;
  correctAnswer = Math.round(correctAnswer * 1000) / 1000; //round to 3 decimals

  questionString = `What number is ${a}% of ${b}?`;

  // document.getElementById("question").innerHTML = questionString;
  display(questionString, "");
}

function generateAdditionProblem(digitCountA, digitCountB) {
  let a = NaN;
  let b = NaN;
  // if (digitCountA == 1) a = randomSingleDigit();
  if (digitCountA == 2) a = randomDoubleDigit();
  else if (digitCountA == 3) a = randomTripleDigit();
  else a = randomSingleDigit();
  // if (digitCountB == 1) b = randomSingleDigit();
  if (digitCountB == 2) b = randomDoubleDigit();
  else if (digitCountB == 3) b = randomTripleDigit();
  else b = randomSingleDigit();
  correctAnswer = a + b;
  questionString = `${a} + ${b}`;
  // document.getElementById("question").innerHTML = questionString;
  display(questionString);
}

function generateSubtractionProblem(digitCountA, digitCountB) {
  let a = NaN;
  let b = NaN;
  // if (digitCountA == 1) a = randomSingleDigit();
  if (digitCountA == 2) a = randomDoubleDigit();
  else if (digitCountA == 3) a = randomTripleDigit();
  else a = randomSingleDigit();
  // if (digitCountB == 1) b = randomSingleDigit();
  if (digitCountB == 2) b = randomDoubleDigit();
  else if (digitCountB == 3) b = randomTripleDigit();
  else b = randomSingleDigit();
  correctAnswer = a - b;
  questionString = `${a} - ${b}`;
  // document.getElementById("question").innerHTML = questionString;
  display(questionString);
}

function generateMultiplicationProblem(digitCountA, digitCountB) {
  let a = NaN;
  let b = NaN;
  // if (digitCountA == 1) a = randomSingleDigit();
  if (digitCountA == 2) a = randomDoubleDigit();
  else if (digitCountA == 3) a = randomTripleDigit();
  else a = randomSingleDigit();
  // if (digitCountB == 1) b = randomSingleDigit();
  if (digitCountB == 2) b = randomDoubleDigit();
  else if (digitCountB == 3) b = randomTripleDigit();
  else b = randomSingleDigit();
  correctAnswer = a * b;
  questionString = `${a} x ${b}`;
  // document.getElementById("question").innerHTML = questionString;
  display(questionString);
}

function generateDivisionProblem(digitCountA, digitCountB) {
  let a = NaN;
  let b = NaN;
  // if (digitCountA == 1) a = randomSingleDigit();
  if (digitCountA == 2) a = randomDoubleDigit();
  else if (digitCountA == 3) a = randomTripleDigit();
  else a = randomSingleDigit();
  // if (digitCountB == 1) b = randomSingleDigit();
  if (digitCountB == 2) b = randomDoubleDigit();
  else if (digitCountB == 3) b = randomTripleDigit();
  else b = randomSingleDigit();
  correctAnswer = a / b;
  correctAnswer = Math.round(correctAnswer * 1000) / 1000; //round to 3 decimals
  questionString = `${a} / ${b}`;
  // document.getElementById("question").innerHTML = questionString;
  display(questionString);
}

function generateFactorialProblem() {
  let n = randomSingleDigit();
  let N = [];
  correctAnswer = 0;
  for (let i = n; i > 0; i--) {
    correctAnswer += i;
    N.push(i);
  }
  questionString = `${n}!`;
  display(questionString);
}

function display(questionText, answerSymbol = " = __") {
  questionDisplay.innerHTML = questionText + answerSymbol;
}

function submitCard() {
  if (document.getElementById("submit").value == "Next") {
    randomProblem();
  } else if (document.getElementById("submit").value == "Check") {
    checkAnswer();
  }
}

function checkAnswer() {
  let submittedAnswer = document.getElementById("answer").value;
  if (submittedAnswer == correctAnswer) {
    // Correct
    document.getElementById("response").innerHTML = "Correct";
    document.getElementById("submit").value = "Next";
    trackResponse("c");

    if (questionList.length == quizLength) {
      // quiz complete, show overview
      showOverview();
    }
  } else {
    // Incorrect
    document.getElementById("response").innerHTML =
      "Incorrect, give it another try!";
    trackResponse("i");
  }
}

function trackResponse(response = "c") {
  // add response type to responseTracker
  if (response == "c") {
    responseTrackingString = responseTrackingString + response;
    responseTracker.push(responseTrackingString);
    responseTrackingString = "";
  } else if (response == "i") {
    responseTrackingString = responseTrackingString + response;
  }
}

function showOverview() {
  let quizOverview = "";
  let i = 0;
  let correctCount = 0;
  questionList.forEach((equation) => {
    let rating = "";
    if (responseTracker[i] == "c") {
      rating = '<span class="green">&#x2713;</span>';
      correctCount++;
    } else {
      rating = '<span class="red">x</span>';
    }
    quizOverview += `<p>${rating} ${equation}</p>`;
    i += 1;
  });
  let percentCorrect = (correctCount / quizLength) * 100;
  quizOverview = `<h1>${percentCorrect}%</h1>` + quizOverview;
  quizOverview = `<div id="overview">
          ${quizOverview}
          </div>`;
  document.getElementById("card").innerHTML = quizOverview;
}

randomProblem();
// generateFalseOverview();
