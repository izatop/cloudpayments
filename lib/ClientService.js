"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientAbstract_1 = require("./ClientAbstract");
const ClientApi_1 = require("./ClientApi");
const RegistrarApi_1 = require("./RegistrarApi");
class ClientService extends ClientAbstract_1.ClientAbstract {
    constructor(options) {
        super(options);
        this.client = this.createClientApi(this.options);
        this.registrar = this.createRegistrarApi(this.options);
    }
    getClientApi() {
        return this.client;
    }
    getRegistrarApi() {
        return this.registrar;
    }
    createClientApi(options) {
        return new ClientApi_1.ClientApi(options);
    }
    createRegistrarApi(options) {
        return new RegistrarApi_1.RegistrarApi(options);
    }
}
exports.ClientService = ClientService;
//# sourceMappingURL=ClientService.js.map