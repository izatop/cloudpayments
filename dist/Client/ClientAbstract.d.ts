import fetch from 'node-fetch';
import { ClientOptions, ClientOptionsOrg } from "./ClientOptions";
import { BaseResponse, Response } from "../Api/response";
export declare class ClientAbstract {
    protected options: ClientOptions & {
        endpoint: string;
    };
    constructor(_options: ClientOptions);
    getPublicId(): string;
    getEndpoint(): string;
    getOrgOptions(): ClientOptionsOrg | null;
}
export declare class ClientRequestAbstract extends ClientAbstract {
    /**
     * HTTP Client
     *
     * @returns {(url: (string | Request), init?: RequestInit) => Promise<Response>}
     */
    protected readonly client: typeof fetch;
    /**
     *
     */
    ping(): Promise<Response<BaseResponse>>;
    /**
     * Create request to an API endpoint.
     *
     * @param {string} url
     * @param {Object} data
     * @param {string} requestId
     * @returns {Promise<Response<R extends BaseResponse>>}
     */
    protected call<R extends BaseResponse = BaseResponse>(url: string, data?: object, requestId?: string): Promise<Response<R>>;
}
export * from '../Api/constants';
export * from '../Api/notification';
