import * as test from 'tape';

export function asyncTest (testName: string, testCase: (assert: test.Test) => Promise<any>) {
    test(testName, async(assert) => {
        try {
            await testCase(assert);
            assert.end();
        } catch (error) {
            assert.fail(error);
        }
    })
}
