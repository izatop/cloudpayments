export interface BaseResponse {
    Message: string,
    Success: boolean
}

export class Response<T extends BaseResponse> {
    constructor(protected response: T) {}

    getResponse() {
        return this.response;
    }

    isSuccess() {
        return this.response.Success;
    }

    getMessage() {
        return this.response.Message;
    }
}
