"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const guard_1 = require("./common/guard");
const util_1 = require("./common/util");
const cloudContainer_1 = require("./cloudContainer");
const testModule_1 = require("./test/testModule");
/**
 * Base level app. Handles registration for all cloud modules and
 * manages middleware chain
 */
class App {
    /**
     * Initialize IoC container and register all modules
     * @param modules Array of modules to register
     */
    constructor(...modules) {
        guard_1.Guard.null(modules);
        if (modules.length === 0 || process.env.NODE_ENV === "test") {
            modules.push(new testModule_1.TestModule());
        }
        this.modules = modules;
        this.container = new cloudContainer_1.CloudContainer();
        this.container.registerModule(...modules);
    }
    /**
     * Apply middleware array and initialize handler function
     * @param middlewares Array of middlewares to apply *in order* in application
     * @param handler Serverless Handler function
     */
    use(middlewares, handler) {
        return (...args) => __awaiter(this, void 0, void 0, function* () {
            // Creates a child IoC container for each request into the app
            // This allows multiple calls to the container to reuse the same instance
            // of singleton components such as the `CloudContext`
            const requestContainer = new cloudContainer_1.CloudContainer(this.container);
            requestContainer.registerModule(...this.modules);
            // Bind the runtime arguments sent in from the cloud provider
            // and register them with the IoC container for used in dependency injection
            requestContainer.bind(cloudContainer_1.ComponentType.RuntimeArgs).toConstantValue(args);
            // Retrieve the cloud provider specific cloud context based on the
            // IoC container component registrions & constrints
            // Each cloud provider registers constraints based on the incoming runtime arguments
            const context = requestContainer.resolve(cloudContainer_1.ComponentType.CloudContext);
            context.container = requestContainer;
            context.done = () => undefined;
            let index = 0;
            try {
                const next = () => {
                    const middleware = middlewares[index];
                    let result = null;
                    // Recursively loop through the middleware pipeline
                    if (middleware) {
                        index++;
                        result = middleware(context, next);
                    }
                    else { // When we are out of middlewares, execute the handler
                        result = new Promise((resolve, reject) => {
                            context.done = resolve;
                            return util_1.ensurePromise(handler(context)).catch(reject);
                        });
                    }
                    return util_1.ensurePromise(result);
                };
                // Executes the middleware chain and handler
                yield next();
            }
            finally {
                // Flush the final response to the cloud provider
                context.flush();
            }
            return context;
        });
    }
}
exports.App = App;
