"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Level of verbosity for logging
 */
var LogLevel;
(function (LogLevel) {
    /** Disable logging */
    LogLevel[LogLevel["NONE"] = 0] = "NONE";
    /** Log everyting */
    LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
    /** Only log info, errors and warnings */
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    /** Only log errors and warnings */
    LogLevel[LogLevel["WARN"] = 3] = "WARN";
    /** Only log errors */
    LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
