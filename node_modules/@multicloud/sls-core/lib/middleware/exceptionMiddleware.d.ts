import { Middleware } from "../app";
/**
 * Options for handling exceptions
 */
export interface ExceptionOptions {
    /** Log error message */
    log: (error: string) => Promise<void>;
}
/**
 * Middleware for handling exceptions. Returns async function that accepts the
 * CloudContext and the `next` Function in the middleware chain
 * @param options Options for handling exceptions
 */
export declare const ExceptionMiddleware: (options: ExceptionOptions) => Middleware;
