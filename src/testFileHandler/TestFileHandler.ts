import { ITestResult } from "../../interfaces/ITestResult";
import * as fs from "fs";

export class TestFileHandler {

    testDirPath = "./testProject/src/";
    testFiles: Array<string> = [];

    readTestFileDirectory () {
        let fileNames;
        try{
            fileNames = fs.readdirSync(this.testDirPath);
        } catch (Error){
            console.error("Could not read test files at: " + this.testDirPath);
        }
        this.addFiles(fileNames);
    }

    addFiles (arrayOfFileNames: Array<string>) {
        arrayOfFileNames.forEach((fileName) => {
            if (this.isTestFile(fileName)) {
                this.testFiles.push(this.testDirPath + fileName);
            }
        });
        if (this.testFiles.length === 0){
            throw new Error("Aborting test run, no test files found at: " + this.testDirPath);
        }
    }

    isTestFile (filePath: string): boolean {
        return filePath.indexOf(".spec") >= 0;
    }
}