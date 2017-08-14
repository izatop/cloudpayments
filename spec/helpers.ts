import {TaxationSystem} from "../src/Api/constants";
import {IncomingHttpHeaders} from "http";
import * as net from "net";
import * as stream from "stream";
import {signString} from "../src/utils";
import {ClientOptions} from "../src/Client/ClientOptions";
import {ClientRequestAbstract} from "../src/Client/ClientAbstract";
import {Request, RequestInit} from "node-fetch";
import {Test} from "./async-tape";

export const options = {
    endpoint: 'https://fakeapi.com',
    publicId: 'public id',
    privateKey: 'private key',
    org: {
        inn: 12345678,
        taxationSystem: TaxationSystem.GENERAL
    }
};

export class ServiceRequestMock extends stream.Readable {
    httpVersion: string = "1.1";
    httpVersionMajor: number;
    httpVersionMinor: number;
    connection: net.Socket;
    headers: IncomingHttpHeaders;
    rawHeaders: string[];
    trailers: { [key: string]: string };
    rawTrailers: string[];

    constructor(privateKey: string, raw: string) {
        super();

        this.headers = {
            'content-hmac': signString(privateKey, raw)
        };

        this.method = 'POST';

        setTimeout(() => {
            this.emit('data', raw);
            this.emit('end');
        }, 10);
    }

    _read(size: number): void {}

    setTimeout(msecs: number, callback: () => void): this {
        return this;
    }
    /**
     * Only valid for request obtained from http.Server.
     */
    method?: string;
    /**
     * Only valid for request obtained from http.Server.
     */
    url?: string;
    /**
     * Only valid for response obtained from http.ClientRequest.
     */
    statusCode?: number;
    /**
     * Only valid for response obtained from http.ClientRequest.
     */
    statusMessage?: string;
    socket: net.Socket;
    destroy(error?: Error): void {

    }
}

export async function clientRequestTest(
    test: Test,
    client: ClientRequestAbstract,
    clientCall: () => Promise<any>,
    testCase: (test: Test, url: string | Request, init?: RequestInit) => void
) {
    Object.defineProperty(client, 'client', {
        get: () => (url: string | Request, init?: RequestInit) => {
            testCase(test, url, init);
            return {json() {}}
        }
    });

    try {
        await clientCall();
    } catch (error) {
        test.fail(error.stack);
    }
}
