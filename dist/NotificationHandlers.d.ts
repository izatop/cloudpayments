/// <reference types="node" />
import { ClientAbstract } from "./Client/ClientAbstract";
import { IncomingMessage } from "http";
import * as ApiTypes from "./Api/notification";
import { ResponseCodes } from "./Api/constants";
export interface NotificationHandlerValidator<TRequest> {
    (request: TRequest): Promise<ResponseCodes>;
}
export declare class NotificationHandlers extends ClientAbstract {
    handleCheckRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.CheckNotification>): Promise<{
        request: ApiTypes.CheckNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.CheckNotification<{}>;
        response: {
            code?: undefined;
        };
    }>;
    handlePayRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.PayNotification>): Promise<{
        request: ApiTypes.PayNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.PayNotification<{}>;
        response: {
            code?: undefined;
        };
    }>;
    handleConfirmRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.ConfirmNotification>): Promise<{
        request: ApiTypes.ConfirmNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.ConfirmNotification<{}>;
        response: {
            code?: undefined;
        };
    }>;
    handleFailRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.FailNotification>): Promise<{
        request: ApiTypes.FailNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.FailNotification<{}>;
        response: {
            code?: undefined;
        };
    }>;
    handleRefundRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.RefundNotification>): Promise<{
        request: ApiTypes.RefundNotification<{}>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.RefundNotification<{}>;
        response: {
            code?: undefined;
        };
    }>;
    handleRecurrentRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.SubscriptionModel>): Promise<{
        request: ApiTypes.SubscriptionModel;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.SubscriptionModel;
        response: {
            code?: undefined;
        };
    }>;
    handleReceiptRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.ReceiptNotification<any>>): Promise<{
        request: ApiTypes.ReceiptNotification<any>;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: ApiTypes.ReceiptNotification<any>;
        response: {
            code?: undefined;
        };
    }>;
    protected handle<TRequest, TResponse>(req: IncomingMessage, validator?: NotificationHandlerValidator<TRequest>): Promise<{
        request: TRequest;
        response: {
            code: ResponseCodes;
        };
    } | {
        request: TRequest;
        response: {
            code?: undefined;
        };
    }>;
    private parseRequest;
}
