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
        this.handlers = ClientService.createClientHandlers(this.options);

        if ('registrar' in this.options) {
            this.registrar = ClientService.createRegistrarApi(this.options);
        }
    }

    public getClientApi() {
        return this.client;
    }

    public getClientHandlers() {
        return this.handlers;
    }

    public getRegistrarApi() {
        return this.registrar;
    }

    public static createClientApi(options: ClientOptions) {
        return new ClientApi(options);
    }

    public static createRegistrarApi(options: ClientOptions) {
        return new ReceiptApi(options)
    }

    public static createClientHandlers(options: ClientOptions) {
        return new ClientHandlers(options);
    }
}
