import { ClientOptions } from "./ClientOptions";
export declare class ClientAbstract {
    protected options: ClientOptions & {
        endpoint: string;
    };
    constructor(_options: ClientOptions);
    getPublicId(): string;
    getEndpoint(): string;
}
export declare class ClientRequestAbstract extends ClientAbstract {
    protected call<R extends Response = any>(url: string, data?: object, requestId?: string): Promise<R>;
}
export * from '../Api/constants';
export * from '../Api/notification';
