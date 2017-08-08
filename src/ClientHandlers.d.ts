/// <reference types="node" />
import { ClientAbstract } from "./Client/ClientAbstract";
import { IncomingMessage } from "http";
import * as ApiTypes from "./Api/notification";
import { ResponseCodes } from "./Api/constants";
export interface NotificationHandlerValidator<TRequest> {
    (request: TRequest): Promise<ResponseCodes>;
}
export declare class ClientHandlers extends ClientAbstract {
    protected handle<TRequest, TResponse>(req: IncomingMessage, validator?: NotificationHandlerValidator<TRequest>): Promise<{
        request: TRequest;
        response: {};
    }>;
    handleCheckRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.CheckNotification>): Promise<{
        request: ApiTypes.CheckNotification<{}>;
        response: {};
    }>;
    handlePayRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.PayNotification>): Promise<{
        request: ApiTypes.PayNotification<{}>;
        response: {};
    }>;
    handleFailRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.FailNotification>): Promise<{
        request: ApiTypes.FailNotification<{}>;
        response: {};
    }>;
    handleRefundRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.RefundNotification>): Promise<{
        request: ApiTypes.RefundNotification<{}>;
        response: {};
    }>;
    handleRecurrentRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.RecurrentNotification>): Promise<{
        request: ApiTypes.RecurrentNotification;
        response: {};
    }>;
    handleReceiptRequest(req: IncomingMessage, validator?: NotificationHandlerValidator<ApiTypes.ReceiptNotification<any>>): Promise<{
        request: ApiTypes.ReceiptNotification<any>;
        response: {};
    }>;
    private parseRequest<T>(req);
}
