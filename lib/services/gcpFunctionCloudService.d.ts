import { CloudService, ContainerResolver, CloudServiceOptions, CloudContext } from "@multicloud/sls-core";
import { Method } from "axios";
/**
 * Options for invocation of GCP function
 */
export interface GcpCloudServiceOptions extends CloudServiceOptions {
    /** Name of function to invoke */
    name: string;
    /** HTTP method of invocation */
    method: Method;
    /** URL for invocation */
    http: string;
}
/**
 * Implementation of Cloud Service for GCP Functions. Invokes Functions
 * with exposed HTTP endpoints
 */
export declare class GcpFunctionCloudService implements CloudService {
    constructor(context: CloudContext);
    containerResolver: ContainerResolver;
    /**
     *
     * @param name Name of function to invoke
     * @param fireAndForget Wait for response if false (default behavior)
     * @param payload Body of HTTP request
     */
    invoke<T>(name: string, fireAndForget?: boolean, payload?: any): Promise<any>;
}
