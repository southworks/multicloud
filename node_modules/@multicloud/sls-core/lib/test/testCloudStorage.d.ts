/// <reference types="node" />
import "reflect-metadata";
import { Stream } from "stream";
import { CloudStorage, WriteBlobOutput } from "../services/cloudStorage";
export declare class TestCloudStorage implements CloudStorage {
    read(): Promise<Stream>;
    write(): Promise<WriteBlobOutput>;
}
