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
 * Middleware for logging. Returns async function that accepts the
 * CloudContext and the `next` Function in the middleware chain
 * @param logger Logging Service
 */
exports.LoggingServiceMiddleware = (logger) => (context, next) => __awaiter(this, void 0, void 0, function* () {
    context.logger = logger || new consoleLogger_1.ConsoleLogger();
    yield next();
});
