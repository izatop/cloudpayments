import {ClientRequestAbstract, SubscriptionCreateRequest, SubscriptionUpdateRequest} from "./Client/ClientAbstract";
import {
    BaseRequest,
    Confirm3DSRequest,
    ConfirmPaymentRequest,
    CryptogramPaymentRequest,
    CryptogramPayoutRequest,
    LinkPaymentRequest,
    TokenPaymentRequest,
    TokenPayoutRequest,
    VoidPaymentRequest
} from "./Api/request";
import {
    BaseResponse,
    PaymentFailedResponse,
    PaymentGetResponse,
    PaymentHistoryResponse,
    PaymentResponse,
    PaymentSuccessResponse,
    PayoutResponse,
    Response,
    SubscriptionResponse,
    SubscriptionsListGetResponse
} from "./Api/response";
import {RefundPaymentRequest} from "./index";

export class ClientApi extends ClientRequestAbstract {
    /**
     * Charge cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async chargeCryptogramPayment(data: CryptogramPaymentRequest) {
        return this.call<PaymentResponse>("/payments/cards/charge", data);
    }

    /**
     * Authorize cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async authorizeCryptogramPayment(data: CryptogramPaymentRequest) {
        return this.call<PaymentResponse>("/payments/cards/auth", data);
    }

    /**
     * Charge token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async chargeTokenPayment(data: TokenPaymentRequest) {
        return this.call<PaymentResponse>("/payments/tokens/charge", data);
    }

    /**
     * Authorize token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async authorizeTokenPayment(data: TokenPaymentRequest) {
        return this.call<PaymentResponse>("/payments/tokens/auth", data);
    }

    /**
     * Confirm a 3DS payment
     *
     * @param {Confirm3DSRequest} data
     * @returns {Promise<Response<PaymentResponse>>}
     */
    public async confirm3DSPayment(data: Confirm3DSRequest) {
        return this.call<PaymentResponse>("/payments/cards/post3ds", data);
    }

    /**
     * Confirm an authorized payment
     *
     * @param {ConfirmPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async confirmPayment(data: ConfirmPaymentRequest) {
        return this.call<BaseResponse>("/payments/confirm", data);
    }

    /**
     * Refund a payment
     *
     * @param {RefundPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async refundPayment(data: RefundPaymentRequest) {
        return this.call<BaseResponse>("/payments/refund", data);
    }

    /**
     * Void a payment
     *
     * @param {VoidPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async voidPayment(data: VoidPaymentRequest) {
        return this.call<BaseResponse>("/payments/void", data);
    }

    /**
     * Get a payment history
     *
     * @param {{TransactionId: number}} data
     * @returns {Promise<Response<PaymentGetResponse>>}
     */
    public async getPayment(data: BaseRequest & { TransactionId: number }) {
        return this.call<PaymentGetResponse>("/payments/get", data);
    }

    /**
     * Find a payment by invoice id
     *
     * @param {{InvoiceId: string}} data
     * @returns {Promise<Response<PaymentSuccessResponse | PaymentFailedResponse>>}
     */
    public async findPaymentByInvoiceId(data: BaseRequest & { InvoiceId: string }) {
        return this.call<PaymentSuccessResponse | PaymentFailedResponse>("/payments/find", data);
    }

    /**
     * @deprecated see getPaymentsList
     *
     * @param {{Date: string | Date, TimeZone: string}} data
     * @returns {Promise<Response<PaymentHistoryResponse>>}
     */
    public async getPaymentList(data: BaseRequest & { Date: string | Date, TimeZone?: string }) {
        return this.call<PaymentHistoryResponse>("/payments/list", data);
    }

    /**
     * Get a filtered payment list
     *
     * @param {{Date: string | Date, TimeZone: string}} data
     * @returns {Promise<Response<PaymentHistoryResponse>>}
     */
    public async getPaymentsList(data: BaseRequest & { Date: string | Date, TimeZone?: string }) {
        return this.call<PaymentHistoryResponse>("/payments/list", data);
    }

    /**
     * Get a filtered payment list
     *
     * @param {LinkPaymentRequest} data
     * @returns {Promise<Response<LinkPaymentModel>>}
     */
    public async createOrder(data: LinkPaymentRequest) {
        return this.call("/orders/create", data);
    }

    public async createSubscription(data: BaseRequest & SubscriptionCreateRequest): Promise<Response<SubscriptionResponse>> {
        return this.call<SubscriptionResponse>("/subscriptions/create", data);
    }

    public async updateSubscription(data: BaseRequest & SubscriptionUpdateRequest): Promise<Response<SubscriptionResponse>> {
        return this.call<SubscriptionResponse>("/subscriptions/update", data);
    }

    public async cancelSubscription(data: BaseRequest & SubscriptionUpdateRequest): Promise<Response<BaseResponse>> {
        return this.call<BaseResponse>("/subscriptions/cancel", data);
    }

    public async getSubscription(data: BaseRequest & { Id: string }): Promise<Response<SubscriptionResponse>> {
        return this.call<SubscriptionResponse>("/subscriptions/get", data);
    }

    public async getSubscriptionsList(data: BaseRequest & { accountId: string }): Promise<Response<SubscriptionsListGetResponse>> {
        return this.call<SubscriptionsListGetResponse>("/subscriptions/find", data);
    }

    /**
     * Charge Cryptogram payout
     *
     * @param {CryptogramPayoutRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async chargeCryptogramPayout(data: CryptogramPayoutRequest) {
        return this.call<PayoutResponse>("/payments/cards/topup", data);
    }

    /**
     * Charge token payout
     *
     * @param {TokenPayoutRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async chargeTokenPayout(data: TokenPayoutRequest) {
        return this.call<PayoutResponse>("/payments/token/topup ", data);
    }
}
