import { ClientRequestAbstract } from "./Client/ClientAbstract";
import { PaymentRequest, CryptogramPaymentRequest, TokenPaymentRequest, Confirm3DSRequest, ConfirmPaymentRequest, VoidPaymentRequest, BaseRequest } from "./Api/request";
import { BaseResponse, PaymentHistoryResponse, PaymentFailedResponse, PaymentResponse, PaymentSuccessResponse, Response, PaymentGetResponse } from "./Api/response";
import { RefundPaymentRequest } from "../index";
export declare class ClientApi extends ClientRequestAbstract {
    protected static validatePaymentRequest(data: PaymentRequest): Promise<void>;
    /**
     * Charge cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    chargeCryptogramPayment(data: CryptogramPaymentRequest): Promise<Response<PaymentResponse>>;
    /**
     * Authorize cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    authorizeCryptogramPayment(data: CryptogramPaymentRequest): Promise<Response<PaymentResponse>>;
    /**
     * Charge token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    chargeTokenPayment(data: TokenPaymentRequest): Promise<Response<PaymentResponse>>;
    /**
     * Authorize token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    authorizeTokenPayment(data: TokenPaymentRequest): Promise<Response<PaymentResponse>>;
    /**
     * Confirm a 3DS payment
     *
     * @param {Confirm3DSRequest} data
     * @returns {Promise<Response<PaymentResponse>>}
     */
    confirm3DSPayment(data: Confirm3DSRequest): Promise<Response<PaymentResponse>>;
    /**
     * Confirm an authorized payment
     *
     * @param {ConfirmPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    confirmPayment(data: ConfirmPaymentRequest): Promise<Response<BaseResponse>>;
    /**
     * Refund a payment
     *
     * @param {RefundPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    refundPayment(data: RefundPaymentRequest): Promise<Response<BaseResponse>>;
    /**
     * Void a payment
     *
     * @param {VoidPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    voidPayment(data: VoidPaymentRequest): Promise<Response<BaseResponse>>;
    /**
     * Get a payment history
     *
     * @param {{TransactionId: number}} data
     * @returns {Promise<Response<PaymentGetResponse>>}
     */
    getPayment(data: BaseRequest & {
        TransactionId: number;
    }): Promise<Response<PaymentGetResponse>>;
    /**
     * Find a payment by invoice id
     *
     * @param {{InvoiceId: string}} data
     * @returns {Promise<Response<PaymentSuccessResponse | PaymentFailedResponse>>}
     */
    findPaymentByInvoiceId(data: BaseRequest & {
        InvoiceId: string;
    }): Promise<Response<PaymentSuccessResponse | PaymentFailedResponse>>;
    /**
     * Get a filtered payment list
     *
     * @param {{Date: number, TimeZone: string}} data
     * @returns {Promise<Response<PaymentHistoryResponse>>}
     */
    getPaymentList(data: BaseRequest & {
        Date: number;
        TimeZone?: string;
    }): Promise<Response<PaymentHistoryResponse>>;
}
