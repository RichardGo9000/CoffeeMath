import Problem from '../Problem.js';  //import problem class
export class SubtractionProblem extends Problem {  //open class definnition for subtraction problems
    constructor() {  //open constructor
        super();  //?? link this object to its parent class problem
    }  //close constructor
    mathFn(digitCountA, digitCountB) {  //open function that actually calculates the problem
        let a;  //init var for first term
        let b;  //iinit var for second term
        if (digitCountA === 2) {  //if 2 digits then call randomDoubleDiugit
            a = this.randomDoubleDigit();  //set output of randomDoubleDigit to a
        }  //close if
        else if (digitCountA === 3) {  //if set to 3 digits then call randomtripledigit
            a = this.randomTripleDigit();  //set value of a to the output of randomTripleDigit
        }  //close else ifif 
        else {   //by default present random single digit
            a = this.randomSingleDigit();  //set value of a to output of randomSingleDigit
        } //close else statement
        if (digitCountB == 2) {  //if set to 2 digits the call random double digit
            b = this.randomDoubleDigit();  //set value of b to output from randomDoubleDigit
        }  //close if
        else if (digitCountB == 3) {  //if digit counbt is set to 3 then get random triple digit
            b = this.randomTripleDigit();  //set value of b to output of randomTripleDigit
        }  //close else if
        else {  //by defuault provide random single digit
            b = this.randomSingleDigit();  //set value of b to random single digit
        }  //close else statement
        this.answer = a - b;  //calculate the correct answer 
        this.question = `${a} - ${b}`;  //fformat the question being asked to present to the user
        this.display();  //display the question 
        return { question: this.question, answer: this.answer };  //return the question and anser, not sure where this goes
    }  //close mathfn
}  //close subtraction problem class definition
export default SubtractionProblem;  //exeport class so it can be used by other scripts
