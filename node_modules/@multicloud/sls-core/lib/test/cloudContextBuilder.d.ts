import { CloudContext } from "../cloudContext";
import { Middleware } from "../app";
interface SimpleMap<T = any> {
    [key: string]: T;
}
/**
 * Helper class to easily build out a CloudContext used for testing multicloud handlers
 */
export declare class CloudContextBuilder {
    private isHttpRequest;
    private event;
    private context;
    private assertions;
    /**
     * Sets the current context to contain an Http request
     */
    asHttpRequest(): CloudContextBuilder;
    /**
     * Sets the cloud context to the specified value
     * @param context The context to set for the cloud request
     */
    withContext(context: any): CloudContextBuilder;
    /**
     * Sets the cloud event for the incoming request
     * @param event The event / http request to set
     */
    withEvent(event: any): CloudContextBuilder;
    /**
     * Sets the Http request body on the cloud request
     * @param body The Http Request body
     */
    withRequestBody(body: any): CloudContextBuilder;
    /**
     * Sets the Http request headers on the cloud request
     * @param headers The Http request headers
     */
    withRequestHeaders(headers: SimpleMap): CloudContextBuilder;
    /**
     * Sets the Http request method
     * @param method The Http request method, ex) GET, PUT, POST, PATCH, DELETE
     */
    withRequestMethod(method: string): CloudContextBuilder;
    /**
     * Sets the Http request path params
     * @param pathParams The Http path params
     */
    withRequestPathParams(pathParams: SimpleMap): CloudContextBuilder;
    /**
     * Sets the Http request querystring
     * @param query The Http request query string
     */
    withRequestQuery(query: SimpleMap): CloudContextBuilder;
    /**
     * Configures that the middleware should be called on the app lifecycle
     * @param moduleName The middleware module name
     * @param middlewareName The middleware name
     */
    withMiddlewareSpy(middlewareSpy: () => Middleware, assertFn?: () => void): this;
    /**
     * Builds a Cloud Context based on the configured values
     */
    build(): CloudContext;
    /**
     * Executes the specified handler with the configured context values
     * @param handler The cloud agnostic handler to execute with the configured cloud context
     */
    invokeHandler(handler: Function): Promise<CloudContext>;
    /**
     * Executes the specified middleware with the configured context values
     * @param middleware The middleware to invoke
     * @param next The middleware next function
     */
    invokeMiddleware(middleware: Middleware, next?: () => Promise<void>): Promise<CloudContext>;
    private createRuntimeArgs;
}
export {};
