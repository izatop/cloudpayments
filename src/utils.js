"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function checkSignedString(signature, data) {
    return crypto.createHmac('sha256', this.options.privateKey)
        .update(data)
        .digest('base64') === signature;
}
exports.checkSignedString = checkSignedString;
//# sourceMappingURL=utils.js.map