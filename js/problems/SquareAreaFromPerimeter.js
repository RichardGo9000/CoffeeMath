//create a problem that presents an image of a square with a dimention and ask for the area

import Problem from '../Problem.js';
export class SquareAreaFromPerimeterProblem extends Problem {
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
        let sideLength = Math.round((a / 4) * 1000) / 1000;  //round side length to 3 digits aft3er the decimal
        this.answer = Math.round((sideLength * sideLength) * 1000) / 1000;
        this.question = `What is the area of a square with a perimeter of ${a}`;
        this.display();
        return {question: this.question, answer: this.answer };
    }
}

export default SquareAreaFromPerimeterProblem;
/*
6 ways to pressent question about the permieter, area, and side length of a square
area from perimeter
area from side length
side length from perimeter
side length from area
perimeter from area
perimeter from side length
*/
