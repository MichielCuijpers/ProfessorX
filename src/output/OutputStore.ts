import { ITestResult } from "../../interfaces/ITestResult";

export class OutputStore {

    public static sourceFile: Array<string> = [];
    public static lineNumber: number;
    public static origionalCode: string;
    public static mutatedCode: string;

    public static numberOfFailedTests;
    public static numberOfPassedTests;

    public static passedTestsDescription: Array<String>;
    public static failedTestsDescription: Array<String>;

    public static setStore (testResult: ITestResult, testFiles: Array<string>){
        testFiles.forEach((element) => {
            OutputStore.sourceFile = testFiles[element];
        });
        OutputStore.numberOfPassedTests = testResult.passed;
        OutputStore.numberOfFailedTests = testResult.failed;
    }

    public static setLineNumber (sourceCode: string, startOfMutation: number): void {
        let lineNumber = 0;
        for (let i = 0; i < startOfMutation; i++) {
            if (sourceCode.charAt(i) === "\n"){
                lineNumber ++;
            }
        }
        OutputStore.lineNumber = lineNumber;
    }
}
