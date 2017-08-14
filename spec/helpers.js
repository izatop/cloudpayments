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
const constants_1 = require("../src/Api/constants");
const stream = require("stream");
const utils_1 = require("../src/utils");
exports.options = {
    endpoint: 'https://fakeapi.com',
    publicId: 'public id',
    privateKey: 'private key',
    org: {
        inn: 12345678,
        taxationSystem: constants_1.TaxationSystem.GENERAL
    }
};
class ServiceRequestMock extends stream.Readable {
    constructor(privateKey, raw) {
        super();
        this.httpVersion = "1.1";
        this.headers = {
            'content-hmac': utils_1.signString(privateKey, raw)
        };
        this.method = 'POST';
        setTimeout(() => {
            this.emit('data', raw);
            this.emit('end');
        }, 10);
    }
    _read(size) { }
    setTimeout(msecs, callback) {
        return this;
    }
    destroy(error) {
    }
}
exports.ServiceRequestMock = ServiceRequestMock;
function clientRequestTest(test, client, clientCall, testCase) {
    return __awaiter(this, void 0, void 0, function* () {
        Object.defineProperty(client, 'client', {
            get: () => (url, init) => {
                testCase(test, url, init);
                return { json() { } };
            }
        });
        try {
            yield clientCall();
        }
        catch (error) {
            test.fail(error.stack);
        }
    });
}
exports.clientRequestTest = clientRequestTest;
//# sourceMappingURL=helpers.js.map