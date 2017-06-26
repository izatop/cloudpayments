import {ClientOptions} from "./ClientOptions";
import {trace} from "./utils";

export class ClientAbstract {
    constructor(protected options: ClientOptions) {
        if (false === ('endpoint' in this.options)) {
            this.options.endpoint = 'https://api.cloudpayments.ru';
        }

        trace('create client', this.options);
    }

    public getPublicId() {
        return this.options.publicId;
    }

    public getEndpoint() {
        return this.options.endpoint;
    }
}

export * from './Api/constants';
export * from './Api/types';
