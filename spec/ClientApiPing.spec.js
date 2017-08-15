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
async_tape_1.asyncTest('Ping API', (t) => __awaiter(this, void 0, void 0, function* () {
    const service = new _1.ClientService({
        publicId: 'empty',
        privateKey: 'empty'
    });
    const requestId = Math.random().toString();
    const clientApi = service.getClientApi();
    const response = yield clientApi.ping(requestId);
    t.ok(/^([a-f0-9]-?)+$/.test(response.getMessage()));
    t.equal(response.isSuccess(), true);
    t.equal(response.getMessage(), (yield clientApi.ping(requestId)).getMessage());
}));
//# sourceMappingURL=ClientApiPing.spec.js.map