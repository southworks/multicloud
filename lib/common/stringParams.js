"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guard_1 = require("./guard");
/**
 * Create a case insensitive string parameter map
 * Used in HTTP request / response for headers, query strings & path params
 */
class StringParams extends Map {
    constructor(entries) {
        if (entries && entries.constructor && entries.constructor.name === "Object") {
            entries = Object.keys(entries).map((key) => [key, entries[key]]);
        }
        super(entries);
    }
    /**
     * Sets a value at the specified key
     * @param key The key to set
     * @param value The value of the key
     */
    set(key, value) {
        guard_1.Guard.empty(key);
        return super.set(this.normalizeKey(key), value);
    }
    /**
     * Gets the value for the specified key
     * @param key The key to get
     */
    get(key) {
        guard_1.Guard.empty(key);
        return super.get(this.normalizeKey(key));
    }
    /**
     * Checks whether a key exists within the map
     * @param key The key to check
     */
    has(key) {
        guard_1.Guard.empty(key);
        return super.has(this.normalizeKey(key));
    }
    /**
     * Delete the key with the specified value
     * @param key The key to delete
     */
    delete(key) {
        guard_1.Guard.empty(key);
        return super.delete(this.normalizeKey(key));
    }
    /**
     * Serializes the map to a plain javascript object for use with JSON.stringify
     */
    toJSON() {
        const output = {};
        this.forEach((value, key) => {
            output[key] = value;
        });
        return output;
    }
    /**
     * Normalizes the specified key to lower case
     * @param key The key to normalize
     */
    normalizeKey(key) {
        return key.toLowerCase();
    }
}
exports.StringParams = StringParams;
