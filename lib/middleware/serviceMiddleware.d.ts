import { Middleware } from "../app";
/**
 * Middleware for Service binding. Returns async function that accepts the
 * CloudContext and the `next` Function in the middleware chain
 */
export declare const ServiceMiddleware: () => Middleware;
