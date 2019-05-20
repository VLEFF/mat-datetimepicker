export declare class FuseUtils {
    /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
    static filterArrayByString(mainArr: any, searchText: any): any;
    /**
     * Search in object
     *
     * @param itemObj
     * @param searchText
     * @returns {boolean}
     */
    static searchInObj(itemObj: any, searchText: any): boolean;
    /**
     * Search in array
     *
     * @param arr
     * @param searchText
     * @returns {boolean}
     */
    static searchInArray(arr: any, searchText: any): boolean;
    /**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
    static searchInString(value: any, searchText: any): any;
    /**
     * Generate a unique GUID
     *
     * @returns {string}
     */
    static generateGUID(): string;
    /**
     * Toggle in array
     *
     * @param item
     * @param array
     */
    static toggleInArray(item: any, array: any): void;
    /**
     * Handleize
     *
     * @param text
     * @returns {string}
     */
    static handleize(text: any): string;
}
