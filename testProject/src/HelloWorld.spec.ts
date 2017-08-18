import { HelloWorld } from "./HelloWorld";

import * as ts from "typescript";
import { expect } from "chai";

describe("Test Project addition function", () => {
    let hello: HelloWorld;
    beforeEach(() => {
        hello = new HelloWorld();
    });

    it("inputing 1 and 1 should return 2", () => {
        const expected = 2;
        const actual = hello.addNumbers(1, 1);
        expect(actual).to.equal(expected);
    });

});
