import {ok} from "assert";
import * as objectHash from 'object-hash';
import {ClientRequestAbstract} from "./Client/ClientAbstract";
import {ReceiptTypes, TaxationSystemType, validateTaxationSystem, validateVAT} from "./Api/constants";
import {Receipt} from "./ReceiptApi/Receipt";
import {ReceiptRequest} from "./Api/request";
import {Response, BaseResponse} from "./Response";

export class ReceiptApi extends ClientRequestAbstract {
    public getEndpoint() {
        return this.options.endpoint.replace(/\/$/, '').concat('/kkt');
    }

    /**
     * Create receipt
     *
     * @param {ReceiptTypes} type   Receipt type
     * @param {Receipt} receipt   Income receipt data
     * @param {string} id               Idempotent request id (calculated automatically if not provided)
     * @returns {Promise<Response>}
     */
    async createReceipt(type: ReceiptTypes, receipt: Receipt, id?: string): Promise<Response<BaseResponse>> {
        const {inn, notify, records, taxationSystem, accountId, invoiceId} = Object.assign(
            {},
            receipt,
            this.options.org || {}
        );

        ok(inn, 'You should fill "inn" field');
        ok(validateTaxationSystem(taxationSystem), 'You should fill "taxationSystem" field');
        ok(records && records.length > 0, 'You should fill "records" field');

        ok(
            records.filter(x => false === validateVAT(x.vat)).length === 0,
            'You should fill VAT with valid values'
        );

        const data: ReceiptRequest = {
            Inn: inn as number,
            InvoiceId: invoiceId,
            AccountId: accountId,
            Type: type,
            CustomerReceipt: {
                taxationSystem: taxationSystem as TaxationSystemType,
                email: notify ? notify.email || '' : '',
                phone: notify ? notify.phone || '' : '',
                Items: records.map(item => ({
                    label: item.label,
                    price: item.price,
                    quantity: item.quantity,
                    amount: item.amount,
                    vat: item.vat,
                    ean13: item.ean13 || null
                }))
            }
        };

        const requestId = id || objectHash(receipt);

        return await this.call<BaseResponse>('receipt', data, requestId);
    }
}
