import {asyncTest} from "./async-tape";
import {ClientService} from "../src/ClientService";
import {options, ServiceRequestMock} from "./helpers";
import {ResponseCodes} from "../src/Api/constants";

asyncTest('ServiceClient.ClientHandlers', async t => {
    const service = new ClientService(options);
    const clientHandlers = service.getNotificationHandlers();
    const validReq = new ServiceRequestMock(options.privateKey, 'key=value');
    const invalidReq = new ServiceRequestMock('fake key', 'key=value');
    const validator = async (req: any) => {
        return ResponseCodes.SUCCESS;
    };

    try {
        const validRes = await clientHandlers.handleCheckRequest(validReq, validator);

        t.same(validRes, {
            response: {code: ResponseCodes.SUCCESS},
            request: {key: 'value'}
        });

        t.shouldFail(() => clientHandlers.handleCheckRequest(invalidReq, validator));

    } catch (error) {
        t.fail(error);
    }
});
