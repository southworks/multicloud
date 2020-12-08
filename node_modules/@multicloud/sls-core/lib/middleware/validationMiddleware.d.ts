import { CloudContext } from "../cloudContext";
import { Middleware } from "../app";
/**
 * Result from validation execution
 */
export interface ValidationResult {
    /** True if validation failed */
    hasError(): boolean;
    /** Send result of validation */
    send(): Promise<void>;
}
/**
 * Options for Validation Middleware
 */
export interface ValidationOptions {
    /** Validate Cloud Context */
    validate: (context: CloudContext) => Promise<ValidationResult>;
}
/**
 * Create validation middleware
 * @param options Options for Validation Middleware
 */
export declare const createValidationMiddleware: (options: ValidationOptions) => Middleware;
