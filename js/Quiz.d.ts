export declare class Quiz {
    private readonly quizLength;
    private correctAnswer;
    private questionString;
    private questionList;
    private questionNumber;
    private responseTrackingString;
    private readonly responseTracker;
    private responseList;
    private questionDisplay;
    private answerElement;
    private responseElement;
    private submitElement;
    private problem;
    constructor();
    init(): void;
    setupQuestionCard(): void;
    setupNextCard(): void;
    selectRandomProblem(): void;
    checkAnswer(): void;
    trackResponse(response?: "c" | "i"): void;
    showOverview(): void;
    submitCard(): void;
}
export default Quiz;
