"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientAbstract_1 = require("./Client/ClientAbstract");
const ClientApi_1 = require("./ClientApi");
const ReceiptRecorderApi_1 = require("./ReceiptRecorderApi");
const ClientHandlers_1 = require("./ClientHandlers");
class ClientService extends ClientAbstract_1.ClientAbstract {
    constructor(options) {
        super(options);
        this.client = ClientService.createClientApi(this.options);
        this.handlers = ClientService.createClientHandlers(this.options);
        if ('registrar' in this.options) {
            this.registrar = ClientService.createRegistrarApi(this.options);
        }
    }
    getClientApi() {
        return this.client;
    }
    getClientHandlers() {
        return this.handlers;
    }
    getRegistrarApi() {
        return this.registrar;
    }
    static createClientApi(options) {
        return new ClientApi_1.ClientApi(options);
    }
    static createRegistrarApi(options) {
        return new ReceiptRecorderApi_1.ReceiptRecorderApi(options);
    }
    static createClientHandlers(options) {
        return new ClientHandlers_1.ClientHandlers(options);
    }
}
exports.ClientService = ClientService;
//# sourceMappingURL=ClientService.js.map