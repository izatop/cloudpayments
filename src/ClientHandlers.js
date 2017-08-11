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
const ClientAbstract_1 = require("./Client/ClientAbstract");
const qs = require("qs");
const utils_1 = require("./utils");
const url_1 = require("url");
const assert_1 = require("assert");
class ClientHandlers extends ClientAbstract_1.ClientAbstract {
    handle(req, validator) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = yield this.parseRequest(req);
                if (validator) {
                    const code = yield validator(request);
                    return { request, response: { code } };
                }
                return { request, response: {} };
            }
            catch (error) {
                throw error;
            }
        });
    }
    handleCheckRequest(req, validator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handle(req, validator);
        });
    }
    handlePayRequest(req, validator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handle(req, validator);
        });
    }
    handleFailRequest(req, validator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handle(req, validator);
        });
    }
    handleRefundRequest(req, validator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handle(req, validator);
        });
    }
    handleRecurrentRequest(req, validator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handle(req, validator);
        });
    }
    handleReceiptRequest(req, validator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handle(req, validator);
        });
    }
    parseRequest(req) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok('content-hmac' in req.headers, 'Request headers should contain Content-HMAC field.');
            const signature = req.headers['content-hmac'];
            const method = req.method || '';
            const request = {};
            assert_1.ok(!!method, 'Request method should not be empty');
            if (method.toUpperCase() === 'POST') {
                const body = yield new Promise((resolve, reject) => {
                    const chunks = [];
                    req.on('data', (chunk) => chunks.push(chunk.toString()));
                    req.on('end', () => resolve(chunks.join()));
                    req.on('error', reject);
                });
                const headers = req.headers || {};
                assert_1.ok(utils_1.checkSignedString(this.options.privateKey, signature, body), 'Invalid signature');
                if ('content-type' in headers && headers['content-type'].indexOf('json') !== -1) {
                    Object.assign(request, JSON.parse(body));
                }
                else {
                    Object.assign(request, qs.parse(body));
                }
            }
            else if (method.toUpperCase() === 'GET') {
                assert_1.ok(utils_1.checkSignedString(this.options.privateKey, signature, url_1.parse(req.url || '').query), 'Invalid signature');
                Object.assign(request, url_1.parse(req.url || '', true).query);
            }
            return request;
        });
    }
}
exports.ClientHandlers = ClientHandlers;
//# sourceMappingURL=ClientHandlers.js.map