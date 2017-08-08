"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientAbstract_1 = require("./Client/ClientAbstract");
const ClientApi_1 = require("./ClientApi");
const ReceiptApi_1 = require("./ReceiptApi");
const ClientHandlers_1 = require("./ClientHandlers");
class ClientService extends ClientAbstract_1.ClientAbstract {
    constructor(options) {
        super(options);
        this.client = ClientService.createClientApi(this.options);
        this.handlers = ClientService.createHandlers(this.options);
        this.receipt = ClientService.createReceiptApi(this.options);
    }
    getClientApi() {
        return this.client;
    }
    getHandlers() {
        return this.handlers;
    }
    getReceiptApi() {
        return this.receipt;
    }
    static createClientApi(options) {
        return new ClientApi_1.ClientApi(options);
    }
    static createReceiptApi(options) {
        return new ReceiptApi_1.ReceiptApi(options);
    }
    static createHandlers(options) {
        return new ClientHandlers_1.ClientHandlers(options);
    }
}
exports.ClientService = ClientService;
//# sourceMappingURL=ClientService.js.map