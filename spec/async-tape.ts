import * as test from 'tape';

export interface ShouldFail {
    (expr: any, msg?: string): void;
}

const createShouldFailFunction = (t: test.Test): ShouldFail => async (expr: any, msg?: string) => {
    let throwError: Error;

    try {
        if (typeof expr === 'function') {
            await expr();
        } else {
            await expr;
        }

        return t.fail(msg || 'should fail');
    } catch (error) {
        t.throws(() => {
            throw new Error(error.message);
        }, msg || 'should fail');
    }
};

export type Test = test.Test & {shouldFail: ShouldFail};

export function asyncTest (testName: string, testCase: (assert: Test) => Promise<any>) {
    test(testName, async(assert: Test) => {
        try {
            assert.shouldFail = createShouldFailFunction(assert).bind(assert);
            await testCase(assert);
            assert.end();
        } catch (error) {
            assert.fail(error.stack);
        }
    })
}
