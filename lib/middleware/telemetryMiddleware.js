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
const os_1 = require("os");
/**
 *
 * @param options Options for Telemetry
 */
exports.TelemetryServiceMiddleware = (options) => (context, next) => __awaiter(this, void 0, void 0, function* () {
    const initialCpuAverage = CpuAverage();
    const usedMemBeforeChain = GetUsedMemory();
    context.telemetry = options.telemetryService;
    yield next();
    const finalCpuAverage = CpuAverage();
    const consumeCpuIdle = finalCpuAverage.idle - initialCpuAverage.idle;
    const consumeCpuTick = finalCpuAverage.tick - initialCpuAverage.tick;
    const memoryConsume = GetUsedMemory() - usedMemBeforeChain;
    const stats = {
        consumeCpuIdle,
        consumeCpuTick,
        memoryConsume
    };
    context.telemetry.collect("stats", stats);
    if (options.shouldFlush) {
        context.telemetry.flush();
    }
});
const CpuAverage = () => {
    //Initialise sum of idle and time of cores and fetch CPU info
    var totalIdle = 0, totalTick = 0;
    var myCpus = os_1.cpus();
    //Loop through CPU cores
    for (var i = 0, len = myCpus.length; i < len; i++) {
        //Select CPU core
        var cpu = myCpus[i];
        //Total up the time in the cores tick
        totalTick += cpu.times.user;
        totalTick += cpu.times.nice;
        totalTick += cpu.times.sys;
        totalTick += cpu.times.idle;
        totalTick += cpu.times.irq;
        //Total up the idle time of the core
        totalIdle += cpu.times.idle;
    }
    //Return the average Idle and Tick times
    return { idle: totalIdle / myCpus.length, tick: totalTick / myCpus.length };
};
const GetUsedMemory = () => {
    return os_1.totalmem() - os_1.freemem();
};
