import {createCryptoSign} from "../../src";
import {OpenSSL} from "./lib/OpenSSL";

test("Crypto", async () => {
    const openssl = new OpenSSL();
    openssl.generate();

    const sign = createCryptoSign(openssl.cert, openssl.pk);
    await expect(sign("test")).resolves.not.toThrow();

    const payload = {
        foo: "bar",
        random: Math.random(),
    };

    const contents = JSON.stringify(payload);
    const contentsSign = await sign(contents);
    const verify = await openssl.verify(contents, contentsSign);

    expect(verify.stdout).toBe(contents);
    expect(verify.stderr).toBe("CMS Verification successful\n");
});
