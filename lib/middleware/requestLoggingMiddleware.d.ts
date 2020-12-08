import { Logger } from "../services/logger";
import { Middleware } from "../app";
/**
 * Options for Request Logging
 */
export interface LoggingOptions {
    /** Logging Service */
    logger: Logger;
    /** Name of handler for which to log messages */
    handlerName: string;
}
/**
 * Middleware for logging start and stop of function handler. Returns
 * async function that accepts the CloudContext and the `next` Function
 * in the middleware chain
 * @param options Options for logging request
 */
export declare const RequestLoggingMiddleware: (options: LoggingOptions) => Middleware;
