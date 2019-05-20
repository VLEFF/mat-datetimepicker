import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FuseMatchMediaService } from '../../services/match-media.service';
export declare class FuseInnerScrollDirective implements OnInit, OnDestroy {
    private _elementRef;
    private _fuseMediaMatchService;
    private _renderer;
    private _parent;
    private _grandParent;
    private _unsubscribeAll;
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {FuseMatchMediaService} _fuseMediaMatchService
     * @param {Renderer2} _renderer
     */
    constructor(_elementRef: ElementRef, _fuseMediaMatchService: FuseMatchMediaService, _renderer: Renderer2);
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Add the class name
     *
     * @private
     */
    private _addClass;
    /**
     * Remove the class name
     * @private
     */
    private _removeClass;
}
