import Problem from '../Problem.js';  //import problem class
export class AdditionProblem extends Problem {  //open addition problem class definition
    constructor() {  //open constructor
        super();  //reference the parent class
    }  //clost constructor
    mathFn(digitCountA, digitCountB) {  //open mathfn definition
        let a;  //create a space for the first term
        let b;  //create a space for the second term
        if (digitCountA === 2) {  //if first arg is 2 then make first term 2 digits
            a = this.randomDoubleDigit();  //set value of a to a random double digit
        }  //close if
        else if (digitCountA === 3) {  //if first arg is 3 then get random triple digit
            a = this.randomTripleDigit();  //set a to value of random triple digit
        }  //close else if
        else {  //open else
            a = this.randomSingleDigit();  //set value of a to random single digit
        }//close else
        if (digitCountB == 2) {  //check if second arg is a2
            b = this.randomDoubleDigit();  //set value of b to output of randomdoubledigit
        }  //close if
        else if (digitCountB == 3) {  //if second arg is 3 then get a triple digit
            b = this.randomTripleDigit();  //set value of b to the output of random triple digit
        }  //close else if 
        else {  //open else
            b = this.randomSingleDigit();  //set value of b to the output of random single digit
        }  //close else
        this.answer = a + b;   //calculate the correct answer
        this.question = `${a} + ${b}`;  //format the answer to present to user
        this.display();  //display the question
        return { question: this.question, answer: this.answer };  //return the question and correct answer for use in generating overview
    }//close mathfn definition
}  //close  additionproblem definition
export default AdditionProblem;  //export class to be used elsewhere
