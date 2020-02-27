import {ClientOptions, ClientOptionsOrg} from "./ClientOptions";

export class ClientAbstract {
    protected options: ClientOptions & { endpoint: string };

    constructor(_options: ClientOptions) {
        this.options = {
            endpoint: "https://api.cloudpayments.ru",
            ..._options,
        };
    }

    public getPublicId(): string {
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
