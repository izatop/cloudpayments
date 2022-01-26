import {exec} from "child_process";
import {writeFileSync} from "fs";
import {tmpdir} from "os";
import {join} from "path";
import {promisify} from "util";

const execAsync = promisify(exec);

export class OpenSSL {
    readonly #path: string;
    readonly #pk = "test.key";
    readonly #cert = "test.crt";
    readonly #msg = "msg.txt";
    readonly #sign = "sign.txt";
    readonly #cmd = "openssl";

    constructor() {
        this.#path = tmpdir();
    }

    public get pk(): string {
        return join(this.#path, this.#pk);
    }

    public get cert(): string {
        return join(this.#path, this.#cert);
    }

    public get sign(): string {
        return join(this.#path, this.#sign);
    }

    public get msg(): string {
        return join(this.#path, this.#msg);
    }

    public async generate(): Promise<void> {
        const args = [
            this.#cmd,
            "req",
            "-x509",
            "-sha256",
            "-nodes",
            "-days 36500",
            "-newkey ec",
            "-pkeyopt ec_paramgen_curve:secp384r1",
            `-keyout ${this.pk}`,
            `-out ${this.cert}`,
            "-subj \"/C=RU/ST=Moscow/L=Moscow/O=IT/CN=www.example.com\"",
        ];

        await execAsync(args.join(" "));
    }

    public verify(msg: string, sign: string) {
        this.write(msg, sign);

        const args = [
            this.#cmd,
            "cms",
            "-verify",
            "-noverify",
            "-inform pem",
            `-content ${this.msg}`,
            `-in ${this.sign}`,
        ];

        return execAsync(args.join(" "), {encoding: "utf-8"});
    }

    private write(msg: string, sign: string) {
        sign = `-----BEGIN CMS-----\n${sign}\n-----END CMS-----`;
        writeFileSync(join(this.#path, this.#msg), msg, "utf-8");
        writeFileSync(join(this.#path, this.#sign), sign + "\n", "utf-8");
    }
}
