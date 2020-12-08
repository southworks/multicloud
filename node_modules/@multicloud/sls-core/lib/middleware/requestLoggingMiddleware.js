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
const consoleLogger_1 = require("../services/consoleLogger");
/**
 * Middleware for logging start and stop of function handler. Returns
 * async function that accepts the CloudContext and the `next` Function
 * in the middleware chain
 * @param options Options for logging request
 */
exports.RequestLoggingMiddleware = (options) => (_, next) => __awaiter(this, void 0, void 0, function* () {
    const logger = options.logger || new consoleLogger_1.ConsoleLogger();
    logger.log(`Starting request for handler: ${options.handlerName}`);
    yield next();
    logger.log(`Finished request for handler: ${options.handlerName}`);
});
