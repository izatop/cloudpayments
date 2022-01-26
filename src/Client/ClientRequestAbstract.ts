import {join} from "path";
import fetch from "node-fetch";
import {BaseResponse} from "../Api";
import {ClientResponse} from "./ClientResponse";
import {ClientAbstract} from "./ClientAbstract";
import {ClientRequestOptions} from "./ClientOptions";

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
     * @param {ClientRequestOptions} options
     * @returns {Promise<ClientResponse<BaseResponse>>}
     */
    protected async call<R extends BaseResponse>(url: string, options: ClientRequestOptions): Promise<R> {
        const authorization = Buffer.from(`${this.options.publicId}:${this.options.privateKey}`, "utf-8").toString(
            "base64",
        );

        const body = options.data ? JSON.stringify(options.data) : undefined;
        const headers: {[key: string]: string} = {
            "Content-Type": "application/json",
            Authorization: `Basic ${authorization}`,
        };

        if (options.requestId) {
            headers["X-Request-ID"] = options.requestId;
        }

        if (body && options.sign) {
            headers["X-Signature"] = await options.sign(body);
        }

        const uri = this.getEndpoint().concat(join("/", url));
        const response = await this.client(uri, {
            body,
            headers,
            method: "POST",
        });

        return await response.json() as R;
    }
}
