import fetch from 'node-fetch';
import {ClientOptions} from "./ClientOptions";
import {join} from "path";
import {Response, BaseResponse} from "../Response";

export class ClientAbstract {
    protected options: ClientOptions & {endpoint: string};

    constructor(_options: ClientOptions) {
        this.options = Object.assign({endpoint: 'https://api.cloudpayments.ru'}, _options);
    }

    public getPublicId() {
        return this.options.publicId;
    }

    public getEndpoint(): string {
        return this.options.endpoint;
    }
}

export class ClientRequestAbstract extends ClientAbstract {
    protected async call<R extends BaseResponse = BaseResponse>(url: string, data?: object, requestId?: string): Promise<Response<R>> {
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
