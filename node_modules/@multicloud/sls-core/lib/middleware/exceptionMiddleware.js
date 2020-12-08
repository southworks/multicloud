"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Middleware for handling exceptions. Returns async function that accepts the
 * CloudContext and the `next` Function in the middleware chain
 * @param options Options for handling exceptions
 */
exports.ExceptionMiddleware = (options) => (context, next) => {
    function onError(err) {
        options.log(err);
        const result = {
            requestId: context.id,
            message: err.toString(),
            timestamp: new Date()
        };
        context.send(result, 500);
    }
    try {
        return next().catch(onError);
    }
    catch (err) {
        onError(err);
    }
};
