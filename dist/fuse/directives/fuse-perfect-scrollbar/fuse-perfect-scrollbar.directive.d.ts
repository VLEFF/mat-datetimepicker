import { AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import PerfectScrollbar from 'perfect-scrollbar';
import { FuseConfigService } from '../../services/config.service';
export declare class FusePerfectScrollbarDirective implements AfterViewInit, OnDestroy {
    elementRef: ElementRef;
    private _fuseConfigService;
    private _platform;
    private _router;
    isInitialized: boolean;
    isMobile: boolean;
    ps: PerfectScrollbar | any;
    private _enabled;
    private _debouncedUpdate;
    private _options;
    private _unsubscribeAll;
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     * @param {FuseConfigService} _fuseConfigService
     * @param {Platform} _platform
     * @param {Router} _router
     */
    constructor(elementRef: ElementRef, _fuseConfigService: FuseConfigService, _platform: Platform, _router: Router);
    /**
     * Perfect Scrollbar options
     *
     * @param value
     */
    fusePerfectScrollbarOptions: any;
    /**
     * Is enabled
     *
     * @param {boolean | ""} value
     */
    enabled: boolean | '';
    /**
     * After view init
     */
    ngAfterViewInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Initialize
     *
     * @private
     */
    _init(): void;
    /**
     * Destroy
     *
     * @private
     */
    _destroy(): void;
    /**
     * Update scrollbars on window resize
     *
     * @private
     */
    _updateOnResize(): void;
    /**
     * Document click
     *
     * @param {Event} event
     */
    documentClick(event: Event): void;
    /**
     * Update the scrollbar
     */
    update(): void;
    /**
     * Destroy the scrollbar
     */
    destroy(): void;
    /**
     * Scroll to X
     *
     * @param {number} x
     * @param {number} speed
     */
    scrollToX(x: number, speed?: number): void;
    /**
     * Scroll to Y
     *
     * @param {number} y
     * @param {number} speed
     */
    scrollToY(y: number, speed?: number): void;
    /**
     * Scroll to top
     *
     * @param {number} offset
     * @param {number} speed
     */
    scrollToTop(offset?: number, speed?: number): void;
    /**
     * Scroll to left
     *
     * @param {number} offset
     * @param {number} speed
     */
    scrollToLeft(offset?: number, speed?: number): void;
    /**
     * Scroll to right
     *
     * @param {number} offset
     * @param {number} speed
     */
    scrollToRight(offset?: number, speed?: number): void;
    /**
     * Scroll to bottom
     *
     * @param {number} offset
     * @param {number} speed
     */
    scrollToBottom(offset?: number, speed?: number): void;
    /**
     * Animate scrolling
     *
     * @param {string} target
     * @param {number} value
     * @param {number} speed
     */
    animateScrolling(target: string, value: number, speed?: number): void;
}
