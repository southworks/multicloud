import "reflect-metadata";
import { CloudResponse, StringParams } from "@multicloud/sls-core";
import { GcpContext } from ".";
/**
 * Implementation of Cloud Response for GCP Cloud Function
 */
export declare class GcpResponse implements CloudResponse {
    /** The GCP runtime callback */
    private runtime;
    /** The HTTP response body */
    body: any;
    /** The HTTP response status code */
    status: number;
    /** Headers of HTTP Response */
    headers?: StringParams;
    /**
     * Initialize new GCP Response, injecting Cloud Context
     * @param context Current CloudContext
     */
    constructor(context: GcpContext);
    /**
     * Stringify the body
     * @param body Body of HTTP request
     */
    private stringifyJson;
    /**
     * Send HTTP response via provided callback
     * @param body Body of HTTP response
     * @param status Status code of HTTP response
     */
    send(body?: any, status?: number): void;
    flush(): void;
}
