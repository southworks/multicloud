import "reflect-metadata";
import { ContainerModule } from "inversify";
import { CloudModule } from "../cloudContainer";
export declare class TestModule implements CloudModule {
    private static isTestEnvironment;
    private static isHttpRequest;
    create(): ContainerModule;
}
