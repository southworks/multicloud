"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpBackgroundFunctionRuntime = void 0;
class GcpBackgroundFunctionRuntime {
    flush(response) {
        this.callback(null, {
            headers: response.headers.toJSON(),
            body: response.body,
            statusCode: response.status,
        });
    }
}
exports.GcpBackgroundFunctionRuntime = GcpBackgroundFunctionRuntime;
