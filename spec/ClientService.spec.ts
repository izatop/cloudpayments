import {asyncTest} from "./async-tape";
import {ClientService} from "../src/ClientService";
import {ClientApi} from "../src/ClientApi";
import {ReceiptApi} from "../src/ReceiptApi";
import {NotificationHandlers} from "../src/NotificationHandlers";
import {options} from "./helpers";

asyncTest('ServiceClient', async t => {
    const service = new ClientService(options);

    t.equal(service.getEndpoint(), options.endpoint);
    t.equal(service.getPublicId(), options.publicId);

    t.ok(service.getClientApi() instanceof ClientApi);
    t.ok(ClientService.createClientApi(options) instanceof ClientApi);
    t.equal(service.getClientApi().getEndpoint(), options.endpoint);

    t.ok(service.getReceiptApi() instanceof ReceiptApi);
    t.ok(ClientService.createReceiptApi(options) instanceof ReceiptApi);
    t.equal(service.getReceiptApi().getEndpoint(), options.endpoint.concat('/kkt'));

    t.ok(service.getNotificationHandlers() instanceof NotificationHandlers);
    t.ok(ClientService.createNotificationHandlers(options) instanceof NotificationHandlers);
    t.equal(service.getNotificationHandlers().getEndpoint(), options.endpoint);

    t.equal(service.getClientApi(), service.getClientApi());
    t.equal(service.getReceiptApi(), service.getReceiptApi());
    t.equal(service.getNotificationHandlers(), service.getNotificationHandlers());
});
