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
const cloudContainer_1 = require("../cloudContainer");
/**
 * Middleware for adding the storage service to the context object.
 * It will allow to read, upload and delete files in the cloud.
 */
exports.StorageMiddleware = () => (context, next) => __awaiter(this, void 0, void 0, function* () {
    context.storage = context.container.resolve(cloudContainer_1.ComponentType.CloudStorage);
    yield next();
});
