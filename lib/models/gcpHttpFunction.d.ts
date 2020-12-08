import { GcpResponse } from "../gcpResponse";
import { GcpFunctionRuntime } from "./gcpCloudFunction";
export declare class GcpHttpFunctionRuntime implements GcpFunctionRuntime {
    event: any;
    context: {
        set: any;
        status: any;
        send: any;
    };
    callback: (err: any, response: any) => void;
    flush(response: GcpResponse): void;
}
