export declare class HelperUtils {
    /**
     * Safe version of axios GET call
     *
     * @param payload payload of axios GET request
     * @returns response of axios GET
     * Throws `AxiosRequestFailureError` if request goes wrong
     */
    static axiosHelper(payload: string): Promise<any>;
    /**
     * Safe version of reading JSON from a local file location
     *
     * @param location local file location
     * @returns JSON object from parsed file
     * Throws `ReadFileJsonFailureError` if reading or parsing fails
     */
    static fileReaderJSON(location: string): Promise<any>;
    /**
     * Safe version of parsing string to JSON object
     *
     * @param payload JSON string to parse into object
     * @returns JSON object from string
     * Throws `JsonParseError` if parsing fails
     */
    static parseJSON(payload: string): any;
}
//# sourceMappingURL=HelperUtils.d.ts.map