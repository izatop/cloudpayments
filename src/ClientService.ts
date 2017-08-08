import {ClientAbstract} from "./Client/ClientAbstract";
import {ClientApi} from "./ClientApi";
import {ReceiptApi} from "./ReceiptApi";
import {ClientOptions} from "./Client/ClientOptions";
import {ClientHandlers} from "./ClientHandlers";

export class ClientService extends ClientAbstract {
    protected client: ClientApi;
    protected receipt: ReceiptApi;
    protected handlers: ClientHandlers;

    constructor(options: ClientOptions) {
        super(options);
        this.client = ClientService.createClientApi(this.options);
        this.handlers = ClientService.createHandlers(this.options);
        this.receipt = ClientService.createReceiptApi(this.options);
    }

    public getClientApi() {
        return this.client;
    }

    public getHandlers() {
        return this.handlers;
    }

    public getReceiptApi() {
        return this.receipt;
    }

    public static createClientApi(options: ClientOptions) {
        return new ClientApi(options);
    }

    public static createReceiptApi(options: ClientOptions) {
        return new ReceiptApi(options)
    }

    public static createHandlers(options: ClientOptions) {
        return new ClientHandlers(options);
    }
}
