import {RecurrentStatusType, TransactionStatusType, ValidCurrency} from "./constants";

export type ResponseType<T> = T;

export interface CustomDataRequest<TCustomData> {
    Data: TCustomData;
}

export interface AccountRequest {
    AccountId?: string,
    Email?: string
}

export interface TransactionRequest<TCustomData> extends AccountRequest, CustomDataRequest <TCustomData> {
    TransactionId: number,
    Amount: number,
    Currency: ValidCurrency,
    DateTime: string,
    CardFirstSix: string,
    CardLastFour: string,
    CardType: string,
    CardExpDate: string,
    TestMode: 1 | 0,
    InvoiceId?: string,
    SubscriptionId?: string,
    Name?: string,
    IpAddress?: string,
    IpCountry?: string,
    IpCity?: string,
    IpRegion?: string,
    IpDistrict?: string,
    Issuer?: string,
    IssuerBankCountry?: string,
    Description?: string
}

/**
 * Check
 *
 * Выполняется после того, как держатель заполнил платежную форму и нажал кнопку «Оплатить».
 * Служит для контроля прохождения платежа: система отправляет запрос на адрес сайта ТСП с
 * информацией об оплате, а сайт должен подтвердить или отклонить возможность принять платеж.
 */
export interface CheckRequest<TCustomData = {}> extends TransactionRequest<TCustomData> {
    Status: TransactionStatusType
}

export type CheckResponseType = ResponseType<0 | 10 | 11 | 13 | 20>;

/**
 * Pay
 * Выполняется после того, как оплата была успешно проведена — получена авторизация эмитента.
 * Служит для информирования о проведенном платеже: система отправляет запрос
 * на адрес ТСП с информацией об оплате, а сайт должен зафиксировать факт платежа.
 */
export interface PayRequest<TCustomData = {}> extends TransactionRequest<TCustomData> {
    Status: TransactionStatusType,
    Token?: string
}

export type PayResponseType = ResponseType<0>;

/**
 * Fail
 *
 * Выполняется в случае, если оплата была отклонена и используется для анализа
 * количества и причин отказов.
 *
 * Стоит учитывать, что факт отказа в оплате не является конечным — пользователь
 * может оплатить со второго раза.
 */
export interface FailRequest<TCustomData = {}> extends TransactionRequest<TCustomData> {
    Reason: string,
    ReasonCode: number
}

export type FailResponseType = ResponseType<0>;

/**
 * Refund
 *
 * Выполняется в случае, если платеж был возвращен (полностью или частично)
 * по вашей инициативе через API или личный кабинет.
 */
export interface RefundRequest<TCustomData = {}> extends AccountRequest, CustomDataRequest<TCustomData> {
    TransactionId: number,
    PaymentTransactionId: number,
    Amount: number,
    DateTime: string,
    InvoiceId?: string,
}

export type RefundResponseType = ResponseType<0>;

/**
 * Recurrent
 *
 * Выполняется в случае, если статус подписки на рекуррентный платеж был изменен.
 */
export interface RecurrentRequest extends AccountRequest {
    Id: number,
    Description: string,
    Amount: number,
    Currency: ValidCurrency,
    RequireConfirmation: boolean,
    StartDate: string,
    Interval: string,
    Period: number,
    Status: RecurrentStatusType,
    SuccessfulTransactionsNumber: number,
    FailedTransactionsNumber: number,
    MaxPeriods?: number,
    LastTransactionDate?: string,
    NextTransactionDate?: string
}

export type RecurrentResponseType = ResponseType<0>;

/**
 * Receipt
 *
 * Выполняется после выдачи кассового чека.
 * Служит для информирования о сформированных онлайн-чеках: система отправляет
 * запрос на адрес ТСП с информацией о чеке, а сайт должен зафиксировать информацию.
 */
export interface ReceiptRequest<TReceipt> {
    DocumentNumber: number,
    SessionNumber: number,
    FiscalSign: string,
    DeviceNumber: number,
    RegNumber: string,
    Inn: number,
    Type: string,
    Ofd: string,
    Url: string,
    QrCodeUrl: string,
    Amount: number,
    DateTime: string,
    Receipt: TReceipt,
    TransactionId?: number,
    InvoiceId?: string,
    AccountId?: string
}

export type ReceiptResponseType = ResponseType<0>;

export namespace ReceiptRecorder {
    export interface CustomerReceipt {
        taxationSystem: number,
        email?: string,
        phone?: string,
        Item: CustomerReceiptItem[]
    }

    export interface CustomerReceiptItem {
        label: string,
        price: number,
        quantity: number,
        amount: number,
        vat?: number,
        ean13?: string
    }

    export interface CreateRequest {
        Inn: string,
        Type: string,
        CustomerReceipt: CustomerReceipt,
        InvoiceId?: string,
        AccountId?: string
    }
}
