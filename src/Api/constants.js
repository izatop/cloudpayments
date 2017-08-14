"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Коды ошибок
 * Ниже предоставлены коды ошибок, которые определяют причину отказа в проведении платежа.
 * Код возвращается в Fail уведомлении и при оплате через API.
 * Сообщение для плательщика виджет показывает самостоятельно, а в API за него отвечает
 * параметр CardHolderMessage.
 */
var ErrorCodes;
(function (ErrorCodes) {
    /**
     * Отказ эмитента проводить онлайн операцию
     */
    ErrorCodes[ErrorCodes["ReferToCardIssuer"] = 5001] = "ReferToCardIssuer";
    /**
     * Отказ эмитента без объяснения причин
     * Данный код возвращается по следующим причинам:
     * — неверно указан код CVV на картах MasterCard;
     * — внутренние ограничения банка, выпустившего карту;
     * — карта заблокирована или еще не активирована;
     * — на карте не включены интернет-платежи или не подключен 3DS.
     */
    ErrorCodes[ErrorCodes["DoNotHonor"] = 5005] = "DoNotHonor";
    /**
     * Отказ сети проводить операцию или неправильный CVV код
     */
    ErrorCodes[ErrorCodes["Error"] = 5006] = "Error";
    /**
     * Карта не предназначена для онлайн платежей
     */
    ErrorCodes[ErrorCodes["InvalidTransaction"] = 5012] = "InvalidTransaction";
    /**
     * Слишком маленькая или слишком большая сумма операции
     */
    ErrorCodes[ErrorCodes["AmountError"] = 5013] = "AmountError";
    /**
     * Ошибка на стороне эквайера — неверно сформирована транзакция
     */
    ErrorCodes[ErrorCodes["FormatError"] = 5030] = "FormatError";
    /**
     * Неизвестный эмитент карты
     */
    ErrorCodes[ErrorCodes["BankNotSupportedBySwitch"] = 5031] = "BankNotSupportedBySwitch";
    /**
     * Отказ эмитента — подозрение на мошенничество
     */
    ErrorCodes[ErrorCodes["SuspectedFraud"] = 5034] = "SuspectedFraud";
    /**
     * Карта потеряна
     */
    ErrorCodes[ErrorCodes["LostCard"] = 5041] = "LostCard";
    /**
     * Карта украдена
     */
    ErrorCodes[ErrorCodes["StolenCard"] = 5043] = "StolenCard";
    /**
     * Недостаточно средств
     */
    ErrorCodes[ErrorCodes["InsufficientFunds"] = 5051] = "InsufficientFunds";
    /**
     * Карта просрочена или неверно указан срок действия
     */
    ErrorCodes[ErrorCodes["ExpiredCard"] = 5054] = "ExpiredCard";
    /**
     * Ограничение на карте
     *
     * Данный код возвращается по следующим причинам:
     * — внутренние ограничения банка, выпустившего карту;
     * — карта заблокирована или еще не активирована;
     * — на карте не включены интернет-платежи или не подключен 3DS.
     */
    ErrorCodes[ErrorCodes["TransactionNotPermitted"] = 5057] = "TransactionNotPermitted";
    /**
     * Превышен лимит операций по карте
     */
    ErrorCodes[ErrorCodes["ExceedWithdrawalFrequency"] = 5065] = "ExceedWithdrawalFrequency";
    /**
     * Неверный CVV код
     */
    ErrorCodes[ErrorCodes["IncorrectCVV"] = 5082] = "IncorrectCVV";
    /**
     * Эмитент недоступен
     */
    ErrorCodes[ErrorCodes["Timeout"] = 5091] = "Timeout";
    /**
     * Эмитент недоступен
     */
    ErrorCodes[ErrorCodes["CannotReachNetwork"] = 5092] = "CannotReachNetwork";
    /**
     * Ошибка банка-эквайера или сети
     */
    ErrorCodes[ErrorCodes["SystemError"] = 5096] = "SystemError";
    /**
     * Операция не может быть обработана по прочим причинам
     */
    ErrorCodes[ErrorCodes["UnableToProcess"] = 5204] = "UnableToProcess";
    /**
     * 3-D Secure авторизация не пройдена
     */
    ErrorCodes[ErrorCodes["AuthenticationFailed"] = 5206] = "AuthenticationFailed";
    /**
     * 3-D Secure авторизация недоступна
     */
    ErrorCodes[ErrorCodes["AuthenticationUnavailable"] = 5207] = "AuthenticationUnavailable";
    /**
     * Лимиты эквайера на проведение операций
     */
    ErrorCodes[ErrorCodes["AntiFraud"] = 5300] = "AntiFraud";
})(ErrorCodes = exports.ErrorCodes || (exports.ErrorCodes = {}));
exports.ErrorCodesTranscript = {
    [ErrorCodes.ReferToCardIssuer]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.DoNotHonor]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.Error]: 'Проверьте правильность введенных данных карты или воспользуйтесь другой картой',
    [ErrorCodes.InvalidTransaction]: 'Воспользуйтесь другой картой или свяжитесь с банком, выпустившим карту',
    [ErrorCodes.AmountError]: 'Проверьте корректность суммы',
    [ErrorCodes.FormatError]: 'Повторите попытку позже',
    [ErrorCodes.BankNotSupportedBySwitch]: 'Воспользуйтесь другой картой',
    [ErrorCodes.SuspectedFraud]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.LostCard]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.StolenCard]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.InsufficientFunds]: 'Недостаточно средств на карте',
    [ErrorCodes.ExpiredCard]: 'Проверьте правильность введенных данных карты или воспользуйтесь другой картой',
    [ErrorCodes.TransactionNotPermitted]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.ExceedWithdrawalFrequency]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.IncorrectCVV]: 'Неверно указан код CVV',
    [ErrorCodes.Timeout]: 'Повторите попытку позже или воспользуйтесь другой картой',
    [ErrorCodes.CannotReachNetwork]: 'Повторите попытку позже или воспользуйтесь другой картой',
    [ErrorCodes.SystemError]: 'Повторите попытку позже',
    [ErrorCodes.UnableToProcess]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.AuthenticationFailed]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.AuthenticationUnavailable]: 'Свяжитесь с вашим банком или воспользуйтесь другой картой',
    [ErrorCodes.AntiFraud]: 'Воспользуйтесь другой картой'
};
/**
 * Статусы операций
 * В таблице ниже представлены статусы транзакций, условия применения и возможные действия.
 */
var TransactionStatus;
(function (TransactionStatus) {
    /**
     * Ожидает аутентификации
     *
     * После перехода плательщика на сайт эмитента в ожидании результатов 3-D Secure
     *
     */
    TransactionStatus.AwaitingAuthentication = 'AwaitingAuthentication';
    /**
     * Авторизована
     *
     * После получения авторизации
     *
     * Подтверждение, Отмена
     */
    TransactionStatus.Authorized = 'Authorized';
    /**
     * Завершена
     *
     * После подтверждения операции
     *
     * Возврат денег
     */
    TransactionStatus.Completed = 'Completed';
    /**
     * Отменена
     *
     * В случае отмены операции
     */
    TransactionStatus.Cancelled = 'Cancelled';
    /**
     * Отклонена
     *
     * В случае невозможности провести операцию (нет денег на счете карты и т.п.)
     */
    TransactionStatus.Declined = 'Declined';
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
/**
 * Статусы подписок (рекуррент)
 * В таблице ниже представлены статусы подписок, условия применения и возможные действия.
 */
var RecurrentStatus;
(function (RecurrentStatus) {
    /**
     * Подписка активна
     *
     * После создания и очередной успешной оплаты
     *
     * Отмена
     */
    RecurrentStatus.Active = 'Active';
    /**
     * Просрочена
     *
     * После одной или двух подряд неуспешных попыток оплаты
     *
     * Отмена
     */
    RecurrentStatus.PastDue = 'PastDue';
    /**
     * Отменена
     *
     * В случае отмены по запросу
     */
    RecurrentStatus.Cancelled = 'Cancelled';
    /**
     * Отклонена
     *
     * В случае трех неудачных попыток оплаты, идущих подряд
     */
    RecurrentStatus.Rejected = 'Rejected';
    /**
     * Завершена
     *
     * В случае завершения максимального количества периодов (если были указаны)
     */
    RecurrentStatus.Expired = 'Expired';
})(RecurrentStatus = exports.RecurrentStatus || (exports.RecurrentStatus = {}));
/**
 * Типы онлайн-чеков
 *
 * В таблице ниже представлены типы чеков и соответствующие им признаки расчета, которые используются для выдачи кассовых чеков.
 */
var ReceiptTypes;
(function (ReceiptTypes) {
    /**
     * Приход
     *
     * Выдается при получении средств от покупателя (клиента)
     */
    ReceiptTypes["Income"] = "Income";
    /**
     * Возврат прихода
     *
     * Выдается при возврате покупателю (клиенту) средств, полученных от него
     */
    ReceiptTypes["IncomeReturn"] = "IncomeReturn";
    /**
     * Расход
     *
     * Выдается при выдаче средств покупателю (клиенту)
     */
    ReceiptTypes["Expense"] = "Expense";
    /**
     * Вовзрат расхода
     *
     * Выдается при получениеи средств от покупателя (клиента), выданных ему
     */
    ReceiptTypes["ExpenseReturn"] = "ExpenseReturn";
})(ReceiptTypes = exports.ReceiptTypes || (exports.ReceiptTypes = {}));
/**
 * Системы налогообложения
 *
 * В таблице ниже представлены варианты систем налогообложения юридических лиц и индивидуальных предпринимателей,
 * которые используются при формировании кассовых чеков.
 */
var TaxationSystem;
(function (TaxationSystem) {
    TaxationSystem[TaxationSystem["GENERAL"] = 0] = "GENERAL";
    TaxationSystem[TaxationSystem["SIMPLIFIED_INCOME"] = 1] = "SIMPLIFIED_INCOME";
    TaxationSystem[TaxationSystem["SIMPLIFIED_INCOME_CONSUMPTION"] = 2] = "SIMPLIFIED_INCOME_CONSUMPTION";
    TaxationSystem[TaxationSystem["UNIFIED_IMPUTED_INCOME"] = 3] = "UNIFIED_IMPUTED_INCOME";
    TaxationSystem[TaxationSystem["UNIFIED_AGRICULTURAL"] = 4] = "UNIFIED_AGRICULTURAL";
    TaxationSystem[TaxationSystem["PATENT"] = 5] = "PATENT";
})(TaxationSystem = exports.TaxationSystem || (exports.TaxationSystem = {}));
function validateTaxationSystem(value) {
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
exports.validateTaxationSystem = validateTaxationSystem;
/**
 * Значения ставки НДС
 *
 * При указании ставки НДС будьте внимательны: "НДС 0%" и "НДС не облагается" — это не равнозначные варианты.
 */
var VAT;
(function (VAT) {
    VAT[VAT["VAT0"] = 0] = "VAT0";
    VAT[VAT["VAT10"] = 10] = "VAT10";
    VAT[VAT["VAT18"] = 18] = "VAT18";
    VAT[VAT["VAT110"] = 110] = "VAT110";
    VAT[VAT["VAT118"] = 118] = "VAT118";
})(VAT = exports.VAT || (exports.VAT = {}));
/**
 * Validate VAT value
 *
 * @param value
 * @returns {boolean}
 */
function validateVAT(value) {
    switch (value) {
        case VAT.VAT0:
        case VAT.VAT10:
        case VAT.VAT18:
        case VAT.VAT110:
        case VAT.VAT118:
        case null:
            return true;
        default:
            return false;
    }
}
exports.validateVAT = validateVAT;
/**
 * Response codes
 */
var ResponseCodes;
(function (ResponseCodes) {
    ResponseCodes[ResponseCodes["SUCCESS"] = 0] = "SUCCESS";
    ResponseCodes[ResponseCodes["UNKNOWN_INVOICE_ID"] = 10] = "UNKNOWN_INVOICE_ID";
    ResponseCodes[ResponseCodes["INVALID_AMOUNT"] = 11] = "INVALID_AMOUNT";
    ResponseCodes[ResponseCodes["REJECTED"] = 13] = "REJECTED";
    ResponseCodes[ResponseCodes["EXPIRED"] = 20] = "EXPIRED";
})(ResponseCodes = exports.ResponseCodes || (exports.ResponseCodes = {}));
exports.CurrencyList = Object.freeze({
    RUB: 'RUB',
    EUR: 'EUR',
    USD: 'USD',
    GBP: 'GBP',
    UAH: 'UAH',
    BYR: 'BYR',
    BYN: 'BYN',
    AZN: 'AZN',
    CHF: 'CHF',
    CZK: 'CZK',
    CAD: 'CAD',
    PLN: 'PLN',
    SEK: 'SEK',
    TRY: 'TRY',
    CNY: 'CNY',
    INR: 'INR'
});
//# sourceMappingURL=constants.js.map