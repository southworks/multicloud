import { MockedService } from "./mockedService";
export declare class MockBuilder {
    service: any;
    method: string;
    withCallback: boolean;
    result: any;
    error: any;
    /**
     * Set property withCallback
     * @return param withCallback set to true
     */
    makeCallback(): this;
    /**
     * Set property service
     * @param service service to mock
     * @return param service set to the service to mock
     */
    setService(service: any): MockBuilder;
    /**
     * Set property mtehod
     * @param method method to mock
     * @return param method set to the method to mock
     */
    setMethod(method: string): MockBuilder;
    /**
     * Set property result
     * @param result result to mock
     * @return param result set to the result to mock
     */
    setResult(result: any): MockBuilder;
    /**
     * Set property error
     * @param error error to mock
     * @return param error set to the error to mock
     */
    setError(error: any): MockBuilder;
    /**
     * Method for build the mock
     * @return Module mocked with all params set
     */
    build(): MockedService;
    /**
     * Get withCallback property
     * @return withCallack value
     */
    isHavingCallback(): boolean;
    /**
     * Get service property
     * @return service value
     */
    getService(): any;
    /**
     * Get method property
     * @return method value
     */
    getMethod(): string;
    /**
     * Get result property
     * @return result value
     */
    getResult(): any;
    /**
     * Get error property
     * @return error value
     */
    getError(): any;
    /**
     * Reset all params to the initial values
     * @return service, method, withCallback, result and error set to initial values
     */
    private reset;
}
