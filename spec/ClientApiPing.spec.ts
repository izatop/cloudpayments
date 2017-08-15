import {asyncTest} from "./async-tape";
import {ClientService} from '../';

asyncTest('Ping API', async t => {
    const service = new ClientService({
        publicId: 'empty',
        privateKey: 'empty'
    });

    const requestId = Math.random().toString();
    const clientApi = service.getClientApi();
    const response = await clientApi.ping(requestId);

    t.ok(/^([a-f0-9]-?)+$/.test(response.getMessage()));
    t.equal(response.isSuccess(), true);
    t.equal(response.getMessage(), (await clientApi.ping(requestId)).getMessage());
});
