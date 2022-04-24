import Problem from '../Problem.js'; //import pronlem class
export class DivisionProblem extends Problem {//open class definition for divisionproblem
    constructor() {  //open constructor
        super();  //reference the parent class
    } //close class contructor
    mathFn(digitCountA, digitCountB) {  //open mathfn definition
        let a;  //create a space for the first term
        let b;  //create a space for the second term
        if (digitCountA === 2) {  //if first arg is 2, then set a to 2 digit number
            a = this.randomDoubleDigit();  //set a to output of random double digit
        }  //close if statement
        else if (digitCountA === 3) {  //check if first term should be 3 digits
            a = this.randomTripleDigit();  //set a to output of randomtripledigit
        } //close else it
        else {   //otherwise set a to the output of randomsingle digit
            a = this.randomSingleDigit();  //set value of a to a random single digit
        } //close else
        if (digitCountB == 2) {  //if second arg is 2 then set second term to double digit
            b = this.randomDoubleDigit();  //set value of b to random double digit
        } //close if
        else if (digitCountB == 3) {  //open else if, check if second arg is a 3
            b = this.randomTripleDigit();  //set value of b to output of randomtripledigit
        }  //close else if
        else {  //else set second term to single digit
            b = this.randomSingleDigit();  //set value of b to output of random single digit
        } //close else
        this.answer = Math.round((a / b) * 1000) / 1000;  //calculate the correct answer
        this.question = `${a} / ${b}`;  //format the question to present to user
        this.display();  //display question
        return { question: this.question, answer: this.answer };  //return question and answer to present at overview
    }//close mathfn definition
}  //close class definition
export default DivisionProblem; //export class to be used elsewhere
