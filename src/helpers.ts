export function getChunksFromString(str: string, chunkLength: number) {
  return str.match(new RegExp(".{1," + chunkLength + "}", "g")) || [];
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
