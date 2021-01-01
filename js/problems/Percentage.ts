import Problem from '../Problem.js';

export class PercentageProblem extends Problem {
  constructor() {
    super();
  }

  mathFn(): {question: string, answer: number|string} {
    let a: number = this.randomSingleDigit();
    let b: number = this.randomDoubleDigit();

    this.answer = Math.round(((a / b) * 100) * 1000) / 1000; //round to 3 decimals
    this.answer = `${this.answer}%`;
    this.question = `What percentage of ${b} is the number ${a}? (__%)`;

    this.display("");
    return {question: this.question, answer: this.answer}
  }
}

export default PercentageProblem
