/// <reference types="node" />
import "reflect-metadata";
import { CloudStorage, ReadBlobOptions, WriteBlobOptions, WriteBlobOutput } from "@multicloud/sls-core";
import { Stream } from "stream";
/**
 * Implementation of CloudStorage for Gcp Bucket storage
 */
export declare class GcpStorage implements CloudStorage {
    private storage;
    /**
     * Initialize new gcp storage service
     */
    constructor();
    /**
     * Read a file from an bucket
     * @param opts Container (bucket) and blob (object) to read from in the bucket
     */
    read(opts: ReadBlobOptions): Promise<Stream>;
    /**
     * Write an object to a bucket
     * @param opts Container (bucket), blob (object) and body to write to google bucket
     */
    write(opts: WriteBlobOptions): Promise<WriteBlobOutput>;
}
