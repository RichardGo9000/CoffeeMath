
import Problem from '../Problem.js';
export class ExponentProblem extends Problem {
    constructor() {
        super();
    }
    mathFn() {
        const possibleBases = [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const possiblePowers = [0, 1, 2, 2, 2, 2, 3, 3, 4];
        const base = possibleBases[Math.floor(Math.random() * possibleBases.length)]; //randomSingleDigit();
        const power = possiblePowers[Math.floor(Math.random() * possiblePowers.length)]; //randomSingleDigit();
        this.answer = base ** power;
        this.question = `${base} ^ ${power}`;
        this.display();
        return { question: this.question, answer: this.answer };
    }
}
export default ExponentProblem;
