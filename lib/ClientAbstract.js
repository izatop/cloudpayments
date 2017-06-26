"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class ClientAbstract {
    constructor(options) {
        this.options = options;
        if (false === ('endpoint' in this.options)) {
            this.options.endpoint = 'https://api.cloudpayments.ru';
        }
        utils_1.trace('create client', this.options);
    }
    getPublicId() {
        return this.options.publicId;
    }
    getEndpoint() {
        return this.options.endpoint;
    }
}
exports.ClientAbstract = ClientAbstract;
__export(require("./Api/constants"));
//# sourceMappingURL=ClientAbstract.js.map