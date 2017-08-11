"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test = require("tape");
const createShouldFailFunction = (t) => (expr, msg) => __awaiter(this, void 0, void 0, function* () {
    let throwError;
    try {
        if (typeof expr === 'function') {
            yield expr();
        }
        else {
            yield expr;
        }
        return t.fail(msg || 'should fail');
    }
    catch (error) {
        t.throws(() => {
            throw new Error(error.message);
        }, msg || 'should fail');
    }
});
function asyncTest(testName, testCase) {
    test(testName, (assert) => __awaiter(this, void 0, void 0, function* () {
        try {
            assert.shouldFail = createShouldFailFunction(assert).bind(assert);
            yield testCase(assert);
            assert.end();
        }
        catch (error) {
            assert.fail(error.stack);
        }
    }));
}
exports.asyncTest = asyncTest;
//# sourceMappingURL=async-tape.js.map