import {asyncTest} from "./async-tape";
import {ClientService} from "../src";
import {options} from "./helpers";

asyncTest("ServiceClient.ClientApi", async t => {
    const service = new ClientService(options);
    const clientApi = service.getClientApi();
});
