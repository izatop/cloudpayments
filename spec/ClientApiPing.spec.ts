import {asyncTest} from "./async-tape";
import {ClientService} from '../';

asyncTest('Ping API', async t => {
    const service = new ClientService({
        publicId: 'empty',
        privateKey: 'empty'
    });

    const clientApi = service.getClientApi();
    const response = await clientApi.ping();

    t.ok(/^([a-f0-9]-?)+$/.test(response.getMessage() || ''));
    t.equal(response.isSuccess(), true);
});
