import Problem from '../Problem.js';

export class SubtractionProblem extends Problem {
  constructor() {
    super();
  }

  mathFn(digitCountA: 1|2|3, digitCountB: 1|2|3): {question: string, answer: number} {
    let a: number;
    let b: number;

    if (digitCountA === 2) {
      a = this.randomDoubleDigit();
    } else if (digitCountA === 3) {
      a = this.randomTripleDigit();
    } else {
      a = this.randomSingleDigit();
    }

    if (digitCountB == 2) {
      b = this.randomDoubleDigit();
    } else if (digitCountB == 3) {
      b = this.randomTripleDigit();
    } else {
      b = this.randomSingleDigit();
    }

    this.answer = a - b;
    this.question = `${a} - ${b}`;
    this.display();
    return {question: this.question, answer: this.answer}
  }
}

export default SubtractionProblem
