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
const constants_1 = require("../src/Api/constants");
async_tape_1.asyncTest('ServiceClient.ReceiptApi', (t) => __awaiter(this, void 0, void 0, function* () {
    const service = new _1.ClientService(helpers_1.options);
    const receiptApi = service.getReceiptApi();
    const request = {
        AccountId: '1',
        InvoiceId: '1',
        Type: constants_1.ReceiptTypes.Income,
    };
    const receipt = {
        Items: [
            {
                price: 100,
                quantity: 1,
                amount: 100,
                label: 'item',
                vat: constants_1.VAT.VAT18
            },
            {
                price: 10,
                quantity: 2,
                amount: 20,
                label: 'item 2',
                vat: constants_1.VAT.VAT18,
                ean13: '3153125631'
            }
        ],
        email: 'mail@example.com',
        phone: '1234567890'
    };
    yield t.shouldFail(receiptApi.createReceipt(request, Object.assign({}, receipt, { Items: [{
                price: 100,
                quantity: 1,
                amount: 100,
                label: 'item'
            }
        ] })));
    const clientWithoutOrgOptions = _1.ClientService.createReceiptApi({
        publicId: helpers_1.options.publicId,
        privateKey: helpers_1.options.privateKey
    });
    yield t.shouldFail(clientWithoutOrgOptions.createReceipt(request, receipt));
    yield helpers_1.clientRequestTest(t, receiptApi, () => receiptApi.createReceipt(request, receipt), (t, url, init) => {
        const { headers, body } = init;
        t.equal(url, helpers_1.options.endpoint.concat('/kkt/receipt'));
        t.ok(headers['X-Request-ID']);
        t.equal(headers['X-Request-ID'], 'b9d541aa3b3ea30daafbf190557463ad92b1bc4e');
        t.equal(headers['Content-Type'], 'application/json');
        t.equal(headers['Authorization'], 'Basic cHVibGljIGlkOnByaXZhdGUga2V5');
        t.equal(body, '{"AccountId":"1","InvoiceId":"1","Type":"Income","Inn":12345678,"CustomerReceipt":{"Items":[{"price":100,"quantity":1,"amount":100,"label":"item","vat":18},{"price":10,"quantity":2,"amount":20,"label":"item 2","vat":18,"ean13":"3153125631"}],"email":"mail@example.com","phone":"1234567890","taxationSystem":0}}');
    });
}));
//# sourceMappingURL=ReceiptApi.spec.js.map