import AdditionProblem from "./problems/Addition.js";  //load addition module
import SubtractionProblem from "./problems/Subtraction.js";  //load subtraction module
import MultiplicationProblem from "./problems/Multiplication.js";  //load multiplication module
import DivisionProblem from "./problems/Division.js"; //load division module
import FactorialProblem from "./problems/Factorial.js";  //load factorial module
import PercentageProblem from "./problems/Percentage.js";  //load percentage module
import ExponentProblem from "./problems/Exponent.js"; //load exponent module
export class Quiz {  //open definition of class to export as quiz

    constructor(user, debug = false) {  //open code block that defines starting data structures for the clas
      this.quizLength = 10;  //define default quiz length as 10
      this.correctAnswer = NaN;  //create var to hold answers once submitted
      this.questionString = "";  //create var to hold the question string
      this.questionList = []; //init array to hold the whole list of questions for the quiz
      this.questionNumber = 1; //hold the number of the current question
      this.responseTrackingString = "";  //keep track of responses from user
      this.responseTracker = []; //use one string per question to track whether response was correct after n number of tries, or skipped (c=correct, i=incorrect, s=skipped[s Not implemented yet])
      this.responseList = []; //use one array per question to track actual responses
      this.questionDisplay = null;  //?variable to link to the element that displays the question
      this.answerElement = null; //variable to link to the text input for the users answer
        //         this.responseElement = null;
      this.submitElement = null;  //variable to link to submit button if needed
      this.problem = null;  //
      this.menuOpen = false; //variable that tracks whether menu is open, this is deprecated and can be removed.
      this.possibleQuestions = []; //array to hold a list of possible topics to display to user
      this.init(user);  // ???, i think it exposes the init function to code that is calling this class
      this.debug = debug;  //debug mode, toggles debug logging to console.
    }

    init(user) {  //open init function and a user parameter is required
      for (const [key, value] of Object.entries(user.topics)) {  // go through the topics element of element and add all items that are marked as true in the topics array to the possibleQuestions array
        // Check if the value is true and if so show it in the array
        if (value) this.possibleQuestions.push(key); //if value of key is true then push key to possible questions
      }  //close for loop
      if (this.debug) console.log('[Quiz:Init]', {topics: this.possibleQuestions})  //if debug is true then log possible questions array to console
        
      this.setQuestionCard();  //call the setQuestioncard function to set up question card div
      this.selectRandomProblem(); //choose a random question from the possible questions array
      this.answerElement = document.getElementById("answer");  //connect answerElement object attribute to the answer box in the html page

      document.addEventListener("keydown", (e) => {  //open key listener
        const regex = /^[0-9.,\-]+$/;  //define regex for numbers and applicable symbols
        if (regex.test(e.key)) {  //check if keycode returns true from regex

            if (document.activeElement.tagName != "INPUT")  //check if the input box is selected and cancel keylistening  (this could be a problem, users could put other data into input box when it is selected
                this.answerElement.value += e.key;
        }
        else if (e.key == "Backspace") {

            if (document.activeElement.tagName != "INPUT")
                this.answerElement.value = this.answerElement.value.slice(0, -1);
        }
        if (e.key == "Enter")
            this.submitCard();
        
    });
    }
    
    setQuestionCard() {
//         document.getElementById("app").innerHTML = ```<p id="question">1 + 1</p>
//         <input id="answer" type="text" />```;
        document.getElementById("app").innerHTML = '<p id="question">1 + 1</p> <input id="answer" type="text" />';
    }
    
    
    resetQuestionCard() {
        this.setQuestionCard();
    }
    
    setupQuestionCard() {
        this.resetQuestionCard();
//         this.submitElement = document.getElementById("submit");
//         this.submitElement.addEventListener("click", () => this.submitCard());
        
//         this.questionDisplay = document.getElementById("question");
        
//         this.submitElement = document.getElementById("menuBtn");
//         this.submitElement.addEventListener("click", () => this.toggleMenu());
        // this.submitElement.addEventListener("click", () => this.settingsCard());
    }

    setupNextCard() {
        if (this.questionList.length === this.quizLength) {
            this.showOverview();
        } else {
            if (this.debug) console.log("setting up next card");
            this.answerElement.value = "";
            // this.submitElement.value = "Check"; //change next button to submit button
            this.selectRandomProblem();
        }
    }
    selectProblem() {
    }

    selectRandomProblem() {
        let random = Math.floor(Math.random() * this.possibleQuestions.length);
        let nextQuestion = this.possibleQuestions[random];
        let problemResponse;
        switch (nextQuestion) {
            case "addition": {
                this.problem = new AdditionProblem();
                problemResponse = this.problem.mathFn(2, 2);
                break;
            }
            case "subtraction": {
                this.problem = new SubtractionProblem();
                problemResponse = this.problem.mathFn(2, 2);
                break;
            }
            case "multiplication": {
                this.problem = new MultiplicationProblem();
                problemResponse = this.problem.mathFn(1, 2);
                break;
            }
            case "division": {
                this.problem = new DivisionProblem();
                problemResponse = this.problem.mathFn(2, 1);
                break;
            }
            case "factorial": {
                this.problem = new FactorialProblem();
                if (this.problem instanceof FactorialProblem) {
                    problemResponse = this.problem.mathFn();
                }
                break;
            }
            case "percentage": {
                this.problem = new PercentageProblem();
                if (this.problem instanceof PercentageProblem) {
                    problemResponse = this.problem.mathFn();
                }
                break;
            }
            case "exponent": {
                this.problem = new ExponentProblem();
                if (this.problem instanceof ExponentProblem) {
                    problemResponse = this.problem.mathFn();
                }
                break;
            }
        }
        this.questionList.push(`${this.questionNumber}) ${problemResponse.question} = ${problemResponse.answer}`);
        if (this.debug) console.log(`${this.questionNumber}) ${problemResponse.question} = ${problemResponse.answer}`); //DEBUGGING
        this.questionNumber++;
    }
    checkAnswer() {
        let submittedAnswer = parseFloat(this.answerElement.value);
        // submittedAnswer = submittedAnswer
        if (this.debug) console.log({ submittedAnswer });
        if (this.debug) console.log({ answer: this.problem.answer });
        if (submittedAnswer === this.problem.answer) {
            // Correct
            
            this.trackResponse("c");
            this.setupNextCard();
        }
        else {
            // 
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
                rating = '<span class="red">x&nbsp;&nbsp;</span>';
            }
            quizOverview += `<p>${rating} ${equation}</p>`;
            i += 1;
        });
        let percentCorrect = (correctCount / this.quizLength) * 100;
        quizOverview = `<h1>${percentCorrect}%</h1>` + quizOverview;
        quizOverview = `<div class="overviewCard" id="overview">
          ${quizOverview}
          </div>`;
          if (this.debug) console.log(quizOverview);
        document.getElementById("app").innerHTML = quizOverview;
    }
    
    submitCard() {
        if (this.debug) console.log("running this.checkAnswer()");
        this.checkAnswer();
    }
}
export default Quiz;

