import "reflect-metadata";
import { CloudService } from "../services/cloudService";
export declare class TestCloudService implements CloudService {
    invoke<T>(): Promise<T>;
}
