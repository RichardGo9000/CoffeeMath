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
<p id="response"></p>
<p id="question"></p>
<div class="f-row">
    <input id="answer" type="text" />
    <input id="submit" class="button" type="button" value="Check"/>
</div>
`;
    this.submitElement = document.getElementById("submit") as HTMLInputElement;
    this.submitElement.addEventListener("click", () => this.submitCard());
    this.questionDisplay = document.getElementById("question");
  }

  setupNextCard(): void {
    if (this.questionList.length === this.quizLength) {
      this.showOverview();
    } else {
      console.log("setting up next card");
      this.answerElement.value = "";
      this.submitElement.value = "Check"; //change next button to submit button
      this.selectRandomProblem();
    }
  }

  selectRandomProblem(): void {
    //a:addition, s:subtraction, d:division, m:multiplication, f:factorial, p:percentage, po:percent of, e:exponent
    type QuestionAbbreviations = "a" | "s" | "d" | "m" | "f" | "p" | "e";
    type PossibleQuestions = Array<QuestionAbbreviations>;

    //select the answer field and reset to blank
    // document.getElementById("answer").innerHTML = "";
    // this.setupQuestionCard();
    // document.getElementById("card").textContent = "";

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
      "e"
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

  /*
const places = textInput.split('.');
if (places.length > 1){
  parseFloat(textInput)
} else {
  parseInt(textInput, 10)
}
*/

  checkAnswer(): void {
    // let submittedAnswer: string = this.answerElement.value;
    let submittedAnswer: number = parseFloat(this.answerElement.value);
    // submittedAnswer = submittedAnswer

    console.log({ submittedAnswer });
    console.log({ answer: this.problem.answer });

    if (submittedAnswer === this.problem.answer) {
      // Correct
      this.responseElement.innerHTML = "Correct";
      this.submitElement.value = "Next";
      this.trackResponse("c");
      this.setupNextCard();

      // this.selectRandomProblem();
      
      // quiz complete, show overview
      // if (this.questionList.length > this.quizLength) this.showOverview();
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
    quizOverview = `<div id="overview">
          ${quizOverview}
          </div>`;
    document.getElementById("card").innerHTML = quizOverview;
  }

  submitCard(): void {
    if (this.submitElement.value == "Next") {
      console.log("running this.selectRandomProblem()");
      this.selectRandomProblem();
      // randomProblem();
    } else if (this.submitElement.value == "Check") {
      console.log("running this.checkAnswer()");
      this.checkAnswer();
    }
  }
}
export default Quiz;
