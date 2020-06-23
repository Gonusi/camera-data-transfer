import { stringify } from "querystring";

export function getChunksFromString(str: string, chunkLength: number) {
  //console.log("Getting chunk. ", chunkLength);
  if (chunkLength >= str.length) return [str];
  const newChunks =
    str.match(new RegExp(".{1," + chunkLength + "}", "g")) || [];
  //console.log(newChunks.map((chunk) => chunk.length));
  return newChunks;
}

// To avoid changing QR code size, which throws off the QR reader, make each chunk have identical length
export function fillChunksWithPlaceholder(str: string, chunkLength: number) {
  const deconstructedString = str.split("");
  const missingCharCount = chunkLength - deconstructedString.length;
  if (missingCharCount > 0) {
    for (let i = 0; i < missingCharCount; i++) {
      deconstructedString.push(">");
    }
  }
  return deconstructedString.join("");
}

export function getSizeInKilobytes(data: string) {
  const sizeInBytes = new TextEncoder().encode(data).length;
  return (sizeInBytes / 1024).toFixed(2);
}
