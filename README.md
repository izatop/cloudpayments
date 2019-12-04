# CloudPayments

Библиотека для работы с API и обработки уведомлений от платежного сервиса
[CloudPayments](https://developers.cloudpayments.ru/#api).

Проект написан на языке TypeScript и включает описание всех доступных интерфейсов.
Все примеры приведены по стандарту es7. Версия поддерживаемой платформы Node.js 6 и выше.

## Install

Для установки пакета используйте стандартный механизм NPM:

`npm i -S cloudpayments`

## Usage

Подключение библиотеки

```typescript
import {ClientService} from 'cloudpayments';

const client = new ClientService({/* options */});

// бизнес-логика приложения ...
```

### ClientService

Общий [интерфейс](src/ClientService.ts) для доступа к API библиотеки,
принимает единственный [аргумент](src/Client/ClientOptions.ts) `ClientOptions`.

#### Methods

| Method | Options | Return | Description |
|---|---|---|---|
| `getClientApi` |  | `ClientApi` | Возвращает экземпляр класса `ClientApi` для работы со стандартным [API](https://developers.cloudpayments.ru/#api) |
| `getReceiptApi` | | `ReceiptApi` | Возвращает экземпляр класса `ReceiptApi` для работы с [API кассы](https://developers.cloudkassir.ru/#api-kassy) |
| `getNotificationHandlers` | | `NotificationHandlers` | Возвращает экземпляр класса `ClientHandlers` для обработки [уведомлений](https://developers.cloudpayments.ru/#uvedomleniya) |
| `createClientApi` | `ClientOptions` | `ClientApi` | Создает отдельный экземпляр класса `ClientApi` |
| `createReceiptApi` | `ClientOptions` | `ReceiptApi` | Создает отдельный экземпляр класса `ReceiptApi` |
| `createNotificationHandlers` | `ClientOptions` | `NotificationHandlers` | Создает отдельный экземпляр класса `NotificationHandlers` |

### ClientOptions

Параметры подключения к платежному сервису. 

| Option | Type | Description |
|---|---|---|
| `endpoint` | `string` | Адрес сервера API, по-умолчанию `https://api.cloudpayments.ru` |
| `privateKey` | `string` | Ваш приватный ключ |
| `publicId` | `string` | Ваш публичный ключ |
| `org.taxationSystem` | `TaxationSystem` | Система налогооблажения |
| `org.inn` | `number` | ИНН |

## ClientApi

Доступные методы клиентского API:

| Метод | Описание | Документация |
|-------|----------|--------------|
| chargeCryptogramPayment | Оплата по криптограмме | https://developers.cloudpayments.ru/#oplata-po-kriptogramme |
| authorizeCryptogramPayment | Оплата по криптограмме (преавторизация) | https://developers.cloudpayments.ru/#oplata-po-kriptogramme |
| chargeTokenPayment | Оплата по токену | https://developers.cloudpayments.ru/#oplata-po-tokenu-rekarring |
| authorizeTokenPayment | Оплата по токену (преавторизация) | https://developers.cloudpayments.ru/#oplata-po-tokenu-rekarring |
| confirm3DSPayment | Обработка 3-D Secure | https://developers.cloudpayments.ru/#obrabotka-3-d-secure |
| confirmPayment | Подтверждение оплаты | https://developers.cloudpayments.ru/#podtverzhdenie-oplaty |
| refundPayment | Возврат денег | https://developers.cloudpayments.ru/#vozvrat-deneg |
| voidPayment | Отмена оплаты | https://developers.cloudpayments.ru/#otmena-oplaty |
| getPayment | Просмотр информации об операции | https://developers.cloudpayments.ru/#prosmotr-tranzaktsii |
| findPaymentByInvoiceId | Проверка статуса платежа | https://developers.cloudpayments.ru/#proverka-statusa-platezha |
| getPaymentsList | Выгрузка списка транзакций | https://developers.cloudpayments.ru/#vygruzka-spiska-tranzaktsiy |
| createOrder | Создание счета для отправки по почте | https://developers.cloudpayments.ru/#sozdanie-scheta-dlya-otpravki-po-pochte |
| createSubscription | Создание подписки на рекуррентные платежи | https://developers.cloudpayments.ru/#sozdanie-podpiski-na-rekurrentnye-platezhi |
| updateSubscription | Изменение подписки на рекуррентные платежи | https://developers.cloudpayments.ru/#izmenenie-podpiski-na-rekurrentnye-platezhi |
| cancelSubscription | Отмена подписки на рекуррентные платежи | https://developers.cloudpayments.ru/#izmenenie-podpiski-na-rekurrentnye-platezhi |
| getSubscription | Запрос информации о подписке | https://developers.cloudpayments.ru/#zapros-informatsii-o-podpiske |
| getSubscriptionsList | Поиск подписок | https://developers.cloudpayments.ru/#poisk-podpisok |
| chargeCryptogramPayout | Выплата по криптограмме | https://developers.cloudpayments.ru/#vyplata-po-kriptogramme |
| chargeTokenPayout | Выплата по токену | https://developers.cloudpayments.ru/#vyplata-po-tokenu |
 

## ReceiptApi

Интерфейс `ReceiptApi` предназначен для работы с API касс.

Пример использования:

```typescript
import {createServer} from 'http';
import {ClientService, TaxationSystem, VAT, ResponseCodes, ReceiptTypes} from 'cloudpayments';

const client = new ClientService({
    privateKey: 'private key',
    publicId: 'public id',
    org: {
        taxationSystem: TaxationSystem.GENERAL,
        inn: 123456789
    }
});

const handlers = client.getNotificationHandlers();
const receiptApi = client.getReceiptApi();
const server = createServer(async (req, res) => {
    const response = await handlers.handlePayRequest(req, async (request) => {
        // Проверям запрос, например на совпадение цены заказа
        if (request.Amount > 0) {
            return ResponseCodes.INVALID_AMOUNT;
        }
        
        // Отправляем запрос на создание чека
        const response = await receiptApi.createReceipt(
            { 
                Type: ReceiptTypes.Income,
                invoiceId: request.InvoiceId,
                accountId: request.AccountId,
            },
            {
                // если система налогооблажения не указана, 
                // берется из настроек ClientOptions
                taxationSystem: TaxationSystem.GENERAL,
                inn: 123456789,
                email: 'mail@example.com',
                phone: '+7123456789',
                Items: [
                    {
                        label: 'Наименование товара или сервиса',
                        quantity: 2,
                        price: 1200,
                        amount: 2400,
                        vat: VAT.VAT18,
                        ean13: '1234456363',
                    }
                ]
            }
        );
        
        // Проверяем, что запрос встал в очередь,
        // иначе обрабатываем исключение
        
        // Если все прошло успешно, возвращаем 0
        return ResponseCodes.SUCCESS;
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
});
```

#### Methods

| Method | Arguments | Return | Description |
|---|---|---|---|
| `createReceipt` | `ReceiptTypes`, `Receipt` | `Response<{}>` | Отправляет запрос на [создание чека](https://developers.cloudkassir.ru/#formirovanie-kassovogo-cheka) |

#### Receipt

Смотрите [Receipt](src/ReceiptApi.ts)

## Handlers

В библиотеку `cloudpayments` встроен механизм обработки 
уведомлений о платежах (смотрите [документацию](https://developers.cloudpayments.ru/#uvedomleniya)). 

Список доступных методов для обработки уведомлений:

| Метод | Параметры запроса | Ссылка на описание |
|---|---|---|
| `handleCheckRequest` | [CheckNotification](src/Api/notification.ts) | https://developers.cloudpayments.ru/#check |
| `handlePayRequest` | [PayNotification](src/Api/notification.ts) | https://developers.cloudpayments.ru/#pay |
| `handleFailRequest` | [FailNotification](src/Api/notification.ts) | https://developers.cloudpayments.ru/#fail |
| `handleRecurrentRequest` | [RecurrentNotification](src/Api/notification.ts) | https://developers.cloudpayments.ru/#recurrent |
| `handleRefundRequest` | [RefundNotification](src/Api/notification.ts) | https://developers.cloudpayments.ru/#refund |
| `handleReceiptRequest` | [ReceiptNotification](src/Api/notification.ts) | https://developers.cloudpayments.ru/#receipt |
| `handleConfirmRequest` | [ConfirmNotification](src/Api/notification.ts) | https://developers.cloudpayments.ru/#confirm |

Пример использования:

```typescript
import {createServer} from 'http';
import {ClientService, TaxationSystem, ResponseCodes} from 'cloudpayments';

const client = new ClientService({
    privateKey: 'private key',
    publicId: 'public id',
    org: {
        taxationSystem: TaxationSystem.GENERAL,
        inn: 123456789
    }
});

const handlers = client.getNotificationHandlers();
const server = createServer(async (req, res) => {
    if (req.url == '/cloudpayments/fail') {
        const response = await handlers.handleFailRequest(req, async (request) => {
            // Делаем что-то с инфомацией о неудачном платеже
            return ResponseCodes.SUCCESS;
        });
        
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }
});

```

## Response

Базовый интерфейс для всех типов ответов.

| Field | Type | Description |
|---|---|---|
| `Success` | `boolean` | Успех операции |
| `Message` | `string` | Сообщение |

# License
MIT
