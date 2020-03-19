import {PayoutResponse, PayoutSuccessResponse} from "../../Api";
import {ClientResponse} from "../ClientResponse";

export class PayoutClientResponse<T extends PayoutResponse> extends ClientResponse<T> {
    public isPayoutSuccessResponse(): this is ClientResponse<PayoutSuccessResponse> {
        const {Model} = this.getResponse();
        return this.isSuccess() && PayoutClientResponse.has(["TransactionId", "AuthCode"], Model);
    }
}
