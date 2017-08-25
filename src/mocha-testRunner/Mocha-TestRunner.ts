import * as Mocha from "mocha";

import { ITestResult } from "../../interfaces/ITestResult";

export class MochaTestRunner {

    public testResult: ITestResult;
    public testFiles: Array<string> = [];
    public mocha: Mocha;

    constructor (testFiles : Array<string>, mocha: Mocha) {
        this.mocha = mocha;
        this.testFiles = testFiles;
    }

    public addFiles (): boolean {
        if (this.testFiles.length === 0) {
            return false;
        }
        for (let i = 0; i < this.testFiles.length; i++){
            this.mocha.addFile(this.testFiles[i]);
        }
        return true;
    }

    public run (callback: Function) {
        if (this.testFiles.length === 0 || this.testFiles === void 0) {
            return;
        }
        let runner;
        runner = this.mocha.run(() => {
            const testResult: ITestResult = this.createTestResult(runner.stats);
            callback(testResult, this.testFiles);
        });
    }

    public createTestResult (stats): ITestResult {
        if (stats === void 0){
            throw new Error("Test result is undefined");
        }
        const result =
        {
            passed: stats.passes,
            failed: stats.failures,
            totalRan: stats.tests,
            duration: stats.duration
        };
        return result;
    }
}
