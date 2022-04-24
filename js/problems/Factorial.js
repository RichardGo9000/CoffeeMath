
import Problem from '../Problem.js'; //import problem class
export class FactorialProblem extends Problem {  //open factorialproblem class definition
    constructor() {  //open constructor
        super();  //connect class to the parent class
    } //close constructor

    mathFn() {  //open the function that determines the math problem
        let n = this.randomSingleDigit();  //define the single digit number that we are making the factorial of
        let numberArray = [];  //!!this variable appears to be redundant
        this.answer = 1;  //set answer to one before we begin calculating answer
        for (let i = n; i > 0; i--) {  //open for loop to calculate answer, set i to the value of n out starting number
            if (i != 0) {  // perform the folloing operation then subtract 1 from i at the end of the code block
                this.answer *= i;  //multiply answer by i
            }//close if
            numberArray.push(i);  //?? !! this is superfluos
        }//close the for statement
        this.question = `${n}!`;    //format the question to show the user
        this.display();  //display the question
        return { question: this.question, answer: this.answer };  //return question and answer to be added to list of questions asked
    }  //close mathfn
}  //close clas definition
export default FactorialProblem;  //export the class definition to be used by other scripts
