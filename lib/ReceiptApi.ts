import {ClientRequestAbstract} from "./Client/ClientAbstract";
import {ReceiptRecorder} from "./Api/types";
import {ok} from "assert";
import {TaxationSystemType, validateVAT, VATType} from "./Api/constants";

export interface IncomeReceipt {
    inn?: number,
    taxationSystem?: TaxationSystemType,
    records: IncomeReceiptRecord[],
    invoiceId: string,
    accountId: string,
    notify?: {
        email?: string,
        phone?: string
    }
}

export interface IncomeReceiptRecord {
    label: string,
    price: number,
    quantity: number,
    amount: number,
    vat: number,
    ean13?: string
}

export class ReceiptApi extends ClientRequestAbstract {
    public getEndpoint() {
        return this.options.endpoint.concat('kkt');
    }

    /**
     * Create receipt
     *
     * @param {IncomeReceipt} receipt   Income receipt data
     * @param {string} id               Idempotent request id (calculated automatically if not provided)
     * @returns {Promise<Response>}
     */
    async createIncomeReceipt(receipt: IncomeReceipt, id?: string) {
        const _receipt = Object.assign({}, receipt, this.options.org || {});

        ok(_receipt.inn, 'You should fill "inn" field');
        ok(_receipt.taxationSystem, 'You should fill "inn" field');
        ok(_receipt.records && _receipt.records.length > 0, 'You should fill "records" field');

        const {records} = _receipt;

        ok(records.filter(x => false === validateVAT(x.vat)).length > 0, 'You should fill VAT with valid values');

        const data: ReceiptRecorder.CreateRequest = {
            Inn: _receipt.inn as number,
            InvoiceId: _receipt.invoiceId,
            AccountId: _receipt.accountId,
            Type: 'income',
            CustomerReceipt: {
                taxationSystem: _receipt.taxationSystem as TaxationSystemType,
                email: _receipt.notify ? _receipt.notify.email || '' : '',
                phone: _receipt.notify ? _receipt.notify.phone || '' : '',
                Item: records.map(item => ({
                    label: item.label,
                    price: item.price,
                    quantity: item.quantity,
                    amount: item.amount,
                    vat: item.vat,
                    ean13: item.ean13 || null
                }))
            }
        };

        return this.call('receipt', data);
    }
}
