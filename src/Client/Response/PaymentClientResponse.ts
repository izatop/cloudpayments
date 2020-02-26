import {PaymentResponse, PaymentSuccessResponse} from "../../Api";
import {ClientResponse} from "../ClientResponse";

export class PaymentClientResponse<T extends PaymentResponse> extends ClientResponse<T> {
    public isPaymentSuccessResponse(): this is PaymentClientResponse<PaymentSuccessResponse> {
        const {Model} = this.getResponse();
        return super.isSuccess() && this.has(["TransactionId", "AuthCode"], Model);
    }
}
