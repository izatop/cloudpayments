import { TaxationSystemType } from "../Api/constants";
export interface IncomeReceipt {
    inn?: number;
    taxationSystem?: TaxationSystemType;
    records: IncomeReceiptRecord[];
    invoiceId: string;
    accountId: string;
    notify?: {
        email?: string;
        phone?: string;
    };
}
export interface IncomeReceiptRecord {
    label: string;
    price: number;
    quantity: number;
    amount: number;
    vat: number;
    ean13?: string;
}
