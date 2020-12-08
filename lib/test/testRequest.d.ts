import "reflect-metadata";
import { CloudRequest } from "../cloudRequest";
import { CloudContext } from "../cloudContext";
import { StringParams } from "../common/stringParams";
export declare class TestRequest implements CloudRequest {
    private context;
    constructor(context: CloudContext);
    body: any;
    method: string;
    headers: StringParams;
    query: StringParams;
    pathParams: StringParams;
}
