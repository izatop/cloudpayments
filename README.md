# CloudPayments

Библиотека для работы с API и обработки уведомлений от платежного
сервиса [CloudPayments](https://cloudpayments.ru/Docs/Api).

Все примеры приведены на JS ECMA2016. Версия поддерживаемой
платформы Node.js 6 и выше.

## Install

Для установки пакета используйте стандартный механизм NPM:

`npm i -S cloudpayments`

## Usage

Подключение библиотеки

```typescript
import {ClientService} from './';

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
| `getHandlers` | | `ClientHandlers` | Возвращает экземпляр класса `ClientHandlers` для обработки [уведомлений](https://cloudpayments.ru/Docs/Notifications) |
| `createClientApi` | `ClientOptions` | `ClientApi` | Создает отдельный экземпляр класса `ClientApi` |
| `createReceiptApi` | `ClientOptions` | `ReceiptApi` | Создает отдельный экземпляр класса `ReceiptApi` |
| `createHandlers` | `ClientOptions` | `ClientHandlers` | Создает отдельный экземпляр класса `ClientHandlers` |

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

Coming soon

## ReceiptApi

Интерфейс `ReceiptApi` предназначен для работы с API касс.

Пример использования:

```typescript
import {createServer} from 'http';
import {ClientService, TaxationSystem, VAT, ResponseCodes} from './';

const client = new ClientService({
    privateKey: 'private key',
    publicId: 'public id',
    org: {
        taxationSystem: TaxationSystem.GENERAL,
        inn: 123456789
    }
});

const handlers = client.getHandlers();
const receiptApi = client.getReceiptApi();
const server = createServer(async (req, res) => {
    if (req.url == '/cloudpayments/fail') {
        const response = await handlers.handlePayRequest(req, async (request) => {
            // Проверям запрос, например на совпадение цены товара
            if (request.Amount !== invoiceAmount) {
                return ResponseCodes.INVALID_AMOUNT;
            }
            
            // И другие проверки не забываем
            
            // В случае успешных проверок проводим платеж
            await invoices.update({_id: request.InvoiceId}, {
                $set: {status: PaymentStatus.PAID}
            });
            
            // Отправляем печать чека
            const response = await receiptApi.createIncomeReceipt({
                invoiceId: request.InvoiceId,
                accountId: request.AccountId,
                // если система налогооблажения не указана, 
                // берется из настроек ClientOptions
                taxationSystem: TaxationSystem.GENERAL,
                inn: 123456789,
                notify: {email: clientEmail, phone: clientPhone},
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
            });
            
            // Проверяем, что запрос встал в очередь,
            // иначе обрабатываем исключение
            
            // Если все прошло успешно, возвращаем 0
            return ResponseCodes.SUCCESS;
        });
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    }
});
```

#### Methods

| Method | Options | Return | Description |
|---|---|---|---|
| `createIncomeReceipt` | `IncomeReceipt` | `Response<{}>` | Отправляет запрос на [создание чека](https://cloudpayments.ru/docs/api/kassa#receipt) |

#### IncomeReceipt

Смотрите [IncomeReceipt](./src/ReceiptApi/IncomeReceipt.ts)

## Handlers

В библиотеку `cloudpayments` встроен механизм обработки 
уведомлений по обработке платежей от сервиса. 
Документация https://cloudpayments.ru/Docs/Notifications 

Список доступных методов для обработки уведомлений:

| Метод | Уведомление | Ссылка на описание |
|---|---|---|
| `handleCheckRequest` | `check` | https://cloudpayments.ru/Docs/Notifications#check |
| `handlePayRequest` | `pay` | https://cloudpayments.ru/Docs/Notifications#pay |
| `handleFailRequest` | `fail` | https://cloudpayments.ru/Docs/Notifications#fail |
| `handleRecurrentRequest` | `recurrent` | https://cloudpayments.ru/Docs/Notifications#recurrent |
| `handleRefundRequest` | `refund` | https://cloudpayments.ru/Docs/Notifications#refund |
| `handleReceiptRequest` | `receipt` | https://cloudpayments.ru/Docs/Notifications#receipt |

```typescript
import {createServer} from 'http';
import {ClientService, TaxationSystem, ResponseCodes} from './';

const client = new ClientService({
    privateKey: 'private key',
    publicId: 'public id',
    org: {
        taxationSystem: TaxationSystem.GENERAL,
        inn: 123456789
    }
});

const handlers = client.getHandlers();
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
