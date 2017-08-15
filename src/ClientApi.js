"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClientAbstract_1 = require("./Client/ClientAbstract");
const constants_1 = require("./Api/constants");
const assert_1 = require("assert");
class ClientApi extends ClientAbstract_1.ClientRequestAbstract {
    static validatePaymentRequest(data) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok(typeof data == 'object' && data, 'Invalid payment argument');
            assert_1.ok(typeof data.Amount == 'number' && data.Amount > 0, 'Payment.Amount should be valid');
            assert_1.ok(constants_1.validateCurrency(data.Currency), 'Payment.Currency should be valid');
            assert_1.ok(data.IpAddress, 'Payment.IpAddress is required');
        });
    }
    /**
     * Charge cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    chargeCryptogramPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ClientApi.validatePaymentRequest(data);
            assert_1.ok(data.CardCryptogramPacket, 'Payment.CardCryptogramPacket is required');
            return this.call('/payments/cards/charge', data);
        });
    }
    /**
     * Authorize cryptogram payment
     *
     * @param {CryptogramPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    authorizeCryptogramPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ClientApi.validatePaymentRequest(data);
            assert_1.ok(data.CardCryptogramPacket, 'Payment.CardCryptogramPacket is required');
            return this.call('/payments/cards/auth', data);
        });
    }
    /**
     * Charge token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    chargeTokenPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ClientApi.validatePaymentRequest(data);
            assert_1.ok(data.Token, 'Payment.Token is required');
            assert_1.ok(data.AccountId, 'Payment.AccountId is required');
            return this.call('/payments/tokens/charge', data);
        });
    }
    /**
     * Authorize token payment
     *
     * @param {TokenPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    authorizeTokenPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ClientApi.validatePaymentRequest(data);
            assert_1.ok(data.Token, 'Payment.Token is required');
            assert_1.ok(data.AccountId, 'Payment.AccountId is required');
            return this.call('/payments/tokens/auth', data);
        });
    }
    /**
     * Confirm a 3DS payment
     *
     * @param {Confirm3DSRequest} data
     * @returns {Promise<Response<PaymentResponse>>}
     */
    confirm3DSPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok(data.TransactionId, 'TransactionId is required');
            assert_1.ok(data.PaRes, 'PaRes is required');
            return this.call('/payments/cards/post3ds', data);
        });
    }
    /**
     * Confirm an authorized payment
     *
     * @param {ConfirmPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    confirmPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok(data.TransactionId, 'TransactionId is required');
            assert_1.ok(data.Amount && typeof data.Amount === 'number', 'Amount should be valid');
            return this.call('/payments/confirm', data);
        });
    }
    /**
     * Refund a payment
     *
     * @param {RefundPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    refundPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok(data.TransactionId, 'TransactionId is required');
            assert_1.ok(data.Amount && typeof data.Amount === 'number', 'Amount should be valid');
            return this.call('/payments/refund', data);
        });
    }
    /**
     * Void a payment
     *
     * @param {VoidPaymentRequest} data
     * @returns {Promise<Response<BaseResponse>>}
     */
    voidPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok(data.TransactionId, 'TransactionId is required');
            assert_1.ok(data.Amount && typeof data.Amount === 'number', 'Amount should be valid');
            return this.call('/payments/void', data);
        });
    }
    /**
     * Get a payment history
     *
     * @param {{TransactionId: number}} data
     * @returns {Promise<Response<PaymentGetResponse>>}
     */
    getPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok(data.TransactionId, 'TransactionId is required');
            return this.call('/payments/get', data);
        });
    }
    /**
     * Find a payment by invoice id
     *
     * @param {{InvoiceId: string}} data
     * @returns {Promise<Response<PaymentSuccessResponse | PaymentFailedResponse>>}
     */
    findPaymentByInvoiceId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok(data.InvoiceId, 'InvoiceId is required');
            return this.call('/payments/find', data);
        });
    }
    /**
     * Get a filtered payment list
     *
     * @param {{Date: number, TimeZone: string}} data
     * @returns {Promise<Response<PaymentHistoryResponse>>}
     */
    getPaymentList(data) {
        return __awaiter(this, void 0, void 0, function* () {
            assert_1.ok(data.Date, 'Date is required');
            return this.call('/payments/get', data);
        });
    }
}
exports.ClientApi = ClientApi;
//# sourceMappingURL=ClientApi.js.map