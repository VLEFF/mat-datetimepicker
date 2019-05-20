export declare class FuseCopierService {
    private textarea;
    /**
     * Copy the text value to the clipboard
     *
     * @param {string} text
     * @returns {boolean}
     */
    copyText(text: string): boolean;
    /**
     * Creates a hidden textarea element, sets its value from `text` property,
     * and makes a selection on it.
     *
     * @param {string} text
     */
    private createTextareaAndSelect;
    /**
     * Remove the text area from the DOM
     *
     * @private
     */
    private _removeFake;
}
