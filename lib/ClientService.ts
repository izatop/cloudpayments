import {ClientAbstract} from "./ClientAbstract";
import {ClientApi} from "./ClientApi";
import {ReceiptRecorderApi} from "./ReceiptRecorderApi";
import {ClientOptions} from "./ClientOptions";

export class ClientService extends ClientAbstract {
    protected client: ClientApi;
    protected registrar: ReceiptRecorderApi;

    constructor(options: ClientOptions) {
        super(options);
        this.client = ClientService.createClientApi(this.options);
        this.registrar = ClientService.createRegistrarApi(this.options);
    }

    public getClientApi() {
        return this.client;
    }

    public getRegistrarApi() {
        return this.registrar;
    }

    public static createClientApi(options: ClientOptions) {
        return new ClientApi(options);
    }

    public static createRegistrarApi(options: ClientOptions) {
        return new ReceiptRecorderApi(options)
    }
}
