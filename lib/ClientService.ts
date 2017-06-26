import {ClientAbstract} from "./ClientAbstract";
import {ClientApi} from "./ClientApi";
import {RegistrarApi} from "./ReceiptRecorderApi";
import {ClientOptions} from "./ClientOptions";

export class ClientService extends ClientAbstract {
    protected client: ClientApi;
    protected registrar: RegistrarApi;

    constructor(options: ClientOptions) {
        super(options);
        this.client = this.createClientApi(this.options);
        this.registrar = this.createRegistrarApi(this.options);
    }

    public getClientApi() {
        return this.client;
    }

    public getRegistrarApi() {
        return this.registrar;
    }

    public createClientApi(options: ClientOptions) {
        return new ClientApi(options);
    }

    public createRegistrarApi(options: ClientOptions) {
        return new RegistrarApi(options)
    }
}
