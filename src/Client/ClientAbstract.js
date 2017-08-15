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
const path_1 = require("path");
const response_1 = require("../Api/response");
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
    getOrgOptions() {
        if (this.options.org) {
            return this.options.org;
        }
        return null;
    }
}
exports.ClientAbstract = ClientAbstract;
class ClientRequestAbstract extends ClientAbstract {
    /**
     * HTTP Client
     *
     * @returns {(url: (string | Request), init?: RequestInit) => Promise<Response>}
     */
    get client() {
        return node_fetch_1.default;
    }
    /**
     *
     */
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.client(this.getEndpoint().concat(path_1.join('/test')), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });
            return new response_1.Response(yield response.json());
        });
    }
    /**
     * Create request to an API endpoint.
     *
     * @param {string} url
     * @param {Object} data
     * @param {string} requestId
     * @returns {Promise<Response<R extends BaseResponse>>}
     */
    call(url, data, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Basic '.concat(new Buffer("".concat(this.options.publicId, ":", this.options.privateKey))
                    .toString("base64"))
            };
            if (requestId) {
                headers['X-Request-ID'] = requestId;
            }
            const response = yield this.client(this.getEndpoint().concat(path_1.join('/', url)), {
                headers,
                method: 'POST',
                body: data ? JSON.stringify(data) : undefined
            });
            const result = yield response.json();
            return new response_1.Response(result);
        });
    }
}
exports.ClientRequestAbstract = ClientRequestAbstract;
__export(require("../Api/constants"));
//# sourceMappingURL=ClientAbstract.js.map