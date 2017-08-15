import {TaxationSystemType} from "../Api/constants";

export interface ClientOptions {
    publicId: string,
    privateKey: string,
    endpoint?: string,
    org?: ClientOptionsOrg
}

export interface ClientOptionsOrg {
    inn: number,
    taxationSystem: TaxationSystemType
}
