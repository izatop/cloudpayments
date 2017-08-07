import {ClientAbstract} from "./Client/ClientAbstract";
import {IncomingMessage} from "http";
import * as qs from "qs";
import {checkSignedString, trace} from "./utils";
import * as ApiTypes from "./Api/types";
import {parse} from "url";
import {ok} from "assert";

export interface NotificationHandlerValidator<TRequest, TResponse> {
    (request: TRequest): Promise<TResponse>;
}

export class ClientHandlers extends ClientAbstract {
    protected async handle<TRequest, TResponse>(
        req: IncomingMessage,
        validator?: NotificationHandlerValidator<TRequest, TResponse>
    ) {
        try {
            const request = await this.parseRequest<TRequest>(req);
            trace('handle', request);

            if (validator) {
                const code = await validator(request);
                return {request, response: {code}};
            }

            return {request, response: {}};
        } catch (error) {
            trace(error);
            throw error;
        }
    }

    async handleCheckRequest(
        req: IncomingMessage,
        validator?: NotificationHandlerValidator<ApiTypes.CheckRequest, ApiTypes.CheckResponseType>
    ) {
        return this.handle(req, validator);
    }

    async handlePayRequest(
        req: IncomingMessage,
        validator?: NotificationHandlerValidator<ApiTypes.PayRequest, ApiTypes.PayResponseType>
    ) {
        return this.handle(req, validator);
    }

    async handleFailRequest(
        req: IncomingMessage,
        validator?: NotificationHandlerValidator<ApiTypes.FailRequest, ApiTypes.FailResponseType>
    ) {
        return this.handle(req, validator);
    }

    async handleRefundRequest(
        req: IncomingMessage,
        validator?: NotificationHandlerValidator<ApiTypes.RefundRequest, ApiTypes.RefundResponseType>
    ) {
        return this.handle(req, validator);
    }

    async handleRecurrentRequest(
        req: IncomingMessage,
        validator?: NotificationHandlerValidator<ApiTypes.RecurrentRequest, ApiTypes.RecurrentResponseType>
    ) {
        return this.handle(req, validator);
    }

    async handleReceiptRequest(
        req: IncomingMessage,
        validator?: NotificationHandlerValidator<ApiTypes.ReceiptRequest<any>, ApiTypes.ReceiptResponseType>
    ) {
        return this.handle(req, validator);
    }

    private async parseRequest<T extends {}>(req: IncomingMessage): Promise<T> {
        ok('content-hmac' in req.headers, 'Request headers should contain Content-HMCA field.');

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

            trace('check signature %s', signature, body);
            ok(checkSignedString(signature, body), 'Invalid signature');
            if ('content-type' in headers && headers['content-type'].indexOf('json') !== -1) {
                Object.assign(request, JSON.parse(body));
            } else {
                Object.assign(request, qs.parse(body));
            }
        } else if (method.toUpperCase() === 'GET') {
            ok(checkSignedString(signature, parse(req.url || '').query), 'Invalid signature');
            Object.assign(request, parse(req.url || '', true).query);
        }

        return request;
    }
}
