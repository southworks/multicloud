import { MockBuilder } from "./mockBuilder";
export declare class MockedService {
    mock: any;
    service: Function;
    method: string;
    builder: Function;
    result: Function;
    error: Error;
    isHavingCallback: boolean;
    constructor(builder: MockBuilder);
    /**
    * Returns the mock to be used in the unit tests
    * @return jest mock object
    */
    getMock(): MockedService;
    /**
     * Creates a mock function for services to used in the unit tests
     * @param service Service to mock
     * @param methodName Method name to mock
     * @param error Error value
     * @param result Result value
     */
    mockFunction(service: any, methodName: string, error: Error, result: any): void;
}
