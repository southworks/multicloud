"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const perf_hooks_1 = require("perf_hooks");
const consoleLogger_1 = require("../services/consoleLogger");
/**
 * Request ID response header name.
 */
exports.RequestIdResponseHeader = "x-sls-request-id";
/**
 * Performance response header name.
 */
exports.DurationResponseHeader = "x-sls-perf-duration";
/**
 * Middleware for logging performance of Serverless function. Returns
 * async function that accepts the CloudContext and the `next` Function
 * in the middleware chain
 */
exports.PerformanceMiddleware = () => (context, next) => __awaiter(this, void 0, void 0, function* () {
    // NOTE: if the context provides a logger, use it, otherwise use the default console logger
    const logger = context.logger ? context.logger : new consoleLogger_1.ConsoleLogger();
    const start = `Function Start: ${context.id}`;
    const end = `Function End: ${context.id}`;
    try {
        const observer = new perf_hooks_1.PerformanceObserver((list, innerObserver) => {
            const perfEntries = list.getEntriesByName(context.id);
            if (perfEntries && perfEntries.length) {
                const entry = perfEntries[0];
                logger.info(`Function End, Request ID: ${context.id}, took ${entry.duration}ms`);
                if (context.res) {
                    context.res.headers.set(exports.RequestIdResponseHeader, context.id);
                    context.res.headers.set(exports.DurationResponseHeader, entry.duration.toString());
                }
            }
            innerObserver.disconnect();
        });
        // fire performance observer events for all measure calls
        observer.observe({ entryTypes: ["measure"] });
        perf_hooks_1.performance.mark(start);
        logger.info(`Function Start, Request ID: ${context.id}`);
        yield next();
    }
    finally {
        perf_hooks_1.performance.mark(end);
        perf_hooks_1.performance.measure(context.id, start, end);
    }
});
