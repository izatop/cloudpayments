import {BaseResponse} from "../../../src";

export function createResponse<T extends BaseResponse>(data: object, success = true): T {
    return {
        Model: data,
        Success: success,
        Message: success ? null : "Error message",
    } as any;
}
