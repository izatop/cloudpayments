import { TaxationSystemType, VATType } from "./constants";
/**
 * Параметры формирования кассовго чека
 *
 * @see https://cloudpayments.ru/docs/api/kassa#receipt
 */
export interface ReceiptRequest {
    Inn: number;
    Type: string;
    CustomerReceipt: CustomerReceipt;
    InvoiceId?: string;
    AccountId?: string;
}
export interface CustomerReceipt {
    taxationSystem: TaxationSystemType;
    email?: string;
    phone?: string;
    Item: CustomerReceiptItem[];
}
export interface CustomerReceiptItem {
    label: string;
    price: number;
    quantity: number;
    amount: number;
    vat?: VATType;
    ean13: string | null;
}
