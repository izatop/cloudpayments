export function createCryptoSign(cert: string, pk: string) {
    return async (content: string): Promise<string> => {
        const {cms} = await import("./cms");

        return cms(cert, pk, content);
    };
}
