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
const stringParams_1 = require("../common/stringParams");
let TestRequest = class TestRequest {
    constructor(context) {
        this.context = context;
        this.method = this.context.runtime.event.method;
        this.headers = new stringParams_1.StringParams(this.context.runtime.event.headers);
        this.query = new stringParams_1.StringParams(this.context.runtime.event.query);
        this.pathParams = new stringParams_1.StringParams(this.context.runtime.event.pathParams);
        this.body = this.context.runtime.event.body;
    }
};
TestRequest = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(cloudContainer_1.ComponentType.CloudContext))
], TestRequest);
exports.TestRequest = TestRequest;
