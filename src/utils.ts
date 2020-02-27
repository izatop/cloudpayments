import * as crypto from "crypto";

export function signString(privateKey: string, data: string) {
    return crypto
        .createHmac("sha256", privateKey)
        .update(data)
        .digest("base64");
}

export function checkSignedString(privateKey: string, signature: string, data: string) {
    return signString(privateKey, data) === signature;
}
