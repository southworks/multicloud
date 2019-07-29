import "reflect-metadata";
import { inject, injectable } from "inversify";
import { CloudResponse, ComponentType } from "@multicloud/sls-core";
import { AzureContext } from "./azureContext";

/**
 * Implementation of Cloud Response for Azure Functions
 */
@injectable()
export class AzureResponse implements CloudResponse {
  /** Original runtime from Azure Function context */
  public runtime: any;

  /** The HTTP response body */
  public body: any;

  /** The HTTP response status code */
  public status: number = 200;

  /** Headers of HTTP Response */
  public headers?: { [key: string]: any };

  /**
   * Initialize new Azure Response, injecting Cloud Context
   * @param context Current CloudContext
   */
  public constructor(
    @inject(ComponentType.CloudContext) context: AzureContext
  ) {
    this.runtime = context.runtime;
    this.headers = context.runtime.res.headers || {};
  }

  /**
   * Send HTTP response
   * @param body Body of HTTP response
   * @param status Status code of HTTP response
   */
  public send(body: any, status: number = 200): void {
    this.body = body;
    this.status = status;
  }

  public flush() {
    const response = {
      status: this.status,
      body: this.body,
      headers: this.headers,
    };

    // Find the registered output binding for the function
    const outputBinding = this.runtime.bindingDefinitions
      .find((binding) => binding.direction === "out" && binding.type === "http");

    // If an output binding has been defined and it is not the
    // default $return binding then set the "res" on the runtime
    // The Azure functions framework will then set the output bindings to the value of runtime.res
    if (outputBinding && outputBinding.name !== "$return") {
      this.runtime.res = response;
    } else { // Otherwise call the done callback with the response
      this.runtime.done(null, response);
    }
  }
}
