import { CloudProviderRuntime } from "@multicloud/sls-core";

export interface GcpFunctionRuntime extends CloudProviderRuntime {
  event: any;
  callback: (err, response) => void;
  context: {
    eventId: string;
    eventType: string;
    timestamp: string;
  };
}