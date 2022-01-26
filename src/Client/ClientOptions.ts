import {TaxationSystemType} from "../Api";

export interface ClientOptions {
    publicId: string;
    privateKey: string;
    endpoint?: string;
    org?: ClientOptionsOrg;
}

export interface ClientOptionsOrg {
    inn: number;
    taxationSystem: TaxationSystemType;
}

export type ClientRequestSign = (content: string) => Promise<string> | string;

export interface ClientRequestOptions {
    data?: any;
    requestId?: string;
    sign?: ClientRequestSign;
}
