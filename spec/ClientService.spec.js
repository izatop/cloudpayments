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
const ClientApi_1 = require("../src/ClientApi");
const ReceiptApi_1 = require("../src/ReceiptApi");
const ClientHandlers_1 = require("../src/ClientHandlers");
const helpers_1 = require("./helpers");
async_tape_1.asyncTest('ServiceClient', (t) => __awaiter(this, void 0, void 0, function* () {
    const service = new _1.ClientService(helpers_1.options);
    t.equal(service.getEndpoint(), helpers_1.options.endpoint);
    t.equal(service.getPublicId(), helpers_1.options.publicId);
    t.ok(service.getClientApi() instanceof ClientApi_1.ClientApi);
    t.ok(_1.ClientService.createClientApi(helpers_1.options) instanceof ClientApi_1.ClientApi);
    t.equal(service.getClientApi().getEndpoint(), helpers_1.options.endpoint);
    t.ok(service.getReceiptApi() instanceof ReceiptApi_1.ReceiptApi);
    t.ok(_1.ClientService.createReceiptApi(helpers_1.options) instanceof ReceiptApi_1.ReceiptApi);
    t.equal(service.getReceiptApi().getEndpoint(), helpers_1.options.endpoint.concat('/kkt'));
    t.ok(service.getHandlers() instanceof ClientHandlers_1.ClientHandlers);
    t.ok(_1.ClientService.createHandlers(helpers_1.options) instanceof ClientHandlers_1.ClientHandlers);
    t.equal(service.getHandlers().getEndpoint(), helpers_1.options.endpoint);
    t.equal(service.getClientApi(), service.getClientApi());
    t.equal(service.getReceiptApi(), service.getReceiptApi());
    t.equal(service.getHandlers(), service.getHandlers());
}));
//# sourceMappingURL=ClientService.spec.js.map