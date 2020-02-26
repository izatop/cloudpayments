import fetch from "node-fetch";
import {ClientOptions, ClientOptionsOrg} from "./ClientOptions";
import {join} from "path";
import {BaseResponse} from "../Api";
import {ClientResponse} from "./ClientResponse";

export class ClientAbstract {
    protected options: ClientOptions & { endpoint: string };

    constructor(_options: ClientOptions) {
        this.options = Object.assign({endpoint: "https://api.cloudpayments.ru"}, _options);
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
    public get client() {
        return fetch;
    }

    /**
     *
     */
    public async ping(): Promise<ClientResponse<BaseResponse>> {
        const response = await this.client(
            this.getEndpoint().concat(join("/test")),
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({})
            }
        );

        return new ClientResponse(await response.json());
    }

    /**
     * Create request to an API endpoint.
     *
     * @param {string} url
     * @param {Object} data
     * @param {string} requestId
     * @returns {Promise<ClientResponse<BaseResponse>>}
     */
    protected async call<R extends BaseResponse>(url: string, data?: object, requestId?: string) {
        const authorization = Buffer.from(`${this.options.publicId}:${this.options.privateKey}`, "utf-8")
            .toString("base64");

        const headers: any = {
            "Content-Type": "application/json",
            "Authorization": `Basic ${authorization}`
        };

        if (requestId) {
            headers["X-Request-ID"] = requestId;
        }

        const response = await this.client(
            this.getEndpoint().concat(join("/", url)),
            {
                headers,
                method: "POST",
                body: data ? JSON.stringify(data) : undefined
            }
        );

        return await response.json() as R;
    }
}
