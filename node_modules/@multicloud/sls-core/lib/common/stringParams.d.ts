/**
 * Create a case insensitive string parameter map
 * Used in HTTP request / response for headers, query strings & path params
 */
export declare class StringParams<T = any> extends Map<string, T> {
    constructor(entries?: Iterable<[string, T]> | any);
    /**
     * Sets a value at the specified key
     * @param key The key to set
     * @param value The value of the key
     */
    set(key: string, value: T): this;
    /**
     * Gets the value for the specified key
     * @param key The key to get
     */
    get(key: string): T | undefined;
    /**
     * Checks whether a key exists within the map
     * @param key The key to check
     */
    has(key: string): boolean;
    /**
     * Delete the key with the specified value
     * @param key The key to delete
     */
    delete(key: string): boolean;
    /**
     * Serializes the map to a plain javascript object for use with JSON.stringify
     */
    toJSON(): {};
    /**
     * Normalizes the specified key to lower case
     * @param key The key to normalize
     */
    private normalizeKey;
}
