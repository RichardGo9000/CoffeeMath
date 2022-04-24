
import Problem from '../Problem.js';  //import problem class
export class ExponentProblem extends Problem {  //open exponent problem class definition
    constructor() {  //open constructor
        super();  //reference the parent class 
    }//close the constructor
    mathFn() {  //open mathfn definition
        //perhaps random single digit should get an optional weighted outcome
        const possibleBases = [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10];  //define an array of posible base numbers to apply an exponent too, this can be updated to random single digit
        const possiblePowers = [0, 1, 2, 2, 2, 2, 3, 3, 4];  //define array of possible exponents, this can be updated to randome single digit
        const base = possibleBases[Math.floor(Math.random() * possibleBases.length)]; //randomSingleDigit();
        const power = possiblePowers[Math.floor(Math.random() * possiblePowers.length)]; //randomSingleDigit();
        this.answer = base ** power;//calculate the correct answer
        this.question = `${base} ^ ${power}`;  //format the question for the user
        this.display();//display question to user
        return { question: this.question, answer: this.answer };  //return question and correct answer to display to user
    }  //close mathfn
}//close class definition
export default ExponentPrblem;  //export class to be used by other scripts
