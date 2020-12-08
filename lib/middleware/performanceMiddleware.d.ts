import { Middleware } from "../app";
/**
 * Request ID response header name.
 */
export declare const RequestIdResponseHeader = "x-sls-request-id";
/**
 * Performance response header name.
 */
export declare const DurationResponseHeader = "x-sls-perf-duration";
/**
 * Middleware for logging performance of Serverless function. Returns
 * async function that accepts the CloudContext and the `next` Function
 * in the middleware chain
 */
export declare const PerformanceMiddleware: () => Middleware;
