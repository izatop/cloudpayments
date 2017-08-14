"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
const path_1 = require("path");
class ClientAbstract {
    constructor(_options) {
        this.options = Object.assign({ endpoint: 'https://api.cloudpayments.ru' }, _options);
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
    get client() {
        return node_fetch_1.default;
    }
    async call(url, data, requestId) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic '.concat(new Buffer("".concat(this.options.publicId, ":", this.options.privateKey))
                .toString("base64"))
        };
        if (requestId) {
            headers['X-Request-Id'] = requestId;
        }
        const response = await this.client(this.getEndpoint().concat(path_1.join('/', url)), {
            headers,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined
        });
        return await response.json();
    }
}
exports.ClientRequestAbstract = ClientRequestAbstract;
__export(require("../Api/constants"));
//# sourceMappingURL=ClientAbstract.js.map