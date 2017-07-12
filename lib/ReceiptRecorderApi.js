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
const ClientAbstract_1 = require("./ClientAbstract");
const assert_1 = require("assert");
class ReceiptRecorderApi extends ClientAbstract_1.ClientRequestAbstract {
    getEndpoint() {
        return this.options.endpoint.concat('kkt');
    }
    createIncomeReceipt(requestId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok(data.Inn, 'A field Inn is required');
            assert_1.ok(data.Type, 'A field Type is required');
            assert_1.ok(!!data.CustomerReceipt, 'A field CustomerReceipt is required');
            assert_1.ok(!!data.CustomerReceipt.Item && data.CustomerReceipt.Item.length > 0, 'A field CustomerReceipt.Item is required');
            const { CustomerReceipt } = data;
            CustomerReceipt.Item.forEach(item => {
                if (!item.vat) {
                    item.vat = this.options.organization.vat;
                }
                assert_1.ok(!!item.vat, 'A field CustomerReceipt.Item.vat is required');
            });
            if (!CustomerReceipt.taxationSystem) {
                CustomerReceipt.taxationSystem = this.options.organization.taxationSystem;
            }
            assert_1.ok(!!CustomerReceipt.taxationSystem, 'A field CustomerReceipt.taxationSystem is required');
            return this.call('receipt', data);
        });
    }
}
exports.ReceiptRecorderApi = ReceiptRecorderApi;
//# sourceMappingURL=ReceiptRecorderApi.js.map