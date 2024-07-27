import * as crypto from "crypto";
import {RSA_PASSPHRASE, RSA_PRIVATE_KEY, RSA_PUBLIC_KEY} from "@/constants";

function encrypt(data: string, publicKey: string): string {
    const buffer = Buffer.from(data, "utf8");
    return crypto.publicEncrypt(publicKey, buffer).toString("base64");
}

function decrypt(data: string, privateKey: string, passPhrase: string): string {
    const buffer = Buffer.from(data, "base64");
    return crypto.privateDecrypt({
        key: privateKey,
        passphrase: passPhrase,
    }, buffer).toString("utf8");
}

export function encryptWithPublicKey(data: string): string {
    return encrypt(data, RSA_PUBLIC_KEY);
}

export function decryptWithPrivateKey(data: string): string {
    return decrypt(data, RSA_PRIVATE_KEY, RSA_PASSPHRASE);
}

