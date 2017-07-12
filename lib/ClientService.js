"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientAbstract_1 = require("./ClientAbstract");
const ClientApi_1 = require("./ClientApi");
const ReceiptRecorderApi_1 = require("./ReceiptRecorderApi");
class ClientService extends ClientAbstract_1.ClientAbstract {
    constructor(options) {
        super(options);
        this.client = ClientService.createClientApi(this.options);
        this.registrar = ClientService.createRegistrarApi(this.options);
    }
    getClientApi() {
        return this.client;
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
}
exports.ClientService = ClientService;
//# sourceMappingURL=ClientService.js.map