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
const async_tape_1 = require("./async-tape");
const _1 = require("../");
const helpers_1 = require("./helpers");
async_tape_1.asyncTest('ServiceClient.ReceiptApi', (t) => __awaiter(this, void 0, void 0, function* () {
    const service = new _1.ClientService(helpers_1.options);
    const receiptApi = service.getReceiptApi();
}));
//# sourceMappingURL=ReceiptApi.spec.js.map