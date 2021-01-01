import Problem from '../Problem.js';

export class FactorialProblem extends Problem {
  constructor() {
    super();
  }

//factorial needs to be multiplication not addition 4! = 24 and not 10

  mathFn(): {question: string, answer: number} {
    let n: number = this.randomSingleDigit();
    let numberArray: Array<number> = [];
    this.answer = 1;

    for (let i = n; i > 0; i--) {
      // this.answer += i;
      // this.answer *= i;
      if (i != 0) {
        this.answer *= i;
      }
      numberArray.push(i);
    }

    this.question = `${n}!`;
    this.display();
    return {question: this.question, answer: this.answer}
  }
}

export default FactorialProblem
