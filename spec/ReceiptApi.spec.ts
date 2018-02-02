import {asyncTest} from "./async-tape";
import {ClientService} from "../src/ClientService";
import {clientRequestTest, options} from "./helpers";
import {ReceiptTypes, VAT} from "../src/Api/constants";

asyncTest('ServiceClient.ReceiptApi', async t => {
    const service = new ClientService(options);
    const receiptApi = service.getReceiptApi();
    const request = {
        AccountId: '1',
        InvoiceId: '1',
        Type: ReceiptTypes.Income,
    };

    const receipt = {
        Items: [
            {
                price: 100,
                quantity: 1,
                amount: 100,
                label: 'item',
                vat: VAT.VAT18
            },
            {
                price: 10,
                quantity: 2,
                amount: 20,
                label: 'item 2',
                vat: VAT.VAT18,
                ean13: '3153125631'
            }
        ],
        email: 'mail@example.com',
        phone: '1234567890'
    };

    await t.shouldFail(receiptApi.createReceipt(
        request,
        {
            ...receipt, Items: [{
                price: 100,
                quantity: 1,
                amount: 100,
                label: 'item'
            }
            ]
        }
    ));

    const clientWithoutOrgOptions = ClientService.createReceiptApi({
        publicId: options.publicId,
        privateKey: options.privateKey
    });

    await t.shouldFail(clientWithoutOrgOptions.createReceipt(
        request,
        receipt
    ));

    await clientRequestTest(
        t,
        receiptApi,
        () => receiptApi.createReceipt(request, receipt),
        (t, url, init) => {
            const {headers, body}: any = init;
            t.equal(url, options.endpoint.concat('/kkt/receipt'));
            t.ok(headers['X-Request-ID']);
            t.equal(headers['X-Request-ID'], 'b9d541aa3b3ea30daafbf190557463ad92b1bc4e');
            t.equal(headers['Content-Type'], 'application/json');
            t.equal(headers['Authorization'], 'Basic cHVibGljIGlkOnByaXZhdGUga2V5');
            t.equal(body, '{"AccountId":"1","InvoiceId":"1","Type":"Income","Inn":12345678,"CustomerReceipt":{"Items":[{"price":100,"quantity":1,"amount":100,"label":"item","vat":18},{"price":10,"quantity":2,"amount":20,"label":"item 2","vat":18,"ean13":"3153125631"}],"email":"mail@example.com","phone":"1234567890","taxationSystem":0}}');
        }
    );
});
