import {readFileSync} from "fs";
import * as crypto from "crypto";
import * as asn1js from "asn1js";
import {
    setEngine,
    Attribute,
    AlgorithmIdentifier,
    CryptoEngine,
    SignedData,
    SignerInfo,
    Certificate,
    IssuerAndSerialNumber,
    EncapsulatedContentInfo,
    SignedAndUnsignedAttributes,
    ContentInfo,
} from "pkijs";

const {subtle}: any = crypto.webcrypto;

const engine = new CryptoEngine({subtle, crypto});

setEngine("node", engine, engine);

function load(file: string) {
    const contents = readFileSync(file, "utf-8");
    return Buffer.from(
        contents
            .replace(/[-]+.+[-]+/g, "")
            .trim(),
        "base64",
    );
}

function toArrayBuffer(buf: Buffer) {
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
}

export async function cms(cert: string, pk: string, content: string) {
    const buffer = toArrayBuffer(Buffer.from(content, "utf-8"));
    const certBuf = toArrayBuffer(load(cert));
    const keyBuf = toArrayBuffer(load(pk));
    const x509 = asn1js.fromBER(certBuf);

    const certificate = new Certificate({schema: x509.result});
    const digest = await engine.digest({name: "sha-256"}, buffer);

    const cmsSigned = new SignedData({
        version: 1,
        digestAlgorithms: [
            new AlgorithmIdentifier({algorithmId: "2.16.840.1.101.3.4.2.1"}),
        ],
        encapContentInfo: new EncapsulatedContentInfo({
            eContentType: "1.2.840.113549.1.7.1",
        }),
        signerInfos: [
            new SignerInfo({
                version: 1,
                sid: new IssuerAndSerialNumber({
                    issuer: certificate.issuer,
                    serialNumber: certificate.serialNumber,
                }),
                signedAttrs: new SignedAndUnsignedAttributes({
                    type: 0,
                    attributes: [
                        new Attribute({
                            type: "1.2.840.113549.1.9.3",
                            values: [
                                new asn1js.ObjectIdentifier({value: "1.2.840.113549.1.7.1"}),
                            ],
                        }),
                        new Attribute({
                            type: "1.2.840.113549.1.9.5",
                            values: [
                                new asn1js.UTCTime({valueDate: new Date()}),
                            ],
                        }),
                        new Attribute({
                            type: "1.2.840.113549.1.9.4",
                            values: [
                                new asn1js.OctetString({valueHex: digest}),
                            ],
                        }),
                    ],
                }),
            }),
        ],
        certificates: [certificate],
    });

    const cryptoKey = await engine.importKey(
        "pkcs8",
        keyBuf,
        {name: "ECDSA", namedCurve: "P-384"},
        true,
        ["sign"],
    );

    // detached mode
    await cmsSigned.sign(cryptoKey, 0, "sha-256", buffer);

    const cmsContentSimp = new ContentInfo({
        contentType: "1.2.840.113549.1.7.2",
        content: cmsSigned.toSchema(true),
    });

    const cmsContentSchema = cmsContentSimp.toSchema();
    const binary = cmsContentSchema.toBER(false);

    return Buffer.from(binary).toString("base64");
}
