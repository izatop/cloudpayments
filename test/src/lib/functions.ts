import {BaseResponse} from "../../../src";

export function createResponse<T extends BaseResponse>(data: object, success = true): T {
    const response: any = {
        Model: data,
        Success: success,
        Message: success ? null : "Error message",
    };

    return response;
}
