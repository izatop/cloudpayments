"use strict";
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
//# sourceMappingURL=helpers.js.map