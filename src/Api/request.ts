import {ReceiptTypes, TaxationSystemType, ValidCurrency, VATType} from "./constants";

export interface BaseRequest {
    CultureName?: "ru-RU" | "en-US" | "lv" | "az" | "kk" | "uk" | "pl"
}

/**
 * Параметры формирования кассовго чека
 *
 * @see https://cloudpayments.ru/docs/api/kassa#receipt
 */
export interface ReceiptRequest extends BaseRequest {
    Inn?: number,
    Type: ReceiptTypes,
    InvoiceId?: string,
    AccountId?: string
}

export interface CustomerReceipt {
    taxationSystem?: TaxationSystemType,
    email?: string,
    phone?: string,
    Items: CustomerReceiptItem[]
}

export interface CustomerReceiptItem {
    label: string,
    price: number,
    quantity: number,
    amount: number,
    vat?: VATType,
    ean13?: string
}

export interface ReceiptApiRequest extends ReceiptRequest {
    CustomerReceipt: CustomerReceipt
}

/**
 * Payments
 */
export interface PaymentRequest extends BaseRequest {
    Amount: number,
    Currency: ValidCurrency,
    IpAddress?: string,
    Name?: string,
    InvoiceId?: string,
    Description?: string,
    Email?: string,
    JsonData?: string
}

export interface CryptogramPaymentRequest extends PaymentRequest {
    IpAddress: string,
    CardCryptogramPacket: string
    AccountId?: string,
}

export interface TokenPaymentRequest extends PaymentRequest {
    AccountId: string,
    Token: string
}

export interface Confirm3DSRequest extends BaseRequest {
    TransactionId: string,
    PaRes: string
}

export interface ConfirmPaymentRequest extends BaseRequest {
    TransactionId: number,
    Amount: number,
    JsonData?: object
}

export interface RefundPaymentRequest extends BaseRequest {
    TransactionId: number,
    Amount: number,
    JsonData?: object
}

export interface VoidPaymentRequest extends BaseRequest {
    TransactionId: number,
}

export interface LinkPaymentRequest extends BaseRequest {
    Amount: number;
    Currency: ValidCurrency;
    JsonData: object;
    Description: string;
    email?: string;
    phone?: string;
}
