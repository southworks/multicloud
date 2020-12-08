"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MockedService {
    constructor(builder) {
        this.mock = null;
        this.service = builder.getService();
        this.method = builder.getMethod();
        this.result = builder.getResult();
        this.error = builder.getError();
        this.isHavingCallback = builder.isHavingCallback();
        this.mockFunction(this.service, this.method, this.error, this.result);
    }
    /**
    * Returns the mock to be used in the unit tests
    * @return jest mock object
    */
    getMock() {
        return this.mock;
    }
    /**
     * Creates a mock function for services to used in the unit tests
     * @param service Service to mock
     * @param methodName Method name to mock
     * @param error Error value
     * @param result Result value
     */
    mockFunction(service, methodName, error, result) {
        let mock;
        if (this.isHavingCallback) {
            mock = jest.fn((_, callback) => {
                callback(error, result);
            });
        }
        else {
            mock = jest.fn(() => {
                if (error) {
                    throw error;
                }
                return result;
            });
        }
        if (service.mockImplementation) {
            service.mockImplementation(() => ({
                [methodName]: mock
            }));
        }
        else {
            service[methodName] = mock;
        }
        this.mock = mock;
    }
}
exports.MockedService = MockedService;
