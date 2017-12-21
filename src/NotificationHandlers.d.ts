/// <reference types="node" />
import { ClientAbstract } from "./Client/ClientAbstract";
import { IncomingMessage } from "http";
import * as ApiTypes from "./Api/notification";
import { ResponseCodes } from "./Api/constants";
export interface NotificationHandlerValidator<TRequest> {
    (request: TRequest): Promise<ResponseCodes>;
}
export declare class NotificationHandlers extends ClientAbstract {
    protected handle<TRequest, TResponse>(req: IncomingMessage, validator?: NotificationHandlerValidator<TRequest>): Promise<{
        request: TRequest;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: TRequest;
        response: {};
    }>;
    handleCheckRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.CheckNotification>): Promise<{
        request: ApiTypes.CheckNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.CheckNotification<{}>;
        response: {};
    }>;
    handlePayRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.PayNotification>): Promise<{
        request: ApiTypes.PayNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.PayNotification<{}>;
        response: {};
    }>;
    handleConfirmRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.ConfirmNotification>): Promise<{
        request: ApiTypes.ConfirmNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.ConfirmNotification<{}>;
        response: {};
    }>;
    handleFailRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.FailNotification>): Promise<{
        request: ApiTypes.FailNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.FailNotification<{}>;
        response: {};
    }>;
    handleRefundRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.RefundNotification>): Promise<{
        request: ApiTypes.RefundNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.RefundNotification<{}>;
        response: {};
    }>;
    handleRecurrentRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.RecurrentNotification>): Promise<{
        request: ApiTypes.RecurrentNotification;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.RecurrentNotification;
        response: {};
    }>;
    handleReceiptRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.ReceiptNotification<any>>): Promise<{
        request: ApiTypes.ReceiptNotification<any>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.ReceiptNotification<any>;
        response: {};
    }>;
    private parseRequest<T>(req);
}
