import { ClientAbstract } from "./Client/ClientAbstract";
import { ClientApi } from "./ClientApi";
import { ReceiptApi } from "./ReceiptApi";
import { ClientOptions } from "./Client/ClientOptions";
import { ClientHandlers } from "./ClientHandlers";
export declare class ClientService extends ClientAbstract {
    protected client: ClientApi;
    protected receipt: ReceiptApi;
    protected handlers: ClientHandlers;
    constructor(options: ClientOptions);
    getClientApi(): ClientApi;
    getHandlers(): ClientHandlers;
    getReceiptApi(): ReceiptApi;
    static createClientApi(options: ClientOptions): ClientApi;
    static createReceiptApi(options: ClientOptions): ReceiptApi;
    static createHandlers(options: ClientOptions): ClientHandlers;
}
