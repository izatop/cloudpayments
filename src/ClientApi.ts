import {ClientRequestAbstract} from "./Client/ClientAbstract";
import {
    BaseRequest,
    Confirm3DSRequest,
    ConfirmPaymentRequest,
    CryptogramPaymentRequest,
    PaymentRequest,
    TokenPaymentRequest,
    VoidPaymentRequest,
    LinkPaymentRequest
} from "./Api/request";
import {validateCurrency} from "./Api/constants";
import {ok} from "assert";
import {
    BaseResponse,
    PaymentFailedResponse,
    PaymentGetResponse,
    PaymentHistoryResponse,
    PaymentResponse,
    PaymentSuccessResponse,
    Response
} from "./Api/response";
import {RefundPaymentRequest} from "./index";

export class ClientApi extends ClientRequestAbstract {
    protected static async validatePaymentRequest(data: PaymentRequest) {
        ok(typeof data == 'object' && data, 'Invalid payment argument');
        ok(typeof data.Amount == 'number' && data.Amount > 0, 'Payment.Amount should be valid');
        ok(validateCurrency(data.Currency), 'Payment.Currency should be valid');
        ok(data.IpAddress, 'Payment.IpAddress is required');
    }

    /**
     * Charge cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async chargeCryptogramPayment(data: CryptogramPaymentRequest) {
        await ClientApi.validatePaymentRequest(data);
        ok(data.CardCryptogramPacket, 'Payment.CardCryptogramPacket is required');
        return this.call<PaymentResponse>('/payments/cards/charge', data);
    }

    /**
     * Authorize cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async authorizeCryptogramPayment(data: CryptogramPaymentRequest) {
        await ClientApi.validatePaymentRequest(data);
        ok(data.CardCryptogramPacket, 'Payment.CardCryptogramPacket is required');
        return this.call<PaymentResponse>('/payments/cards/auth', data);
    }

    /**
     * Charge token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async chargeTokenPayment(data: TokenPaymentRequest) {
        await ClientApi.validatePaymentRequest(data);
        ok(data.Token, 'Payment.Token is required');
        ok(data.AccountId, 'Payment.AccountId is required');

        return this.call<PaymentResponse>('/payments/tokens/charge', data);
    }

    /**
     * Authorize token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async authorizeTokenPayment(data: TokenPaymentRequest) {
        await ClientApi.validatePaymentRequest(data);
        ok(data.Token, 'Payment.Token is required');
        ok(data.AccountId, 'Payment.AccountId is required');

        return this.call<PaymentResponse>('/payments/tokens/auth', data);
    }

    /**
     * Confirm a 3DS payment
     *
     * @param {Confirm3DSRequest} data
     * @returns {Promise<Response<PaymentResponse>>}
     */
    public async confirm3DSPayment(data: Confirm3DSRequest) {
        ok(data.TransactionId, 'TransactionId is required');
        ok(data.PaRes, 'PaRes is required');

        return this.call<PaymentResponse>('/payments/cards/post3ds', data);
    }

    /**
     * Confirm an authorized payment
     *
     * @param {ConfirmPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async confirmPayment(data: ConfirmPaymentRequest) {
        ok(data.TransactionId, 'TransactionId is required');
        ok(data.Amount && typeof data.Amount === 'number', 'Amount should be valid');

        return this.call<BaseResponse>('/payments/confirm', data);
    }

    /**
     * Refund a payment
     *
     * @param {RefundPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async refundPayment(data: RefundPaymentRequest) {
        ok(data.TransactionId, 'TransactionId is required');
        ok(data.Amount && typeof data.Amount === 'number', 'Amount should be valid');

        return this.call<BaseResponse>('/payments/refund', data);
    }

    /**
     * Void a payment
     *
     * @param {VoidPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    public async voidPayment(data: VoidPaymentRequest) {
        ok(data.TransactionId, 'TransactionId is required');
        ok(data.Amount && typeof data.Amount === 'number', 'Amount should be valid');

        return this.call<BaseResponse>('/payments/void', data);
    }

    /**
     * Get a payment history
     *
     * @param {{TransactionId: number}} data
     * @returns {Promise<Response<PaymentGetResponse>>}
     */
    public async getPayment(data: BaseRequest & { TransactionId: number }) {
        ok(data.TransactionId, 'TransactionId is required');

        return this.call<PaymentGetResponse>('/payments/get', data);
    }

    /**
     * Find a payment by invoice id
     *
     * @param {{InvoiceId: string}} data
     * @returns {Promise<Response<PaymentSuccessResponse | PaymentFailedResponse>>}
     */
    public async findPaymentByInvoiceId(data: BaseRequest & { InvoiceId: string }) {
        ok(data.InvoiceId, 'InvoiceId is required');

        return this.call<PaymentSuccessResponse | PaymentFailedResponse>('/payments/find', data)
    }

    /**
     * Get a filtered payment list
     *
     * @param {{Date: number, TimeZone: string}} data
     * @returns {Promise<Response<PaymentHistoryResponse>>}
     */
    public async getPaymentList(data: BaseRequest & { Date: number, TimeZone?: string }) {
        ok(data.Date, 'Date is required');

        return this.call<PaymentHistoryResponse>('/payments/get', data);
    }

    /**
     * Get a filtered payment list
     *
     * @param {LinkPaymentRequest} data
     * @returns {Promise<Response<LinkPaymentModel>>}
     */
    public async createOrder(data: LinkPaymentRequest) {
            ok(data.Description, 'Description is required');
            ok(typeof data.Amount == 'number' && data.Amount > 0, 'Payment.Amount should be valid');
            ok(validateCurrency(data.Currency), 'Payment.Currency should be valid');
            return this.call('/orders/create', data);
      }
}
