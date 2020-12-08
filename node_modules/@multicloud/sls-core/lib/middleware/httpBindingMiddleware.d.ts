import { Middleware } from "../app";
/**
 * Middleware for HTTP bindings. Returns async function that accepts the
 * CloudContext and the `next` Function in the middleware chain
 */
export declare const HTTPBindingMiddleware: () => Middleware;
