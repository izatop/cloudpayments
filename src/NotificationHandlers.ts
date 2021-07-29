import {ClientAbstract} from "./Client";
import {IncomingHttpHeaders, IncomingMessage} from "http";
import * as qs from "qs";
import {checkSignedString} from "./utils";
import * as ApiTypes from "./Api/notification";
import {parse} from "url";
import {ok} from "assert";
import {ResponseCodes} from "./Api";

export type NotificationHandlerValidator<TRequest> = (request: TRequest) => Promise<ResponseCodes>;

export interface NotificationCustomPayload {
    payload: Record<string, any> | string;
    headers?: { [key: string]: string };
    signature?: string;
}

export type NotificationPayload = NotificationCustomPayload | IncomingMessage;

export class NotificationHandlers extends ClientAbstract {
    public async handleCheckRequest(
        req: NotificationPayload,
        validator?: NotificationHandlerValidator<ApiTypes.CheckNotification>,
    ) {
        return this.handle(req, validator);
    }

    public async handlePayRequest(
        req: NotificationPayload,
        validator?: NotificationHandlerValidator<ApiTypes.PayNotification>,
    ) {
        return this.handle(req, validator);
    }

    public async handleConfirmRequest(
        req: NotificationPayload,
        validator?: NotificationHandlerValidator<ApiTypes.ConfirmNotification>,
    ) {
        return this.handle(req, validator);
    }

    public async handleFailRequest(
        req: NotificationPayload,
        validator?: NotificationHandlerValidator<ApiTypes.FailNotification>,
    ) {
        return this.handle(req, validator);
    }

    public async handleRefundRequest(
        req: NotificationPayload,
        validator?: NotificationHandlerValidator<ApiTypes.RefundNotification>,
    ) {
        return this.handle(req, validator);
    }

    public async handleRecurrentRequest(
        req: NotificationPayload,
        validator?: NotificationHandlerValidator<ApiTypes.SubscriptionModel>,
    ) {
        return this.handle(req, validator);
    }

    public async handleReceiptRequest(
        req: NotificationPayload,
        validator?: NotificationHandlerValidator<ApiTypes.ReceiptNotification<any>>,
    ) {
        return this.handle(req, validator);
    }

    protected async handle<TRequest>(
        req: NotificationPayload,
        validator?: NotificationHandlerValidator<TRequest>,
    ) {
        try {
            const request: TRequest =
                "payload" in req ? await this.checkPayload<TRequest>(req) : await this.parseRequest<TRequest>(req);

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
        ok(checkSignedString(this.options.privateKey, signature, payload), "Invalid signature");

        return req.payload as T;
    }

    private async parseRequest<T extends Record<string, any>>(req: IncomingMessage): Promise<T> {
        ok("content-hmac" in req.headers, "Request headers should contain Content-HMAC field.");

        const signature: string = req.headers["content-hmac"] as string;
        const method = (req.method || "").toUpperCase();

        ok(["GET", "POST"].includes(method), "Request method should be GET or POST");

        if (method === "POST") {
            let chunksLength = 0;
            const chunks: Buffer[] = [];
            const body = await new Promise<string>((resolve, reject) => {
                req.on("data", (chunk: Buffer) => {
                    chunks.push(chunk);
                    chunksLength += chunk.length;
                });
                req.on("end", () => resolve(Buffer.concat(chunks, chunksLength).toString("utf-8")));
                req.on("error", reject);
            });

            const headers: { [key: string]: string } | IncomingHttpHeaders = req.headers || {};

            ok(checkSignedString(this.options.privateKey, signature, body), "Invalid signature");
            if (typeof headers["content-type"] === "string" && headers["content-type"].indexOf("json") !== -1) {
                return JSON.parse(body);
            } else {
                return qs.parse(body) as T;
            }
        }

        ok(
            checkSignedString(this.options.privateKey, signature, parse(req.url || "").query || ""),
            "Invalid signature",
        );

        return parse(req.url || "", true).query as T;
    }
}
