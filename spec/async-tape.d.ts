/// <reference types="tape" />
import * as test from 'tape';
export interface ShouldFail {
    (expr: any, msg?: string): void;
}
export declare type Test = test.Test & {
    shouldFail: ShouldFail;
};
export declare function asyncTest(testName: string, testCase: (assert: Test) => Promise<any>): void;
