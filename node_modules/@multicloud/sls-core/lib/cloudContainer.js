"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const guard_1 = require("./common/guard");
/**
 * Type of Component for registration and resolution
 */
var ComponentType;
(function (ComponentType) {
    /** Arguments provided at runtime to function */
    ComponentType["RuntimeArgs"] = "RuntimeArgs";
    /** Common cloud context */
    ComponentType["CloudContext"] = "CloudContext";
    /** Common cloud request */
    ComponentType["CloudRequest"] = "CloudRequest";
    /** Common cloud response */
    ComponentType["CloudResponse"] = "CloudResponse";
    /** Common cloud invocation service */
    ComponentType["CloudService"] = "CloudService";
    /** Common cloud storage service */
    ComponentType["CloudStorage"] = "CloudStorage";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
/**
 * IoC Container for instantiation of common cloud services
 */
class CloudContainer {
    constructor(parent) {
        this.parent = parent;
        this.container = new inversify_1.Container();
        if (this.parent) {
            this.container.parent = parent.container;
        }
    }
    /**
     * Register modules within container
     * @param modules Array of modules to register within container
     */
    registerModule(...modules) {
        const containerModules = modules.map((module) => module.create());
        this.container.load(...containerModules);
    }
    /**
     * Returns instantiation of service
     * @param serviceIdentifier Type of service to instantiate
     */
    resolve(serviceIdentifier) {
        guard_1.Guard.empty(serviceIdentifier, "serviceIdentifier", "service identifier cannot be empty or undefined");
        try {
            return this.container.get(serviceIdentifier);
        }
        catch (e) {
            return null;
        }
    }
    /**
     * Bind an implementation of a service identifier to the CloudContainer
     * @param serviceIdentifier Type of service to bind
     */
    bind(serviceIdentifier) {
        guard_1.Guard.empty(serviceIdentifier, "serviceIdentifier", "service identifier cannot be empty or undefined");
        return this.container.isBound(serviceIdentifier)
            ? this.container.rebind(serviceIdentifier)
            : this.container.bind(serviceIdentifier);
    }
}
exports.CloudContainer = CloudContainer;
