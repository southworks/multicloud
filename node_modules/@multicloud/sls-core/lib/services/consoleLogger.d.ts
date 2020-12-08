import { Logger, LogLevel } from "./logger";
/**
 * Console implementation of Logger interface
 */
export declare class ConsoleLogger implements Logger {
    private logLevel?;
    /** Creates a new Logger, with the specified LogLevel. */
    constructor(logLevel?: LogLevel);
    /** Log message with the current stack trace */
    trace(...message: string[]): void;
    /** Log message as debug */
    debug(...message: string[]): void;
    /** Log message */
    log(...message: string[]): void;
    /** Log message as info */
    info(...message: string[]): void;
    /** Log message as warning */
    warn(...message: string[]): void;
    /** Log message as error */
    error(...message: string[]): void;
}
