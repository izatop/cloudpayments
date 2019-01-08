"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ClientAbstract_1 = require("./Client/ClientAbstract");
const ClientApi_1 = require("./ClientApi");
const ReceiptApi_1 = require("./ReceiptApi");
const NotificationHandlers_1 = require("./NotificationHandlers");
class ClientService extends ClientAbstract_1.ClientAbstract {
    constructor(options) {
        super(options);
        this.client = ClientService.createClientApi(this.options);
        this.handlers = ClientService.createNotificationHandlers(this.options);
        this.receipt = ClientService.createReceiptApi(this.options);
    }
    static createClientApi(options) {
        return new ClientApi_1.ClientApi(options);
    }
    static createReceiptApi(options) {
        return new ReceiptApi_1.ReceiptApi(options);
    }
    static createNotificationHandlers(options) {
        return new NotificationHandlers_1.NotificationHandlers(options);
    }
    getClientApi() {
        return this.client;
    }
    getNotificationHandlers() {
        return this.handlers;
    }
    getReceiptApi() {
        return this.receipt;
    }
}
exports.ClientService = ClientService;
