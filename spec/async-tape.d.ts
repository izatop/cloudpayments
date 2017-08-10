/// <reference types="tape" />
import * as test from 'tape';
export declare function asyncTest(testName: string, testCase: (assert: test.Test) => Promise<any>): void;
