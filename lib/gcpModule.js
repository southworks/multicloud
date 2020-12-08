"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpModule = void 0;
const inversify_1 = require("inversify");
const sls_core_1 = require("@multicloud/sls-core");
//gcp context , request, response and storage
const _1 = require(".");
const services_1 = require("./services");
/**
 * GCP Module that can be registered in IoC container
 */
class GcpModule {
    /**
     * Determines whether or not the incoming request is an Gcp request
     * @param req The IoC resolution request
     */
    isGcpRequest(req) {
        const runtimeArgs = req.parentContext.container.get(sls_core_1.ComponentType.RuntimeArgs);
        const isBackgroundFunction = runtimeArgs && runtimeArgs[1].eventId;
        const isHttpFunction = runtimeArgs && runtimeArgs[0]._readableState && runtimeArgs[0]._readableState.highWaterMark;
        return isBackgroundFunction || isHttpFunction;
    }
    create() {
        return new inversify_1.ContainerModule((bind) => {
            bind(sls_core_1.ComponentType.CloudContext)
                .to(_1.GcpContext)
                .inSingletonScope()
                .when(this.isGcpRequest);
            bind(sls_core_1.ComponentType.CloudRequest)
                .to(_1.GcpRequest)
                .when(this.isGcpRequest);
            bind(sls_core_1.ComponentType.CloudResponse)
                .to(_1.GcpResponse)
                .when(this.isGcpRequest);
            bind(sls_core_1.ComponentType.CloudService)
                .to(services_1.GcpFunctionCloudService)
                .when(this.isGcpRequest);
            bind(sls_core_1.ComponentType.CloudStorage)
                .to(services_1.GcpStorage)
                .when(this.isGcpRequest);
        });
    }
}
exports.GcpModule = GcpModule;
