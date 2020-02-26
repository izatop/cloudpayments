import {BaseResponse} from "../Api";

export class ClientResponse<T extends BaseResponse> {
    protected readonly response: T;

    constructor(response: T) {
        this.response = response;
    }

    public getResponse() {
        return this.response;
    }

    public isSuccess() {
        return this.response.Success;
    }

    public getMessage() {
        return this.response.Message;
    }

    protected has(key: string | string[], object: object | null) {
        if (typeof object !== "object" || object === null) {
            return false;
        }

        if (Array.isArray(key)) {
            return key.every((k) => Reflect.has(object, k));
        }

        return Reflect.has(object, key);
    }
}
