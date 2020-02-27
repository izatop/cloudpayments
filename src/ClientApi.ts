import {
    ClientRequestAbstract,
    ClientResponse,
    PaymentClientResponse,
    PaymentWith3DSClientResponse,
    PayoutClientResponse,
} from "./Client";
import {
    BaseRequest,
    BaseResponse,
    Confirm3DSRequest,
    ConfirmPaymentRequest,
    CryptogramPaymentRequest,
    CryptogramPayoutRequest,
    LinkPaymentRequest,
    PaymentFailedResponse,
    PaymentGetResponse,
    PaymentHistoryResponse,
    PaymentResponse,
    PaymentSuccessResponse,
    PayoutResponse,
    RefundPaymentRequest,
    SubscriptionCreateRequest,
    SubscriptionResponse,
    SubscriptionsListGetResponse,
    SubscriptionUpdateRequest,
    TokenPaymentRequest,
    TokenPayoutRequest,
    VoidPaymentRequest,
} from "./Api";

export class ClientApi extends ClientRequestAbstract {
    public async chargeCryptogramPayment(data: CryptogramPaymentRequest) {
        return new PaymentWith3DSClientResponse<PaymentResponse>(
            await this.call<PaymentResponse>("/payments/cards/charge", data),
        );
    }

    /**
     * Authorize cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @returns {Promise<PaymentWith3DSClientResponse<PaymentResponse>>}
     */
    public async authorizeCryptogramPayment(data: CryptogramPaymentRequest) {
        return new PaymentWith3DSClientResponse<PaymentResponse>(
            await this.call<PaymentResponse>("/payments/cards/auth", data),
        );
    }

    /**
     * Charge token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns {Promise<PaymentWith3DSClientResponse<PaymentResponse>>}
     */
    public async chargeTokenPayment(data: TokenPaymentRequest) {
        return new PaymentWith3DSClientResponse<PaymentResponse>(
            await this.call<PaymentResponse>("/payments/tokens/charge", data),
        );
    }

    /**
     * Authorize token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns Promise<PaymentWith3DSClientResponse<PaymentResponse>>
     */
    public async authorizeTokenPayment(data: TokenPaymentRequest) {
        return new PaymentWith3DSClientResponse<PaymentResponse>(
            await this.call<PaymentResponse>("/payments/tokens/auth", data),
        );
    }

    /**
     * Confirm a 3DS payment
     *
     * @param {Confirm3DSRequest} data
     * @returns Promise<PaymentWith3DSClientResponse<PaymentResponse>>
     */
    public async confirm3DSPayment(data: Confirm3DSRequest) {
        return new PaymentWith3DSClientResponse<PaymentResponse>(
            await this.call<PaymentResponse>("/payments/cards/post3ds", data),
        );
    }

    /**
     * Confirm an authorized payment
     *
     * @param {ConfirmPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async confirmPayment(data: ConfirmPaymentRequest) {
        return new ClientResponse(await this.call<BaseResponse>("/payments/confirm", data));
    }

    /**
     * Refund a payment
     *
     * @param {RefundPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async refundPayment(data: RefundPaymentRequest) {
        return new ClientResponse(await this.call<BaseResponse>("/payments/refund", data));
    }

    /**
     * Void a payment
     *
     * @param {VoidPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async voidPayment(data: VoidPaymentRequest) {
        return new ClientResponse(await this.call<BaseResponse>("/payments/void", data));
    }

    /**
     * Get a payment history
     *
     * @param {{TransactionId: number}} data
     * @returns {Promise<Response<PaymentGetResponse>>}
     */
    public async getPayment(data: BaseRequest & { TransactionId: number }) {
        return new ClientResponse(await this.call<PaymentGetResponse>("/payments/get", data));
    }

    /**
     * Find a payment by invoice id
     *
     * @param {{InvoiceId: string}} data
     * @returns Promise<PaymentClientResponse<PaymentSuccessResponse | PaymentFailedResponse>>
     */
    public async findPaymentByInvoiceId(data: BaseRequest & { InvoiceId: string }) {
        return new PaymentClientResponse<PaymentSuccessResponse | PaymentFailedResponse>(
            await this.call<PaymentSuccessResponse | PaymentFailedResponse>("/payments/find", data),
        );
    }

    /**
     * @deprecated see getPaymentsList
     *
     * @param {{Date: string | Date, TimeZone: string}} data
     * @returns {Promise<Response<PaymentHistoryResponse>>}
     */
    public async getPaymentList(data: BaseRequest & { Date: string | Date; TimeZone?: string }) {
        return new ClientResponse(await this.call<PaymentHistoryResponse>("/payments/list", data));
    }

    /**
     * Get a filtered payment list
     *
     * @param {{Date: string | Date, TimeZone: string}} data
     * @returns {Promise<Response<PaymentHistoryResponse>>}
     */
    public async getPaymentsList(data: BaseRequest & { Date: string | Date; TimeZone?: string }) {
        return new ClientResponse(await this.call<PaymentHistoryResponse>("/payments/list", data));
    }

    /**
     * Get a filtered payment list
     *
     * @param {LinkPaymentRequest} data
     * @returns {Promise<Response<LinkPaymentModel>>}
     */
    public async createOrder(data: LinkPaymentRequest) {
        return new ClientResponse(await this.call<BaseResponse>("/orders/create", data));
    }

    /**
     * Create Subscription
     * @param data
     */
    public async createSubscription(data: BaseRequest & SubscriptionCreateRequest) {
        return new ClientResponse(await this.call<SubscriptionResponse>("/subscriptions/create", data));
    }

    /**
     * Update Subscription
     * @param data
     */
    public async updateSubscription(data: BaseRequest & SubscriptionUpdateRequest) {
        return new ClientResponse(await this.call<SubscriptionResponse>("/subscriptions/update", data));
    }

    /**
     * Cancel Subscription
     * @param data
     */
    public async cancelSubscription(data: BaseRequest & SubscriptionUpdateRequest) {
        return new ClientResponse(await this.call<BaseResponse>("/subscriptions/cancel", data));
    }

    /**
     * Get Subscription
     * @param data
     */
    public async getSubscription(data: BaseRequest & { Id: string }) {
        return new ClientResponse(await this.call<SubscriptionResponse>("/subscriptions/get", data));
    }

    /**
     * Get Subscriptions List
     * @param data
     */
    public async getSubscriptionsList(data: BaseRequest & { accountId: string }) {
        return new ClientResponse(await this.call<SubscriptionsListGetResponse>("/subscriptions/find", data));
    }

    /**
     * Charge Cryptogram Payout
     *
     * @param {CryptogramPayoutRequest} data
     * @returns Promise<PayoutClientResponse<PayoutResponse>>
     */
    public async chargeCryptogramPayout(data: CryptogramPayoutRequest) {
        return new PayoutClientResponse<PayoutResponse>(await this.call<PayoutResponse>("/payments/cards/topup", data));
    }

    /**
     * Charge token payout
     *
     * @param {TokenPayoutRequest} data
     * @returns Promise<PayoutClientResponse<PayoutResponse>>
     */
    public async chargeTokenPayout(data: TokenPayoutRequest) {
        return new PayoutClientResponse<PayoutResponse>(
            await this.call<PayoutResponse>("/payments/token/topup ", data),
        );
    }
}
