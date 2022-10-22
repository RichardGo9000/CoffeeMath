//create a problem that presents an image of a square with a dimention and ask for the area

import Problem from '../Problem.js';
export class SquareAreaProblem extends Problem {
    constructor() {
        super();
    }
    mathFn(digitCountA) {
        let a;
        if (digitCountA === 2) {
            a = this.randomDoubleDigit();
        }
        else if (digitCountA === 3) {
            a = this.randomTripleDigit();
        }
        else {
            a = this.randomSingleDigit();
        }
        this.answer = Math.round((a * a) * 1000) / 1000;
        this.question = `What is the area of a square with a side of ${a}`;
        this.display();
        return {question: this.question, answer: this.answer };
    }
}
