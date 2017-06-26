export interface ClientOptions {
    publicId: string,
    privateKey: string,
    endpoint?: string,
    organization: {
        inn: number,
        vat: number,
        taxationSystem: number
    }
}
