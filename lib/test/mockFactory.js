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
class MockFactory {
    /**
     * Creates a middleware that executes the specified spy
     * @param spy The spy function to call
     */
    static createMockMiddleware(spy) {
        const defaultImp = (context, next) => __awaiter(this, void 0, void 0, function* () {
            return yield next();
        });
        if (!spy) {
            spy = defaultImp;
        }
        return jest.fn((context, next) => __awaiter(this, void 0, void 0, function* () {
            return spy(context, next);
        }));
    }
    /**
     * Creates a handler that executes the optional spy function
     * @param spy The spy function to call
     */
    static createMockHandler(spy) {
        const defaultImp = (context) => context.send("OK", 200);
        if (!spy) {
            spy = defaultImp;
        }
        return jest.fn((context) => {
            return spy(context);
        });
    }
    /**
   * Simulates a call to a promise.
   */
    static simulatePromise() {
        return new Promise((resolve) => {
            setImmediate(resolve);
        });
    }
    /**
     * Simulates a call as a callback
    */
    static simulateCallback(err, callback) {
        if (err) {
            throw err;
        }
        setImmediate(callback);
    }
    /**
     * Creates a spy on a middleware an calls original implementation
     * @param moduleName The module to spy on
     * @param middlewareName The middleware export name
     */
    static spyOnMiddleware(moduleName, middlewareName) {
        let createMiddlewareFunction = null;
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const origModule = require(moduleName);
        const origMiddleware = origModule[middlewareName];
        // Create a spy that will be bound to the original imported component
        const createMiddlewareSpy = (...args) => {
            const result = origMiddleware(...args);
            const spy = jest.fn(result);
            // Set reference to spy so we can later check and perform assertions against it
            if (createMiddlewareFunction) {
                MockFactory.middlewareMap.set(createMiddlewareFunction, spy);
            }
            return spy;
        };
        createMiddlewareFunction = jest.fn(createMiddlewareSpy);
        // Overwrites the spy onto the original module
        Object.defineProperty(origModule, middlewareName, {
            value: createMiddlewareFunction,
        });
        return createMiddlewareFunction;
    }
    /**
     * Gets the spy associated with the requested middleware
     * @param middleware The middleware
     */
    static ensureMiddleware(middleware) {
        return MockFactory.middlewareMap.get(middleware) || jest.fn();
    }
}
MockFactory.middlewareMap = new Map();
exports.MockFactory = MockFactory;
