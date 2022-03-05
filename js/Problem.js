export class Problem {
    constructor() {
        this.question = null;
        this.answer = null;
        this.randomSingleDigit = () => {
            let rNumber = Math.floor(Math.random() * 10); //0-9
            if (rNumber == 0)
                rNumber += 1;
            return rNumber;
        };
        this.randomDoubleDigit = () => {
            let number = Math.floor(Math.random() * 100);
            if (number < 10)
                number += 10;
            if (number > 99)
                number -= 7;
            return number;
        };
        this.randomTripleDigit = () => {
            let number = Math.floor(Math.random() * 1000);
            if (number < 100)
                number += 110;
            if (number > 999)
                number -= 1;
            return number;
        };
    }

    display(answerSymbol = " = __") {
        document.getElementById("question").innerHTML = this.question;
    }
}
export default Problem;
