import { AfterContentInit, ElementRef, QueryList, Renderer2 } from '@angular/core';
import { FuseWidgetToggleDirective } from './widget-toggle.directive';
export declare class FuseWidgetComponent implements AfterContentInit {
    private _elementRef;
    private _renderer;
    flipped: boolean;
    toggleButtons: QueryList<FuseWidgetToggleDirective>;
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    constructor(_elementRef: ElementRef, _renderer: Renderer2);
    /**
     * After content init
     */
    ngAfterContentInit(): void;
    /**
     * Toggle the flipped status
     */
    toggle(): void;
}
