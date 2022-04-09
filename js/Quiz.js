import AdditionProblem from "./problems/Addition.js"; //load addition module
import SubtractionProblem from "./problems/Subtraction.js"; //load subtraction module
import MultiplicationProblem from "./problems/Multiplication.js"; //load multiplication module
import DivisionProblem from "./problems/Division.js"; //load division module
import FactorialProblem from "./problems/Factorial.js"; //load factorial module
import PercentageProblem from "./problems/Percentage.js"; //load percentage module
import ExponentProblem from "./problems/Exponent.js"; //load exponent module
export class Quiz { //open definition of class to export as quiz

    constructor(user, debug = false) { //open code block that defines starting data structures for the clas
        this.quizLength = 10; //define default quiz length as 10
        this.correctAnswer = NaN; //create var to hold answers once submitted
        this.questionString = ""; //create var to hold the question string
        this.questionList = []; //init array to hold the whole list of questions for the quiz
        this.questionNumber = 1; //hold the number of the current question
        this.responseTrackingString = ""; //keep track of responses from user
        this.responseTracker = []; //use one string per question to track whether response was correct after n number of tries, or skipped (c=correct, i=incorrect, s=skipped[s Not implemented yet])
        this.responseList = []; //use one array per question to track actual responses
        this.questionDisplay = null; //?variable to link to the element that displays the question
        this.answerElement = null; //variable to link to the text input for the users answer
        //         this.responseElement = null;
        this.submitElement = null; //variable to link to submit button if needed
        this.problem = null; //
        this.menuOpen = false; //variable that tracks whether menu is open, this is deprecated and can be removed.
        this.possibleQuestions = []; //array to hold a list of possible topics to display to user
        this.init(user); // ???, i think it exposes the init function to code that is calling this class
        this.debug = debug; //debug mode, toggles debug logging to console.
    }

    init(user) { //open init function and a user parameter is required
        for (const [key, value] of Object.entries(user.topics)) { // go through the topics element of element and add all items that are marked as true in the topics array to the possibleQuestions array
            // Check if the value is true and if so show it in the array
            if (value) this.possibleQuestions.push(key); //if value of key is true then push key to possible questions
        } //close for loop
        if (this.debug) console.log('[Quiz:Init]', {
            topics: this.possibleQuestions
        }) //if debug is true then log possible questions array to console

        this.setQuestionCard(); //call the setQuestioncard function to set up question card div
        this.selectRandomProblem(); //choose a random question from the possible questions array
        this.answerElement = document.getElementById("answer"); //connect answerElement object attribute to the answer box in the html page

        document.addEventListener("keydown", (e) => { //open key listener
            const regex = /^[0-9.,\-]+$/; //define regex for numbers and applicable symbols
            if (regex.test(e.key)) { //check if keycode returns true from regex

                if (document.activeElement.tagName != "INPUT") //check if the input box is selected and cancel keylistening  (this could be a problem, users could put other data into input box when it is selected
                    this.answerElement.value += e.key; //add the key that was pressed to the input if input is not already selected
            } //close regex if statement
            else if (e.key == "Backspace") { //check for backspace

                if (document.activeElement.tagName != "INPUT") //check if input is selected, if so ignore backspace because it is handled by default
                    this.answerElement.value = this.answerElement.value.slice(0, -1); //remove the last item from the string then save the new value to the input
            } // close the if checking for backspace
            if (e.key == "Enter") //check if enter key is pressed
                this.submitCard(); //submit card

        }); // close ketstroke listener
    } // close init function

    setQuestionCard() {  //open setQuestionCard function
        //         document.getElementById("app").innerHTML = ```<p id="question">1 + 1</p>
        //         <input id="answer" type="text" />```;
        document.getElementById("app").innerHTML = '<p id="question">1 + 1</p> <input id="answer" type="text" />'; //select app div, insert the question paragraph and the input box
    } //close setQuestionCard


    resetQuestionCard() {  //reset question card by calling set question card
        this.setQuestionCard(); //call setQuestionCard
    } //close resetQuestionCard

    setupQuestionCard() {  // 
        this.resetQuestionCard();
        //         this.submitElement = document.getElementById("submit");
        //         this.submitElement.addEventListener("click", () => this.submitCard());

        //         this.questionDisplay = document.getElementById("question");

        //         this.submitElement = document.getElementById("menuBtn");
        //         this.submitElement.addEventListener("click", () => this.toggleMenu());
        // this.submitElement.addEventListener("click", () => this.settingsCard());
    }

    setupNextCard() {//open setupNextCard
        if (this.questionList.length === this.quizLength) {  check if we have reached the end of the list
            this.showOverview();  //if we have reached the end of the list then show overview
        } else {  //otherwise, keep going with the quiz
            if (this.debug) console.log("setting up next card");  //if debuging then log to console that this function is running
            this.answerElement.value = "";  //clear the answer element.  This may be redundant
            // this.submitElement.value = "Check"; //change next button to submit button
            this.selectRandomProblem();  //call a random problem
        }  //close code block to call next question
    } //close set up next card
    selectProblem() {}  //define select problem, probably redundant since its empty

    selectRandomProblem() {  //open select random problem
        let random = Math.floor(Math.random() * this.possibleQuestions.length);  //choos a random number that is within the length of the possibleQuestions array
        let nextQuestion = this.possibleQuestions[random]; //set next question as a random number from the possible questions array 
        let problemResponse; //hold the correct answer to the poroblem
        switch (nextQuestion) {   //create switch statement to select the next problem
            case "addition": {  //choose addition topic
                this.problem = new AdditionProblem();  //create new instance of addition problem
                problemResponse = this.problem.mathFn(2, 2); //tell the question how many digitsw to use for each factor of the problem the set the correct anser here
                break; exit switch statement
            } //close case codeblock
            case "subtraction": { //select subtraction topic
                this.problem = new SubtractionProblem(); //create new instance of subtraction object
                problemResponse = this.problem.mathFn(2, 2); //tell iottt to suubtract 2 2 digit numbers then set the anser here
                break; //escape switch statement
            } //close case codeblock
            case "multiplication": { //select multiplication
                this.problem = new MultiplicationProblem(); //create new instance of multiplication class
                problemResponse = this.problem.mathFn(1, 2);//multiply a 2 digit number by a 1 digit number, set the answer here
                break;//exit switch statement
            }//close case code block
            case "division": {  //select division topic
                this.problem = new DivisionProblem(); //create new instance of division  class
                problemResponse = this.problem.mathFn(2, 1); //multiply 1 digit by a 2 digit number
                break;//exit switch statement
            }//close case codeblock
            case "factorial": {//select factorial topic, 
                this.problem = new FactorialProblem(); //creat3e new object from factorialproblem class
                if (this.problem instanceof FactorialProblem) {//??not sure why we are dchecking for instance of, this may need to be removed 
                    problemResponse = this.problem.mathFn();//create new factorial problem and set correct answer here
                }//close extranious if statement
                break;//exit switch statement
            }//close case code block
            case "percentage": { //select percentage topic
                this.problem = new PercentageProblem(); //create new object from percentage problem class
                if (this.problem instanceof PercentageProblem) { //??not sure why we are checking for instance of
                    problemResponse = this.problem.mathFn(); //generate new percentage problem and set correct answer here
                }//close extranious if statement here
                break;//exit switch case
            }//close percentage ccase code block
            case "exponent": { //select exponent topic
                this.problem = new ExponentProblem(); //create new object from percentage problem class
                if (this.problem instanceof ExponentProblem) {//??check for instance of, still not sur3e why
                    problemResponse = this.problem.mathFn();  //create the new question and set correct answer herre
                }// close extraneous if statement
                break;//exiut switch statement
            }//close exponment case code block
        }//closer switch statement code block
        this.questionList.push(`${this.questionNumber}) ${problemResponse.question} = ${problemResponse.answer}`); //add the details of this question to the question list fopr fgenerating a review at the end
        if (this.debug) console.log(`${this.questionNumber}) ${problemResponse.question} = ${problemResponse.answer}`); //DEBUGGING
        this.questionNumber++;//increment the current question number
    } //close selectRandomProblem
    checkAnswer() { //create checkanser function
        let submittedAnswer = parseFloat(this.answerElement.value);  //round the answer to a standardized fformat that is known to the student
        // submittedAnswer = submittedAnswer
        if (this.debug) console.log({  //log ther answer if debugging
            submittedAnswer//submitted answer to be logged
        });//close if debugging statement
        if (this.debug) console.log({  //if debugging then klog correct answer too
            answer: this.problem.answer  //correct answser to be logged
        });//close debugging if statement
        if (submittedAnswer === this.problem.answer) {  //actually check if submitted answer and correct answer match
            // Correct

            this.trackResponse("c");//track a correct responnse
            this.setupNextCard();  //clear the card for the next question
        } else {//run code if answer is incorrect
            this.trackResponse("i");// track that incorrect anser was givin
        } //close answer checking if statement
    }//close check answer functiuon
    trackResponse(response = "c") { //take the tracked response and add it to the response tracker array 
        // add response type to responseTracker
        if (response == "c") {//code block to use if correct answer
            this.responseTrackingString = this.responseTrackingString + response; //track a stridng of responses for this particular answer
            this.responseTracker.push(this.responseTrackingString); //add all the responses for this answeer to the tracking array
            this.responseTrackingString = ""; //clear the tracking string for the next question, this may be extranious bnut maybe not
        } else if (response == "i") {  //if incorrect the andd the wrong answer to the tracking array
            this.responseTrackingString = this.responseTrackingString + response;  //appends wrong answer to tracking string
        }//close response if statement
    } //close trackresponse if statement

    showOverview() { //define show overview function
        let quizOverview = "";  //create emty string to hold overview
        let i = 0;  //start a counter at 0
        let correctCount = 0; //count the number of correct answers
        this.questionList.forEach((equation) => { //loop through and display each question that was presented
            let rating;//open a vcariable for the rating
            if (this.responseTracker[i] == "c") {  //if correct assign class green to the html span to show the user positive reinfocement with a green color
                rating = '<span class="green">&#x2713;</span>';//the acutal green checkmark to show correct answer
                correctCount++;  //increment correct count
            } else {  //else respond to incorrect answer
                rating = '<span class="red">x&nbsp;&nbsp;</span>';  //prepenmd a red x to the question in the list
            }//close if stement that added x or checkmark
            quizOverview += `<p>${rating} ${equation}</p>`; //create a p tag with the rating response followed buy the question itself
            i += 1; //increment counter so we can loop to next question
        });//close for loop
        let percentCorrect = (correctCount / this.quizLength) * 100; //deterrmin percentage of questions that where correct
        quizOverview = `<h1>${percentCorrect}%</h1>` + quizOverview;//prepend that percentage toi the top of the overview
        quizOverview = `<div class="overviewCard" id="overview">   
          ${quizOverview}
          </div>`;//put the overview iun its own div
        if (this.debug) console.log(quizOverview); //if debugging then log overview to console
        document.getElementById("app").innerHTML = quizOverview;  //actually add overview card to the page
    } //close show overview function

    submitCard() {  //define submit function card
        if (this.debug) console.log("running this.checkAnswer()");  //if debugging then log that we are about to check the answer
        this.checkAnswer();  //actually call check answer function
    } //close submit card fuiniction
} //close the Quiz class definition
export default Quiz; //export Quiz class as a module
