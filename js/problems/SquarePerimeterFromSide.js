//create a problem that presents an image of a square with a dimention and ask for the area

import Problem from '../Problem.js';
export class SquarePerimeterFromSideProblem extends Problem {
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
        this.answer = Math.round(a * 4) * 1000) / 1000;
        this.question = `What is the perimeter of a square with a side of length ${a}`;
        this.display();
        return {question: this.question, answer: this.answer };
    }
}

export default SquarePerimeterFromSideProblem;

/*
6 ways to pressent question about the permieter, area, and side length of a square
area from perimeter
area from side length
side length from perimeter
side length from area
perimeter from area
perimeter from side length
*/
