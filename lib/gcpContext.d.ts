import "reflect-metadata";
import { GcpRequest, GcpResponse } from ".";
import { CloudContext, CloudStorage } from "@multicloud/sls-core";
import { GcpFunctionRuntime } from "./models";
/**
 * Implementation of Cloud Context for GCP Function
 */
export declare class GcpContext implements CloudContext {
    /**
     * Initializes new GcpContext, injects runtime arguments of GCP Functions.
     * Sets runtime parameters from original arguments
     * @param args Runtime arguments for GCP Function.
     */
    constructor(args: any[]);
    /** Google Cloud storage */
    storage: CloudStorage;
    /** "gcp" */
    providerType: string;
    /** Unique identifier for request */
    id: string;
    /** The incoming event source */
    event: any;
    /** HTTP Request */
    req: GcpRequest;
    /** HTTP Response */
    res: GcpResponse;
    /** Original runtime arguments for GCP Function */
    runtime: GcpFunctionRuntime;
    /** Signals to the framework that the request is complete */
    done: () => void;
    /** Identifies if we are in the context of a http request or not */
    isHttpRequest: boolean;
    /**
     * Send response from GCP Function
     * @param body Body of response
     * @param status Status code of response
     */
    send(body: any, status?: number): void;
    flush(): void;
}
