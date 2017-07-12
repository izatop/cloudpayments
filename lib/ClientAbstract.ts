import fetch from 'node-fetch';
import {ClientOptions} from "./ClientOptions";
import {trace} from "./utils";
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
    protected async call(url: string, data?: object) {
        return await fetch(
            this.getEndpoint().concat(join('/', url)),
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: data ? JSON.stringify(data) : undefined
            }
        );
    }
}

export * from './Api/constants';
export * from './Api/types';
