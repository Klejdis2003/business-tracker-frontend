export function getImageUrlFromBuffer(bufferArray: ArrayBuffer, filetype: string): string {
    const buffer = Buffer.from(bufferArray);
    const base64 = buffer.toString("base64");
    return `data:image/${filetype};base64,${base64}`;
}