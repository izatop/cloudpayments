export interface BaseResponse {
    Message: string;
    Success: boolean;
}
export declare class Response<T extends BaseResponse> {
    protected response: T;
    constructor(response: T);
    getResponse(): T;
    isSuccess(): boolean;
    getMessage(): string;
}
