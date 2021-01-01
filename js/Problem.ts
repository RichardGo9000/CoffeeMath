export class Problem {
  answer: number|string;
  protected question: string;
  protected randomSingleDigit: () => number;
  protected randomDoubleDigit: () => number;
  protected randomTripleDigit: () => number;

  constructor() {
    this.question = null;
    this.answer = null
    this.randomSingleDigit = (): number => { // returns 1-9
      let rNumber: number = Math.floor(Math.random() * 10); //0-9
      if (rNumber == 0) rNumber += 1;
      return rNumber;
    }
    this.randomDoubleDigit = (): number => { // returns 10-99
      let number: number = Math.floor(Math.random() * 100);
      if (number < 10) number += 10;
      if (number > 99) number -= 7;
      return number;
    }
    this.randomTripleDigit = (): number => { // 100-999
      let number: number = Math.floor(Math.random() * 1000);
      if (number < 100) number += 110;
      if (number > 999) number -= 1;
      return number;
    }
  }

  display(answerSymbol: string = " = __"): void {
    document.getElementById("question").innerHTML = this.question + answerSymbol;
  }
}
export default Problem;
