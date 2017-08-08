import fetch from 'node-fetch';
import {ClientOptions} from "./ClientOptions";
import {trace} from "../utils";
import {join} from "path";

export class ClientAbstract {
    protected options: ClientOptions & {endpoint: string};

    constructor(_options: ClientOptions) {
        this.options = Object.assign({endpoint: 'https://api.cloudpayments.ru'}, _options);
        trace('create client', this.options);
    }

    public getPublicId() {
        return this.options.publicId;
    }

    public getEndpoint(): string {
        return this.options.endpoint;
    }
}

export class ClientRequestAbstract extends ClientAbstract {
    protected async call<R = any>(url: string, data?: object, requestId?: string): Promise<R> {
        const headers: any = {
            'Content-Type': 'application/json'
        };

        if (requestId) {
            headers['X-Request-Id'] = requestId;
        }

        const response = await fetch(
            this.getEndpoint().concat(join('/', url)),
            {
                headers,
                method: 'POST',
                body: data ? JSON.stringify(data) : undefined
            }
        );

        return await response.json();
    }
}

export * from '../Api/constants';
export * from '../Api/notification';
