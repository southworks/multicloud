import { CloudModule } from "./cloudContainer";
import { CloudContext } from "./cloudContext";
/**
 * Base level app. Handles registration for all cloud modules and
 * manages middleware chain
 */
export declare class App {
    private container;
    private modules;
    /**
     * Initialize IoC container and register all modules
     * @param modules Array of modules to register
     */
    constructor(...modules: CloudModule[]);
    /**
     * Apply middleware array and initialize handler function
     * @param middlewares Array of middlewares to apply *in order* in application
     * @param handler Serverless Handler function
     */
    use(middlewares: Middleware[], handler: Handler): Function;
}
/**
 * Middleware type
 * @param context Cloud Context for Serverless function
 * @param next Next function to call in middleware chain
 */
export declare type Middleware = (context: CloudContext, next: () => Promise<void>) => Promise<void>;
/**
 * Serverless Handler type
 * @param context Cloud Context for Serverless function
 */
export declare type Handler = (context: CloudContext) => Promise<void> | void;
