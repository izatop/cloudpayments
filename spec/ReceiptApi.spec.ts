import {asyncTest} from "./async-tape";
import {ClientService} from '../';
import {options} from "./helpers";

asyncTest('ServiceClient.ReceiptApi', async t => {
    const service = new ClientService(options);
    const receiptApi = service.getReceiptApi();
});
