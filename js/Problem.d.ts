export declare class Problem {
    answer: number | string;
    protected question: string;
    protected randomSingleDigit: () => number;
    protected randomDoubleDigit: () => number;
    protected randomTripleDigit: () => number;
    constructor();
    display(answerSymbol?: string): void;
}
export default Problem;
