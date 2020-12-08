import { ContainerModule } from "inversify";
import { CloudModule } from "@multicloud/sls-core";
/**
 * GCP Module that can be registered in IoC container
 */
export declare class GcpModule implements CloudModule {
    /**
     * Determines whether or not the incoming request is an Gcp request
     * @param req The IoC resolution request
     */
    private isGcpRequest;
    create(): ContainerModule;
}
