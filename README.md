# CloudPayments

Библиотека для работы с API и обработки обратных вызовов платежной 
системы CloudPayments.

Все примеры приведены на JS ECMA2016. Версия поддерживаемой
платформы Node.js 6 и выше.

## Install

`npm add cloudpayments`

## Usage

Подключение библиотеки:

```typescript
import {ClientService, TaxationSystem, VAT} from './';

const client = new ClientService({
    privateKey: 'private key',
    publicId: 'public id',
    registrar: {
        taxationSystem: TaxationSystem.GENERAL,
        vat: VAT.VAT18,
        inn: 123456789
    }
});
```

### ClientService options

| Option | Type | Description |
|---|---|---|
| `privateKey` | `string` | Ваш приватный ключ |
| `publicId` | `string` | Ваш публичный ключ |
| `registrar.taxationSystem` | `TaxationSystem` | Система налогооблажения |
| `registrar.vat` | `VAT` | НДС |
| `registrar.inn` | `number` | ИНН |

