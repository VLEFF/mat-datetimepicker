import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const FUSE_MATERIAL_COLOR_PICKER_VALUE_ACCESSOR: any;
export declare class FuseMaterialColorPickerComponent implements ControlValueAccessor {
    colors: any;
    hues: string[];
    view: string;
    selectedColor: any;
    selectedPalette: string;
    selectedHue: string;
    colorChanged: EventEmitter<any>;
    private _color;
    private _modelChange;
    private _modelTouched;
    /**
     * Constructor
     */
    constructor();
    /**
     * Selected class
     *
     * @param value
     */
    color: string;
    /**
     * Register on change function
     *
     * @param fn
     */
    registerOnChange(fn: any): void;
    /**
     * Register on touched function
     *
     * @param fn
     */
    registerOnTouched(fn: any): void;
    /**
     * Write value to the view from model
     *
     * @param color
     */
    writeValue(color: any): void;
    /**
     * Select palette
     *
     * @param event
     * @param palette
     */
    selectPalette(event: any, palette: any): void;
    /**
     * Select hue
     *
     * @param event
     * @param hue
     */
    selectHue(event: any, hue: any): void;
    /**
     * Remove color
     *
     * @param event
     */
    removeColor(event: any): void;
    /**
     * Update selected color
     */
    updateSelectedColor(): void;
    /**
     * Go to palettes view
     *
     * @param event
     */
    goToPalettesView(event: any): void;
    /**
     * On menu open
     */
    onMenuOpen(): void;
}
