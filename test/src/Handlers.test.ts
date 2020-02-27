import {ClientService, ResponseCodes} from "../../src";
import {options} from "./lib/options";
import {signString} from "../../src/utils";
import {ServiceRequestMock} from "./lib/ServiceRequestMock";

test("Notification Handlers", async () => {
    const service = new ClientService(options);
    const clientHandlers = service.getNotificationHandlers();
    const validator1 = async () => ResponseCodes.SUCCESS;
    const validator2 = async () => ResponseCodes.EXPIRED;

    expect(
        await clientHandlers.handleCheckRequest(
            ServiceRequestMock.create(options.privateKey, "key=value1"),
            validator1,
        ),
    ).toEqual({
        response: {code: ResponseCodes.SUCCESS},
        request: {key: "value1"},
    });

    expect(
        await clientHandlers.handleCheckRequest(
            {
                signature: signString(options.privateKey, JSON.stringify({key: "value2"})),
                payload: {key: "value2"},
            },
            validator2,
        ),
    ).toEqual({
        response: {code: ResponseCodes.EXPIRED},
        request: {key: "value2"},
    });

    expect(
        clientHandlers.handleCheckRequest(ServiceRequestMock.create("fake key", "key=value"), validator1),
    ).rejects.toThrow("Invalid signature");
});
