import {BaseResponse} from "../Api";

export class ClientResponse<T extends BaseResponse> {
    protected readonly response: T;

    constructor(response: T) {
        this.response = response;
    }

    public getResponse(): T {
        return this.response;
    }

    public isSuccess(): boolean {
        return this.response.Success;
    }

    public getMessage(): string | null {
        return this.response.Message;
    }

    protected static has(key: string | string[], object: object | null): boolean {
        if (typeof object !== "object" || object === null) {
            return false;
        }

        if (Array.isArray(key)) {
            return key.every(k => Reflect.has(object, k));
        }

        return Reflect.has(object, key);
    }
}
