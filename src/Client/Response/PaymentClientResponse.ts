import {
    PaymentFailedResponse,
    PaymentModel,
    PaymentResponse, PaymentSuccessModel,
    PaymentSuccessResponse,
    PaymentWith3DSResponse,
} from "../../Api";
import {ClientResponse} from "../ClientResponse";

export class PaymentClientResponse<T extends PaymentResponse | PaymentWith3DSResponse = PaymentFailedResponse>
    extends ClientResponse<T> {
    public isPaymentSuccessResponse(): this is PaymentClientResponse<PaymentSuccessResponse> {
        const {Model} = this.getResponse();
        return super.isSuccess() && ClientResponse.has(["TransactionId", "AuthCode"], Model);
    }

    public static isPaymentSuccessResponse(data: PaymentModel | PaymentSuccessModel): data is PaymentSuccessModel {
        return this.has(["TransactionId", "AuthCode"], data);
    }
}
