"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(response) {
        this.response = response;
    }
    getResponse() {
        return this.response;
    }
    isSuccess() {
        return this.response.Success;
    }
    getMessage() {
        return this.response.Message;
    }
}
exports.Response = Response;
//# sourceMappingURL=Response.js.map