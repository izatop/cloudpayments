"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_tape_1 = require("./async-tape");
const _1 = require("../");
const helpers_1 = require("./helpers");
const constants_1 = require("../src/Api/constants");
async_tape_1.asyncTest('ServiceClient.ClientHandlers', (t) => __awaiter(this, void 0, void 0, function* () {
    const service = new _1.ClientService(helpers_1.options);
    const clientHandlers = service.getNotificationHandlers();
    const validReq = new helpers_1.ServiceRequestMock(helpers_1.options.privateKey, 'key=value');
    const invalidReq = new helpers_1.ServiceRequestMock('fake key', 'key=value');
    const validator = (req) => __awaiter(this, void 0, void 0, function* () {
        return constants_1.ResponseCodes.SUCCESS;
    });
    try {
        const validRes = yield clientHandlers.handleCheckRequest(validReq, validator);
        t.same(validRes, {
            response: { code: constants_1.ResponseCodes.SUCCESS },
            request: { key: 'value' }
        });
        t.shouldFail(() => clientHandlers.handleCheckRequest(invalidReq, validator));
    }
    catch (error) {
        t.fail(error);
    }
}));
//# sourceMappingURL=ClientHandlers.spec.js.map