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
const guard_1 = require("../common/guard");
const testContext_1 = require("./testContext");
const testRequest_1 = require("./testRequest");
const testResponse_1 = require("./testResponse");
const mockFactory_1 = require("./mockFactory");
/**
 * Helper class to easily build out a CloudContext used for testing multicloud handlers
 */
class CloudContextBuilder {
    constructor() {
        this.isHttpRequest = false;
        this.event = {};
        this.context = {};
        this.assertions = [];
    }
    /**
     * Sets the current context to contain an Http request
     */
    asHttpRequest() {
        this.isHttpRequest = true;
        return this;
    }
    /**
     * Sets the cloud context to the specified value
     * @param context The context to set for the cloud request
     */
    withContext(context) {
        guard_1.Guard.null(context);
        this.context = context;
        return this;
    }
    /**
     * Sets the cloud event for the incoming request
     * @param event The event / http request to set
     */
    withEvent(event) {
        guard_1.Guard.null(event);
        this.event = event;
        return this;
    }
    /**
     * Sets the Http request body on the cloud request
     * @param body The Http Request body
     */
    withRequestBody(body) {
        guard_1.Guard.null(body);
        this.event.body = body;
        return this;
    }
    /**
     * Sets the Http request headers on the cloud request
     * @param headers The Http request headers
     */
    withRequestHeaders(headers) {
        guard_1.Guard.null(headers);
        this.event.headers = headers;
        return this;
    }
    /**
     * Sets the Http request method
     * @param method The Http request method, ex) GET, PUT, POST, PATCH, DELETE
     */
    withRequestMethod(method) {
        guard_1.Guard.empty(method);
        this.event.method = method;
        return this;
    }
    /**
     * Sets the Http request path params
     * @param pathParams The Http path params
     */
    withRequestPathParams(pathParams) {
        guard_1.Guard.null(pathParams);
        this.event.pathParams = pathParams;
        return this;
    }
    /**
     * Sets the Http request querystring
     * @param query The Http request query string
     */
    withRequestQuery(query) {
        guard_1.Guard.null(query);
        this.event.query = query;
        return this;
    }
    /**
     * Configures that the middleware should be called on the app lifecycle
     * @param moduleName The middleware module name
     * @param middlewareName The middleware name
     */
    withMiddlewareSpy(middlewareSpy, assertFn) {
        assertFn = assertFn || (() => expect(mockFactory_1.MockFactory.ensureMiddleware(middlewareSpy)).toBeCalled());
        this.assertions.push(assertFn);
        return this;
    }
    /**
     * Builds a Cloud Context based on the configured values
     */
    build() {
        const context = new testContext_1.TestContext(this.createRuntimeArgs());
        if (this.isHttpRequest) {
            context.req = new testRequest_1.TestRequest(context);
            context.res = new testResponse_1.TestResponse();
        }
        return context;
    }
    /**
     * Executes the specified handler with the configured context values
     * @param handler The cloud agnostic handler to execute with the configured cloud context
     */
    invokeHandler(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            const context = yield handler(...this.createRuntimeArgs());
            this.assertions.forEach((fn) => fn());
            return context;
        });
    }
    /**
     * Executes the specified middleware with the configured context values
     * @param middleware The middleware to invoke
     * @param next The middleware next function
     */
    invokeMiddleware(middleware, next) {
        return __awaiter(this, void 0, void 0, function* () {
            next = next || jest.fn(Promise.resolve);
            const context = new testContext_1.TestContext(this.createRuntimeArgs());
            yield middleware(context, next);
            return context;
        });
    }
    createRuntimeArgs() {
        return [this.context, this.event];
    }
}
exports.CloudContextBuilder = CloudContextBuilder;
