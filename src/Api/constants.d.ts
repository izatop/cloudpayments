/**
 * Коды ошибок
 * Ниже предоставлены коды ошибок, которые определяют причину отказа в проведении платежа.
 * Код возвращается в Fail уведомлении и при оплате через API.
 * Сообщение для плательщика виджет показывает самостоятельно, а в API за него отвечает
 * параметр CardHolderMessage.
 */
export declare enum ErrorCodes {
    /**
     * Отказ эмитента проводить онлайн операцию
     */
    ReferToCardIssuer = 5001,
    /**
     * Отказ эмитента без объяснения причин
     * Данный код возвращается по следующим причинам:
     * — неверно указан код CVV на картах MasterCard;
     * — внутренние ограничения банка, выпустившего карту;
     * — карта заблокирована или еще не активирована;
     * — на карте не включены интернет-платежи или не подключен 3DS.
     */
    DoNotHonor = 5005,
    /**
     * Отказ сети проводить операцию или неправильный CVV код
     */
    Error = 5006,
    /**
     * Карта не предназначена для онлайн платежей
     */
    InvalidTransaction = 5012,
    /**
     * Слишком маленькая или слишком большая сумма операции
     */
    AmountError = 5013,
    /**
     * Ошибка на стороне эквайера — неверно сформирована транзакция
     */
    FormatError = 5030,
    /**
     * Неизвестный эмитент карты
     */
    BankNotSupportedBySwitch = 5031,
    /**
     * Отказ эмитента — подозрение на мошенничество
     */
    SuspectedFraud = 5034,
    /**
     * Карта потеряна
     */
    LostCard = 5041,
    /**
     * Карта украдена
     */
    StolenCard = 5043,
    /**
     * Недостаточно средств
     */
    InsufficientFunds = 5051,
    /**
     * Карта просрочена или неверно указан срок действия
     */
    ExpiredCard = 5054,
    /**
     * Ограничение на карте
     *
     * Данный код возвращается по следующим причинам:
     * — внутренние ограничения банка, выпустившего карту;
     * — карта заблокирована или еще не активирована;
     * — на карте не включены интернет-платежи или не подключен 3DS.
     */
    TransactionNotPermitted = 5057,
    /**
     * Превышен лимит операций по карте
     */
    ExceedWithdrawalFrequency = 5065,
    /**
     * Неверный CVV код
     */
    IncorrectCVV = 5082,
    /**
     * Эмитент недоступен
     */
    Timeout = 5091,
    /**
     * Эмитент недоступен
     */
    CannotReachNetwork = 5092,
    /**
     * Ошибка банка-эквайера или сети
     */
    SystemError = 5096,
    /**
     * Операция не может быть обработана по прочим причинам
     */
    UnableToProcess = 5204,
    /**
     * 3-D Secure авторизация не пройдена
     */
    AuthenticationFailed = 5206,
    /**
     * 3-D Secure авторизация недоступна
     */
    AuthenticationUnavailable = 5207,
    /**
     * Лимиты эквайера на проведение операций
     */
    AntiFraud = 5300,
}
export declare const ErrorCodesTranscript: {
    [ErrorCodes.ReferToCardIssuer]: string;
    [ErrorCodes.DoNotHonor]: string;
    [ErrorCodes.Error]: string;
    [ErrorCodes.InvalidTransaction]: string;
    [ErrorCodes.AmountError]: string;
    [ErrorCodes.FormatError]: string;
    [ErrorCodes.BankNotSupportedBySwitch]: string;
    [ErrorCodes.SuspectedFraud]: string;
    [ErrorCodes.LostCard]: string;
    [ErrorCodes.StolenCard]: string;
    [ErrorCodes.InsufficientFunds]: string;
    [ErrorCodes.ExpiredCard]: string;
    [ErrorCodes.TransactionNotPermitted]: string;
    [ErrorCodes.ExceedWithdrawalFrequency]: string;
    [ErrorCodes.IncorrectCVV]: string;
    [ErrorCodes.Timeout]: string;
    [ErrorCodes.CannotReachNetwork]: string;
    [ErrorCodes.SystemError]: string;
    [ErrorCodes.UnableToProcess]: string;
    [ErrorCodes.AuthenticationFailed]: string;
    [ErrorCodes.AuthenticationUnavailable]: string;
    [ErrorCodes.AntiFraud]: string;
};
export declare type TransactionStatusType = 'AwaitingAuthentication' | 'Authorized' | 'Completed' | 'Cancelled' | 'Declined';
/**
 * Статусы операций
 * В таблице ниже представлены статусы транзакций, условия применения и возможные действия.
 */
export declare enum TransactionStatus {
    /**
     * Ожидает аутентификации
     *
     * После перехода плательщика на сайт эмитента в ожидании результатов 3-D Secure
     *
     */
    AwaitingAuthentication = "AwaitingAuthentication",
    /**
     * Авторизована
     *
     * После получения авторизации
     *
     * Подтверждение, Отмена
     */
    Authorized = "Authorized",
    /**
     * Завершена
     *
     * После подтверждения операции
     *
     * Возврат денег
     */
    Completed = "Completed",
    /**
     * Отменена
     *
     * В случае отмены операции
     */
    Cancelled = "Cancelled",
    /**
     * Отклонена
     *
     * В случае невозможности провести операцию (нет денег на счете карты и т.п.)
     */
    Declined = "Declined",
}
export declare type RecurrentStatusType = 'Active' | 'PastDue' | 'Cancelled' | 'Rejected' | 'Expired';
/**
 * Статусы подписок (рекуррент)
 * В таблице ниже представлены статусы подписок, условия применения и возможные действия.
 */
export declare namespace RecurrentStatus {
    /**
     * Подписка активна
     *
     * После создания и очередной успешной оплаты
     *
     * Отмена
     */
    const Active = "Active";
    /**
     * Просрочена
     *
     * После одной или двух подряд неуспешных попыток оплаты
     *
     * Отмена
     */
    const PastDue = "PastDue";
    /**
     * Отменена
     *
     * В случае отмены по запросу
     */
    const Cancelled = "Cancelled";
    /**
     * Отклонена
     *
     * В случае трех неудачных попыток оплаты, идущих подряд
     */
    const Rejected = "Rejected";
    /**
     * Завершена
     *
     * В случае завершения максимального количества периодов (если были указаны)
     */
    const Expired = "Expired";
}
/**
 * Типы онлайн-чеков
 *
 * В таблице ниже представлены типы чеков и соответствующие им признаки расчета, которые используются для выдачи кассовых чеков.
 */
export declare enum ReceiptTypes {
    /**
     * Приход
     *
     * Выдается при получении средств от покупателя (клиента)
     */
    Income = "Income",
    /**
     * Возврат прихода
     *
     * Выдается при возврате покупателю (клиенту) средств, полученных от него
     */
    IncomeReturn = "IncomeReturn",
    /**
     * Расход
     *
     * Выдается при выдаче средств покупателю (клиенту)
     */
    Expense = "Expense",
    /**
     * Вовзрат расхода
     *
     * Выдается при получениеи средств от покупателя (клиента), выданных ему
     */
    ExpenseReturn = "ExpenseReturn",
}
/**
 * Системы налогообложения
 *
 * В таблице ниже представлены варианты систем налогообложения юридических лиц и индивидуальных предпринимателей,
 * которые используются при формировании кассовых чеков.
 */
export declare enum TaxationSystem {
    GENERAL = 0,
    SIMPLIFIED_INCOME = 1,
    SIMPLIFIED_INCOME_CONSUMPTION = 2,
    UNIFIED_IMPUTED_INCOME = 3,
    UNIFIED_AGRICULTURAL = 4,
    PATENT = 5,
}
export declare type TaxationSystemType = TaxationSystem;
export declare function validateTaxationSystem(value: any): boolean;
/**
 * Значения ставки НДС
 *
 * При указании ставки НДС будьте внимательны: "НДС 0%" и "НДС не облагается" — это не равнозначные варианты.
 */
export declare enum VAT {
    VAT0 = 0,
    VAT10 = 10,
    VAT18 = 18,
    VAT110 = 110,
    VAT118 = 118,
}
export declare type VATType = null | VAT;
/**
 * Validate VAT value
 *
 * @param value
 * @returns {boolean}
 */
export declare function validateVAT(value: any): boolean;
/**
 * Response codes
 */
export declare enum ResponseCodes {
    SUCCESS = 0,
    UNKNOWN_INVOICE_ID = 10,
    INVALID_AMOUNT = 11,
    REJECTED = 13,
    EXPIRED = 20,
}
/**
 * Currencies
 */
export declare type ValidCurrency = 'RUB' | 'EUR' | 'USD' | 'GBP' | 'UAH' | 'BYR' | 'BYN' | 'AZN' | 'CHF' | 'CZK' | 'CAD' | 'PLN' | 'SEK' | 'TRY' | 'CNY' | 'INR';
export declare function validateCurrency(value: any): boolean;
export declare const CurrencyList: Readonly<{
    RUB: string;
    EUR: string;
    USD: string;
    GBP: string;
    UAH: string;
    BYR: string;
    BYN: string;
    AZN: string;
    CHF: string;
    CZK: string;
    CAD: string;
    PLN: string;
    SEK: string;
    TRY: string;
    CNY: string;
    INR: string;
}>;
