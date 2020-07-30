/**
 * Коды ошибок
 * Ниже предоставлены коды ошибок, которые определяют причину отказа в проведении платежа.
 * Код возвращается в Fail уведомлении и при оплате через API.
 * Сообщение для плательщика виджет показывает самостоятельно, а в API за него отвечает
 * параметр CardHolderMessage.
 */
export enum ErrorCodes {
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
    AntiFraud = 5300
}

export const ErrorCodesTranscript = {
    [ErrorCodes.ReferToCardIssuer]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.DoNotHonor]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.Error]: "Проверьте правильность введенных данных карты или воспользуйтесь другой картой",
    [ErrorCodes.InvalidTransaction]: "Воспользуйтесь другой картой или свяжитесь с банком, выпустившим карту",
    [ErrorCodes.AmountError]: "Проверьте корректность суммы",
    [ErrorCodes.FormatError]: "Повторите попытку позже",
    [ErrorCodes.BankNotSupportedBySwitch]: "Воспользуйтесь другой картой",
    [ErrorCodes.SuspectedFraud]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.LostCard]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.StolenCard]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.InsufficientFunds]: "Недостаточно средств на карте",
    [ErrorCodes.ExpiredCard]: "Проверьте правильность введенных данных карты или воспользуйтесь другой картой",
    [ErrorCodes.TransactionNotPermitted]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.ExceedWithdrawalFrequency]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.IncorrectCVV]: "Неверно указан код CVV",
    [ErrorCodes.Timeout]: "Повторите попытку позже или воспользуйтесь другой картой",
    [ErrorCodes.CannotReachNetwork]: "Повторите попытку позже или воспользуйтесь другой картой",
    [ErrorCodes.SystemError]: "Повторите попытку позже",
    [ErrorCodes.UnableToProcess]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.AuthenticationFailed]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.AuthenticationUnavailable]: "Свяжитесь с вашим банком или воспользуйтесь другой картой",
    [ErrorCodes.AntiFraud]: "Воспользуйтесь другой картой",
};

export type TransactionStatusType = "AwaitingAuthentication" | "Authorized" | "Completed" | "Cancelled" | "Declined";

/**
 * Статусы операций
 * В таблице ниже представлены статусы транзакций, условия применения и возможные действия.
 */
export enum TransactionStatus {
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
    Declined = "Declined"
}

export type RecurrentStatusType = "Active" | "PastDue" | "Cancelled" | "Rejected" | "Expired";

/**
 * Статусы подписок (рекуррент)
 * В таблице ниже представлены статусы подписок, условия применения и возможные действия.
 */
export enum RecurrentStatus {
    /**
     * Подписка активна
     *
     * После создания и очередной успешной оплаты
     *
     * Отмена
     */
    Active = "Active",

    /**
     * Просрочена
     *
     * После одной или двух подряд неуспешных попыток оплаты
     *
     * Отмена
     */
    PastDue = "PastDue",

    /**
     * Отменена
     *
     * В случае отмены по запросу
     */
    Cancelled = "Cancelled",

    /**
     * Отклонена
     *
     * В случае трех неудачных попыток оплаты, идущих подряд
     */
    Rejected = "Rejected",

    /**
     * Завершена
     *
     * В случае завершения максимального количества периодов (если были указаны)
     */
    Expired = "Expired",
}

/**
 * Типы онлайн-чеков
 *
 * В таблице ниже представлены типы чеков и соответствующие им признаки расчета, которые используются для выдачи
 * кассовых чеков.
 */
export enum ReceiptTypes {
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
    ExpenseReturn = "ExpenseReturn"
}

/**
 * Системы налогообложения
 *
 * В таблице ниже представлены варианты систем налогообложения юридических лиц и индивидуальных предпринимателей,
 * которые используются при формировании кассовых чеков.
 */
export enum TaxationSystem {
    GENERAL = 0, // Общая система налогообложения
    SIMPLIFIED_INCOME = 1, // Упрощенная система налогообложения (Доход)
    SIMPLIFIED_INCOME_CONSUMPTION = 2, // Упрощенная система налогообложения (Доход минус Расход)
    UNIFIED_IMPUTED_INCOME = 3, // Единый налог на вмененный доход
    UNIFIED_AGRICULTURAL = 4, // Единый сельскохозяйственный налог
    PATENT = 5 // Патентная система налогообложения
}

export type TaxationSystemType = TaxationSystem;

export function validateTaxationSystem(value: any) {
    switch (value) {
        case TaxationSystem.GENERAL:
        case TaxationSystem.SIMPLIFIED_INCOME:
        case TaxationSystem.SIMPLIFIED_INCOME_CONSUMPTION:
        case TaxationSystem.UNIFIED_AGRICULTURAL:
        case TaxationSystem.UNIFIED_IMPUTED_INCOME:
        case TaxationSystem.PATENT:
            return true;
        default:
            return false;
    }
}

/**
 * Значения ставки НДС
 *
 * При указании ставки НДС будьте внимательны: "НДС 0%" и "НДС не облагается" — это не равнозначные варианты.
 */
export enum VAT {
    VAT0 = 0,
    VAT10 = 10,
    VAT18 = 18,
    VAT110 = 110,
    VAT118 = 118,
    VAT20 = 20,
    VAT120 = 120
}

export type VATType = null | VAT;

/**
 * Validate VAT value
 *
 * @param value
 * @returns {boolean}
 */
export function validateVAT(value: any) {
    switch (value) {
        case VAT.VAT0:
        case VAT.VAT10:
        case VAT.VAT18:
        case VAT.VAT110:
        case VAT.VAT118:
        case VAT.VAT20:
        case VAT.VAT120:
        case null:
            return true;
        default:
            return false;
    }
}

/**
 * Response codes
 */
export enum ResponseCodes {
    SUCCESS = 0,
    UNKNOWN_INVOICE_ID = 10,
    INVALID_ACCOUNT_ID = 11,
    INVALID_AMOUNT = 12,
    REJECTED = 13,
    EXPIRED = 20
}

/**
 * Currencies
 */
export type ValidCurrency =
    | "RUB"
    | "EUR"
    | "USD"
    | "GBP"
    | "UAH"
    | "BYR"
    | "BYN"
    | "AZN"
    | "CHF"
    | "CZK"
    | "CAD"
    | "PLN"
    | "SEK"
    | "TRY"
    | "CNY"
    | "INR";

export const CurrencyList = Object.freeze({
    RUB: "RUB",
    EUR: "EUR",
    USD: "USD",
    GBP: "GBP",
    UAH: "UAH",
    BYR: "BYR",
    BYN: "BYN",
    AZN: "AZN",
    CHF: "CHF",
    CZK: "CZK",
    CAD: "CAD",
    PLN: "PLN",
    SEK: "SEK",
    TRY: "TRY",
    CNY: "CNY",
    INR: "INR",
});

export const validateCurrency = (value: string): boolean => Reflect.has(CurrencyList, value);
