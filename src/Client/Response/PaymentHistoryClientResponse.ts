import {ClientResponse} from "../ClientResponse";
import {HistoryPaymentModel, PaymentHistoryResponse, PaymentSuccessModel} from "../../Api";
import {PaymentClientResponse} from "./PaymentClientResponse";

export class PaymentHistoryClientResponse<T extends PaymentHistoryResponse>
    extends ClientResponse<T> {
    public getSuccessPayments(): PaymentSuccessModel[] {
        return this.getPayments().filter(PaymentClientResponse.isPaymentSuccessResponse);
    }

    public getFailPayments() {
        return this.getPayments().filter((data) => !PaymentClientResponse.isPaymentSuccessResponse(data));
    }

    public getPayments(): HistoryPaymentModel[] {
        if (this.isSuccess()) {
            const {Model = []} = this.getResponse();
            return Model;
        }

        return [];
    }
}
