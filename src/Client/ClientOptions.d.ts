import { TaxationSystemType } from "../Api/constants";
export interface ClientOptions {
    publicId: string;
    privateKey: string;
    endpoint?: string;
    org?: {
        inn: number;
        taxationSystem: TaxationSystemType;
    };
}
