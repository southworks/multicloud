/// <reference types="node" />
import { Stream, Readable } from "stream";
/**
 * Ensures that the specified value is wrapped as a promise
 * @param value The value to evaluate
 */
export declare function ensurePromise<T>(value: T | Promise<T>): Promise<T>;
/**
 * Converts the input to Stream
 * @param input Data to be converted to Stream
 */
export declare function convertToStream(input: string | Buffer | Stream): Readable;
