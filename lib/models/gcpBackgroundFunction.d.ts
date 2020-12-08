import { GcpResponse } from "../gcpResponse";
import { GcpFunctionRuntime } from "./gcpCloudFunction";
export declare class GcpBackgroundFunctionRuntime implements GcpFunctionRuntime {
    event: any;
    context: {
        eventId: string;
    };
    callback: (err: any, response: any) => void;
    flush(response: GcpResponse): void;
}
