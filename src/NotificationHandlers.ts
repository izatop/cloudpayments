import {ClientAbstract} from "./Client/ClientAbstract";
import {IncomingMessage} from "http";
import * as qs from "qs";
import {checkSignedString} from "./utils";
import * as ApiTypes from "./Api/notification";
import {parse} from "url";
import {ok} from "assert";
import {ResponseCodes} from "./Api/constants";

export interface NotificationHandlerValidator<TRequest> {
    (request: TRequest): Promise<ResponseCodes>;
}

export interface NotificationCustomPayload {
    payload: object | string;
    headers?: any;
    signature?: string;
}

export type NotificationPayload = NotificationCustomPayload | IncomingMessage;

export class NotificationHandlers extends ClientAbstract {
    async handleCheckRequest(req: NotificationPayload,
                             validator?: NotificationHandlerValidator<ApiTypes.CheckNotification>) {
        return this.handle(req, validator);
    }

    async handlePayRequest(req: NotificationPayload,
                           validator?: NotificationHandlerValidator<ApiTypes.PayNotification>) {
        return this.handle(req, validator);
    }

    async handleConfirmRequest(req: NotificationPayload,
                               validator?: NotificationHandlerValidator<ApiTypes.ConfirmNotification>) {
        return this.handle(req, validator);
    }

    async handleFailRequest(req: NotificationPayload,
                            validator?: NotificationHandlerValidator<ApiTypes.FailNotification>) {
        return this.handle(req, validator);
    }

    async handleRefundRequest(req: NotificationPayload,
                              validator?: NotificationHandlerValidator<ApiTypes.RefundNotification>) {
        return this.handle(req, validator);
    }

    async handleRecurrentRequest(req: NotificationPayload,
                                 validator?: NotificationHandlerValidator<ApiTypes.RecurrentNotification>) {
        return this.handle(req, validator);
    }

    async handleReceiptRequest(req: NotificationPayload,
                               validator?: NotificationHandlerValidator<ApiTypes.ReceiptNotification<any>>) {
        return this.handle(req, validator);
    }

    protected async handle<TRequest, TResponse>(req: NotificationPayload,
                                                validator?: NotificationHandlerValidator<TRequest>) {
        try {
            let request: TRequest;
            if ("payload" in req) {
                request = await this.checkPayload<TRequest>(req);
            } else {
                request = await this.parseRequest<TRequest>(req);
            }

            if (validator) {
                const code = await validator(request);
                return {request, response: {code}};
            }

            return {request, response: {}};
        } catch (error) {
            throw error;
        }
    }

    private async checkPayload<T extends {}>(req: NotificationCustomPayload) {
        let signature = "";
        if (req.headers && !req.signature) {
            ok("content-hmac" in req.headers, "Request headers should contain Content-HMAC field.");
            signature = req.headers["content-hmac"] as string;
        }

        if (req.signature) {
            signature = req.signature;
        }

        const payload = typeof req.payload === "string" ? req.payload : JSON.stringify(req.payload);
        ok(signature, "Custom payload should provide signature or header key.");
        ok(
            checkSignedString(this.options.privateKey, signature, payload),
            "Invalid signature"
        );

        return req.payload as T;
    }

    private async parseRequest<T extends {}>(req: IncomingMessage): Promise<T> {
        ok("content-hmac" in req.headers, "Request headers should contain Content-HMAC field.");

        const signature: string = req.headers["content-hmac"] as string;
        const method = req.method || "";
        const request = {} as T;

        ok(!!method, "Request method should not be empty");

        if (method.toUpperCase() === "POST") {
            const chunks: string[] = [];
            const body = await new Promise<string>((resolve, reject) => {
                req.on("data", (chunk: Buffer) => chunks.push(chunk.toString()));
                req.on("end", () => resolve(chunks.join()));
                req.on("error", reject);
            });

            const headers: any = req.headers || {};

            ok(checkSignedString(this.options.privateKey, signature, body), "Invalid signature");
            if ("content-type" in headers && headers["content-type"].indexOf("json") !== -1) {
                Object.assign(request, JSON.parse(body));
            } else {
                Object.assign(request, qs.parse(body));
            }
        } else if (method.toUpperCase() === "GET") {
            ok(checkSignedString(this.options.privateKey, signature, parse(req.url || "").query as string), "Invalid signature");
            Object.assign(request, parse(req.url || "", true).query);
        }

        return request;
    }
}
