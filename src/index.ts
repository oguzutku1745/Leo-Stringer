// Converts a string to a bigint
export function stringToBigInt(input: string): bigint {
    const encoder = new TextEncoder();
    const encodedBytes = encoder.encode(input);
  
    let bigIntValue = BigInt(0);
    for (let i = 0; i < encodedBytes.length; i++) {
      const byteValue = BigInt(encodedBytes[i]);
      const shiftedValue = byteValue << BigInt(8 * i);
      bigIntValue = bigIntValue | shiftedValue;
    }
  
    return bigIntValue;
  }

  export function bigIntToString(bigIntValue: bigint): string {
    const bytes: number[] = [];
    let tempBigInt = bigIntValue;
  
    while (tempBigInt > BigInt(0)) {
      const byteValue = Number(tempBigInt & BigInt(255));
      bytes.push(byteValue);
      tempBigInt = tempBigInt >> BigInt(8);
    }
  
    const decoder = new TextDecoder();
    const asciiString = decoder.decode(Uint8Array.from(bytes));
    return asciiString;
  }

  export function splitStringToBigInts(input: string): bigint[] {
    const chunkSize = 16; // Chunk size to split the string
    const numChunks = Math.ceil(input.length / chunkSize);
    const bigInts: bigint[] = [];
  
    for (let i = 0; i < numChunks; i++) {
      const chunk = input.substr(i * chunkSize, chunkSize);
      const bigIntValue = stringToBigInt(chunk);
      bigInts.push(bigIntValue);
    }
  
    return bigInts;
  }

  export function bigIntConverter(bigInts: bigint[]): string {
    let result = '';
  
    for (let i = 0; i < bigInts.length; i++) {
      const chunkString = bigIntToString(bigInts[i]);
      result += chunkString;
    }
  
    return result;
  }

// Automatically pads an array of bigints
export function autoPadArray(bigInts: bigint[]): bigint[] {
  const chunkSize = 16; // Each bigint represents a 16-character chunk
  const bytesPerBigInt = 128 / 8; // Number of bytes that can be represented in a u128 bigint
  const requiredLength = Math.ceil(chunkSize * bigInts.length / bytesPerBigInt);
  const paddingLength = Math.max(requiredLength - bigInts.length, 0); // Ensure non-negative
  const padding = Array(paddingLength).fill(BigInt(0));
  return bigInts.concat(padding);
}


// Main function to convert a string into padded bigint array
export function stringConverter(input: string): bigint[] {
    const bigInts = splitStringToBigInts(input);
    return autoPadArray(bigInts);
}

// Formats the inputs according to necessary data field number
export function formatInput(bigInts: bigint[]): string {
  let formattedString = "{ ";

  bigInts.forEach((bigintValue, index) => {
      formattedString += `data${index + 1}: ${bigintValue}u128`;
      if (index < bigInts.length - 1) {
          formattedString += ", ";
      }
  });

  formattedString += " }";

  return formattedString;
}


// Calculates the number of data fields needed for a given string length
export function calculateDataFieldsNeeded(maxStringLength: number): number {
    const chunkSize = 16;
    return Math.ceil(maxStringLength / chunkSize);
}