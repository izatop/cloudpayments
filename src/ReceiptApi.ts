import {ok} from "assert";
import * as objectHash from "object-hash";
import {ClientRequestAbstract, ClientResponse} from "./Client";
import {
    BaseResponse,
    CustomerReceipt,
    ReceiptApiRequest,
    ReceiptRequest,
    validateTaxationSystem,
    validateVAT,
} from "./Api";

export class ReceiptApi extends ClientRequestAbstract {
    public getEndpoint() {
        return this.options.endpoint.replace(/\/$/, "").concat("/kkt");
    }

    /**
     * Create receipt
     *
     * @param {Receipt} request     Common request fields
     * @param {Receipt} receipt     Receipt fields
     * @param {string} requestId    Idempotent request id (calculated automatically if not provided)
     * @returns {Promise<Response>}
     */
    async createReceipt(request: ReceiptRequest, receipt: CustomerReceipt, requestId?: string) {
        const {..._request} = request;
        const {..._receipt} = receipt;
        if (this.options.org) {
            if (!_request.Inn && this.options.org.inn) {
                _request.Inn = this.options.org.inn;
            }

            if (!_receipt.taxationSystem && validateTaxationSystem(this.options.org.taxationSystem)) {
                _receipt.taxationSystem = this.options.org.taxationSystem;
            }
        }

        ok(_request.Type, "Type is required");
        ok(_request.Inn, "Inn is required");

        ok(validateTaxationSystem(_receipt.taxationSystem), "A receipt field taxationSystem should be valid");
        ok(_receipt.Items && _receipt.Items.length > 0, "A receipt field Items should be filled");

        ok(_receipt.Items.filter(x => !validateVAT(x.vat)).length === 0, "You should fill VAT with valid values");

        const data: ReceiptApiRequest = {
            ..._request,
            CustomerReceipt: _receipt,
        };

        return new ClientResponse(await this.call<BaseResponse>("receipt", data, requestId || objectHash(receipt)));
    }
}
