import AdditionProblem from "./problems/Addition.js";
import SubtractionProblem from "./problems/Subtraction.js";
import MultiplicationProblem from "./problems/Multiplication.js";
import DivisionProblem from "./problems/Division.js";
import FactorialProblem from "./problems/Factorial.js";
import PercentageProblem from "./problems/Percentage.js";
import ExponentProblem from "./problems/Exponent.js";

type Problems =
  | AdditionProblem
  | SubtractionProblem
  | MultiplicationProblem
  | DivisionProblem
  | FactorialProblem
  | PercentageProblem
  | ExponentProblem;

export class Quiz {
  private readonly quizLength: number;
  private correctAnswer: number;
  private questionString: string;
  private questionList: string[];
  private questionNumber: number;
  private responseTrackingString: string;
  private readonly responseTracker: any[];
  private responseList: any[];
  private questionDisplay: null | HTMLElement;
  private answerElement: null | HTMLInputElement;
  private responseElement: null | HTMLInputElement;
  private submitElement: null | HTMLInputElement;
  private problem: Problems;
  // private menuOpen: boolean;

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
    // this.menuOpen = false;
  }

  init(): void {
    this.setupQuestionCard();
    this.selectRandomProblem();
    this.answerElement = document.getElementById("answer") as HTMLInputElement;
    this.responseElement = document.getElementById(
      "response"
    ) as HTMLInputElement;

    document.addEventListener("keydown", (e: KeyboardEvent): void => {
      const regex: RegExp = /^[0-9.,\-]+$/;
      if (regex.test(e.key)) {
        this.responseElement.innerHTML = "";
        if (document.activeElement.tagName != "INPUT")
          this.answerElement.value += e.key;
      } else if (e.key == "Backspace") {
        this.responseElement.innerHTML = "";
        if (document.activeElement.tagName != "INPUT")
          this.answerElement.value = this.answerElement.value.slice(0, -1);
      }
      if (e.key == "Enter") this.submitCard();
      //could check for alt-tab and ctrl-shift-i here, these keystrokes on difficult questions could indicate cheating.
    });
  }

  setupQuestionCard(): void {
    document.getElementById("card").innerHTML = `
    <div id="questionCard" class="questionCard">
      <p id="response"></p>
      <p id="question"></p>
      <div class="f-row">
        <input id="answer" type="text" autoComplete="off" />
        <button id="submit" type="submit" class="button" name="image"> 
          <img id="goArrow" type="svg" src="img/goArrowBlue.svg"></img> 
        </button>
      </div>
    </div>
`;
    this.submitElement = document.getElementById("submit") as HTMLInputElement;
    this.submitElement.addEventListener("click", () => this.submitCard());
    this.questionDisplay = document.getElementById("question");

    this.submitElement = document.getElementById("menuBtn") as HTMLInputElement;
    this.submitElement.addEventListener("click", () => this.settingsCard());
  }

  settingsCard(): void {
    //display settings card when clicked
    console.log("Opening Settings Card");

/*
  <div class="settingsCard" id="editSettings">
    <h2>Settings</h2>
    <div class="row">
      <select id="length">
        <option value="3">3</option>
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <label for="length"> questions</label>
    </div>
*/
    
    document.getElementById("card").innerHTML = `
    <div class="settingsCard" id="editSettings">
    <h2>Settings</h2>
    
    <div class="row">
      <select id="length">
        <option value="3">3</option>
        <option value="5" selected>5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
      <label for="length"> questions</label>
    </div>

    <br />

    <div id="topics">
      <!--<label for="topics" class="settingsHeader">Topics</label>-->

      <div class="checkbox" id="additionBox">
        <input type="checkbox" value="checked" id="addition" name="topics" checked>
        <label for="addition">Addition</label>
      </div>

      <div class="checkbox" id="subtractionBox">
        <input type="checkbox" value="checked" id="subtraction" name="topics" checked>
        <label for="subtraction">Subtraction</label>
      </div>

      <div class="checkbox" id="divisionBox">
        <input type="checkbox" value="checked" id="division" name="topics" checked>
        <label for="division">Division</label>
      </div>

      <div class="checkbox" id="multiplicationBox">
        <input type="checkbox" value="checked" id="multiplication" name="topics" checked>
        <label for="multiplication">Multiplication</label>
      </div>
      
      <div class="checkbox" id="factorialBox">
        <input type="checkbox" value="checked" id="factorial" name="topics" checked>
        <label for="factorial">Factorial</label>
      </div>
      
      <div class="checkbox" id="exponentBox">
        <input type="checkbox" value="checked" id="exponent" name="topics" checked>
        <label for="exponent">Exponent</label>
      </div>      

    </div>
    <br />
  </div>
    `;
  }
  //a:addition, 
  // s: subtraction
  // d: division
  // m: multiplication
  // f: factorial 
  // e: exponent

  /*
    settingsCard(): void {
    //display settings card when clicked
    console.log("Opening Settings Card");

    document.getElementById("card").innerHTML = `
  <div class="settingsCard" id="editSettings">
    <h2>Settings</h2>
    <label for="length">Length</label><input id="length" type="number" /><br />
    <div class="checkbox" id="additionBox">
      <input type="checkbox" value="checked" id="addition" name="topics" checked><label for="addition">Addition</label>
    </div>
    <div class="checkbox" id="subtractionBox">
      <input type="checkbox" value="checked" id="subtraction" name="topics" checked><label for="subtraction">Subtraction</label>
    </div>
    <br />
  </div>
    `;
  }
  */

  setupNextCard(): void {
    if (this.questionList.length === this.quizLength) {
      this.showOverview();
    } else {
      console.log("setting up next card");
      this.answerElement.value = "";
      // this.submitElement.value = "Check"; //change next button to submit button
      this.selectRandomProblem();
    }
  }

  selectRandomProblem(): void {
    //a:addition, s:subtraction, d:division, m:multiplication, f:factorial, p:percentage, po:percent of, e:exponent
    type QuestionAbbreviations = "a" | "s" | "d" | "m" | "f" | "p" | "e";
    type PossibleQuestions = Array<QuestionAbbreviations>;

    const possibleQuestions: PossibleQuestions = [
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
    let random: number = Math.floor(Math.random() * possibleQuestions.length);
    let nextQuestion: QuestionAbbreviations = possibleQuestions[random];
    let problemResponse: {
      question: null | string;
      answer: null | number | string;
    };

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

    this.questionList.push(
      `${this.questionNumber}) ${problemResponse.question} = ${problemResponse.answer}`
    );
    console.log(
      `${this.questionNumber}) ${problemResponse.question} = ${problemResponse.answer}`
    ); //DEBUGGING
    this.questionNumber++;
  }

  checkAnswer(): void {
    // let submittedAnswer: string = this.answerElement.value;
    let submittedAnswer: number = parseFloat(this.answerElement.value);
    // submittedAnswer = submittedAnswer

    console.log({ submittedAnswer });
    console.log({ answer: this.problem.answer });

    if (submittedAnswer === this.problem.answer) {
      // Correct
      this.responseElement.innerHTML = "Correct";
      // this.submitElement.value = "Next";
      this.trackResponse("c");
      this.setupNextCard();
    } else {
      // Incorrect
      this.responseElement.innerHTML = "Incorrect, give it another try!";
      this.trackResponse("i");
    }
  }

  trackResponse(response: "c" | "i" = "c"): void {
    // add response type to responseTracker
    if (response == "c") {
      this.responseTrackingString = this.responseTrackingString + response;
      this.responseTracker.push(this.responseTrackingString);
      this.responseTrackingString = "";
    } else if (response == "i") {
      this.responseTrackingString = this.responseTrackingString + response;
    }
  }

  showOverview(): void {
    let quizOverview: string = "";
    let i: number = 0;
    let correctCount: number = 0;
    this.questionList.forEach((equation: string): void => {
      let rating: string;
      if (this.responseTracker[i] == "c") {
        rating = '<span class="green">&#x2713;</span>';
        correctCount++;
      } else {
        rating = '<span class="red">x</span>';
      }
      quizOverview += `<p>${rating} ${equation}</p>`;
      i += 1;
    });
    let percentCorrect: number = (correctCount / this.quizLength) * 100;
    quizOverview = `<h1>${percentCorrect}%</h1>` + quizOverview;
    quizOverview = `<div class="overviewCard" id="overview">
          ${quizOverview}
          </div>`;
    document.getElementById("card").innerHTML = quizOverview;
  }

  submitCard(): void {
    console.log("running this.checkAnswer()");
    this.checkAnswer();
  }
}

export default Quiz;
