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
require("reflect-metadata");
const inversify_1 = require("inversify");
const cloudContainer_1 = require("../cloudContainer");
let TestContext = class TestContext {
    constructor(args) {
        this.runtime = {
            context: {},
            event: {}
        };
        this.providerType = "test";
        if (args && args.length) {
            this.runtime.context = args[0];
            this.runtime.event = args[1];
        }
        this.id = this.runtime.context.id || Math.random().toString(36).substring(7);
        this.event = this.runtime.event;
    }
    send(body, status) {
        if (this.res) {
            this.res.send(body, status);
        }
        this.done();
    }
    ;
    flush() {
    }
    ;
};
TestContext = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(cloudContainer_1.ComponentType.RuntimeArgs))
], TestContext);
exports.TestContext = TestContext;
