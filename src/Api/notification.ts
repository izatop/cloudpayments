import {ReceiptTypes, RecurrentStatusType, TransactionStatus, ValidCurrency} from "./constants";

export interface CustomDataNotification {
    Data?: string;
}

export interface AccountRequest {
    AccountId?: string;
    Email?: string;
}

export interface TransactionNotification extends AccountRequest, CustomDataNotification {
    TransactionId: number;
    Amount: number;
    Currency: ValidCurrency;
    DateTime: string;
    CardFirstSix: string;
    CardLastFour: string;
    CardType: string;
    CardExpDate: string;
    TestMode: 1 | 0;
    InvoiceId?: string;
    SubscriptionId?: string;
    Name?: string;
    IpAddress?: string;
    IpCountry?: string;
    IpCity?: string;
    IpRegion?: string;
    IpDistrict?: string;
    Issuer?: string;
    IssuerBankCountry?: string;
    Description?: string;
}

/**
 * Check
 *
 * Выполняется после того, как держатель заполнил платежную форму и нажал кнопку «Оплатить».
 * Служит для контроля прохождения платежа: система отправляет запрос на адрес сайта ТСП с
 * информацией об оплате, а сайт должен подтвердить или отклонить возможность принять платеж.
 */
export interface CheckNotification extends TransactionNotification {
    Status: TransactionStatus;
}

/**
 * Pay
 * Выполняется после того, как оплата была успешно проведена — получена авторизация эмитента.
 * Служит для информирования о проведенном платеже: система отправляет запрос
 * на адрес ТСП с информацией об оплате, а сайт должен зафиксировать факт платежа.
 */
export interface PayNotification extends TransactionNotification {
    Status: TransactionStatus.Authorized | TransactionStatus.Completed;
    Token?: string;
}

/**
 * Pay
 * Выполняется после того, как оплата была успешно проведена — получена авторизация эмитента.
 * Служит для информирования о проведенном платеже: система отправляет запрос
 * на адрес ТСП с информацией об оплате, а сайт должен зафиксировать факт платежа.
 */
export interface ConfirmNotification extends TransactionNotification {
    Status: TransactionStatus.Completed;
    Token?: string;
}

/**
 * Fail
 *
 * Выполняется в случае, если оплата была отклонена и используется для анализа
 * количества и причин отказов.
 *
 * Стоит учитывать, что факт отказа в оплате не является конечным — пользователь
 * может оплатить со второго раза.
 */
export interface FailNotification extends TransactionNotification {
    Reason: string;
    ReasonCode: number;
}

/**
 * Refund
 *
 * Выполняется в случае, если платеж был возвращен (полностью или частично)
 * по вашей инициативе через API или личный кабинет.
 */
export interface RefundNotification extends AccountRequest, CustomDataNotification {
    TransactionId: number;
    PaymentTransactionId: number;
    Amount: number;
    DateTime: string;
    InvoiceId?: string;
}

/**
 * Recurrent
 *
 * Выполняется в случае, если статус подписки на рекуррентный платеж был изменен.
 */
export interface RecurrentNotification extends AccountRequest {
    Id: number;
    Description: string;
    Amount: number;
    Currency: ValidCurrency;
    RequireConfirmation: boolean;
    StartDate: string;
    Interval: string;
    Period: number;
    Status: RecurrentStatusType;
    SuccessfulTransactionsNumber: number;
    FailedTransactionsNumber: number;
    MaxPeriods?: number;
    LastTransactionDate?: string;
    NextTransactionDate?: string;
}

/**
 * Subscription
 *
 * Выполняется в случае, если статус подписки на рекуррентный платеж был изменен.
 */
export interface SubscriptionBase extends AccountRequest {
    Description: string;
    Amount: number;
    Currency: ValidCurrency;
    RequireConfirmation: boolean;
    StartDate: string;
    Interval: string;
    Period: number;
    MaxPeriods?: number;
}

export interface SubscriptionCreateRequest extends SubscriptionBase {
    Token: string;
}

export interface SubscriptionUpdateRequest extends Partial<SubscriptionBase> {
    Id: string;
}

export interface SubscriptionModel extends SubscriptionBase {
    Id: string;
    CurrencyCode: number;
    StartDateIso: string;
    IntervalCode: number;
    StatusCode: number;
    Status: RecurrentStatusType;
    SuccessfulTransactionsNumber: number;
    FailedTransactionsNumber: number;
    LastTransactionDate?: string;
    LastTransactionDateIso?: string;
    NextTransactionDate?: string;
    NextTransactionDateIso?: string;
}

/**
 * Receipt
 *
 * Выполняется после выдачи кассового чека.
 * Служит для информирования о сформированных онлайн-чеках: система отправляет
 * запрос на адрес ТСП с информацией о чеке, а сайт должен зафиксировать информацию.
 */
export interface ReceiptNotification<TReceipt> {
    DocumentNumber: number;
    SessionNumber: number;
    FiscalSign: string;
    DeviceNumber: number;
    RegNumber: string;
    Inn: number;
    Type: ReceiptTypes;
    Ofd: string;
    Url: string;
    QrCodeUrl: string;
    Amount: number;
    DateTime: string;
    Receipt: TReceipt;
    TransactionId?: number;
    InvoiceId?: string;
    AccountId?: string;
}
