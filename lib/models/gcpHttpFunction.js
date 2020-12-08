"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GcpHttpFunctionRuntime = void 0;
class GcpHttpFunctionRuntime {
    flush(response) {
        this.context.set(response.headers.toJSON());
        this.context.status(response.status).send(response.body);
    }
}
exports.GcpHttpFunctionRuntime = GcpHttpFunctionRuntime;
