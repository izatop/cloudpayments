# CloudPayments

Библиотека для работы с API и обработки уведомлений от платежного
сервиса [CloudPayments](https://cloudpayments.ru/Docs/Api).

Все примеры приведены по стандарту es7. Версия поддерживаемой
платформы Node.js 6 и выше.

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

Общий интерфейс для доступа к API библиотеки, принимает единственный аргумент
`ClientOptions`.

#### Methods

| Method | Options | Return | Description |
|---|---|---|---|
| `getClientApi` |  | `ClientApi` | Возвращает экземпляр класса `ClientApi` для работы со стандартным [API](https://cloudpayments.ru/Docs/Api) |
| `getReceiptApi` | | `ReceiptApi` | Возвращает экземпляр класса `ReceiptApi` для работы с [API кассы](https://cloudpayments.ru/docs/api/kassa) |
| `getNotificationHandlers` | | `NotificationHandlers` | Возвращает экземпляр класса `ClientHandlers` для обработки [уведомлений](https://cloudpayments.ru/Docs/Notifications) |
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
| `org.vat` | `VAT` | НДС |
| `org.inn` | `number` | ИНН |

## ClientApi

Доступные методы клиентского API:

| Метод | Описание | Документация |
|-------|----------|--------------|
| chargeCryptogramPayment | Оплата по криптограмме | https://cloudpayments.ru/Docs/Api#payWithCrypto |
| authorizeCryptogramPayment | Оплата по криптограмме (преавторизация) | https://cloudpayments.ru/Docs/Api#payWithCrypto |
| chargeTokenPayment | Оплата по токену | https://cloudpayments.ru/Docs/Api#payWithToken |
| authorizeTokenPayment | Оплата по токену (преавторизация) | https://cloudpayments.ru/Docs/Api#payWithToken |
| confirm3DSPayment | Обработка 3-D Secure | https://cloudpayments.ru/Docs/Api#3ds |
| confirmPayment | Подтверждение оплаты | https://cloudpayments.ru/Docs/Api#confirm |
| refundPayment | Возврат денег | https://cloudpayments.ru/Docs/Api#refund |
| voidPayment | Отмена оплаты | https://cloudpayments.ru/Docs/Api#void |
| getPayment | Просмотр информации об операции | https://cloudpayments.ru/Docs/Api#get |
| findPaymentByInvoiceId | Проверка статуса платежа | https://cloudpayments.ru/Docs/Api#find |
| getPaymentList | Выгрузка списка транзакций | https://cloudpayments.ru/Docs/Api#list |
 

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
            ReceiptTypes.Income,
            {
                invoiceId: request.InvoiceId,
                accountId: request.AccountId,
                // если система налогооблажения не указана, 
                // берется из настроек ClientOptions
                taxationSystem: TaxationSystem.GENERAL,
                inn: 123456789,
                notify: {email: 'mail@example.com', phone: '+7123456789'},
                records: [
                    {
                        label: 'Наименование товара или сервиса',
                        quantity: 2,
                        price: 1200,
                        amount: 2400,
                        vat: VAT.VAT18,
                        ean13: '1234456363'
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
| `createIncomeReceipt` | `ReceiptTypes`, `Receipt` | `Response<{}>` | Отправляет запрос на [создание чека](https://cloudpayments.ru/docs/api/kassa#receipt) |

#### Receipt

Смотрите [Receipt](src/ReceiptApi/Receipt.d.ts)

## Handlers

В библиотеку `cloudpayments` встроен механизм обработки 
уведомлений о платежах (смотрите [документацию](https://cloudpayments.ru/Docs/Notifications)). 

Список доступных методов для обработки уведомлений:

| Метод | Параметры запроса | Ссылка на описание |
|---|---|---|
| `handleCheckRequest` | [CheckNotification](src/Api/notifications.d.ts) | https://cloudpayments.ru/Docs/Notifications#check |
| `handlePayRequest` | [PayNotification](src/Api/notifications.d.ts) | https://cloudpayments.ru/Docs/Notifications#pay |
| `handleFailRequest` | [FailNotification](src/Api/notifications.d.ts) | https://cloudpayments.ru/Docs/Notifications#fail |
| `handleRecurrentRequest` | [RecurrentNotification](src/Api/notifications.d.ts) | https://cloudpayments.ru/Docs/Notifications#recurrent |
| `handleRefundRequest` | [RefundNotification](src/Api/notifications.d.ts) | https://cloudpayments.ru/Docs/Notifications#refund |
| `handleReceiptRequest` | [ReceiptNotification](src/Api/notifications.d.ts) | https://cloudpayments.ru/Docs/Notifications#receipt |
| `handleConfirmRequest` | [ConfirmNotification](src/Api/notifications.d.ts) | https://cloudpayments.ru/Docs/Notifications#confirm |

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
