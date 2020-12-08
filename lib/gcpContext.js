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
exports.GcpContext = void 0;
require("reflect-metadata");
const sls_core_1 = require("@multicloud/sls-core");
const inversify_1 = require("inversify");
const models_1 = require("./models");
/**
 * Implementation of Cloud Context for GCP Function
 */
let GcpContext = class GcpContext {
    /**
     * Initializes new GcpContext, injects runtime arguments of GCP Functions.
     * Sets runtime parameters from original arguments
     * @param args Runtime arguments for GCP Function.
     */
    constructor(args) {
        this.providerType = "gcp";
        const isBackgroundFunction = args && args[1].eventId;
        if (isBackgroundFunction) {
            this.runtime = new models_1.GcpBackgroundFunctionRuntime();
            this.runtime.callback = args[2];
            this.id = isBackgroundFunction;
            this.isHttpRequest = false;
        }
        else {
            this.runtime = new models_1.GcpHttpFunctionRuntime();
            this.id = args[0].headers["x-appengine-request-log-id"];
            this.isHttpRequest = true;
        }
        this.runtime.event = args[0];
        this.runtime.context = args[1];
        // GCP has a single incoming event source
        this.event = this.runtime.event; // https://www.serverless.com/framework/docs/providers/google/guide/events/
    }
    /**
     * Send response from GCP Function
     * @param body Body of response
     * @param status Status code of response
     */
    send(body, status = 200) {
        if (this.res) {
            this.res.send(body, status);
        }
        this.done();
    }
    flush() {
        if (this.res) {
            this.res.flush();
        }
    }
};
GcpContext = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sls_core_1.ComponentType.RuntimeArgs))
], GcpContext);
exports.GcpContext = GcpContext;
