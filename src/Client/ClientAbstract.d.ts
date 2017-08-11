import { ClientOptions } from "./ClientOptions";
import { Response, BaseResponse } from "../Response";
export declare class ClientAbstract {
    protected options: ClientOptions & {
        endpoint: string;
    };
    constructor(_options: ClientOptions);
    getPublicId(): string;
    getEndpoint(): string;
}
export declare class ClientRequestAbstract extends ClientAbstract {
    protected call<R extends BaseResponse = BaseResponse>(url: string, data?: object, requestId?: string): Promise<Response<R>>;
}
export * from '../Api/constants';
export * from '../Api/notification';
