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
const constants_1 = require("../src/Api/constants");
const ClientApi_1 = require("../src/ClientApi");
const ReceiptApi_1 = require("../src/ReceiptApi");
const ClientHandlers_1 = require("../src/ClientHandlers");
async_tape_1.asyncTest('ServiceClient', (t) => __awaiter(this, void 0, void 0, function* () {
    const options = {
        endpoint: 'https://fakeapi.com',
        publicId: 'public id',
        privateKey: 'private key',
        org: {
            inn: 12345678,
            taxationSystem: constants_1.TaxationSystem.GENERAL
        }
    };
    const service = new _1.ClientService(options);
    t.equal(service.getEndpoint(), options.endpoint);
    t.equal(service.getPublicId(), options.publicId);
    t.ok(service.getClientApi() instanceof ClientApi_1.ClientApi);
    t.ok(_1.ClientService.createClientApi(options) instanceof ClientApi_1.ClientApi);
    t.equal(service.getClientApi().getEndpoint(), options.endpoint);
    t.ok(service.getReceiptApi() instanceof ReceiptApi_1.ReceiptApi);
    t.ok(_1.ClientService.createReceiptApi(options) instanceof ReceiptApi_1.ReceiptApi);
    t.equal(service.getReceiptApi().getEndpoint(), options.endpoint.concat('/kkt'));
    t.ok(service.getHandlers() instanceof ClientHandlers_1.ClientHandlers);
    t.ok(_1.ClientService.createHandlers(options) instanceof ClientHandlers_1.ClientHandlers);
    t.equal(service.getHandlers().getEndpoint(), options.endpoint);
    t.equal(service.getClientApi(), service.getClientApi());
    t.equal(service.getReceiptApi(), service.getReceiptApi());
    t.equal(service.getHandlers(), service.getHandlers());
}));
//# sourceMappingURL=index.spec.js.map