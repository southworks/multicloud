"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const cloudContainer_1 = require("../cloudContainer");
const testContext_1 = require("./testContext");
const testRequest_1 = require("./testRequest");
const testResponse_1 = require("./testResponse");
const testCloudService_1 = require("./testCloudService");
const testCloudStorage_1 = require("./testCloudStorage");
class TestModule {
    static isTestEnvironment() {
        return process.env.NODE_ENV === "test";
    }
    static isHttpRequest(req) {
        const runtimeArgs = req.parentContext.container.get(cloudContainer_1.ComponentType.RuntimeArgs);
        return runtimeArgs && runtimeArgs[1] && runtimeArgs[1].method;
    }
    create() {
        return new inversify_1.ContainerModule((bind) => {
            bind(cloudContainer_1.ComponentType.CloudContext)
                .to(testContext_1.TestContext)
                .inSingletonScope()
                .when(TestModule.isTestEnvironment);
            bind(cloudContainer_1.ComponentType.CloudRequest)
                .to(testRequest_1.TestRequest)
                .when((req) => TestModule.isTestEnvironment() && TestModule.isHttpRequest(req));
            bind(cloudContainer_1.ComponentType.CloudResponse)
                .to(testResponse_1.TestResponse)
                .when((req) => TestModule.isTestEnvironment() && TestModule.isHttpRequest(req));
            bind(cloudContainer_1.ComponentType.CloudService)
                .to(testCloudService_1.TestCloudService)
                .when(TestModule.isTestEnvironment);
            bind(cloudContainer_1.ComponentType.CloudStorage)
                .to(testCloudStorage_1.TestCloudStorage)
                .when(TestModule.isTestEnvironment);
        });
    }
}
exports.TestModule = TestModule;
