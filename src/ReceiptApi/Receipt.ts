import {TaxationSystemType} from "../Api/constants";

export interface Receipt {
    inn?: number,
    taxationSystem?: TaxationSystemType,
    records: ReceiptRecords[],
    invoiceId: string,
    accountId?: string,
    notify?: {
        email?: string,
        phone?: string
    }
}

export interface ReceiptRecords {
    label: string,
    price: number,
    quantity: number,
    amount: number,
    vat: number,
    ean13?: string
}
