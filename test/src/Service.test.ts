import {ClientApi, ClientService, NotificationHandlers, ReceiptApi} from "../../src";
import {options} from "./lib/options";

test("Service", async () => {
    const service = new ClientService(options);

    expect(service.getEndpoint()).toBe(options.endpoint);
    expect(service.getPublicId()).toBe(options.publicId);

    expect(service.getClientApi()).toBeInstanceOf(ClientApi);
    expect(ClientService.createClientApi(options)).toBeInstanceOf(ClientApi);
    expect(service.getClientApi().getEndpoint()).toBe(options.endpoint);

    expect(service.getReceiptApi()).toBeInstanceOf(ReceiptApi);
    expect(ClientService.createReceiptApi(options)).toBeInstanceOf(ReceiptApi);
    expect(service.getReceiptApi().getEndpoint()).toBe(options.endpoint.concat("/kkt"));

    expect(service.getNotificationHandlers()).toBeInstanceOf(NotificationHandlers);
    expect(ClientService.createNotificationHandlers(options)).toBeInstanceOf(NotificationHandlers);
    expect(service.getNotificationHandlers().getEndpoint()).toBe(options.endpoint);

    expect(service.getClientApi() === service.getClientApi()).toBe(true);
    expect(service.getReceiptApi() === service.getReceiptApi()).toBe(true);
    expect(service.getNotificationHandlers() === service.getNotificationHandlers()).toBe(true);
});
