import {Payment3DSResponse, PaymentSuccessResponse, PaymentWith3DSResponse} from "../../Api";
import {PaymentClientResponse} from "./PaymentClientResponse";

export class PaymentWith3DSClientResponse<T extends PaymentWith3DSResponse>
    extends PaymentClientResponse<T> {
    public declare readonly isPaymentSuccessResponse: () =>
        this is PaymentWith3DSClientResponse<PaymentSuccessResponse>;

    public isPayment3DSResponse(): this is PaymentWith3DSClientResponse<Payment3DSResponse> {
        const {Model} = this.getResponse();
        return !this.isSuccess() && this.has(["TransactionId", "PaReq", "AcsUrl"], Model);
    }
}
