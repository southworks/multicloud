"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpResponse = void 0;
require("reflect-metadata");
const sls_core_1 = require("@multicloud/sls-core");
const inversify_1 = require("inversify");
/**
 * Implementation of Cloud Response for GCP Cloud Function
 */
let GcpResponse = class GcpResponse {
    /**
     * Initialize new GCP Response, injecting Cloud Context
     * @param context Current CloudContext
     */
    constructor(context) {
        /** The HTTP response status code */
        this.status = 200;
        /** Headers of HTTP Response */
        this.headers = new sls_core_1.StringParams();
        this.headers.set(sls_core_1.CloudProviderResponseHeader, "gcp");
        this.runtime = context.runtime;
    }
    /**
     * Stringify the body
     * @param body Body of HTTP request
     */
    stringifyJson(body) {
        if (typeof (body) === "string")
            return body;
        if (!body)
            return null;
        let stringifyBody = null;
        try {
            stringifyBody = JSON.stringify(body);
        }
        catch (e) {
            throw {
                status: 400,
                error: "Format not supported. The supported response types are JSON and text."
            };
        }
        return stringifyBody;
    }
    /**
     * Send HTTP response via provided callback
     * @param body Body of HTTP response
     * @param status Status code of HTTP response
     */
    send(body = null, status = 200) {
        const responseBody = this.stringifyJson(body);
        this.body = responseBody;
        this.status = status;
        if (!body) {
            return;
        }
        const bodyType = body.constructor.name;
        if (["Object", "Array"].includes(bodyType)) {
            this.headers.set("Content-Type", "application/json");
        }
        if (["String"].includes(bodyType)) {
            this.headers.set("Content-Type", "text/html");
        }
    }
    flush() {
        this.runtime.flush(this);
    }
};
GcpResponse = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sls_core_1.ComponentType.CloudContext))
], GcpResponse);
exports.GcpResponse = GcpResponse;
