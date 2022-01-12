import fetch from "node-fetch";
import {ClientResponse} from "./ClientResponse";
import {BaseResponse} from "../Api";
import {join} from "path";
import {ClientAbstract} from "./ClientAbstract";

export class ClientRequestAbstract extends ClientAbstract {
    /**
     * HTTP Client
     *
     * @returns {(url: (string | Request), init?: RequestInit) => Promise<Response>}
     */
    public get client(): typeof fetch {
        return fetch;
    }

    /**
     *
     */
    public async ping(): Promise<ClientResponse<BaseResponse>> {
        const response = await this.client(this.getEndpoint().concat(join("/test")), {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({}),
        });

        return new ClientResponse(await response.json() as BaseResponse);
    }

    /**
     * Create request to an API endpoint.
     *
     * @param {string} url
     * @param {Object} data
     * @param {string} requestId
     * @returns {Promise<ClientResponse<BaseResponse>>}
     */
    protected async call<R extends BaseResponse>(url: string, data?: object, requestId?: string): Promise<R> {
        const authorization = Buffer.from(`${this.options.publicId}:${this.options.privateKey}`, "utf-8").toString(
            "base64",
        );

        const headers: { [key: string]: string } = {
            "Content-Type": "application/json",
            Authorization: `Basic ${authorization}`,
        };

        if (requestId) {
            headers["X-Request-ID"] = requestId;
        }

        const response = await this.client(this.getEndpoint().concat(join("/", url)), {
            headers,
            method: "POST",
            body: data ? JSON.stringify(data) : undefined,
        });

        return await response.json() as R;
    }
}
