//mean, the average, add numbers in the set up and devide by the number of numbers in the set
import Problem from '../Problem.js';
export class MeanProblem extends Problem {
    constructor() {
        super();
    }
    mathFn(digitCountA, digitCountB) {
        let a, b, c, d, e;
      
        a = this.randomSingleDigit();
        b = this.randomSingleDigit();        
        c = this.randomSingleDigit();
        d = this.randomSingleDigit();     
        e = this.randomSingleDigit();      
      
        this.answer = Math.round(((a + b + c + d + e) / 5) * 1000) / 1000;
        this.question = `What is the mean of the number set [${a}, ${b}, ${c}, ${d}, ${e}].`;
        this.display();
        return { question: this.question, answer: this.answer };
    }
}
export default MeanProblem;
