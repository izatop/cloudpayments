import {ClientAbstract, ClientOptions} from "./Client";
import {ClientApi} from "./ClientApi";
import {ReceiptApi} from "./ReceiptApi";
import {NotificationHandlers} from "./NotificationHandlers";

export class ClientService extends ClientAbstract {
    protected client: ClientApi;
    protected receipt: ReceiptApi;
    protected handlers: NotificationHandlers;

    constructor(options: ClientOptions) {
        super(options);
        this.client = ClientService.createClientApi(this.options);
        this.handlers = ClientService.createNotificationHandlers(this.options);
        this.receipt = ClientService.createReceiptApi(this.options);
    }

    public static createClientApi(options: ClientOptions) {
        return new ClientApi(options);
    }

    public static createReceiptApi(options: ClientOptions) {
        return new ReceiptApi(options);
    }

    public static createNotificationHandlers(options: ClientOptions) {
        return new NotificationHandlers(options);
    }

    public getClientApi() {
        return this.client;
    }

    public getNotificationHandlers() {
        return this.handlers;
    }

    public getReceiptApi() {
        return this.receipt;
    }
}
