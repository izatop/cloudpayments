import {TaxationSystem} from "../../../src";

export const options = {
    endpoint: "https://fakeapi.com",
    publicId: "public id",
    privateKey: "private key",
    org: {
        inn: 12345678,
        taxationSystem: TaxationSystem.GENERAL,
    },
};
