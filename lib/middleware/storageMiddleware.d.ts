import { Middleware } from "../app";
/**
 * Middleware for adding the storage service to the context object.
 * It will allow to read, upload and delete files in the cloud.
 */
export declare const StorageMiddleware: () => Middleware;
