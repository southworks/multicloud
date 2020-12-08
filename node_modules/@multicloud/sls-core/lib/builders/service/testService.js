"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* This is a simple test service created with the goal of explain how to use the mockBuilder
*/
class TestService {
    getMessage(message, callback) {
        this.message = message;
        callback(null, this.message);
    }
    returnHello(name) {
        return `hello ${name}`;
    }
}
exports.TestService = TestService;
