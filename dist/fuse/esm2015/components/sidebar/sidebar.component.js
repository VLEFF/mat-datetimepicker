import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from './sidebar.service';
import { FuseMatchMediaService } from '../../services/match-media.service';
import { FuseConfigService } from '../../services/config.service';
export class FuseSidebarComponent {
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
    constructor(_animationBuilder, _changeDetectorRef, _elementRef, _fuseConfigService, _fuseMatchMediaService, _fuseSidebarService, _mediaObserver, _renderer) {
        this._animationBuilder = _animationBuilder;
        this._changeDetectorRef = _changeDetectorRef;
        this._elementRef = _elementRef;
        this._fuseConfigService = _fuseConfigService;
        this._fuseMatchMediaService = _fuseMatchMediaService;
        this._fuseSidebarService = _fuseSidebarService;
        this._mediaObserver = _mediaObserver;
        this._renderer = _renderer;
        this._backdrop = null;
        // Set the defaults
        this.foldedAutoTriggerOnHover = true;
        this.foldedWidth = 64;
        this.foldedChanged = new EventEmitter();
        this.openedChanged = new EventEmitter();
        this.opened = false;
        this.position = 'left';
        this.invisibleOverlay = false;
        // Set the private defaults
        this._animationsEnabled = false;
        this._folded = false;
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Folded
     *
     * @param {boolean} value
     */
    set folded(value) {
        // Set the folded
        this._folded = value;
        // Return if the sidebar is closed
        if (!this.opened) {
            return;
        }
        // Programmatically add/remove padding to the element
        // that comes after or before based on the position
        let sibling, styleRule;
        const styleValue = this.foldedWidth + 'px';
        // Get the sibling and set the style rule
        if (this.position === 'left') {
            sibling = this._elementRef.nativeElement.nextElementSibling;
            styleRule = 'padding-left';
        }
        else {
            sibling = this._elementRef.nativeElement.previousElementSibling;
            styleRule = 'padding-right';
        }
        // If there is no sibling, return...
        if (!sibling) {
            return;
        }
        // If folded...
        if (value) {
            // Fold the sidebar
            this.fold();
            // Set the folded width
            this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
            this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
            this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);
            // Set the style and class
            this._renderer.setStyle(sibling, styleRule, styleValue);
            this._renderer.addClass(this._elementRef.nativeElement, 'folded');
        }
        // If unfolded...
        else {
            // Unfold the sidebar
            this.unfold();
            // Remove the folded width
            this._renderer.removeStyle(this._elementRef.nativeElement, 'width');
            this._renderer.removeStyle(this._elementRef.nativeElement, 'min-width');
            this._renderer.removeStyle(this._elementRef.nativeElement, 'max-width');
            // Remove the style and class
            this._renderer.removeStyle(sibling, styleRule);
            this._renderer.removeClass(this._elementRef.nativeElement, 'folded');
        }
        // Emit the 'foldedChanged' event
        this.foldedChanged.emit(this.folded);
    }
    get folded() {
        return this._folded;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit() {
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
            this._fuseConfig = config;
        });
        // Register the sidebar
        this._fuseSidebarService.register(this.name, this);
        // Setup visibility
        this._setupVisibility();
        // Setup position
        this._setupPosition();
        // Setup lockedOpen
        this._setupLockedOpen();
        // Setup folded
        this._setupFolded();
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // If the sidebar is folded, unfold it to revert modifications
        if (this.folded) {
            this.unfold();
        }
        // Unregister the sidebar
        this._fuseSidebarService.unregister(this.name);
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Setup the visibility of the sidebar
     *
     * @private
     */
    _setupVisibility() {
        // Remove the existing box-shadow
        this._renderer.setStyle(this._elementRef.nativeElement, 'box-shadow', 'none');
        // Make the sidebar invisible
        this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
    }
    /**
     * Setup the sidebar position
     *
     * @private
     */
    _setupPosition() {
        // Add the correct class name to the sidebar
        // element depending on the position attribute
        if (this.position === 'right') {
            this._renderer.addClass(this._elementRef.nativeElement, 'right-positioned');
        }
        else {
            this._renderer.addClass(this._elementRef.nativeElement, 'left-positioned');
        }
    }
    /**
     * Setup the lockedOpen handler
     *
     * @private
     */
    _setupLockedOpen() {
        // Return if the lockedOpen wasn't set
        if (!this.lockedOpen) {
            // Return
            return;
        }
        // Set the wasActive for the first time
        this._wasActive = false;
        // Set the wasFolded
        this._wasFolded = this.folded;
        // Show the sidebar
        this._showSidebar();
        // Act on every media change
        this._fuseMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            // Get the active status
            const isActive = this._mediaObserver.isActive(this.lockedOpen);
            // If the both status are the same, don't act
            if (this._wasActive === isActive) {
                return;
            }
            // Activate the lockedOpen
            if (isActive) {
                // Set the lockedOpen status
                this.isLockedOpen = true;
                // Show the sidebar
                this._showSidebar();
                // Force the the opened status to true
                this.opened = true;
                // Emit the 'openedChanged' event
                this.openedChanged.emit(this.opened);
                // If the sidebar was folded, forcefully fold it again
                if (this._wasFolded) {
                    // Enable the animations
                    this._enableAnimations();
                    // Fold
                    this.folded = true;
                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                }
                // Hide the backdrop if any exists
                this._hideBackdrop();
            }
            // De-Activate the lockedOpen
            else {
                // Set the lockedOpen status
                this.isLockedOpen = false;
                // Unfold the sidebar in case if it was folded
                this.unfold();
                // Force the the opened status to close
                this.opened = false;
                // Emit the 'openedChanged' event
                this.openedChanged.emit(this.opened);
                // Hide the sidebar
                this._hideSidebar();
            }
            // Store the new active status
            this._wasActive = isActive;
        });
    }
    /**
     * Setup the initial folded status
     *
     * @private
     */
    _setupFolded() {
        // Return, if sidebar is not folded
        if (!this.folded) {
            return;
        }
        // Return if the sidebar is closed
        if (!this.opened) {
            return;
        }
        // Programmatically add/remove padding to the element
        // that comes after or before based on the position
        let sibling, styleRule;
        const styleValue = this.foldedWidth + 'px';
        // Get the sibling and set the style rule
        if (this.position === 'left') {
            sibling = this._elementRef.nativeElement.nextElementSibling;
            styleRule = 'padding-left';
        }
        else {
            sibling = this._elementRef.nativeElement.previousElementSibling;
            styleRule = 'padding-right';
        }
        // If there is no sibling, return...
        if (!sibling) {
            return;
        }
        // Fold the sidebar
        this.fold();
        // Set the folded width
        this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);
        // Set the style and class
        this._renderer.setStyle(sibling, styleRule, styleValue);
        this._renderer.addClass(this._elementRef.nativeElement, 'folded');
    }
    /**
     * Show the backdrop
     *
     * @private
     */
    _showBackdrop() {
        // Create the backdrop element
        this._backdrop = this._renderer.createElement('div');
        // Add a class to the backdrop element
        this._backdrop.classList.add('fuse-sidebar-overlay');
        // Add a class depending on the invisibleOverlay option
        if (this.invisibleOverlay) {
            this._backdrop.classList.add('fuse-sidebar-overlay-invisible');
        }
        // Append the backdrop to the parent of the sidebar
        this._renderer.appendChild(this._elementRef.nativeElement.parentElement, this._backdrop);
        // Create the enter animation and attach it to the player
        this._player =
            this._animationBuilder
                .build([
                animate('300ms ease', style({ opacity: 1 }))
            ]).create(this._backdrop);
        // Play the animation
        this._player.play();
        // Add an event listener to the overlay
        this._backdrop.addEventListener('click', () => {
            this.close();
        });
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Hide the backdrop
     *
     * @private
     */
    _hideBackdrop() {
        if (!this._backdrop) {
            return;
        }
        // Create the leave animation and attach it to the player
        this._player =
            this._animationBuilder
                .build([
                animate('300ms ease', style({ opacity: 0 }))
            ]).create(this._backdrop);
        // Play the animation
        this._player.play();
        // Once the animation is done...
        this._player.onDone(() => {
            // If the backdrop still exists...
            if (this._backdrop) {
                // Remove the backdrop
                this._backdrop.parentNode.removeChild(this._backdrop);
                this._backdrop = null;
            }
        });
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Change some properties of the sidebar
     * and make it visible
     *
     * @private
     */
    _showSidebar() {
        // Remove the box-shadow style
        this._renderer.removeStyle(this._elementRef.nativeElement, 'box-shadow');
        // Make the sidebar invisible
        this._renderer.removeStyle(this._elementRef.nativeElement, 'visibility');
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Change some properties of the sidebar
     * and make it invisible
     *
     * @private
     */
    _hideSidebar(delay = true) {
        const delayAmount = delay ? 300 : 0;
        // Add a delay so close animation can play
        setTimeout(() => {
            // Remove the box-shadow
            this._renderer.setStyle(this._elementRef.nativeElement, 'box-shadow', 'none');
            // Make the sidebar invisible
            this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
        }, delayAmount);
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Enable the animations
     *
     * @private
     */
    _enableAnimations() {
        // Return if animations already enabled
        if (this._animationsEnabled) {
            return;
        }
        // Enable the animations
        this._animationsEnabled = true;
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open the sidebar
     */
    open() {
        if (this.opened || this.isLockedOpen) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Show the sidebar
        this._showSidebar();
        // Show the backdrop
        this._showBackdrop();
        // Set the opened status
        this.opened = true;
        // Emit the 'openedChanged' event
        this.openedChanged.emit(this.opened);
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Close the sidebar
     */
    close() {
        if (!this.opened || this.isLockedOpen) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Hide the backdrop
        this._hideBackdrop();
        // Set the opened status
        this.opened = false;
        // Emit the 'openedChanged' event
        this.openedChanged.emit(this.opened);
        // Hide the sidebar
        this._hideSidebar();
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Toggle open/close the sidebar
     */
    toggleOpen() {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    }
    /**
     * Mouseenter
     */
    onMouseEnter() {
        // Only work if the auto trigger is enabled
        if (!this.foldedAutoTriggerOnHover) {
            return;
        }
        this.unfoldTemporarily();
    }
    /**
     * Mouseleave
     */
    onMouseLeave() {
        // Only work if the auto trigger is enabled
        if (!this.foldedAutoTriggerOnHover) {
            return;
        }
        this.foldTemporarily();
    }
    /**
     * Fold the sidebar permanently
     */
    fold() {
        // Only work if the sidebar is not folded
        if (this.folded) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Fold
        this.folded = true;
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Unfold the sidebar permanently
     */
    unfold() {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Unfold
        this.folded = false;
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Toggle the sidebar fold/unfold permanently
     */
    toggleFold() {
        if (this.folded) {
            this.unfold();
        }
        else {
            this.fold();
        }
    }
    /**
     * Fold the temporarily unfolded sidebar back
     */
    foldTemporarily() {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Fold the sidebar back
        this.unfolded = false;
        // Set the folded width
        const styleValue = this.foldedWidth + 'px';
        this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Unfold the sidebar temporarily
     */
    unfoldTemporarily() {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Unfold the sidebar temporarily
        this.unfolded = true;
        // Remove the folded width
        this._renderer.removeStyle(this._elementRef.nativeElement, 'width');
        this._renderer.removeStyle(this._elementRef.nativeElement, 'min-width');
        this._renderer.removeStyle(this._elementRef.nativeElement, 'max-width');
        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
FuseSidebarComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-sidebar',
                template: "<ng-content></ng-content>",
                encapsulation: ViewEncapsulation.None,
                styles: ["fuse-sidebar{display:flex;flex-direction:column;flex:1 0 auto;position:absolute;top:0;bottom:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;width:280px;min-width:280px;max-width:280px;z-index:1000;box-shadow:0 2px 8px 0 rgba(0,0,0,.35)}@media screen and (max-width:599px){fuse-sidebar{min-width:0!important;max-width:80vw!important;width:80vw!important}}fuse-sidebar.left-positioned{left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%)}fuse-sidebar.right-positioned{right:0;-webkit-transform:translateX(100%);transform:translateX(100%)}fuse-sidebar.open{-webkit-transform:translateX(0);transform:translateX(0)}fuse-sidebar.locked-open{position:relative!important;-webkit-transform:translateX(0)!important;transform:translateX(0)!important}fuse-sidebar.folded{position:absolute!important;top:0;bottom:0}fuse-sidebar.animations-enabled{transition-property:transform,width,min-width,max-width,-webkit-transform;transition-duration:150ms;transition-timing-function:ease-in-out}.fuse-sidebar-overlay{position:absolute;top:0;bottom:0;left:0;right:0;z-index:999;opacity:0}"]
            }] }
];
/** @nocollapse */
FuseSidebarComponent.ctorParameters = () => [
    { type: AnimationBuilder },
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: FuseConfigService },
    { type: FuseMatchMediaService },
    { type: FuseSidebarService },
    { type: MediaObserver },
    { type: Renderer2 }
];
FuseSidebarComponent.propDecorators = {
    name: [{ type: Input }],
    key: [{ type: Input }],
    position: [{ type: Input }],
    opened: [{ type: HostBinding, args: ['class.open',] }],
    lockedOpen: [{ type: Input }],
    isLockedOpen: [{ type: HostBinding, args: ['class.locked-open',] }],
    foldedWidth: [{ type: Input }],
    foldedAutoTriggerOnHover: [{ type: Input }],
    unfolded: [{ type: HostBinding, args: ['class.unfolded',] }],
    invisibleOverlay: [{ type: Input }],
    foldedChanged: [{ type: Output }],
    openedChanged: [{ type: Output }],
    _animationsEnabled: [{ type: HostBinding, args: ['class.animations-enabled',] }],
    folded: [{ type: Input }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUNwSixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFtQixLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFRbEUsTUFBTSxPQUFPLG9CQUFvQjtJQThEN0I7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUNZLGlCQUFtQyxFQUNuQyxrQkFBcUMsRUFDckMsV0FBdUIsRUFDdkIsa0JBQXFDLEVBQ3JDLHNCQUE2QyxFQUM3QyxtQkFBdUMsRUFDdkMsY0FBNkIsRUFDN0IsU0FBb0I7UUFQcEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3Qyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW9CO1FBQ3ZDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUEzQnhCLGNBQVMsR0FBdUIsSUFBSSxDQUFDO1FBOEJ6QyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFFOUIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsY0FBYztJQUNkLHdHQUF3RztJQUV4Rzs7OztPQUlHO0lBQ0gsSUFDSSxNQUFNLENBQUMsS0FBYztRQUVyQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFFckIsa0NBQWtDO1FBQ2xDLElBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNqQjtZQUNJLE9BQU87U0FDVjtRQUVELHFEQUFxRDtRQUNyRCxtREFBbUQ7UUFDbkQsSUFBSSxPQUFPLEVBQ1AsU0FBUyxDQUFDO1FBRWQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFM0MseUNBQXlDO1FBQ3pDLElBQUssSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQzdCO1lBQ0ksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLGtCQUFrQixDQUFDO1lBQzVELFNBQVMsR0FBRyxjQUFjLENBQUM7U0FDOUI7YUFFRDtZQUNJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztZQUNoRSxTQUFTLEdBQUcsZUFBZSxDQUFDO1NBQy9CO1FBRUQsb0NBQW9DO1FBQ3BDLElBQUssQ0FBQyxPQUFPLEVBQ2I7WUFDSSxPQUFPO1NBQ1Y7UUFFRCxlQUFlO1FBQ2YsSUFBSyxLQUFLLEVBQ1Y7WUFDSSxtQkFBbUI7WUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBRVosdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRWpGLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3JFO1FBQ0QsaUJBQWlCO2FBRWpCO1lBQ0kscUJBQXFCO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVkLDBCQUEwQjtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztZQUV4RSw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsSUFBSSxNQUFNO1FBRU4sT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILFFBQVE7UUFFSiw4QkFBOEI7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU07YUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDckMsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7UUFFUCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRW5ELG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV4QixlQUFlO1FBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFFUCw4REFBOEQ7UUFDOUQsSUFBSyxJQUFJLENBQUMsTUFBTSxFQUNoQjtZQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjtRQUVELHlCQUF5QjtRQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUvQyxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7OztPQUlHO0lBQ0ssZ0JBQWdCO1FBRXBCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFOUUsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGNBQWM7UUFFbEIsNENBQTRDO1FBQzVDLDhDQUE4QztRQUM5QyxJQUFLLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUM5QjtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDL0U7YUFFRDtZQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDOUU7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGdCQUFnQjtRQUVwQixzQ0FBc0M7UUFDdEMsSUFBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQ3JCO1lBQ0ksU0FBUztZQUNULE9BQU87U0FDVjtRQUVELHVDQUF1QztRQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRTlCLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhO2FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFFWix3QkFBd0I7WUFDeEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRS9ELDZDQUE2QztZQUM3QyxJQUFLLElBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUNqQztnQkFDSSxPQUFPO2FBQ1Y7WUFFRCwwQkFBMEI7WUFDMUIsSUFBSyxRQUFRLEVBQ2I7Z0JBQ0ksNEJBQTRCO2dCQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFFekIsbUJBQW1CO2dCQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBRXBCLHNDQUFzQztnQkFDdEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBRW5CLGlDQUFpQztnQkFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUVyQyxzREFBc0Q7Z0JBQ3RELElBQUssSUFBSSxDQUFDLFVBQVUsRUFDcEI7b0JBQ0ksd0JBQXdCO29CQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFFekIsT0FBTztvQkFDUCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFFbkIsaUJBQWlCO29CQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQzFDO2dCQUVELGtDQUFrQztnQkFDbEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsNkJBQTZCO2lCQUU3QjtnQkFDSSw0QkFBNEI7Z0JBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUUxQiw4Q0FBOEM7Z0JBQzlDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFZCx1Q0FBdUM7Z0JBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUVwQixpQ0FBaUM7Z0JBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFckMsbUJBQW1CO2dCQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7WUFFRCw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLFlBQVk7UUFFaEIsbUNBQW1DO1FBQ25DLElBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNqQjtZQUNJLE9BQU87U0FDVjtRQUVELGtDQUFrQztRQUNsQyxJQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFDakI7WUFDSSxPQUFPO1NBQ1Y7UUFFRCxxREFBcUQ7UUFDckQsbURBQW1EO1FBQ25ELElBQUksT0FBTyxFQUNQLFNBQVMsQ0FBQztRQUVkLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTNDLHlDQUF5QztRQUN6QyxJQUFLLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUM3QjtZQUNJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztZQUM1RCxTQUFTLEdBQUcsY0FBYyxDQUFDO1NBQzlCO2FBRUQ7WUFDSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7WUFDaEUsU0FBUyxHQUFHLGVBQWUsQ0FBQztTQUMvQjtRQUVELG9DQUFvQztRQUNwQyxJQUFLLENBQUMsT0FBTyxFQUNiO1lBQ0ksT0FBTztTQUNWO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVqRiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWE7UUFFakIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFckQsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRXJELHVEQUF1RDtRQUN2RCxJQUFLLElBQUksQ0FBQyxnQkFBZ0IsRUFDMUI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztTQUNsRTtRQUVELG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRXpGLHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsT0FBTztZQUNSLElBQUksQ0FBQyxpQkFBaUI7aUJBQ2pCLEtBQUssQ0FBQztnQkFDSCxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQzdDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWxDLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBCLHVDQUF1QztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDdEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FDSixDQUFDO1FBRUYsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWE7UUFFakIsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQ3BCO1lBQ0ksT0FBTztTQUNWO1FBRUQseURBQXlEO1FBQ3pELElBQUksQ0FBQyxPQUFPO1lBQ1IsSUFBSSxDQUFDLGlCQUFpQjtpQkFDakIsS0FBSyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7YUFDN0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbEMscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFcEIsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUVyQixrQ0FBa0M7WUFDbEMsSUFBSyxJQUFJLENBQUMsU0FBUyxFQUNuQjtnQkFDSSxzQkFBc0I7Z0JBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLFlBQVk7UUFFaEIsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXpFLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV6RSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSTtRQUU3QixNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLDBDQUEwQztRQUMxQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBRVosd0JBQXdCO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU5RSw2QkFBNkI7WUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BGLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVoQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssaUJBQWlCO1FBRXJCLHVDQUF1QztRQUN2QyxJQUFLLElBQUksQ0FBQyxrQkFBa0IsRUFDNUI7WUFDSSxPQUFPO1NBQ1Y7UUFFRCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUUvQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsbUJBQW1CO0lBQ25CLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILElBQUk7UUFFQSxJQUFLLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFDckM7WUFDSSxPQUFPO1NBQ1Y7UUFFRCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRXJCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJDLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUVELElBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQ3RDO1lBQ0ksT0FBTztTQUNWO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFckMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7UUFFTixJQUFLLElBQUksQ0FBQyxNQUFNLEVBQ2hCO1lBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO2FBRUQ7WUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUVILFlBQVk7UUFFUiwyQ0FBMkM7UUFDM0MsSUFBSyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFDbkM7WUFDSSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFFSCxZQUFZO1FBRVIsMkNBQTJDO1FBQzNDLElBQUssQ0FBQyxJQUFJLENBQUMsd0JBQXdCLEVBQ25DO1lBQ0ksT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFFQSx5Q0FBeUM7UUFDekMsSUFBSyxJQUFJLENBQUMsTUFBTSxFQUNoQjtZQUNJLE9BQU87U0FDVjtRQUVELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixPQUFPO1FBQ1AsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBRUYscUNBQXFDO1FBQ3JDLElBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNqQjtZQUNJLE9BQU87U0FDVjtRQUVELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixTQUFTO1FBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVO1FBRU4sSUFBSyxJQUFJLENBQUMsTUFBTSxFQUNoQjtZQUNJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqQjthQUVEO1lBQ0ksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlO1FBRVgscUNBQXFDO1FBQ3JDLElBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNqQjtZQUNJLE9BQU87U0FDVjtRQUVELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6Qix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFdEIsdUJBQXVCO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTNDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBRWpGLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gsaUJBQWlCO1FBRWIscUNBQXFDO1FBQ3JDLElBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNqQjtZQUNJLE9BQU87U0FDVjtRQUVELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXhFLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQzs7O1lBbnhCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFPLGNBQWM7Z0JBQzdCLHFDQUF5QztnQkFFekMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3hDOzs7O1lBZGlCLGdCQUFnQjtZQUY5QixpQkFBaUI7WUFBYSxVQUFVO1lBU25DLGlCQUFpQjtZQURqQixxQkFBcUI7WUFEckIsa0JBQWtCO1lBSmxCLGFBQWE7WUFIbUcsU0FBUzs7O21CQW9CN0gsS0FBSztrQkFJTCxLQUFLO3VCQUlMLEtBQUs7cUJBSUwsV0FBVyxTQUFDLFlBQVk7eUJBSXhCLEtBQUs7MkJBSUwsV0FBVyxTQUFDLG1CQUFtQjswQkFJL0IsS0FBSzt1Q0FJTCxLQUFLO3VCQUlMLFdBQVcsU0FBQyxnQkFBZ0I7K0JBSTVCLEtBQUs7NEJBSUwsTUFBTTs0QkFJTixNQUFNO2lDQVlOLFdBQVcsU0FBQywwQkFBMEI7cUJBa0R0QyxLQUFLOzJCQXdoQkwsWUFBWSxTQUFDLFlBQVk7MkJBZXpCLFlBQVksU0FBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgQW5pbWF0aW9uUGxheWVyLCBzdHlsZSB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRnVzZVNpZGViYXJTZXJ2aWNlIH0gZnJvbSAnLi9zaWRlYmFyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnVzZU1hdGNoTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWF0Y2gtbWVkaWEuc2VydmljZSc7XG5pbXBvcnQgeyBGdXNlQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3IgICAgIDogJ2Z1c2Utc2lkZWJhcicsXG4gICAgdGVtcGxhdGVVcmwgIDogJy4vc2lkZWJhci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzICAgIDogWycuL3NpZGViYXIuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VTaWRlYmFyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgICAvLyBOYW1lXG4gICAgQElucHV0KClcbiAgICBuYW1lOiBzdHJpbmc7XG5cbiAgICAvLyBLZXlcbiAgICBASW5wdXQoKVxuICAgIGtleTogc3RyaW5nO1xuXG4gICAgLy8gUG9zaXRpb25cbiAgICBASW5wdXQoKVxuICAgIHBvc2l0aW9uOiAnbGVmdCcgfCAncmlnaHQnO1xuXG4gICAgLy8gT3BlblxuICAgIEBIb3N0QmluZGluZygnY2xhc3Mub3BlbicpXG4gICAgb3BlbmVkOiBib29sZWFuO1xuXG4gICAgLy8gTG9ja2VkIE9wZW5cbiAgICBASW5wdXQoKVxuICAgIGxvY2tlZE9wZW46IHN0cmluZztcblxuICAgIC8vIGlzTG9ja2VkT3BlblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MubG9ja2VkLW9wZW4nKVxuICAgIGlzTG9ja2VkT3BlbjogYm9vbGVhbjtcblxuICAgIC8vIEZvbGRlZCB3aWR0aFxuICAgIEBJbnB1dCgpXG4gICAgZm9sZGVkV2lkdGg6IG51bWJlcjtcblxuICAgIC8vIEZvbGRlZCBhdXRvIHRyaWdnZXIgb24gaG92ZXJcbiAgICBASW5wdXQoKVxuICAgIGZvbGRlZEF1dG9UcmlnZ2VyT25Ib3ZlcjogYm9vbGVhbjtcblxuICAgIC8vIEZvbGRlZCB1bmZvbGRlZFxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudW5mb2xkZWQnKVxuICAgIHVuZm9sZGVkOiBib29sZWFuO1xuXG4gICAgLy8gSW52aXNpYmxlIG92ZXJsYXlcbiAgICBASW5wdXQoKVxuICAgIGludmlzaWJsZU92ZXJsYXk6IGJvb2xlYW47XG5cbiAgICAvLyBGb2xkZWQgY2hhbmdlZFxuICAgIEBPdXRwdXQoKVxuICAgIGZvbGRlZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICAgIC8vIE9wZW5lZCBjaGFuZ2VkXG4gICAgQE91dHB1dCgpXG4gICAgb3BlbmVkQ2hhbmdlZDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+O1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX2ZvbGRlZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9mdXNlQ29uZmlnOiBhbnk7XG4gICAgcHJpdmF0ZSBfd2FzQWN0aXZlOiBib29sZWFuO1xuICAgIHByaXZhdGUgX3dhc0ZvbGRlZDogYm9vbGVhbjtcbiAgICBwcml2YXRlIF9iYWNrZHJvcDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBwcml2YXRlIF9wbGF5ZXI6IEFuaW1hdGlvblBsYXllcjtcbiAgICBwcml2YXRlIF91bnN1YnNjcmliZUFsbDogU3ViamVjdDxhbnk+O1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hbmltYXRpb25zLWVuYWJsZWQnKVxuICAgIF9hbmltYXRpb25zRW5hYmxlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FuaW1hdGlvbkJ1aWxkZXJ9IF9hbmltYXRpb25CdWlsZGVyXG4gICAgICogQHBhcmFtIHtDaGFuZ2VEZXRlY3RvclJlZn0gX2NoYW5nZURldGVjdG9yUmVmXG4gICAgICogQHBhcmFtIHtFbGVtZW50UmVmfSBfZWxlbWVudFJlZlxuICAgICAqIEBwYXJhbSB7RnVzZUNvbmZpZ1NlcnZpY2V9IF9mdXNlQ29uZmlnU2VydmljZVxuICAgICAqIEBwYXJhbSB7RnVzZU1hdGNoTWVkaWFTZXJ2aWNlfSBfZnVzZU1hdGNoTWVkaWFTZXJ2aWNlXG4gICAgICogQHBhcmFtIHtGdXNlU2lkZWJhclNlcnZpY2V9IF9mdXNlU2lkZWJhclNlcnZpY2VcbiAgICAgKiBAcGFyYW0ge01lZGlhT2JzZXJ2ZXJ9IF9tZWRpYU9ic2VydmVyXG4gICAgICogQHBhcmFtIHtSZW5kZXJlcjJ9IF9yZW5kZXJlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9hbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLFxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2Z1c2VDb25maWdTZXJ2aWNlOiBGdXNlQ29uZmlnU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZnVzZU1hdGNoTWVkaWFTZXJ2aWNlOiBGdXNlTWF0Y2hNZWRpYVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2Z1c2VTaWRlYmFyU2VydmljZTogRnVzZVNpZGViYXJTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9tZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmZvbGRlZEF1dG9UcmlnZ2VyT25Ib3ZlciA9IHRydWU7XG4gICAgICAgIHRoaXMuZm9sZGVkV2lkdGggPSA2NDtcbiAgICAgICAgdGhpcy5mb2xkZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSAnbGVmdCc7XG4gICAgICAgIHRoaXMuaW52aXNpYmxlT3ZlcmxheSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl9hbmltYXRpb25zRW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9mb2xkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwgPSBuZXcgU3ViamVjdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBBY2Nlc3NvcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRm9sZGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlXG4gICAgICovXG4gICAgQElucHV0KClcbiAgICBzZXQgZm9sZGVkKHZhbHVlOiBib29sZWFuKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBmb2xkZWRcbiAgICAgICAgdGhpcy5fZm9sZGVkID0gdmFsdWU7XG5cbiAgICAgICAgLy8gUmV0dXJuIGlmIHRoZSBzaWRlYmFyIGlzIGNsb3NlZFxuICAgICAgICBpZiAoICF0aGlzLm9wZW5lZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByb2dyYW1tYXRpY2FsbHkgYWRkL3JlbW92ZSBwYWRkaW5nIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIC8vIHRoYXQgY29tZXMgYWZ0ZXIgb3IgYmVmb3JlIGJhc2VkIG9uIHRoZSBwb3NpdGlvblxuICAgICAgICBsZXQgc2libGluZyxcbiAgICAgICAgICAgIHN0eWxlUnVsZTtcblxuICAgICAgICBjb25zdCBzdHlsZVZhbHVlID0gdGhpcy5mb2xkZWRXaWR0aCArICdweCc7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBzaWJsaW5nIGFuZCBzZXQgdGhlIHN0eWxlIHJ1bGVcbiAgICAgICAgaWYgKCB0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcgKVxuICAgICAgICB7XG4gICAgICAgICAgICBzaWJsaW5nID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIHN0eWxlUnVsZSA9ICdwYWRkaW5nLWxlZnQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgc2libGluZyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgc3R5bGVSdWxlID0gJ3BhZGRpbmctcmlnaHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2libGluZywgcmV0dXJuLi4uXG4gICAgICAgIGlmICggIXNpYmxpbmcgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBmb2xkZWQuLi5cbiAgICAgICAgaWYgKCB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEZvbGQgdGhlIHNpZGViYXJcbiAgICAgICAgICAgIHRoaXMuZm9sZCgpO1xuXG4gICAgICAgICAgICAvLyBTZXQgdGhlIGZvbGRlZCB3aWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBzdHlsZVZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcsIHN0eWxlVmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJywgc3R5bGVWYWx1ZSk7XG5cbiAgICAgICAgICAgIC8vIFNldCB0aGUgc3R5bGUgYW5kIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShzaWJsaW5nLCBzdHlsZVJ1bGUsIHN0eWxlVmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZm9sZGVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdW5mb2xkZWQuLi5cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBVbmZvbGQgdGhlIHNpZGViYXJcbiAgICAgICAgICAgIHRoaXMudW5mb2xkKCk7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgZm9sZGVkIHdpZHRoXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWluLXdpZHRoJyk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtYXgtd2lkdGgnKTtcblxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBzdHlsZSBhbmQgY2xhc3NcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHNpYmxpbmcsIHN0eWxlUnVsZSk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmb2xkZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVtaXQgdGhlICdmb2xkZWRDaGFuZ2VkJyBldmVudFxuICAgICAgICB0aGlzLmZvbGRlZENoYW5nZWQuZW1pdCh0aGlzLmZvbGRlZCk7XG4gICAgfVxuXG4gICAgZ2V0IGZvbGRlZCgpOiBib29sZWFuXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9sZGVkO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdFxuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBjb25maWcgY2hhbmdlc1xuICAgICAgICB0aGlzLl9mdXNlQ29uZmlnU2VydmljZS5jb25maWdcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl91bnN1YnNjcmliZUFsbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChjb25maWcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mdXNlQ29uZmlnID0gY29uZmlnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIHNpZGViYXJcbiAgICAgICAgdGhpcy5fZnVzZVNpZGViYXJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMubmFtZSwgdGhpcyk7XG5cbiAgICAgICAgLy8gU2V0dXAgdmlzaWJpbGl0eVxuICAgICAgICB0aGlzLl9zZXR1cFZpc2liaWxpdHkoKTtcblxuICAgICAgICAvLyBTZXR1cCBwb3NpdGlvblxuICAgICAgICB0aGlzLl9zZXR1cFBvc2l0aW9uKCk7XG5cbiAgICAgICAgLy8gU2V0dXAgbG9ja2VkT3BlblxuICAgICAgICB0aGlzLl9zZXR1cExvY2tlZE9wZW4oKTtcblxuICAgICAgICAvLyBTZXR1cCBmb2xkZWRcbiAgICAgICAgdGhpcy5fc2V0dXBGb2xkZWQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gSWYgdGhlIHNpZGViYXIgaXMgZm9sZGVkLCB1bmZvbGQgaXQgdG8gcmV2ZXJ0IG1vZGlmaWNhdGlvbnNcbiAgICAgICAgaWYgKCB0aGlzLmZvbGRlZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudW5mb2xkKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVbnJlZ2lzdGVyIHRoZSBzaWRlYmFyXG4gICAgICAgIHRoaXMuX2Z1c2VTaWRlYmFyU2VydmljZS51bnJlZ2lzdGVyKHRoaXMubmFtZSk7XG5cbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgc2lkZWJhclxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zZXR1cFZpc2liaWxpdHkoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBleGlzdGluZyBib3gtc2hhZG93XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2JveC1zaGFkb3cnLCAnbm9uZScpO1xuXG4gICAgICAgIC8vIE1ha2UgdGhlIHNpZGViYXIgaW52aXNpYmxlXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIHNpZGViYXIgcG9zaXRpb25cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2V0dXBQb3NpdGlvbigpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBBZGQgdGhlIGNvcnJlY3QgY2xhc3MgbmFtZSB0byB0aGUgc2lkZWJhclxuICAgICAgICAvLyBlbGVtZW50IGRlcGVuZGluZyBvbiB0aGUgcG9zaXRpb24gYXR0cmlidXRlXG4gICAgICAgIGlmICggdGhpcy5wb3NpdGlvbiA9PT0gJ3JpZ2h0JyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3JpZ2h0LXBvc2l0aW9uZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2xlZnQtcG9zaXRpb25lZCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIGxvY2tlZE9wZW4gaGFuZGxlclxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zZXR1cExvY2tlZE9wZW4oKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gUmV0dXJuIGlmIHRoZSBsb2NrZWRPcGVuIHdhc24ndCBzZXRcbiAgICAgICAgaWYgKCAhdGhpcy5sb2NrZWRPcGVuIClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmV0dXJuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgdGhlIHdhc0FjdGl2ZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgICAgdGhpcy5fd2FzQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gU2V0IHRoZSB3YXNGb2xkZWRcbiAgICAgICAgdGhpcy5fd2FzRm9sZGVkID0gdGhpcy5mb2xkZWQ7XG5cbiAgICAgICAgLy8gU2hvdyB0aGUgc2lkZWJhclxuICAgICAgICB0aGlzLl9zaG93U2lkZWJhcigpO1xuXG4gICAgICAgIC8vIEFjdCBvbiBldmVyeSBtZWRpYSBjaGFuZ2VcbiAgICAgICAgdGhpcy5fZnVzZU1hdGNoTWVkaWFTZXJ2aWNlLm9uTWVkaWFDaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl91bnN1YnNjcmliZUFsbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIEdldCB0aGUgYWN0aXZlIHN0YXR1c1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gdGhpcy5fbWVkaWFPYnNlcnZlci5pc0FjdGl2ZSh0aGlzLmxvY2tlZE9wZW4pO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGJvdGggc3RhdHVzIGFyZSB0aGUgc2FtZSwgZG9uJ3QgYWN0XG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLl93YXNBY3RpdmUgPT09IGlzQWN0aXZlIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBBY3RpdmF0ZSB0aGUgbG9ja2VkT3BlblxuICAgICAgICAgICAgICAgIGlmICggaXNBY3RpdmUgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBsb2NrZWRPcGVuIHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9ja2VkT3BlbiA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU2hvdyB0aGUgc2lkZWJhclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93U2lkZWJhcigpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEZvcmNlIHRoZSB0aGUgb3BlbmVkIHN0YXR1cyB0byB0cnVlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBFbWl0IHRoZSAnb3BlbmVkQ2hhbmdlZCcgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2VkLmVtaXQodGhpcy5vcGVuZWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBzaWRlYmFyIHdhcyBmb2xkZWQsIGZvcmNlZnVsbHkgZm9sZCBpdCBhZ2FpblxuICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMuX3dhc0ZvbGRlZCApXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVuYWJsZSB0aGUgYW5pbWF0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5hYmxlQW5pbWF0aW9ucygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGb2xkXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvbGRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIEhpZGUgdGhlIGJhY2tkcm9wIGlmIGFueSBleGlzdHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZUJhY2tkcm9wKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIERlLUFjdGl2YXRlIHRoZSBsb2NrZWRPcGVuXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBsb2NrZWRPcGVuIHN0YXR1c1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9ja2VkT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVuZm9sZCB0aGUgc2lkZWJhciBpbiBjYXNlIGlmIGl0IHdhcyBmb2xkZWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmZvbGQoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBGb3JjZSB0aGUgdGhlIG9wZW5lZCBzdGF0dXMgdG8gY2xvc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBFbWl0IHRoZSAnb3BlbmVkQ2hhbmdlZCcgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2VkLmVtaXQodGhpcy5vcGVuZWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEhpZGUgdGhlIHNpZGViYXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZVNpZGViYXIoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBTdG9yZSB0aGUgbmV3IGFjdGl2ZSBzdGF0dXNcbiAgICAgICAgICAgICAgICB0aGlzLl93YXNBY3RpdmUgPSBpc0FjdGl2ZTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBpbml0aWFsIGZvbGRlZCBzdGF0dXNcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2V0dXBGb2xkZWQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gUmV0dXJuLCBpZiBzaWRlYmFyIGlzIG5vdCBmb2xkZWRcbiAgICAgICAgaWYgKCAhdGhpcy5mb2xkZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gaWYgdGhlIHNpZGViYXIgaXMgY2xvc2VkXG4gICAgICAgIGlmICggIXRoaXMub3BlbmVkIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJvZ3JhbW1hdGljYWxseSBhZGQvcmVtb3ZlIHBhZGRpbmcgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgLy8gdGhhdCBjb21lcyBhZnRlciBvciBiZWZvcmUgYmFzZWQgb24gdGhlIHBvc2l0aW9uXG4gICAgICAgIGxldCBzaWJsaW5nLFxuICAgICAgICAgICAgc3R5bGVSdWxlO1xuXG4gICAgICAgIGNvbnN0IHN0eWxlVmFsdWUgPSB0aGlzLmZvbGRlZFdpZHRoICsgJ3B4JztcblxuICAgICAgICAvLyBHZXQgdGhlIHNpYmxpbmcgYW5kIHNldCB0aGUgc3R5bGUgcnVsZVxuICAgICAgICBpZiAoIHRoaXMucG9zaXRpb24gPT09ICdsZWZ0JyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNpYmxpbmcgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgc3R5bGVSdWxlID0gJ3BhZGRpbmctbGVmdCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBzaWJsaW5nID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBzdHlsZVJ1bGUgPSAncGFkZGluZy1yaWdodCc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSBpcyBubyBzaWJsaW5nLCByZXR1cm4uLi5cbiAgICAgICAgaWYgKCAhc2libGluZyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZvbGQgdGhlIHNpZGViYXJcbiAgICAgICAgdGhpcy5mb2xkKCk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBmb2xkZWQgd2lkdGhcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBzdHlsZVZhbHVlKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWluLXdpZHRoJywgc3R5bGVWYWx1ZSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsIHN0eWxlVmFsdWUpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgc3R5bGUgYW5kIGNsYXNzXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHNpYmxpbmcsIHN0eWxlUnVsZSwgc3R5bGVWYWx1ZSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZvbGRlZCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIGJhY2tkcm9wXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3Nob3dCYWNrZHJvcCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBDcmVhdGUgdGhlIGJhY2tkcm9wIGVsZW1lbnRcbiAgICAgICAgdGhpcy5fYmFja2Ryb3AgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICAvLyBBZGQgYSBjbGFzcyB0byB0aGUgYmFja2Ryb3AgZWxlbWVudFxuICAgICAgICB0aGlzLl9iYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdmdXNlLXNpZGViYXItb3ZlcmxheScpO1xuXG4gICAgICAgIC8vIEFkZCBhIGNsYXNzIGRlcGVuZGluZyBvbiB0aGUgaW52aXNpYmxlT3ZlcmxheSBvcHRpb25cbiAgICAgICAgaWYgKCB0aGlzLmludmlzaWJsZU92ZXJsYXkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdmdXNlLXNpZGViYXItb3ZlcmxheS1pbnZpc2libGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFwcGVuZCB0aGUgYmFja2Ryb3AgdG8gdGhlIHBhcmVudCBvZiB0aGUgc2lkZWJhclxuICAgICAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucGFyZW50RWxlbWVudCwgdGhpcy5fYmFja2Ryb3ApO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZW50ZXIgYW5pbWF0aW9uIGFuZCBhdHRhY2ggaXQgdG8gdGhlIHBsYXllclxuICAgICAgICB0aGlzLl9wbGF5ZXIgPVxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uQnVpbGRlclxuICAgICAgICAgICAgICAgIC5idWlsZChbXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoJzMwMG1zIGVhc2UnLCBzdHlsZSh7b3BhY2l0eTogMX0pKVxuICAgICAgICAgICAgICAgIF0pLmNyZWF0ZSh0aGlzLl9iYWNrZHJvcCk7XG5cbiAgICAgICAgLy8gUGxheSB0aGUgYW5pbWF0aW9uXG4gICAgICAgIHRoaXMuX3BsYXllci5wbGF5KCk7XG5cbiAgICAgICAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBvdmVybGF5XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBiYWNrZHJvcFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9oaWRlQmFja2Ryb3AoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCAhdGhpcy5fYmFja2Ryb3AgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGxlYXZlIGFuaW1hdGlvbiBhbmQgYXR0YWNoIGl0IHRvIHRoZSBwbGF5ZXJcbiAgICAgICAgdGhpcy5fcGxheWVyID1cbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkJ1aWxkZXJcbiAgICAgICAgICAgICAgICAuYnVpbGQoW1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKCczMDBtcyBlYXNlJywgc3R5bGUoe29wYWNpdHk6IDB9KSlcbiAgICAgICAgICAgICAgICBdKS5jcmVhdGUodGhpcy5fYmFja2Ryb3ApO1xuXG4gICAgICAgIC8vIFBsYXkgdGhlIGFuaW1hdGlvblxuICAgICAgICB0aGlzLl9wbGF5ZXIucGxheSgpO1xuXG4gICAgICAgIC8vIE9uY2UgdGhlIGFuaW1hdGlvbiBpcyBkb25lLi4uXG4gICAgICAgIHRoaXMuX3BsYXllci5vbkRvbmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBJZiB0aGUgYmFja2Ryb3Agc3RpbGwgZXhpc3RzLi4uXG4gICAgICAgICAgICBpZiAoIHRoaXMuX2JhY2tkcm9wIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGJhY2tkcm9wXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFja2Ryb3AucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9iYWNrZHJvcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYmFja2Ryb3AgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2Ugc29tZSBwcm9wZXJ0aWVzIG9mIHRoZSBzaWRlYmFyXG4gICAgICogYW5kIG1ha2UgaXQgdmlzaWJsZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zaG93U2lkZWJhcigpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBSZW1vdmUgdGhlIGJveC1zaGFkb3cgc3R5bGVcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYm94LXNoYWRvdycpO1xuXG4gICAgICAgIC8vIE1ha2UgdGhlIHNpZGViYXIgaW52aXNpYmxlXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Zpc2liaWxpdHknKTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGFuZ2Ugc29tZSBwcm9wZXJ0aWVzIG9mIHRoZSBzaWRlYmFyXG4gICAgICogYW5kIG1ha2UgaXQgaW52aXNpYmxlXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2hpZGVTaWRlYmFyKGRlbGF5ID0gdHJ1ZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGNvbnN0IGRlbGF5QW1vdW50ID0gZGVsYXkgPyAzMDAgOiAwO1xuXG4gICAgICAgIC8vIEFkZCBhIGRlbGF5IHNvIGNsb3NlIGFuaW1hdGlvbiBjYW4gcGxheVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBib3gtc2hhZG93XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdib3gtc2hhZG93JywgJ25vbmUnKTtcblxuICAgICAgICAgICAgLy8gTWFrZSB0aGUgc2lkZWJhciBpbnZpc2libGVcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG4gICAgICAgIH0sIGRlbGF5QW1vdW50KTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgdGhlIGFuaW1hdGlvbnNcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfZW5hYmxlQW5pbWF0aW9ucygpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBSZXR1cm4gaWYgYW5pbWF0aW9ucyBhbHJlYWR5IGVuYWJsZWRcbiAgICAgICAgaWYgKCB0aGlzLl9hbmltYXRpb25zRW5hYmxlZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVuYWJsZSB0aGUgYW5pbWF0aW9uc1xuICAgICAgICB0aGlzLl9hbmltYXRpb25zRW5hYmxlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFB1YmxpYyBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIE9wZW4gdGhlIHNpZGViYXJcbiAgICAgKi9cbiAgICBvcGVuKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICggdGhpcy5vcGVuZWQgfHwgdGhpcy5pc0xvY2tlZE9wZW4gKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmFibGUgdGhlIGFuaW1hdGlvbnNcbiAgICAgICAgdGhpcy5fZW5hYmxlQW5pbWF0aW9ucygpO1xuXG4gICAgICAgIC8vIFNob3cgdGhlIHNpZGViYXJcbiAgICAgICAgdGhpcy5fc2hvd1NpZGViYXIoKTtcblxuICAgICAgICAvLyBTaG93IHRoZSBiYWNrZHJvcFxuICAgICAgICB0aGlzLl9zaG93QmFja2Ryb3AoKTtcblxuICAgICAgICAvLyBTZXQgdGhlIG9wZW5lZCBzdGF0dXNcbiAgICAgICAgdGhpcy5vcGVuZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIEVtaXQgdGhlICdvcGVuZWRDaGFuZ2VkJyBldmVudFxuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZWQuZW1pdCh0aGlzLm9wZW5lZCk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2UgdGhlIHNpZGViYXJcbiAgICAgKi9cbiAgICBjbG9zZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoICF0aGlzLm9wZW5lZCB8fCB0aGlzLmlzTG9ja2VkT3BlbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVuYWJsZSB0aGUgYW5pbWF0aW9uc1xuICAgICAgICB0aGlzLl9lbmFibGVBbmltYXRpb25zKCk7XG5cbiAgICAgICAgLy8gSGlkZSB0aGUgYmFja2Ryb3BcbiAgICAgICAgdGhpcy5faGlkZUJhY2tkcm9wKCk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBvcGVuZWQgc3RhdHVzXG4gICAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gRW1pdCB0aGUgJ29wZW5lZENoYW5nZWQnIGV2ZW50XG4gICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlZC5lbWl0KHRoaXMub3BlbmVkKTtcblxuICAgICAgICAvLyBIaWRlIHRoZSBzaWRlYmFyXG4gICAgICAgIHRoaXMuX2hpZGVTaWRlYmFyKCk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIG9wZW4vY2xvc2UgdGhlIHNpZGViYXJcbiAgICAgKi9cbiAgICB0b2dnbGVPcGVuKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICggdGhpcy5vcGVuZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdXNlZW50ZXJcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgICBvbk1vdXNlRW50ZXIoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gT25seSB3b3JrIGlmIHRoZSBhdXRvIHRyaWdnZXIgaXMgZW5hYmxlZFxuICAgICAgICBpZiAoICF0aGlzLmZvbGRlZEF1dG9UcmlnZ2VyT25Ib3ZlciApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5mb2xkVGVtcG9yYXJpbHkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZWxlYXZlXG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXG4gICAgb25Nb3VzZUxlYXZlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIE9ubHkgd29yayBpZiB0aGUgYXV0byB0cmlnZ2VyIGlzIGVuYWJsZWRcbiAgICAgICAgaWYgKCAhdGhpcy5mb2xkZWRBdXRvVHJpZ2dlck9uSG92ZXIgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvbGRUZW1wb3JhcmlseSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZvbGQgdGhlIHNpZGViYXIgcGVybWFuZW50bHlcbiAgICAgKi9cbiAgICBmb2xkKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIE9ubHkgd29yayBpZiB0aGUgc2lkZWJhciBpcyBub3QgZm9sZGVkXG4gICAgICAgIGlmICggdGhpcy5mb2xkZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmFibGUgdGhlIGFuaW1hdGlvbnNcbiAgICAgICAgdGhpcy5fZW5hYmxlQW5pbWF0aW9ucygpO1xuXG4gICAgICAgIC8vIEZvbGRcbiAgICAgICAgdGhpcy5mb2xkZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuZm9sZCB0aGUgc2lkZWJhciBwZXJtYW5lbnRseVxuICAgICAqL1xuICAgIHVuZm9sZCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBPbmx5IHdvcmsgaWYgdGhlIHNpZGViYXIgaXMgZm9sZGVkXG4gICAgICAgIGlmICggIXRoaXMuZm9sZGVkIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5hYmxlIHRoZSBhbmltYXRpb25zXG4gICAgICAgIHRoaXMuX2VuYWJsZUFuaW1hdGlvbnMoKTtcblxuICAgICAgICAvLyBVbmZvbGRcbiAgICAgICAgdGhpcy5mb2xkZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgdGhlIHNpZGViYXIgZm9sZC91bmZvbGQgcGVybWFuZW50bHlcbiAgICAgKi9cbiAgICB0b2dnbGVGb2xkKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICggdGhpcy5mb2xkZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVuZm9sZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5mb2xkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2xkIHRoZSB0ZW1wb3JhcmlseSB1bmZvbGRlZCBzaWRlYmFyIGJhY2tcbiAgICAgKi9cbiAgICBmb2xkVGVtcG9yYXJpbHkoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gT25seSB3b3JrIGlmIHRoZSBzaWRlYmFyIGlzIGZvbGRlZFxuICAgICAgICBpZiAoICF0aGlzLmZvbGRlZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVuYWJsZSB0aGUgYW5pbWF0aW9uc1xuICAgICAgICB0aGlzLl9lbmFibGVBbmltYXRpb25zKCk7XG5cbiAgICAgICAgLy8gRm9sZCB0aGUgc2lkZWJhciBiYWNrXG4gICAgICAgIHRoaXMudW5mb2xkZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBTZXQgdGhlIGZvbGRlZCB3aWR0aFxuICAgICAgICBjb25zdCBzdHlsZVZhbHVlID0gdGhpcy5mb2xkZWRXaWR0aCArICdweCc7XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBzdHlsZVZhbHVlKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWluLXdpZHRoJywgc3R5bGVWYWx1ZSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsIHN0eWxlVmFsdWUpO1xuXG4gICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVuZm9sZCB0aGUgc2lkZWJhciB0ZW1wb3JhcmlseVxuICAgICAqL1xuICAgIHVuZm9sZFRlbXBvcmFyaWx5KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIE9ubHkgd29yayBpZiB0aGUgc2lkZWJhciBpcyBmb2xkZWRcbiAgICAgICAgaWYgKCAhdGhpcy5mb2xkZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmFibGUgdGhlIGFuaW1hdGlvbnNcbiAgICAgICAgdGhpcy5fZW5hYmxlQW5pbWF0aW9ucygpO1xuXG4gICAgICAgIC8vIFVuZm9sZCB0aGUgc2lkZWJhciB0ZW1wb3JhcmlseVxuICAgICAgICB0aGlzLnVuZm9sZGVkID0gdHJ1ZTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGZvbGRlZCB3aWR0aFxuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtaW4td2lkdGgnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJyk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxufVxuIl19