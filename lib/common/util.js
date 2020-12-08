"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
const guard_1 = require("./guard");
/**
 * Ensures that the specified value is wrapped as a promise
 * @param value The value to evaluate
 */
function ensurePromise(value) {
    const promise = value;
    if (promise && promise.then && promise.catch) {
        return promise;
    }
    return Promise.resolve(value);
}
exports.ensurePromise = ensurePromise;
/**
 * Converts the input to Stream
 * @param input Data to be converted to Stream
 */
function convertToStream(input) {
    guard_1.Guard.null(input, "input");
    let readable;
    if (input instanceof stream_1.Stream.Readable) {
        readable = input;
    }
    else if (input instanceof Buffer || typeof input === "string") {
        readable = new stream_1.Readable();
        readable.push(input);
        readable.push(null);
    }
    else {
        throw new Error("input type not supported");
    }
    return readable;
}
exports.convertToStream = convertToStream;
