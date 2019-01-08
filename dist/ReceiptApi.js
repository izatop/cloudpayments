"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("assert");
const objectHash = require("object-hash");
const ClientAbstract_1 = require("./Client/ClientAbstract");
const constants_1 = require("./Api/constants");
class ReceiptApi extends ClientAbstract_1.ClientRequestAbstract {
    getEndpoint() {
        return this.options.endpoint.replace(/\/$/, '').concat('/kkt');
    }
    /**
     * Create receipt
     *
     * @param {Receipt} request     Common request fields
     * @param {Receipt} receipt     Receipt fields
     * @param {string} requestId    Idempotent request id (calculated automatically if not provided)
     * @returns {Promise<Response>}
     */
    createReceipt(request, receipt, requestId) {
        return __awaiter(this, void 0, void 0, function* () {
            const _request = __rest(request, []);
            const _receipt = __rest(receipt, []);
            if (this.options.org) {
                if (!_request.Inn && this.options.org.inn) {
                    _request.Inn = this.options.org.inn;
                }
                if (!_receipt.taxationSystem && constants_1.validateTaxationSystem(this.options.org.taxationSystem)) {
                    _receipt.taxationSystem = this.options.org.taxationSystem;
                }
            }
            assert_1.ok(_request.Type, 'Type is required');
            assert_1.ok(_request.Inn, 'Inn is required');
            assert_1.ok(constants_1.validateTaxationSystem(_receipt.taxationSystem), 'A receipt field taxationSystem should be valid');
            assert_1.ok(_receipt.Items && _receipt.Items.length > 0, 'A receipt field Items should be filled');
            assert_1.ok(_receipt.Items.filter(x => false === constants_1.validateVAT(x.vat)).length === 0, 'You should fill VAT with valid values');
            const data = Object.assign({}, _request, { CustomerReceipt: _receipt });
            return yield this.call('receipt', data, requestId || objectHash(receipt));
        });
    }
}
exports.ReceiptApi = ReceiptApi;
