//import * as data from "../../profx.conf.json";
import * as Mocha from "mocha";
import { IRunner, IRunnable } from "mocha";
import { ITestResult } from "../../interfaces/ITestResult";
import { Printer } from "../output/printer/Printer";
import { OutputStore } from "../output/OutputStore";
import { TestFileHandler } from "../testFileHandler/TestFileHandler";

export class MochaTestRunner {

    testResult: ITestResult;
    testFiles: Array<string> = [];

    private readonly REPORT_TITLE: string = "MUTATION TEST REPORT";

    private mocha = new Mocha({
        reporter: "mochawesome",
        reporterOptions: {
            autoOpen: true,
            quiet: true,
            reportTitle: this.REPORT_TITLE
        }
    });
    private readonly printer = new Printer();

    constructor (fileHandler : TestFileHandler) {
        this.testFiles = fileHandler.testFiles;
    }

    addFiles (): boolean {
        if (this.testFiles.length === 0){
            return false;
        }
        for (let i = 0; i < this.testFiles.length; i++){
            this.mocha.addFile(this.testFiles[i]);
        }
        return true;
    }

    run () {
        if (this.testFiles.length === 0 || this.testFiles === void 0) {
            return;
        }
        let runner;
        runner = this.mocha.run(() => {
            const testResult: ITestResult = this.createTestResult(runner.stats);
            OutputStore.setStore(testResult, this.testFiles);
            this.printer.printSourceChanges();
        });
    }
    //TODO move into create test result class
    createTestResult (stats): ITestResult {
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
