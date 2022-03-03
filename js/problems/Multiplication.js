import Problem from '../Problem.js';
export class MultiplicationProblem extends Problem {
    constructor() {
        super();
    }
    mathFn(digitCountA, digitCountB) {
        let a;
        let b;
        if (digitCountA === 2) {
            a = this.randomDoubleDigit();
        }
        else if (digitCountA === 3) {
            a = this.randomTripleDigit();
        }
        else {
            a = this.randomSingleDigit();
        }
        if (digitCountB == 2) {
            b = this.randomDoubleDigit();
        }
        else if (digitCountB == 3) {
            b = this.randomTripleDigit();
        }
        else {
            b = this.randomSingleDigit();
        }
        this.answer = a * b;
        this.question = `${a} x ${b}`;
        this.display();
        return { question: this.question, answer: this.answer };
    }
}
export default MultiplicationProblem;
