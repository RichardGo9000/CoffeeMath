import Problem from '../Problem.js';  //import problem clas to extend it
export class MultiplicationProblem extends Problem {  //open muliplication class definition
    constructor() {  //open constructor to run when the object is defined
        super();  //connect this classes attributes to the parent class
    }//close constructor
    mathFn(digitCountA, digitCountB) {  //open mathfunction definition
        let a;  //create a space for the first term
        let b;  //create a space for the second term
        if (digitCountA === 2) {  //if first argument supplied when createing the object is 2 then select 2 digits for first term
            a = this.randomDoubleDigit();  //set value of a to the output from randomdoubledigit
        }//close if
        else if (digitCountA === 3) {  //if we want 3 digits for the first term then select random triple digit
            a = this.randomTripleDigit();  //set the value of a to the output of a random triple digit
        }  //close if statement
        else {  //open else statement
            a = this.randomSingleDigit();  //set value of a to the output of randomsingledigit, this is the default option
        } //close else statement
        if (digitCountB == 2) {  //if second argument is 2 the set second term to 2 digits
            b = this.randomDoubleDigit();  //set value of be to the output of random double digit
        } //close if statement
        else if (digitCountB == 3) {  //open else if to check if second argument was 3
            b = this.randomTripleDigit();  //set value of b to output of a random triple digit
        } //close else if
        else {  //set default option with else statement
            b = this.randomSingleDigit();  //set value of b to randomSingleDigit
        }  //close else statement
        this.answer = a * b;  //calculate correct answer of the question
        this.question = `${a} x ${b}`;  //format the question to be presented to user
        this.display();  //display the question
        return { question: this.question, answer: this.answer };  //?return the question and answer, not sure to where though
    }//close mathfn
}//close class definition
export default MultiplicationProblem;  //export the class definition to be used by other scripts
