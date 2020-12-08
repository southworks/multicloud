import "reflect-metadata";
import { CloudResponse } from "../cloudResponse";
import { StringParams } from "../common/stringParams";
export declare class TestResponse implements CloudResponse {
    body: string;
    status: number;
    headers: StringParams;
    send(body: any, status: number): void;
    flush(): void;
}
