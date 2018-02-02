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

export class NotificationHandlers extends ClientAbstract {
    async handleCheckRequest(req: IncomingMessage,
                             validator?: NotificationHandlerValidator<ApiTypes.CheckNotification>) {
        return this.handle(req, validator);
    }

    async handlePayRequest(req: IncomingMessage,
                           validator?: NotificationHandlerValidator<ApiTypes.PayNotification>) {
        return this.handle(req, validator);
    }

    async handleConfirmRequest(req: IncomingMessage,
                               validator?: NotificationHandlerValidator<ApiTypes.ConfirmNotification>) {
        return this.handle(req, validator);
    }

    async handleFailRequest(req: IncomingMessage,
                            validator?: NotificationHandlerValidator<ApiTypes.FailNotification>) {
        return this.handle(req, validator);
    }

    async handleRefundRequest(req: IncomingMessage,
                              validator?: NotificationHandlerValidator<ApiTypes.RefundNotification>) {
        return this.handle(req, validator);
    }

    async handleRecurrentRequest(req: IncomingMessage,
                                 validator?: NotificationHandlerValidator<ApiTypes.RecurrentNotification>) {
        return this.handle(req, validator);
    }

    async handleReceiptRequest(req: IncomingMessage,
                               validator?: NotificationHandlerValidator<ApiTypes.ReceiptNotification<any>>) {
        return this.handle(req, validator);
    }

    protected async handle<TRequest, TResponse>(req: IncomingMessage,
                                                validator?: NotificationHandlerValidator<TRequest>) {
        try {
            const request = await this.parseRequest<TRequest>(req);
            if (validator) {
                const code = await validator(request);
                return {request, response: {code}};
            }

            return {request, response: {}};
        } catch (error) {
            throw error;
        }
    }

    private async parseRequest<T extends {}>(req: IncomingMessage): Promise<T> {
        ok('content-hmac' in req.headers, 'Request headers should contain Content-HMAC field.');

        const signature: string = req.headers['content-hmac'] as string;
        const method = req.method || '';
        const request = {} as T;

        ok(!!method, 'Request method should not be empty');

        if (method.toUpperCase() === 'POST') {
            const body = await new Promise<string>((resolve, reject) => {
                const chunks: string[] = [];
                req.on('data', (chunk: Buffer) => chunks.push(chunk.toString()));
                req.on('end', () => resolve(chunks.join()));
                req.on('error', reject);
            });

            const headers: any = req.headers || {};

            ok(checkSignedString(this.options.privateKey, signature, body), 'Invalid signature');
            if ('content-type' in headers && headers['content-type'].indexOf('json') !== -1) {
                Object.assign(request, JSON.parse(body));
            } else {
                Object.assign(request, qs.parse(body));
            }
        } else if (method.toUpperCase() === 'GET') {
            ok(checkSignedString(this.options.privateKey, signature, parse(req.url || '').query as string), 'Invalid signature');
            Object.assign(request, parse(req.url || '', true).query);
        }

        return request;
    }
}
