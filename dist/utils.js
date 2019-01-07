"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function checkSignedString(privateKey, signature, data) {
    return signString(privateKey, data) === signature;
}
exports.checkSignedString = checkSignedString;
function signString(privateKey, data) {
    return crypto.createHmac('sha256', privateKey)
        .update(data)
        .digest('base64');
}
exports.signString = signString;
