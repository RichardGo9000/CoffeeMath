import AdditionProblem from "./problems/Addition.js";
import SubtractionProblem from "./problems/Subtraction.js";
import MultiplicationProblem from "./problems/Multiplication.js";
import DivisionProblem from "./problems/Division.js";
import FactorialProblem from "./problems/Factorial.js";
import PercentageProblem from "./problems/Percentage.js";
import ExponentProblem from "./problems/Exponent.js";
export class Quiz {
    constructor() {
        this.quizLength = 10;
        this.correctAnswer = NaN;
        this.questionString = "";
        this.questionList = [];
        this.questionNumber = 1;
        this.responseTrackingString = "";
        this.responseTracker = []; //use one string per question to track whether response was correct after n number of tries, or skipped (c=correct, i=incorrect, s=skipped[s Not implemented yet])
        this.responseList = []; //use one array per question to track actual responses
        this.questionDisplay = null;
        this.answerElement = null;
        this.responseElement = null;
        this.submitElement = null;
        this.problem = null;
    }
    init() {
        this.setupQuestionCard();
        this.selectRandomProblem();
        this.answerElement = document.getElementById("answer");
        this.responseElement = document.getElementById("response");
        document.addEventListener("keydown", (e) => {
            const regex = /^[0-9.,\-]+$/;
            if (regex.test(e.key)) {
                this.responseElement.innerHTML = "";
                if (document.activeElement.tagName != "INPUT")
                    this.answerElement.value += e.key;
            }
            else if (e.key == "Backspace") {
                this.responseElement.innerHTML = "";
                if (document.activeElement.tagName != "INPUT")
                    this.answerElement.value = this.answerElement.value.slice(0, -1);
            }
            if (e.key == "Enter")
                this.submitCard();
            //could check for alt-tab and ctrl-shift-i here, these keystrokes on difficult questions could indicate cheating.
        });
    }
    //   setupQuestionCard(): void {
    //     document.getElementById("card").innerHTML = `
    // <p id="response"></p>
    // <p id="question"></p>
    // <div class="f-row">
    //     <input id="answer" type="text" />
    //     <input id="submit" class="button" type="button" value="Check"/>
    // </div>
    // `;
    //     this.submitElement = document.getElementById("submit") as HTMLInputElement;
    //     this.submitElement.addEventListener("click", () => this.submitCard());
    //     this.questionDisplay = document.getElementById("question");
    //   }
    setupQuestionCard() {
        document.getElementById("card").innerHTML = `
    <p id="response"></p>
    <p id="question"></p>
    <div class="f-row">
      <input id="answer" type="text" />
      <button id="submit" type="submit" class="button" name="image"> 
        <img id="goArrow" type="svg" src="img/goArrowBlue.svg"></img> 
      </button>
    </div>
`;
        this.submitElement = document.getElementById("submit");
        this.submitElement.addEventListener("click", () => this.submitCard());
        this.questionDisplay = document.getElementById("question");
    }
    setupNextCard() {
        if (this.questionList.length === this.quizLength) {
            this.showOverview();
        }
        else {
            console.log("setting up next card");
            this.answerElement.value = "";
            // this.submitElement.value = "Check"; //change next button to submit button
            this.selectRandomProblem();
        }
    }
    selectRandomProblem() {
        //select the answer field and reset to blank
        // document.getElementById("answer").innerHTML = "";
        // this.setupQuestionCard();
        // document.getElementById("card").textContent = "";
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
            /*"p",
            "po",*/
            "e",
        ];
        let random = Math.floor(Math.random() * possibleQuestions.length);
        let nextQuestion = possibleQuestions[random];
        let problemResponse;
        switch (nextQuestion) {
            case "a": {
                this.problem = new AdditionProblem();
                problemResponse = this.problem.mathFn(2, 2);
                break;
            }
            case "s": {
                this.problem = new SubtractionProblem();
                problemResponse = this.problem.mathFn(2, 2);
                break;
            }
            case "m": {
                this.problem = new MultiplicationProblem();
                problemResponse = this.problem.mathFn(1, 2);
                break;
            }
            case "d": {
                this.problem = new DivisionProblem();
                problemResponse = this.problem.mathFn(2, 1);
                break;
            }
            case "f": {
                this.problem = new FactorialProblem();
                if (this.problem instanceof FactorialProblem) {
                    problemResponse = this.problem.mathFn();
                }
                break;
            }
            case "p": {
                this.problem = new PercentageProblem();
                if (this.problem instanceof PercentageProblem) {
                    problemResponse = this.problem.mathFn();
                }
                break;
            }
            case "e": {
                this.problem = new ExponentProblem();
                if (this.problem instanceof ExponentProblem) {
                    problemResponse = this.problem.mathFn();
                }
                break;
            }
        }
        this.questionList.push(`${this.questionNumber}) ${problemResponse.question} = ${problemResponse.answer}`);
        console.log(`${this.questionNumber}) ${problemResponse.question} = ${problemResponse.answer}`); //DEBUGGING
        this.questionNumber++;
    }
    /*
  const places = textInput.split('.');
  if (places.length > 1){
    parseFloat(textInput)
  } else {
    parseInt(textInput, 10)
  }
  */
    checkAnswer() {
        // let submittedAnswer: string = this.answerElement.value;
        let submittedAnswer = parseFloat(this.answerElement.value);
        // submittedAnswer = submittedAnswer
        console.log({ submittedAnswer });
        console.log({ answer: this.problem.answer });
        if (submittedAnswer === this.problem.answer) {
            // Correct
            this.responseElement.innerHTML = "Correct";
            // this.submitElement.value = "Next";
            this.trackResponse("c");
            this.setupNextCard();
            //call next random problem
            // this.selectRandomProblem();
            // quiz complete, show overview
            // if (this.questionList.length > this.quizLength) this.showOverview();
        }
        else {
            // Incorrect
            this.responseElement.innerHTML = "Incorrect, give it another try!";
            this.trackResponse("i");
        }
    }
    trackResponse(response = "c") {
        // add response type to responseTracker
        if (response == "c") {
            this.responseTrackingString = this.responseTrackingString + response;
            this.responseTracker.push(this.responseTrackingString);
            this.responseTrackingString = "";
        }
        else if (response == "i") {
            this.responseTrackingString = this.responseTrackingString + response;
        }
    }
    showOverview() {
        let quizOverview = "";
        let i = 0;
        let correctCount = 0;
        this.questionList.forEach((equation) => {
            let rating;
            if (this.responseTracker[i] == "c") {
                rating = '<span class="green">&#x2713;</span>';
                correctCount++;
            }
            else {
                rating = '<span class="red">x</span>';
            }
            quizOverview += `<p>${rating} ${equation}</p>`;
            i += 1;
        });
        let percentCorrect = (correctCount / this.quizLength) * 100;
        quizOverview = `<h1>${percentCorrect}%</h1>` + quizOverview;
        quizOverview = `<div id="overview">
          ${quizOverview}
          </div>`;
        document.getElementById("card").innerHTML = quizOverview;
    }
    submitCard() {
        console.log("running this.checkAnswer()");
        this.checkAnswer();
        // if (this.submitElement.value == "Next") {
        //   console.log("running this.selectRandomProblem()");
        //   this.selectRandomProblem();
        //   // randomProblem();
        // } else if (this.submitElement.value == "Check") {
        //   console.log("running this.checkAnswer()");
        //   this.checkAnswer();
        // }
    }
}
export default Quiz;
//# sourceMappingURL=Quiz.js.map