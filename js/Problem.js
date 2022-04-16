export class Problem {  //class difinition for the basics components of a problem
    constructor() {  //the constructor runs when the object is instantiated and set up the variables needed for the object
        this.question = null;  //create a var to hold the question that gets generated
        this.answer = null;  //create a var to hold the ansewer for the variable
        this.randomSingleDigit = () => {  //this method will select a single digit, could fbe moved to an RNG module on its own
            let rNumber = Math.floor(Math.random() * 10); //0-9  //select number 0-9
            if (rNumber == 0)  //if 0 then add one, this might create a higher probability of a 1 andf should be changed
                rNumber += 1;  //add one to prevent 0 from being used
            return rNumber; //return random number to the place this function was called
        };  //close random single digit
        this.randomDoubleDigit = () => {  //function to create random double digit 
            let number = Math.floor(Math.random() * 100);  //select number 0-99
            if (number < 10)  //if single digit then add 10
                number += 10;  //10-19 have a slightly higher probability of occuring
            if (number > 99)  //not sure if this line ever gets executed
                number -= 7;  //if this line gets used then 92 has an elevated probability of occuring
            return number;  //return random double digit
        };  //close random double digit function
        this.randomTripleDigit = () => {  //method to create random triple digit function
            let number = Math.floor(Math.random() * 1000);  //select a number 0-999
            if (number < 100)  //if one or 2 digits the add to the number
                number += 110; //add 110 so that the number is at least 3 digits
            if (number > 999)  //if 4 digits then subtract one
                number -= 1;  //subtract one from 4 digit number
            return number;  //return 4 digit number
        };  //close randomTripleDigit Function
    }  //close constructor

    display(answerSymbol = " = __") {  // partially deprecated, fused to add  = __ to the end of the question to signify where the question goes 
        document.getElementById("question").innerHTML = this.question;  //put the question on the actual page
    }  //close display function
}//close class definition
export default Problem;  //export problem class to be used elsewhere
