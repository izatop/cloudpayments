import {ErrorCodes, TransactionStatus, ValidCurrency} from "./constants";
import {SubscriptionModel} from "./notification";

export interface BaseResponse {
    Message: string | null;
    Success: boolean;
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

export interface PaymentFailedResponse extends BaseResponse {
    Message: string;
    Success: false;
    Model: PaymentModel;
}

export type PaymentResponse = PaymentFailedResponse | PaymentSuccessResponse;
export type PaymentWith3DSResponse = PaymentFailedResponse | PaymentSuccessResponse | Payment3DSResponse;

export type HistoryPaymentModel = PaymentModel | PaymentSuccessModel;

export type PaymentGetResponse = {
    Success: boolean;
    Message: null;
    Model: HistoryPaymentModel;
};

export type PaymentHistoryResponse = {
    Success: boolean;
    Message: never;
    Model: HistoryPaymentModel[];
};

export type LinkPaymentModel = {
    Success: boolean;
    Message: never;
    Model: HistoryPaymentModel[];
};

export interface SubscriptionResponse extends BaseResponse {
    Model: SubscriptionModel;
}

export interface SubscriptionsListGetResponse extends BaseResponse {
    Model: SubscriptionModel[];
}

export interface PayoutModel {
    PublicId?: string;
    TransactionId: number;
    Amount: number;
    Currency: ValidCurrency;
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

    PaymentAmount?: number;
    PaymentCurrency?: ValidCurrency;
    PayoutDate?: string;
    PayoutDateIso?: string;
    PayoutAmount?: number;
    Rrn?: string;
    OriginalTransactionId?: number | null;
    CultureName?: "ru-RU" | "en-US" | "lv" | "az" | "kk" | "uk" | "pl";
    Type?: number;
    Refunded?: boolean;
    SubscriptionId?: number;
    GatewayName?: string;
}

export interface PayoutSuccessModel extends PayoutModel {
    AuthDate: string;
    AuthDateIso: string;
    AuthCode: string;
    ConfirmDate: string;
    ConfirmDateIso: string;
    Token?: string;
}

export interface PayoutSuccessResponse extends BaseResponse {
    Success: boolean;
    Message: string | null;
    Model: PayoutSuccessModel;
}

export interface PayoutFailedResponse extends BaseResponse {
    Message: string;
    Success: boolean;
    Model: PayoutModel;
}

export type PayoutResponse = PayoutSuccessResponse | PayoutFailedResponse;
