import "reflect-metadata";
import { CloudRequest } from "../cloudRequest";
import { CloudResponse } from "../cloudResponse";
import { CloudContext, CloudProviderRuntime } from "../cloudContext";
export declare class TestContext implements CloudContext {
    constructor(args?: any[]);
    runtime: CloudProviderRuntime;
    providerType: string;
    id: string;
    event: any;
    container?: any;
    req?: CloudRequest;
    res?: CloudResponse;
    storage?: any;
    logger?: any;
    service?: any;
    telemetry?: any;
    send(body: any, status: number): void;
    done: () => void;
    flush(): void;
}
