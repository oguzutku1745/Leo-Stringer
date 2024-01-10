"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDataFieldsNeeded = exports.formatInput = exports.stringConverter = exports.autoPadArray = exports.bigIntConverter = exports.splitStringToBigInts = exports.bigIntToString = exports.stringToBigInt = void 0;
// Converts a string to a bigint
function stringToBigInt(input) {
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
exports.stringToBigInt = stringToBigInt;
function bigIntToString(bigIntValue) {
    const bytes = [];
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
exports.bigIntToString = bigIntToString;
function splitStringToBigInts(input) {
    const chunkSize = 16; // Chunk size to split the string
    const numChunks = Math.ceil(input.length / chunkSize);
    const bigInts = [];
    for (let i = 0; i < numChunks; i++) {
        const chunk = input.substr(i * chunkSize, chunkSize);
        const bigIntValue = stringToBigInt(chunk);
        bigInts.push(bigIntValue);
    }
    return bigInts;
}
exports.splitStringToBigInts = splitStringToBigInts;
function bigIntConverter(bigInts) {
    let result = '';
    for (let i = 0; i < bigInts.length; i++) {
        const chunkString = bigIntToString(bigInts[i]);
        result += chunkString;
    }
    return result;
}
exports.bigIntConverter = bigIntConverter;
// Automatically pads an array of bigints
function autoPadArray(bigInts) {
    const chunkSize = 16; // Each bigint represents a 16-character chunk
    const bytesPerBigInt = 128 / 8; // Number of bytes that can be represented in a u128 bigint
    const requiredLength = Math.ceil(chunkSize * bigInts.length / bytesPerBigInt);
    const paddingLength = Math.max(requiredLength - bigInts.length, 0); // Ensure non-negative
    const padding = Array(paddingLength).fill(BigInt(0));
    return bigInts.concat(padding);
}
exports.autoPadArray = autoPadArray;
// Main function to convert a string into padded bigint array
function stringConverter(input) {
    const bigInts = splitStringToBigInts(input);
    return autoPadArray(bigInts);
}
exports.stringConverter = stringConverter;
// Formats the inputs according to necessary data field number
function formatInput(bigInts) {
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
exports.formatInput = formatInput;
// Calculates the number of data fields needed for a given string length
function calculateDataFieldsNeeded(maxStringLength) {
    const chunkSize = 16;
    return Math.ceil(maxStringLength / chunkSize);
}
exports.calculateDataFieldsNeeded = calculateDataFieldsNeeded;
