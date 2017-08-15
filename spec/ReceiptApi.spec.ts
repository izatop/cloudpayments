import {asyncTest} from "./async-tape";
import {ClientService} from '../';
import {options, clientRequestTest} from "./helpers";
import {ReceiptTypes, VAT} from "../src/Api/constants";

asyncTest('ServiceClient.ReceiptApi', async t => {
    const service = new ClientService(options);
    const receiptApi = service.getReceiptApi();
    const receipt = {
        accountId: '1',
        invoiceId: '1',
        records: [
            {
                price: 100,
                quantity: 1,
                amount: 100,
                label: 'item',
                vat: VAT.VAT18
            }
        ],
        notify: {
            email: 'mail@example.com',
            phone: '1234567890'
        }
    };

    await t.shouldFail(receiptApi.createReceipt(
        ReceiptTypes.Income,
        {
            accountId: '1',
            invoiceId: '1',
            records: [{
                price: 100,
                quantity: 1,
                amount: 100,
                label: 'item'
            } as any],
            notify: {
                email: 'mail@example.com',
                phone: '1234567890'
            }
        }
    ));

    const clientWithoutOrgOptions = ClientService.createReceiptApi({
        publicId: options.publicId,
        privateKey: options.privateKey
    });

    await t.shouldFail(clientWithoutOrgOptions.createReceipt(
        ReceiptTypes.Income,
        receipt
    ));

    await clientRequestTest(
        t,
        receiptApi,
        () => receiptApi.createReceipt(ReceiptTypes.Income, receipt),
        (t, url, init) => {
            const {headers, body}: any = init;
            t.equal(url, options.endpoint.concat('/kkt/receipt'));
            t.ok(headers['X-Request-ID']);
            t.equal(headers['X-Request-ID'], 'f9ae2de33458bd77a3d9921578a878818ac732cb');
            t.equal(headers['Content-Type'], 'application/json');
            t.equal(headers['Authorization'], 'Basic cHVibGljIGlkOnByaXZhdGUga2V5');
            t.equal(body, '{"Inn":12345678,"InvoiceId":"1","AccountId":"1","Type":"Income","CustomerReceipt":{"taxationSystem":0,"email":"mail@example.com","phone":"1234567890","Items":[{"label":"item","price":100,"quantity":1,"amount":100,"vat":18,"ean13":null}]}}');
        }
    );
});
