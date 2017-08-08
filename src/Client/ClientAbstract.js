"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const utils_1 = require("../utils");
const path_1 = require("path");
class ClientAbstract {
    constructor(_options) {
        this.options = Object.assign({ endpoint: 'https://api.cloudpayments.ru' }, _options);
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
class ClientRequestAbstract extends ClientAbstract {
    call(url, data, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json'
            };
            if (requestId) {
                headers['X-Request-Id'] = requestId;
            }
            const response = yield node_fetch_1.default(this.getEndpoint().concat(path_1.join('/', url)), {
                headers,
                method: 'POST',
                body: data ? JSON.stringify(data) : undefined
            });
            return yield response.json();
        });
    }
}
exports.ClientRequestAbstract = ClientRequestAbstract;
__export(require("../Api/constants"));
//# sourceMappingURL=ClientAbstract.js.map