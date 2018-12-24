import fetch from 'node-fetch';
import {ClientOptions, ClientOptionsOrg} from "./ClientOptions";
import {join} from "path";
import {BaseResponse, Response} from "../Api/response";

export class ClientAbstract {
    protected options: ClientOptions & { endpoint: string };

    constructor(_options: ClientOptions) {
        this.options = Object.assign({endpoint: 'https://api.cloudpayments.ru'}, _options);
    }

    public getPublicId() {
        return this.options.publicId;
    }

    public getEndpoint(): string {
        return this.options.endpoint;
    }

    public getOrgOptions(): ClientOptionsOrg | null {
        if (this.options.org) {
            return this.options.org;
        }

        return null;
    }
}

export class ClientRequestAbstract extends ClientAbstract {
    /**
     * HTTP Client
     *
     * @returns {(url: (string | Request), init?: RequestInit) => Promise<Response>}
     */
    protected get client() {
        return fetch;
    }

    /**
     *
     */
    public async ping(): Promise<Response<BaseResponse>> {
        const response = await this.client(
            this.getEndpoint().concat(join('/test')),
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({})
            }
        );

        return new Response(await response.json());
    }

    /**
     * Create request to an API endpoint.
     *
     * @param {string} url
     * @param {Object} data
     * @param {string} requestId
     * @returns {Promise<Response<R extends BaseResponse>>}
     */
    protected async call<R extends BaseResponse = BaseResponse>(url: string, data?: object, requestId?: string): Promise<Response<R>> {
        const authorization = Buffer.from(`${this.options.publicId}:${this.options.privateKey}`, "utf-8")
            .toString("base64");

        const headers: any = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${authorization}`
        };

        if (requestId) {
            headers['X-Request-ID'] = requestId;
        }

        const response = await this.client(
            this.getEndpoint().concat(join('/', url)),
            {
                headers,
                method: 'POST',
                body: data ? JSON.stringify(data) : undefined
            }
        );

        const result = await response.json();
        return new Response(result);
    }
}

export * from '../Api/constants';
export * from '../Api/notification';
