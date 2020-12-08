import "reflect-metadata";
import { ContainerModule, interfaces } from "inversify";
/**
 * Module that can be registered within CloudContainer
 */
export interface CloudModule {
    create: () => ContainerModule;
}
/**
 * Resolver for IoC container
 */
export interface ContainerResolver {
    /**
     * Initialize service according to serviceIdentifier
     * @param serviceIdentifier Type of service to initialize
     */
    resolve<T>(serviceIdentifier: string): T;
}
/**
 * Handles registration for IoC container
 */
export interface ContainerRegister {
    /**
     * Register CloudModules in IoC container
     * @param modules Array of CloudModules to register in IoC container
     */
    registerModule(...modules: CloudModule[]): void;
}
/**
 * Binder of service implementations to IoC container
 */
export interface ContainerBind {
    /** Bind an implementation of the service identifier to the IoC container */
    bind<T>(serviceIdentifier: any): interfaces.BindingToSyntax<T>;
}
/**
 * Type of Component for registration and resolution
 */
export declare enum ComponentType {
    /** Arguments provided at runtime to function */
    RuntimeArgs = "RuntimeArgs",
    /** Common cloud context */
    CloudContext = "CloudContext",
    /** Common cloud request */
    CloudRequest = "CloudRequest",
    /** Common cloud response */
    CloudResponse = "CloudResponse",
    /** Common cloud invocation service */
    CloudService = "CloudService",
    /** Common cloud storage service */
    CloudStorage = "CloudStorage"
}
/**
 * IoC Container for instantiation of common cloud services
 */
export declare class CloudContainer implements ContainerResolver, ContainerRegister, ContainerBind {
    private parent?;
    private container;
    constructor(parent?: CloudContainer);
    /**
     * Register modules within container
     * @param modules Array of modules to register within container
     */
    registerModule(...modules: CloudModule[]): void;
    /**
     * Returns instantiation of service
     * @param serviceIdentifier Type of service to instantiate
     */
    resolve<T>(serviceIdentifier: string): T;
    /**
     * Bind an implementation of a service identifier to the CloudContainer
     * @param serviceIdentifier Type of service to bind
     */
    bind<T>(serviceIdentifier: any): interfaces.BindingToSyntax<T>;
}
