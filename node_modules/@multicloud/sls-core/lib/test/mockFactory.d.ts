import { Middleware, Handler } from "../app";
export declare class MockFactory {
    /**
     * Creates a middleware that executes the specified spy
     * @param spy The spy function to call
     */
    static createMockMiddleware(spy?: Middleware): Middleware;
    /**
     * Creates a handler that executes the optional spy function
     * @param spy The spy function to call
     */
    static createMockHandler(spy?: Handler): Handler;
    /**
   * Simulates a call to a promise.
   */
    static simulatePromise(): Promise<void>;
    /**
     * Simulates a call as a callback
    */
    static simulateCallback(err: any, callback: any): void;
    private static middlewareMap;
    /**
     * Creates a spy on a middleware an calls original implementation
     * @param moduleName The module to spy on
     * @param middlewareName The middleware export name
     */
    static spyOnMiddleware(moduleName: string, middlewareName: string): any;
    /**
     * Gets the spy associated with the requested middleware
     * @param middleware The middleware
     */
    static ensureMiddleware(middleware: Function): any;
}
