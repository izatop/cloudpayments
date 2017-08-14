import { ClientRequestAbstract } from "./Client/ClientAbstract";
import { ReceiptTypes } from "./Api/constants";
import { Receipt } from "./ReceiptApi/Receipt";
import { Response, BaseResponse } from "./Response";
export declare class ReceiptApi extends ClientRequestAbstract {
    getEndpoint(): string;
    /**
     * Create receipt
     *
     * @param {ReceiptTypes} type   Receipt type
     * @param {Receipt} receipt   Income receipt data
     * @param {string} id               Idempotent request id (calculated automatically if not provided)
     * @returns {Promise<Response>}
     */
    createReceipt(type: ReceiptTypes, receipt: Receipt, id?: string): Promise<Response<BaseResponse>>;
}
