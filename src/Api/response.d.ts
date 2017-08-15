import { ErrorCodes, TransactionStatus, ValidCurrency } from "./constants";
export interface BaseResponse {
    Message: string | null;
    Success: boolean;
}
export declare class Response<T extends BaseResponse> {
    protected response: T;
    constructor(response: T);
    getResponse(): T;
    isSuccess(): boolean;
    getMessage(): string | null;
}
export interface PaymentModel {
    TransactionId: number;
    Amount: number;
    Currency: ValidCurrency;
    CurrencyCode: number;
    InvoiceId?: string;
    AccountId?: string;
    Email?: string;
    Description?: string;
    JsonData?: string;
    CreatedDate: string;
    CreatedDateIso: string;
    TestMode: boolean;
    IpAddress: string;
    IpCountry: string;
    IpCity: string;
    IpRegion: string;
    IpDistrict: string;
    IpLatitude: number;
    IpLongitude: number;
    CardFirstSix: string;
    CardLastFour: string;
    CardExpDate: string;
    CardType: string;
    CardTypeCode: number;
    Issuer: string;
    IssuerBankCountry: string;
    Status: TransactionStatus;
    StatusCode: number;
    Reason: string;
    ReasonCode: ErrorCodes;
    CardHolderMessage: string;
    Name: string;
}
export interface PaymentSuccessModel extends PaymentModel {
    AuthDate: string;
    AuthDateIso: string;
    AuthCode: string;
    ConfirmDate: string;
    ConfirmDateIso: string;
    Token: string;
}
export interface PaymentFailedResponse extends BaseResponse {
    Message: string;
    Success: false;
    Model: PaymentModel;
}
export interface Payment3DSModel {
    TransactionId: number;
    PaReq: string;
    AcsUrl: string;
}
export interface Payment3DSResponse extends BaseResponse {
    Success: false;
    Message: null;
    Model: Payment3DSModel;
}
export interface PaymentSuccessResponse extends BaseResponse {
    Success: true;
    Message: null;
    Model: PaymentSuccessModel;
}
export declare type PaymentResponse = PaymentSuccessResponse | PaymentFailedResponse | Payment3DSResponse;
export declare type HistoryPaymentModel = PaymentModel | PaymentSuccessModel;
export declare type PaymentGetResponse = {
    Success: boolean;
    Message: null;
    Model: HistoryPaymentModel[];
};
export declare type PaymentHistoryResponse = {
    Success: true;
    Message: never;
    Model: HistoryPaymentModel[];
};
