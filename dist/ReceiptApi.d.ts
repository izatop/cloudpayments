import { ClientRequestAbstract } from "./Client/ClientAbstract";
import { CustomerReceipt, ReceiptRequest } from "./Api/request";
import { BaseResponse, Response } from "./Api/response";
export declare class ReceiptApi extends ClientRequestAbstract {
    getEndpoint(): string;
    /**
     * Create receipt
     *
     * @param {Receipt} request     Common request fields
     * @param {Receipt} receipt     Receipt fields
     * @param {string} requestId    Idempotent request id (calculated automatically if not provided)
     * @returns {Promise<Response>}
     */
    createReceipt(request: ReceiptRequest, receipt: CustomerReceipt, requestId?: string): Promise<Response<BaseResponse>>;
}
