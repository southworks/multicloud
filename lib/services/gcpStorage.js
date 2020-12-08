"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpStorage = void 0;
require("reflect-metadata");
const storage_1 = require("@google-cloud/storage");
const sls_core_1 = require("@multicloud/sls-core");
const inversify_1 = require("inversify");
/**
 * Implementation of CloudStorage for Gcp Bucket storage
 */
let GcpStorage = class GcpStorage {
    /**
     * Initialize new gcp storage service
     */
    constructor() {
        this.storage = new storage_1.Storage({
            projectId: process.env.projectId,
            credentials: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                private_key: process.env.privateKey,
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_email: process.env.clientEmail,
            },
        });
    }
    /**
     * Read a file from an bucket
     * @param opts Container (bucket) and blob (object) to read from in the bucket
     */
    read(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                bucketName: opts.container,
                prefix: opts.path,
            };
            const bucket = yield this.storage.bucket(params.bucketName);
            const file = yield bucket.file(params.prefix);
            return file.createReadStream();
        });
    }
    /**
     * Write an object to a bucket
     * @param opts Container (bucket), blob (object) and body to write to google bucket
     */
    write(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            sls_core_1.Guard.empty(opts.container, "container");
            sls_core_1.Guard.empty(opts.path, "path");
            sls_core_1.Guard.null(opts.body, "body");
            const params = {
                bucketName: opts.container,
                prefix: opts.path,
            };
            const bucket = yield this.storage.bucket(params.bucketName);
            const file = yield bucket.file(params.prefix);
            const readStream = sls_core_1.convertToStream(opts.body);
            return yield new Promise((resolve, reject) => {
                readStream
                    .pipe(file.createWriteStream({
                    resumable: false,
                    validation: false,
                    metadata: { "Cache-Control": "public, max-age=31536000" },
                }))
                    .on("error", (error) => {
                    reject(error);
                })
                    .on("finish", () => __awaiter(this, void 0, void 0, function* () {
                    //TODO add etag and version from metadata, validate that works.
                    const metadata = yield file.getMetadata();
                    resolve({
                        eTag: metadata[0].etag,
                        version: metadata[0].generation,
                    });
                }));
            });
        });
    }
};
GcpStorage = __decorate([
    inversify_1.injectable()
], GcpStorage);
exports.GcpStorage = GcpStorage;
