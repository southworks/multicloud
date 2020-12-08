import "reflect-metadata";
import { CloudRequest, StringParams } from "@multicloud/sls-core";
import { GcpContext } from "./gcpContext";
/**
 * Implementation of Cloud Request for Gcp Functions
 */
export declare class GcpRequest implements CloudRequest {
    /** Body of HTTP request */
    body?: any;
    /** Headers of HTTP request */
    headers?: StringParams;
    /** HTTP method of request */
    method: string;
    /** Query params of HTTP request */
    query?: StringParams;
    /** Path params of HTTP request */
    pathParams?: StringParams;
    /**
     * Parse the body
     * @param body Body of HTTP request
     */
    private parseJson;
    /**
     * Initialize new Gcp Request, injecting Cloud Context
     * @param context Current CloudContext
     */
    constructor(context: GcpContext);
}
