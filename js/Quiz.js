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
//         this.responseElement = null;
        this.submitElement = null;
        this.problem = null;
        this.menuOpen = false;
        this.possibleQuestions = [
           "a",
           "s",
           "s",
           "d",
           "d",
           "d",
           "m",
           "m",
           "f",
           "e",
        ];      
    }

    init(topicList = null) {
    console.log("Quiz init function called");
        
        if (topicList != null) {
            
//             this.possibleQuestions = topicList;
            
            console.log("topicList Array: " + topicList);
            console.log("this.possibleQuestions Array: " + this.possibleQuestions);
            
                    this.possibleQuestions = [
           "a",
           "s",
           "s",
           "d",
           "d",
           "d",
           "m",
           "m",
           "f",
           "e",
        ];  
        }
        
        this.setupQuestionCard();
        this.selectRandomProblem();
        this.answerElement = document.getElementById("answer");

        document.addEventListener("keydown", (e) => {
            const regex = /^[0-9.,\-]+$/;
            if (regex.test(e.key)) {

                if (document.activeElement.tagName != "INPUT")
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
        }
        else {
            console.log("setting up next card");
            this.answerElement.value = "";
            // this.submitElement.value = "Check"; //change next button to submit button
            this.selectRandomProblem();
        }
    }
    selectProblem() {
    }

    selectRandomProblem() {
        // const possibleQuestions = [
        //     "a",
        //     "s",
        //     "s",
        //     "d",
        //     "d",
        //     "d",
        //     "m",
        //     "m",
        //     "f",
        //     "e",
        // ];
        let random = Math.floor(Math.random() * this.possibleQuestions.length);
        let nextQuestion = this.possibleQuestions[random];
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
    checkAnswer() {
        let submittedAnswer = parseFloat(this.answerElement.value);
        // submittedAnswer = submittedAnswer
        console.log({ submittedAnswer });
        console.log({ answer: this.problem.answer });
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
        console.log(quizOverview);
        document.getElementById("app").innerHTML = quizOverview;
    }
    
    submitCard() {
        console.log("running this.checkAnswer()");
        this.checkAnswer();
    }
}
export default Quiz;
