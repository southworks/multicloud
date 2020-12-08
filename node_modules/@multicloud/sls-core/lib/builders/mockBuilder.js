"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockedService_1 = require("./mockedService");
class MockBuilder {
    constructor() {
        this.service = null;
        this.result = null;
        this.error = null;
    }
    /**
     * Set property withCallback
     * @return param withCallback set to true
     */
    makeCallback() {
        this.withCallback = true;
        return this;
    }
    /**
     * Set property service
     * @param service service to mock
     * @return param service set to the service to mock
     */
    setService(service) {
        this.service = service;
        return this;
    }
    /**
     * Set property mtehod
     * @param method method to mock
     * @return param method set to the method to mock
     */
    setMethod(method) {
        this.method = method;
        return this;
    }
    /**
     * Set property result
     * @param result result to mock
     * @return param result set to the result to mock
     */
    setResult(result) {
        this.result = result;
        this.error = null;
        return this;
    }
    /**
     * Set property error
     * @param error error to mock
     * @return param error set to the error to mock
     */
    setError(error) {
        this.error = error;
        this.result = null;
        return this;
    }
    /**
     * Method for build the mock
     * @return Module mocked with all params set
     */
    build() {
        const mock = new mockedService_1.MockedService(this).getMock();
        this.reset();
        return mock;
    }
    /**
     * Get withCallback property
     * @return withCallack value
     */
    isHavingCallback() {
        return this.withCallback;
    }
    /**
     * Get service property
     * @return service value
     */
    getService() {
        return this.service;
    }
    /**
     * Get method property
     * @return method value
     */
    getMethod() {
        return this.method;
    }
    /**
     * Get result property
     * @return result value
     */
    getResult() {
        return this.result;
    }
    /**
     * Get error property
     * @return error value
     */
    getError() {
        return this.error;
    }
    /**
     * Reset all params to the initial values
     * @return service, method, withCallback, result and error set to initial values
     */
    reset() {
        this.service = null;
        this.method = "";
        this.withCallback = false;
        this.result = null;
        this.error = null;
    }
}
exports.MockBuilder = MockBuilder;
