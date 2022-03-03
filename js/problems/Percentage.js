
import Problem from '../Problem.js';
export class PercentageProblem extends Problem {
    constructor() {
        super();
    }
    mathFn() {
        let a = this.randomSingleDigit();
        let b = this.randomDoubleDigit();
        this.answer = Math.round(((a / b) * 100) * 1000) / 1000; //round to 3 decimals
        this.answer = `${this.answer}%`;
        this.question = `What percentage of ${b} is the number ${a}? (__%)`;
        this.display("");
        return { question: this.question, answer: this.answer };
    }
}
export default PercentageProblem;
