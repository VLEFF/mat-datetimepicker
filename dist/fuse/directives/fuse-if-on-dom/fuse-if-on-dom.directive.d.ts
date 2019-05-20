import { AfterContentChecked, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
export declare class FuseIfOnDomDirective implements AfterContentChecked {
    private _elementRef;
    private _templateRef;
    private _viewContainerRef;
    isCreated: boolean;
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {TemplateRef<any>} _templateRef
     * @param {ViewContainerRef} _viewContainerRef
     */
    constructor(_elementRef: ElementRef, _templateRef: TemplateRef<any>, _viewContainerRef: ViewContainerRef);
    /**
     * After content checked
     */
    ngAfterContentChecked(): void;
}
