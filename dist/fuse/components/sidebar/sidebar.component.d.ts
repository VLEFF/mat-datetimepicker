import { ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
import { MediaObserver } from '@angular/flex-layout';
import { FuseSidebarService } from './sidebar.service';
import { FuseMatchMediaService } from '../../services/match-media.service';
import { FuseConfigService } from '../../services/config.service';
export declare class FuseSidebarComponent implements OnInit, OnDestroy {
    private _animationBuilder;
    private _changeDetectorRef;
    private _elementRef;
    private _fuseConfigService;
    private _fuseMatchMediaService;
    private _fuseSidebarService;
    private _mediaObserver;
    private _renderer;
    name: string;
    key: string;
    position: 'left' | 'right';
    opened: boolean;
    lockedOpen: string;
    isLockedOpen: boolean;
    foldedWidth: number;
    foldedAutoTriggerOnHover: boolean;
    unfolded: boolean;
    invisibleOverlay: boolean;
    foldedChanged: EventEmitter<boolean>;
    openedChanged: EventEmitter<boolean>;
    private _folded;
    private _fuseConfig;
    private _wasActive;
    private _wasFolded;
    private _backdrop;
    private _player;
    private _unsubscribeAll;
    _animationsEnabled: boolean;
    /**
     * Constructor
     *
     * @param {AnimationBuilder} _animationBuilder
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {ElementRef} _elementRef
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MediaObserver} _mediaObserver
     * @param {Renderer2} _renderer
     */
    constructor(_animationBuilder: AnimationBuilder, _changeDetectorRef: ChangeDetectorRef, _elementRef: ElementRef, _fuseConfigService: FuseConfigService, _fuseMatchMediaService: FuseMatchMediaService, _fuseSidebarService: FuseSidebarService, _mediaObserver: MediaObserver, _renderer: Renderer2);
    /**
     * Folded
     *
     * @param {boolean} value
     */
    folded: boolean;
    /**
     * On init
     */
    ngOnInit(): void;
    /**
     * On destroy
     */
    ngOnDestroy(): void;
    /**
     * Setup the visibility of the sidebar
     *
     * @private
     */
    private _setupVisibility;
    /**
     * Setup the sidebar position
     *
     * @private
     */
    private _setupPosition;
    /**
     * Setup the lockedOpen handler
     *
     * @private
     */
    private _setupLockedOpen;
    /**
     * Setup the initial folded status
     *
     * @private
     */
    private _setupFolded;
    /**
     * Show the backdrop
     *
     * @private
     */
    private _showBackdrop;
    /**
     * Hide the backdrop
     *
     * @private
     */
    private _hideBackdrop;
    /**
     * Change some properties of the sidebar
     * and make it visible
     *
     * @private
     */
    private _showSidebar;
    /**
     * Change some properties of the sidebar
     * and make it invisible
     *
     * @private
     */
    private _hideSidebar;
    /**
     * Enable the animations
     *
     * @private
     */
    private _enableAnimations;
    /**
     * Open the sidebar
     */
    open(): void;
    /**
     * Close the sidebar
     */
    close(): void;
    /**
     * Toggle open/close the sidebar
     */
    toggleOpen(): void;
    /**
     * Mouseenter
     */
    onMouseEnter(): void;
    /**
     * Mouseleave
     */
    onMouseLeave(): void;
    /**
     * Fold the sidebar permanently
     */
    fold(): void;
    /**
     * Unfold the sidebar permanently
     */
    unfold(): void;
    /**
     * Toggle the sidebar fold/unfold permanently
     */
    toggleFold(): void;
    /**
     * Fold the temporarily unfolded sidebar back
     */
    foldTemporarily(): void;
    /**
     * Unfold the sidebar temporarily
     */
    unfoldTemporarily(): void;
}
