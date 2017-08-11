/// <reference types="node" />
import { TaxationSystem } from "../src/Api/constants";
import { IncomingHttpHeaders } from "http";
import * as net from "net";
import * as stream from "stream";
export declare const options: {
    endpoint: string;
    publicId: string;
    privateKey: string;
    org: {
        inn: number;
        taxationSystem: TaxationSystem;
    };
};
export declare class ServiceRequestMock extends stream.Readable {
    httpVersion: string;
    httpVersionMajor: number;
    httpVersionMinor: number;
    connection: net.Socket;
    headers: IncomingHttpHeaders;
    rawHeaders: string[];
    trailers: {
        [key: string]: string;
    };
    rawTrailers: string[];
    constructor(privateKey: string, raw: string);
    _read(size: number): void;
    setTimeout(msecs: number, callback: () => void): this;
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
    destroy(error?: Error): void;
}
