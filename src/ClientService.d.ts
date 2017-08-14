import { ClientAbstract } from "./Client/ClientAbstract";
import { ClientApi } from "./ClientApi";
import { ReceiptApi } from "./ReceiptApi";
import { ClientOptions } from "./Client/ClientOptions";
import { NotificationHandlers } from "./NotificationHandlers";
export declare class ClientService extends ClientAbstract {
    protected client: ClientApi;
    protected receipt: ReceiptApi;
    protected handlers: NotificationHandlers;
    constructor(options: ClientOptions);
    getClientApi(): ClientApi;
    getNotificationHandlers(): NotificationHandlers;
    getReceiptApi(): ReceiptApi;
    static createClientApi(options: ClientOptions): ClientApi;
    static createReceiptApi(options: ClientOptions): ReceiptApi;
    static createNotificationHandlers(options: ClientOptions): NotificationHandlers;
}
