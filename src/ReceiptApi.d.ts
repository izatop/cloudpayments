import { ClientRequestAbstract } from "./Client/ClientAbstract";
import { IncomeReceipt } from "./ReceiptApi/IncomeReceipt";
import { Response, BaseResponse } from "./Response";
export declare class ReceiptApi extends ClientRequestAbstract {
    getEndpoint(): string;
    /**
     * Create receipt
     *
     * @param {IncomeReceipt} receipt   Income receipt data
     * @param {string} id               Idempotent request id (calculated automatically if not provided)
     * @returns {Promise<Response>}
     */
    createIncomeReceipt(receipt: IncomeReceipt, id?: string): Promise<Response<BaseResponse>>;
}
