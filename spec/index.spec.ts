import {asyncTest} from "./async-tape";
import {ClientService} from '../';
import {TaxationSystem} from "../src/Api/constants";
import {ClientApi} from "../src/ClientApi";
import {ReceiptApi} from "../src/ReceiptApi";
import {ClientHandlers} from "../src/ClientHandlers";

asyncTest('ServiceClient', async t => {
    const options = {
        endpoint: 'https://fakeapi.com',
        publicId: 'public id',
        privateKey: 'private key',
        org: {
            inn: 12345678,
            taxationSystem: TaxationSystem.GENERAL
        }
    };

    const service = new ClientService(options);

    t.equal(service.getEndpoint(), options.endpoint);
    t.equal(service.getPublicId(), options.publicId);

    t.ok(service.getClientApi() instanceof ClientApi);
    t.ok(ClientService.createClientApi(options) instanceof ClientApi);
    t.equal(service.getClientApi().getEndpoint(), options.endpoint);

    t.ok(service.getReceiptApi() instanceof ReceiptApi);
    t.ok(ClientService.createReceiptApi(options) instanceof ReceiptApi);
    t.equal(service.getReceiptApi().getEndpoint(), options.endpoint.concat('/kkt'));

    t.ok(service.getHandlers() instanceof ClientHandlers);
    t.ok(ClientService.createHandlers(options) instanceof ClientHandlers);
    t.equal(service.getHandlers().getEndpoint(), options.endpoint);

    t.equal(service.getClientApi(), service.getClientApi());
    t.equal(service.getReceiptApi(), service.getReceiptApi());
    t.equal(service.getHandlers(), service.getHandlers());
});
