import * as stream from "stream";
import {IncomingHttpHeaders, IncomingMessage} from "http";
import {signString} from "../../../src/utils";

export class ServiceRequestMock extends stream.Readable {
    headers: IncomingHttpHeaders = {};
    method?: string;
    url?: string;
    protected readonly raw: string;

    constructor(privateKey: string, raw: string) {
        super();
        this.headers = {
            "content-hmac": signString(privateKey, raw)
        };

        this.method = "POST";
        this.raw = raw;
        process.nextTick(() => this.writeRequest());
    }

    public static create(privateKey: string, raw: string) {
        return new this(privateKey, raw) as any as IncomingMessage & { writeRequest(): void };
    }

    public writeRequest() {
        this.emit("data", Buffer.from(this.raw, "utf-8"));
        this.emit("end");
    }

    public destroy(error?: Error): void {
        return;
    }

    public _read(size: number): void {
        return;
    }
}