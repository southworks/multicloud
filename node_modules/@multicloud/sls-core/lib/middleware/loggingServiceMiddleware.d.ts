import { Logger } from "../services/logger";
import { Middleware } from "../app";
/**
 * Middleware for logging. Returns async function that accepts the
 * CloudContext and the `next` Function in the middleware chain
 * @param logger Logging Service
 */
export declare const LoggingServiceMiddleware: (logger: Logger) => Middleware;
