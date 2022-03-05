
import Problem from '../Problem.js';
export class FactorialProblem extends Problem {
    constructor() {
        super();
    }

    mathFn() {
        let n = this.randomSingleDigit();
        let numberArray = [];
        this.answer = 1;
        for (let i = n; i > 0; i--) {
            if (i != 0) {
                this.answer *= i;
            }
            numberArray.push(i);
        }
        this.question = `${n}!`;
        this.display();
        return { question: this.question, answer: this.answer };
    }
}
export default FactorialProblem;
