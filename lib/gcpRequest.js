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
exports.GcpRequest = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const sls_core_1 = require("@multicloud/sls-core");
/**
 * Implementation of Cloud Request for Gcp Functions
 */
let GcpRequest = class GcpRequest {
    /**
     * Initialize new Gcp Request, injecting Cloud Context
     * @param context Current CloudContext
     */
    constructor(context) {
        const req = context.runtime.event;
        const body = this.parseJson(req.body);
        this.body = body;
        this.headers = new sls_core_1.StringParams(req.headers);
        this.method = req.method || "";
        this.query = new sls_core_1.StringParams(req.query);
        this.pathParams = new sls_core_1.StringParams(req.params);
    }
    /**
     * Parse the body
     * @param body Body of HTTP request
     */
    parseJson(body) {
        if (!body)
            return null;
        try {
            if (typeof (body) === "string") {
                const parsedBody = JSON.parse(body);
                return parsedBody;
            }
            JSON.stringify(body);
            return body;
        }
        catch (e) {
            throw {
                status: 400,
                error: "Format not supported. The supported response types are JSON and text."
            };
        }
    }
};
GcpRequest = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sls_core_1.ComponentType.CloudContext))
], GcpRequest);
exports.GcpRequest = GcpRequest;
