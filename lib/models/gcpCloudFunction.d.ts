import { GcpResponse } from "../gcpResponse";
import { CloudProviderRuntime } from "@multicloud/sls-core";
export interface GcpFunctionRuntime extends CloudProviderRuntime {
    callback: (err: any, response: any) => void;
    flush(response: GcpResponse): void;
}
