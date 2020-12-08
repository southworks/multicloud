"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
/**
 * Console implementation of Logger interface
 */
class ConsoleLogger {
    /** Creates a new Logger, with the specified LogLevel. */
    constructor(logLevel) {
        this.logLevel = logLevel;
        if (logLevel === logger_1.LogLevel.NONE) {
            this.logLevel = logLevel;
        }
        else {
            this.logLevel = logLevel || parseInt(process.env.LOG_LEVEL) || logger_1.LogLevel.INFO;
        }
    }
    /** Log message with the current stack trace */
    trace(...message) {
        if (this.logLevel && this.logLevel === logger_1.LogLevel.VERBOSE) {
            console.trace("[TRACE] ", ...message);
        }
    }
    /** Log message as debug */
    debug(...message) {
        if (this.logLevel && this.logLevel === logger_1.LogLevel.VERBOSE) {
            console.debug("[DEBUG] ", ...message);
        }
    }
    /** Log message */
    log(...message) {
        if (this.logLevel && this.logLevel === logger_1.LogLevel.VERBOSE) {
            console.log("[VERBOSE] ", ...message);
        }
    }
    /** Log message as info */
    info(...message) {
        if (this.logLevel && this.logLevel <= logger_1.LogLevel.INFO) {
            console.info("[INFO] ", ...message);
        }
    }
    /** Log message as warning */
    warn(...message) {
        if (this.logLevel && this.logLevel <= logger_1.LogLevel.WARN) {
            console.warn("[WARN] ", ...message);
        }
    }
    /** Log message as error */
    error(...message) {
        if (this.logLevel && this.logLevel <= logger_1.LogLevel.ERROR) {
            console.error("[ERROR] ", ...message);
        }
    }
}
exports.ConsoleLogger = ConsoleLogger;
