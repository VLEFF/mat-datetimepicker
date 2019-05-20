import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseSidebarService } from './sidebar.service';
import { FuseMatchMediaService } from '../../services/match-media.service';
import { FuseConfigService } from '../../services/config.service';
var FuseSidebarComponent = /** @class */ (function () {
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
    function FuseSidebarComponent(_animationBuilder, _changeDetectorRef, _elementRef, _fuseConfigService, _fuseMatchMediaService, _fuseSidebarService, _mediaObserver, _renderer) {
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
    Object.defineProperty(FuseSidebarComponent.prototype, "folded", {
        get: function () {
            return this._folded;
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Folded
         *
         * @param {boolean} value
         */
        set: function (value) {
            // Set the folded
            this._folded = value;
            // Return if the sidebar is closed
            if (!this.opened) {
                return;
            }
            // Programmatically add/remove padding to the element
            // that comes after or before based on the position
            var sibling, styleRule;
            var styleValue = this.foldedWidth + 'px';
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
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (config) {
            _this._fuseConfig = config;
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
    };
    /**
     * On destroy
     */
    FuseSidebarComponent.prototype.ngOnDestroy = function () {
        // If the sidebar is folded, unfold it to revert modifications
        if (this.folded) {
            this.unfold();
        }
        // Unregister the sidebar
        this._fuseSidebarService.unregister(this.name);
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Setup the visibility of the sidebar
     *
     * @private
     */
    FuseSidebarComponent.prototype._setupVisibility = function () {
        // Remove the existing box-shadow
        this._renderer.setStyle(this._elementRef.nativeElement, 'box-shadow', 'none');
        // Make the sidebar invisible
        this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
    };
    /**
     * Setup the sidebar position
     *
     * @private
     */
    FuseSidebarComponent.prototype._setupPosition = function () {
        // Add the correct class name to the sidebar
        // element depending on the position attribute
        if (this.position === 'right') {
            this._renderer.addClass(this._elementRef.nativeElement, 'right-positioned');
        }
        else {
            this._renderer.addClass(this._elementRef.nativeElement, 'left-positioned');
        }
    };
    /**
     * Setup the lockedOpen handler
     *
     * @private
     */
    FuseSidebarComponent.prototype._setupLockedOpen = function () {
        var _this = this;
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
            .subscribe(function () {
            // Get the active status
            var isActive = _this._mediaObserver.isActive(_this.lockedOpen);
            // If the both status are the same, don't act
            if (_this._wasActive === isActive) {
                return;
            }
            // Activate the lockedOpen
            if (isActive) {
                // Set the lockedOpen status
                _this.isLockedOpen = true;
                // Show the sidebar
                _this._showSidebar();
                // Force the the opened status to true
                _this.opened = true;
                // Emit the 'openedChanged' event
                _this.openedChanged.emit(_this.opened);
                // If the sidebar was folded, forcefully fold it again
                if (_this._wasFolded) {
                    // Enable the animations
                    _this._enableAnimations();
                    // Fold
                    _this.folded = true;
                    // Mark for check
                    _this._changeDetectorRef.markForCheck();
                }
                // Hide the backdrop if any exists
                _this._hideBackdrop();
            }
            // De-Activate the lockedOpen
            else {
                // Set the lockedOpen status
                _this.isLockedOpen = false;
                // Unfold the sidebar in case if it was folded
                _this.unfold();
                // Force the the opened status to close
                _this.opened = false;
                // Emit the 'openedChanged' event
                _this.openedChanged.emit(_this.opened);
                // Hide the sidebar
                _this._hideSidebar();
            }
            // Store the new active status
            _this._wasActive = isActive;
        });
    };
    /**
     * Setup the initial folded status
     *
     * @private
     */
    FuseSidebarComponent.prototype._setupFolded = function () {
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
        var sibling, styleRule;
        var styleValue = this.foldedWidth + 'px';
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
    };
    /**
     * Show the backdrop
     *
     * @private
     */
    FuseSidebarComponent.prototype._showBackdrop = function () {
        var _this = this;
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
        this._backdrop.addEventListener('click', function () {
            _this.close();
        });
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Hide the backdrop
     *
     * @private
     */
    FuseSidebarComponent.prototype._hideBackdrop = function () {
        var _this = this;
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
        this._player.onDone(function () {
            // If the backdrop still exists...
            if (_this._backdrop) {
                // Remove the backdrop
                _this._backdrop.parentNode.removeChild(_this._backdrop);
                _this._backdrop = null;
            }
        });
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Change some properties of the sidebar
     * and make it visible
     *
     * @private
     */
    FuseSidebarComponent.prototype._showSidebar = function () {
        // Remove the box-shadow style
        this._renderer.removeStyle(this._elementRef.nativeElement, 'box-shadow');
        // Make the sidebar invisible
        this._renderer.removeStyle(this._elementRef.nativeElement, 'visibility');
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Change some properties of the sidebar
     * and make it invisible
     *
     * @private
     */
    FuseSidebarComponent.prototype._hideSidebar = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = true; }
        var delayAmount = delay ? 300 : 0;
        // Add a delay so close animation can play
        setTimeout(function () {
            // Remove the box-shadow
            _this._renderer.setStyle(_this._elementRef.nativeElement, 'box-shadow', 'none');
            // Make the sidebar invisible
            _this._renderer.setStyle(_this._elementRef.nativeElement, 'visibility', 'hidden');
        }, delayAmount);
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Enable the animations
     *
     * @private
     */
    FuseSidebarComponent.prototype._enableAnimations = function () {
        // Return if animations already enabled
        if (this._animationsEnabled) {
            return;
        }
        // Enable the animations
        this._animationsEnabled = true;
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Open the sidebar
     */
    FuseSidebarComponent.prototype.open = function () {
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
    };
    /**
     * Close the sidebar
     */
    FuseSidebarComponent.prototype.close = function () {
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
    };
    /**
     * Toggle open/close the sidebar
     */
    FuseSidebarComponent.prototype.toggleOpen = function () {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Mouseenter
     */
    FuseSidebarComponent.prototype.onMouseEnter = function () {
        // Only work if the auto trigger is enabled
        if (!this.foldedAutoTriggerOnHover) {
            return;
        }
        this.unfoldTemporarily();
    };
    /**
     * Mouseleave
     */
    FuseSidebarComponent.prototype.onMouseLeave = function () {
        // Only work if the auto trigger is enabled
        if (!this.foldedAutoTriggerOnHover) {
            return;
        }
        this.foldTemporarily();
    };
    /**
     * Fold the sidebar permanently
     */
    FuseSidebarComponent.prototype.fold = function () {
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
    };
    /**
     * Unfold the sidebar permanently
     */
    FuseSidebarComponent.prototype.unfold = function () {
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
    };
    /**
     * Toggle the sidebar fold/unfold permanently
     */
    FuseSidebarComponent.prototype.toggleFold = function () {
        if (this.folded) {
            this.unfold();
        }
        else {
            this.fold();
        }
    };
    /**
     * Fold the temporarily unfolded sidebar back
     */
    FuseSidebarComponent.prototype.foldTemporarily = function () {
        // Only work if the sidebar is folded
        if (!this.folded) {
            return;
        }
        // Enable the animations
        this._enableAnimations();
        // Fold the sidebar back
        this.unfolded = false;
        // Set the folded width
        var styleValue = this.foldedWidth + 'px';
        this._renderer.setStyle(this._elementRef.nativeElement, 'width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'min-width', styleValue);
        this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', styleValue);
        // Mark for check
        this._changeDetectorRef.markForCheck();
    };
    /**
     * Unfold the sidebar temporarily
     */
    FuseSidebarComponent.prototype.unfoldTemporarily = function () {
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
    };
    FuseSidebarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-sidebar',
                    template: "<ng-content></ng-content>",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["fuse-sidebar{display:flex;flex-direction:column;flex:1 0 auto;position:absolute;top:0;bottom:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch;width:280px;min-width:280px;max-width:280px;z-index:1000;box-shadow:0 2px 8px 0 rgba(0,0,0,.35)}@media screen and (max-width:599px){fuse-sidebar{min-width:0!important;max-width:80vw!important;width:80vw!important}}fuse-sidebar.left-positioned{left:0;-webkit-transform:translateX(-100%);transform:translateX(-100%)}fuse-sidebar.right-positioned{right:0;-webkit-transform:translateX(100%);transform:translateX(100%)}fuse-sidebar.open{-webkit-transform:translateX(0);transform:translateX(0)}fuse-sidebar.locked-open{position:relative!important;-webkit-transform:translateX(0)!important;transform:translateX(0)!important}fuse-sidebar.folded{position:absolute!important;top:0;bottom:0}fuse-sidebar.animations-enabled{transition-property:transform,width,min-width,max-width,-webkit-transform;transition-duration:150ms;transition-timing-function:ease-in-out}.fuse-sidebar-overlay{position:absolute;top:0;bottom:0;left:0;right:0;z-index:999;opacity:0}"]
                }] }
    ];
    /** @nocollapse */
    FuseSidebarComponent.ctorParameters = function () { return [
        { type: AnimationBuilder },
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: FuseConfigService },
        { type: FuseMatchMediaService },
        { type: FuseSidebarService },
        { type: MediaObserver },
        { type: Renderer2 }
    ]; };
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
    return FuseSidebarComponent;
}());
export { FuseSidebarComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILGlCQUFpQixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFxQixNQUFNLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUNwSixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFtQixLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDckQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDdkQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFbEU7SUFvRUk7Ozs7Ozs7Ozs7O09BV0c7SUFDSCw4QkFDWSxpQkFBbUMsRUFDbkMsa0JBQXFDLEVBQ3JDLFdBQXVCLEVBQ3ZCLGtCQUFxQyxFQUNyQyxzQkFBNkMsRUFDN0MsbUJBQXVDLEVBQ3ZDLGNBQTZCLEVBQzdCLFNBQW9CO1FBUHBCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0Msd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFvQjtRQUN2QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBM0J4QixjQUFTLEdBQXVCLElBQUksQ0FBQztRQThCekMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBRTlCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBV0Qsc0JBQ0ksd0NBQU07YUF1RVY7WUFFSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEIsQ0FBQztRQXBGRCx3R0FBd0c7UUFDeEcsY0FBYztRQUNkLHdHQUF3RztRQUV4Rzs7OztXQUlHO2FBQ0gsVUFDVyxLQUFjO1lBRXJCLGlCQUFpQjtZQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUVyQixrQ0FBa0M7WUFDbEMsSUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ2pCO2dCQUNJLE9BQU87YUFDVjtZQUVELHFEQUFxRDtZQUNyRCxtREFBbUQ7WUFDbkQsSUFBSSxPQUFPLEVBQ1AsU0FBUyxDQUFDO1lBRWQsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFFM0MseUNBQXlDO1lBQ3pDLElBQUssSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQzdCO2dCQUNJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDNUQsU0FBUyxHQUFHLGNBQWMsQ0FBQzthQUM5QjtpQkFFRDtnQkFDSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7Z0JBQ2hFLFNBQVMsR0FBRyxlQUFlLENBQUM7YUFDL0I7WUFFRCxvQ0FBb0M7WUFDcEMsSUFBSyxDQUFDLE9BQU8sRUFDYjtnQkFDSSxPQUFPO2FBQ1Y7WUFFRCxlQUFlO1lBQ2YsSUFBSyxLQUFLLEVBQ1Y7Z0JBQ0ksbUJBQW1CO2dCQUNuQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRVosdUJBQXVCO2dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztnQkFDakYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2dCQUVqRiwwQkFBMEI7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3JFO1lBQ0QsaUJBQWlCO2lCQUVqQjtnQkFDSSxxQkFBcUI7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFZCwwQkFBMEI7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBRXhFLDZCQUE2QjtnQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN4RTtZQUVELGlDQUFpQztZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFPRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILHVDQUFRLEdBQVI7UUFBQSxpQkF1QkM7UUFyQkcsOEJBQThCO1FBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNO2FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxVQUFDLE1BQU07WUFDZCxLQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUVQLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbkQsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLGVBQWU7UUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsMENBQVcsR0FBWDtRQUVJLDhEQUE4RDtRQUM5RCxJQUFLLElBQUksQ0FBQyxNQUFNLEVBQ2hCO1lBQ0ksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO1FBRUQseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9DLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxvQkFBb0I7SUFDcEIsd0dBQXdHO0lBRXhHOzs7O09BSUc7SUFDSywrQ0FBZ0IsR0FBeEI7UUFFSSxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTlFLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEYsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyw2Q0FBYyxHQUF0QjtRQUVJLDRDQUE0QztRQUM1Qyw4Q0FBOEM7UUFDOUMsSUFBSyxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFDOUI7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQy9FO2FBRUQ7WUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQzlFO0lBQ0wsQ0FBQztJQUVEOzs7O09BSUc7SUFDSywrQ0FBZ0IsR0FBeEI7UUFBQSxpQkFxRkM7UUFuRkcsc0NBQXNDO1FBQ3RDLElBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUNyQjtZQUNJLFNBQVM7WUFDVCxPQUFPO1NBQ1Y7UUFFRCx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFFeEIsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUU5QixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYTthQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUM7WUFFUCx3QkFBd0I7WUFDeEIsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRS9ELDZDQUE2QztZQUM3QyxJQUFLLEtBQUksQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUNqQztnQkFDSSxPQUFPO2FBQ1Y7WUFFRCwwQkFBMEI7WUFDMUIsSUFBSyxRQUFRLEVBQ2I7Z0JBQ0ksNEJBQTRCO2dCQUM1QixLQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFFekIsbUJBQW1CO2dCQUNuQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBRXBCLHNDQUFzQztnQkFDdEMsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBRW5CLGlDQUFpQztnQkFDakMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUVyQyxzREFBc0Q7Z0JBQ3RELElBQUssS0FBSSxDQUFDLFVBQVUsRUFDcEI7b0JBQ0ksd0JBQXdCO29CQUN4QixLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztvQkFFekIsT0FBTztvQkFDUCxLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFFbkIsaUJBQWlCO29CQUNqQixLQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQzFDO2dCQUVELGtDQUFrQztnQkFDbEMsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQ3hCO1lBQ0QsNkJBQTZCO2lCQUU3QjtnQkFDSSw0QkFBNEI7Z0JBQzVCLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUUxQiw4Q0FBOEM7Z0JBQzlDLEtBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFZCx1Q0FBdUM7Z0JBQ3ZDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUVwQixpQ0FBaUM7Z0JBQ2pDLEtBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFckMsbUJBQW1CO2dCQUNuQixLQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdkI7WUFFRCw4QkFBOEI7WUFDOUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDJDQUFZLEdBQXBCO1FBRUksbUNBQW1DO1FBQ25DLElBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUNqQjtZQUNJLE9BQU87U0FDVjtRQUVELGtDQUFrQztRQUNsQyxJQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFDakI7WUFDSSxPQUFPO1NBQ1Y7UUFFRCxxREFBcUQ7UUFDckQsbURBQW1EO1FBQ25ELElBQUksT0FBTyxFQUNQLFNBQVMsQ0FBQztRQUVkLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRTNDLHlDQUF5QztRQUN6QyxJQUFLLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUM3QjtZQUNJLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztZQUM1RCxTQUFTLEdBQUcsY0FBYyxDQUFDO1NBQzlCO2FBRUQ7WUFDSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsc0JBQXNCLENBQUM7WUFDaEUsU0FBUyxHQUFHLGVBQWUsQ0FBQztTQUMvQjtRQUVELG9DQUFvQztRQUNwQyxJQUFLLENBQUMsT0FBTyxFQUNiO1lBQ0ksT0FBTztTQUNWO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVaLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVqRiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDRDQUFhLEdBQXJCO1FBQUEsaUJBbUNDO1FBakNHLDhCQUE4QjtRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJELHNDQUFzQztRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVyRCx1REFBdUQ7UUFDdkQsSUFBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQzFCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDbEU7UUFFRCxtREFBbUQ7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV6Rix5REFBeUQ7UUFDekQsSUFBSSxDQUFDLE9BQU87WUFDUixJQUFJLENBQUMsaUJBQWlCO2lCQUNqQixLQUFLLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQzthQUM3QyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVsQyxxQkFBcUI7UUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVwQix1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7WUFDakMsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUMsQ0FDSixDQUFDO1FBRUYsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLDRDQUFhLEdBQXJCO1FBQUEsaUJBK0JDO1FBN0JHLElBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUNwQjtZQUNJLE9BQU87U0FDVjtRQUVELHlEQUF5RDtRQUN6RCxJQUFJLENBQUMsT0FBTztZQUNSLElBQUksQ0FBQyxpQkFBaUI7aUJBQ2pCLEtBQUssQ0FBQztnQkFDSCxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQzdDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWxDLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRXBCLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUVoQixrQ0FBa0M7WUFDbEMsSUFBSyxLQUFJLENBQUMsU0FBUyxFQUNuQjtnQkFDSSxzQkFBc0I7Z0JBQ3RCLEtBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RELEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLDJDQUFZLEdBQXBCO1FBRUksOEJBQThCO1FBQzlCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXpFLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUV6RSxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLDJDQUFZLEdBQXBCLFVBQXFCLEtBQVk7UUFBakMsaUJBZ0JDO1FBaEJvQixzQkFBQSxFQUFBLFlBQVk7UUFFN0IsSUFBTSxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwQywwQ0FBMEM7UUFDMUMsVUFBVSxDQUFDO1lBRVAsd0JBQXdCO1lBQ3hCLEtBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU5RSw2QkFBNkI7WUFDN0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BGLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVoQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssZ0RBQWlCLEdBQXpCO1FBRUksdUNBQXVDO1FBQ3ZDLElBQUssSUFBSSxDQUFDLGtCQUFrQixFQUM1QjtZQUNJLE9BQU87U0FDVjtRQUVELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBRS9CLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxtQkFBbUI7SUFDbkIsd0dBQXdHO0lBRXhHOztPQUVHO0lBQ0gsbUNBQUksR0FBSjtRQUVJLElBQUssSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsWUFBWSxFQUNyQztZQUNJLE9BQU87U0FDVjtRQUVELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFckIsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRW5CLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFckMsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxvQ0FBSyxHQUFMO1FBRUksSUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksRUFDdEM7WUFDSSxPQUFPO1NBQ1Y7UUFFRCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFekIsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUVyQix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsaUNBQWlDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVyQyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVEOztPQUVHO0lBQ0gseUNBQVUsR0FBVjtRQUVJLElBQUssSUFBSSxDQUFDLE1BQU0sRUFDaEI7WUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDaEI7YUFFRDtZQUNJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBRUgsMkNBQVksR0FEWjtRQUdJLDJDQUEyQztRQUMzQyxJQUFLLENBQUMsSUFBSSxDQUFDLHdCQUF3QixFQUNuQztZQUNJLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUVILDJDQUFZLEdBRFo7UUFHSSwyQ0FBMkM7UUFDM0MsSUFBSyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFDbkM7WUFDSSxPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUNBQUksR0FBSjtRQUVJLHlDQUF5QztRQUN6QyxJQUFLLElBQUksQ0FBQyxNQUFNLEVBQ2hCO1lBQ0ksT0FBTztTQUNWO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLE9BQU87UUFDUCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVuQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILHFDQUFNLEdBQU47UUFFSSxxQ0FBcUM7UUFDckMsSUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ2pCO1lBQ0ksT0FBTztTQUNWO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLFNBQVM7UUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILHlDQUFVLEdBQVY7UUFFSSxJQUFLLElBQUksQ0FBQyxNQUFNLEVBQ2hCO1lBQ0ksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCO2FBRUQ7WUFDSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjtJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILDhDQUFlLEdBQWY7UUFFSSxxQ0FBcUM7UUFDckMsSUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ2pCO1lBQ0ksT0FBTztTQUNWO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV0Qix1QkFBdUI7UUFDdkIsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFFM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFakYsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnREFBaUIsR0FBakI7UUFFSSxxQ0FBcUM7UUFDckMsSUFBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ2pCO1lBQ0ksT0FBTztTQUNWO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRXpCLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUVyQiwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFeEUsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMzQyxDQUFDOztnQkFueEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQU8sY0FBYztvQkFDN0IscUNBQXlDO29CQUV6QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7aUJBQ3hDOzs7O2dCQWRpQixnQkFBZ0I7Z0JBRjlCLGlCQUFpQjtnQkFBYSxVQUFVO2dCQVNuQyxpQkFBaUI7Z0JBRGpCLHFCQUFxQjtnQkFEckIsa0JBQWtCO2dCQUpsQixhQUFhO2dCQUhtRyxTQUFTOzs7dUJBb0I3SCxLQUFLO3NCQUlMLEtBQUs7MkJBSUwsS0FBSzt5QkFJTCxXQUFXLFNBQUMsWUFBWTs2QkFJeEIsS0FBSzsrQkFJTCxXQUFXLFNBQUMsbUJBQW1COzhCQUkvQixLQUFLOzJDQUlMLEtBQUs7MkJBSUwsV0FBVyxTQUFDLGdCQUFnQjttQ0FJNUIsS0FBSztnQ0FJTCxNQUFNO2dDQUlOLE1BQU07cUNBWU4sV0FBVyxTQUFDLDBCQUEwQjt5QkFrRHRDLEtBQUs7K0JBd2hCTCxZQUFZLFNBQUMsWUFBWTsrQkFlekIsWUFBWSxTQUFDLFlBQVk7O0lBMEg5QiwyQkFBQztDQUFBLEFBcHhCRCxJQW94QkM7U0E5d0JZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkJ1aWxkZXIsIEFuaW1hdGlvblBsYXllciwgc3R5bGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE1lZGlhT2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZ1c2VTaWRlYmFyU2VydmljZSB9IGZyb20gJy4vc2lkZWJhci5zZXJ2aWNlJztcbmltcG9ydCB7IEZ1c2VNYXRjaE1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21hdGNoLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnVzZUNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25maWcuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yICAgICA6ICdmdXNlLXNpZGViYXInLFxuICAgIHRlbXBsYXRlVXJsICA6ICcuL3NpZGViYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJscyAgICA6IFsnLi9zaWRlYmFyLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlU2lkZWJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgLy8gTmFtZVxuICAgIEBJbnB1dCgpXG4gICAgbmFtZTogc3RyaW5nO1xuXG4gICAgLy8gS2V5XG4gICAgQElucHV0KClcbiAgICBrZXk6IHN0cmluZztcblxuICAgIC8vIFBvc2l0aW9uXG4gICAgQElucHV0KClcbiAgICBwb3NpdGlvbjogJ2xlZnQnIHwgJ3JpZ2h0JztcblxuICAgIC8vIE9wZW5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm9wZW4nKVxuICAgIG9wZW5lZDogYm9vbGVhbjtcblxuICAgIC8vIExvY2tlZCBPcGVuXG4gICAgQElucHV0KClcbiAgICBsb2NrZWRPcGVuOiBzdHJpbmc7XG5cbiAgICAvLyBpc0xvY2tlZE9wZW5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmxvY2tlZC1vcGVuJylcbiAgICBpc0xvY2tlZE9wZW46IGJvb2xlYW47XG5cbiAgICAvLyBGb2xkZWQgd2lkdGhcbiAgICBASW5wdXQoKVxuICAgIGZvbGRlZFdpZHRoOiBudW1iZXI7XG5cbiAgICAvLyBGb2xkZWQgYXV0byB0cmlnZ2VyIG9uIGhvdmVyXG4gICAgQElucHV0KClcbiAgICBmb2xkZWRBdXRvVHJpZ2dlck9uSG92ZXI6IGJvb2xlYW47XG5cbiAgICAvLyBGb2xkZWQgdW5mb2xkZWRcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnVuZm9sZGVkJylcbiAgICB1bmZvbGRlZDogYm9vbGVhbjtcblxuICAgIC8vIEludmlzaWJsZSBvdmVybGF5XG4gICAgQElucHV0KClcbiAgICBpbnZpc2libGVPdmVybGF5OiBib29sZWFuO1xuXG4gICAgLy8gRm9sZGVkIGNoYW5nZWRcbiAgICBAT3V0cHV0KClcbiAgICBmb2xkZWRDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj47XG5cbiAgICAvLyBPcGVuZWQgY2hhbmdlZFxuICAgIEBPdXRwdXQoKVxuICAgIG9wZW5lZENoYW5nZWQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPjtcblxuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF9mb2xkZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfZnVzZUNvbmZpZzogYW55O1xuICAgIHByaXZhdGUgX3dhc0FjdGl2ZTogYm9vbGVhbjtcbiAgICBwcml2YXRlIF93YXNGb2xkZWQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfYmFja2Ryb3A6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgcHJpdmF0ZSBfcGxheWVyOiBBbmltYXRpb25QbGF5ZXI7XG4gICAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVBbGw6IFN1YmplY3Q8YW55PjtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MuYW5pbWF0aW9ucy1lbmFibGVkJylcbiAgICBfYW5pbWF0aW9uc0VuYWJsZWQ6IGJvb2xlYW47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtBbmltYXRpb25CdWlsZGVyfSBfYW5pbWF0aW9uQnVpbGRlclxuICAgICAqIEBwYXJhbSB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IF9jaGFuZ2VEZXRlY3RvclJlZlxuICAgICAqIEBwYXJhbSB7RWxlbWVudFJlZn0gX2VsZW1lbnRSZWZcbiAgICAgKiBAcGFyYW0ge0Z1c2VDb25maWdTZXJ2aWNlfSBfZnVzZUNvbmZpZ1NlcnZpY2VcbiAgICAgKiBAcGFyYW0ge0Z1c2VNYXRjaE1lZGlhU2VydmljZX0gX2Z1c2VNYXRjaE1lZGlhU2VydmljZVxuICAgICAqIEBwYXJhbSB7RnVzZVNpZGViYXJTZXJ2aWNlfSBfZnVzZVNpZGViYXJTZXJ2aWNlXG4gICAgICogQHBhcmFtIHtNZWRpYU9ic2VydmVyfSBfbWVkaWFPYnNlcnZlclxuICAgICAqIEBwYXJhbSB7UmVuZGVyZXIyfSBfcmVuZGVyZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9mdXNlQ29uZmlnU2VydmljZTogRnVzZUNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2Z1c2VNYXRjaE1lZGlhU2VydmljZTogRnVzZU1hdGNoTWVkaWFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9mdXNlU2lkZWJhclNlcnZpY2U6IEZ1c2VTaWRlYmFyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfbWVkaWFPYnNlcnZlcjogTWVkaWFPYnNlcnZlcixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgIClcbiAgICB7XG4gICAgICAgIC8vIFNldCB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5mb2xkZWRBdXRvVHJpZ2dlck9uSG92ZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLmZvbGRlZFdpZHRoID0gNjQ7XG4gICAgICAgIHRoaXMuZm9sZGVkQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2VkID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gJ2xlZnQnO1xuICAgICAgICB0aGlzLmludmlzaWJsZU92ZXJsYXkgPSBmYWxzZTtcblxuICAgICAgICAvLyBTZXQgdGhlIHByaXZhdGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uc0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZm9sZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgQWNjZXNzb3JzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEZvbGRlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2YWx1ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZvbGRlZCh2YWx1ZTogYm9vbGVhbilcbiAgICB7XG4gICAgICAgIC8vIFNldCB0aGUgZm9sZGVkXG4gICAgICAgIHRoaXMuX2ZvbGRlZCA9IHZhbHVlO1xuXG4gICAgICAgIC8vIFJldHVybiBpZiB0aGUgc2lkZWJhciBpcyBjbG9zZWRcbiAgICAgICAgaWYgKCAhdGhpcy5vcGVuZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcm9ncmFtbWF0aWNhbGx5IGFkZC9yZW1vdmUgcGFkZGluZyB0byB0aGUgZWxlbWVudFxuICAgICAgICAvLyB0aGF0IGNvbWVzIGFmdGVyIG9yIGJlZm9yZSBiYXNlZCBvbiB0aGUgcG9zaXRpb25cbiAgICAgICAgbGV0IHNpYmxpbmcsXG4gICAgICAgICAgICBzdHlsZVJ1bGU7XG5cbiAgICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IHRoaXMuZm9sZGVkV2lkdGggKyAncHgnO1xuXG4gICAgICAgIC8vIEdldCB0aGUgc2libGluZyBhbmQgc2V0IHRoZSBzdHlsZSBydWxlXG4gICAgICAgIGlmICggdGhpcy5wb3NpdGlvbiA9PT0gJ2xlZnQnIClcbiAgICAgICAge1xuICAgICAgICAgICAgc2libGluZyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBzdHlsZVJ1bGUgPSAncGFkZGluZy1sZWZ0JztcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNpYmxpbmcgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIHN0eWxlUnVsZSA9ICdwYWRkaW5nLXJpZ2h0JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlIGlzIG5vIHNpYmxpbmcsIHJldHVybi4uLlxuICAgICAgICBpZiAoICFzaWJsaW5nIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgZm9sZGVkLi4uXG4gICAgICAgIGlmICggdmFsdWUgKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBGb2xkIHRoZSBzaWRlYmFyXG4gICAgICAgICAgICB0aGlzLmZvbGQoKTtcblxuICAgICAgICAgICAgLy8gU2V0IHRoZSBmb2xkZWQgd2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgc3R5bGVWYWx1ZSk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtaW4td2lkdGgnLCBzdHlsZVZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcsIHN0eWxlVmFsdWUpO1xuXG4gICAgICAgICAgICAvLyBTZXQgdGhlIHN0eWxlIGFuZCBjbGFzc1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoc2libGluZywgc3R5bGVSdWxlLCBzdHlsZVZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZvbGRlZCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHVuZm9sZGVkLi4uXG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVW5mb2xkIHRoZSBzaWRlYmFyXG4gICAgICAgICAgICB0aGlzLnVuZm9sZCgpO1xuXG4gICAgICAgICAgICAvLyBSZW1vdmUgdGhlIGZvbGRlZCB3aWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWF4LXdpZHRoJyk7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgc3R5bGUgYW5kIGNsYXNzXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZShzaWJsaW5nLCBzdHlsZVJ1bGUpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZm9sZGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbWl0IHRoZSAnZm9sZGVkQ2hhbmdlZCcgZXZlbnRcbiAgICAgICAgdGhpcy5mb2xkZWRDaGFuZ2VkLmVtaXQodGhpcy5mb2xkZWQpO1xuICAgIH1cblxuICAgIGdldCBmb2xkZWQoKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvbGRlZDtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgTGlmZWN5Y2xlIGhvb2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIE9uIGluaXRcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY29uZmlnIGNoYW5nZXNcbiAgICAgICAgdGhpcy5fZnVzZUNvbmZpZ1NlcnZpY2UuY29uZmlnXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoY29uZmlnKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZnVzZUNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlZ2lzdGVyIHRoZSBzaWRlYmFyXG4gICAgICAgIHRoaXMuX2Z1c2VTaWRlYmFyU2VydmljZS5yZWdpc3Rlcih0aGlzLm5hbWUsIHRoaXMpO1xuXG4gICAgICAgIC8vIFNldHVwIHZpc2liaWxpdHlcbiAgICAgICAgdGhpcy5fc2V0dXBWaXNpYmlsaXR5KCk7XG5cbiAgICAgICAgLy8gU2V0dXAgcG9zaXRpb25cbiAgICAgICAgdGhpcy5fc2V0dXBQb3NpdGlvbigpO1xuXG4gICAgICAgIC8vIFNldHVwIGxvY2tlZE9wZW5cbiAgICAgICAgdGhpcy5fc2V0dXBMb2NrZWRPcGVuKCk7XG5cbiAgICAgICAgLy8gU2V0dXAgZm9sZGVkXG4gICAgICAgIHRoaXMuX3NldHVwRm9sZGVkKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gZGVzdHJveVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIElmIHRoZSBzaWRlYmFyIGlzIGZvbGRlZCwgdW5mb2xkIGl0IHRvIHJldmVydCBtb2RpZmljYXRpb25zXG4gICAgICAgIGlmICggdGhpcy5mb2xkZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnVuZm9sZCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVW5yZWdpc3RlciB0aGUgc2lkZWJhclxuICAgICAgICB0aGlzLl9mdXNlU2lkZWJhclNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLm5hbWUpO1xuXG4gICAgICAgIC8vIFVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwubmV4dCgpO1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQcml2YXRlIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogU2V0dXAgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHNpZGViYXJcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2V0dXBWaXNpYmlsaXR5KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZXhpc3RpbmcgYm94LXNoYWRvd1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdib3gtc2hhZG93JywgJ25vbmUnKTtcblxuICAgICAgICAvLyBNYWtlIHRoZSBzaWRlYmFyIGludmlzaWJsZVxuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBzaWRlYmFyIHBvc2l0aW9uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3NldHVwUG9zaXRpb24oKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gQWRkIHRoZSBjb3JyZWN0IGNsYXNzIG5hbWUgdG8gdGhlIHNpZGViYXJcbiAgICAgICAgLy8gZWxlbWVudCBkZXBlbmRpbmcgb24gdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZVxuICAgICAgICBpZiAoIHRoaXMucG9zaXRpb24gPT09ICdyaWdodCcgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyaWdodC1wb3NpdGlvbmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdsZWZ0LXBvc2l0aW9uZWQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIHRoZSBsb2NrZWRPcGVuIGhhbmRsZXJcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2V0dXBMb2NrZWRPcGVuKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFJldHVybiBpZiB0aGUgbG9ja2VkT3BlbiB3YXNuJ3Qgc2V0XG4gICAgICAgIGlmICggIXRoaXMubG9ja2VkT3BlbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFJldHVyblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IHRoZSB3YXNBY3RpdmUgZm9yIHRoZSBmaXJzdCB0aW1lXG4gICAgICAgIHRoaXMuX3dhc0FjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFNldCB0aGUgd2FzRm9sZGVkXG4gICAgICAgIHRoaXMuX3dhc0ZvbGRlZCA9IHRoaXMuZm9sZGVkO1xuXG4gICAgICAgIC8vIFNob3cgdGhlIHNpZGViYXJcbiAgICAgICAgdGhpcy5fc2hvd1NpZGViYXIoKTtcblxuICAgICAgICAvLyBBY3Qgb24gZXZlcnkgbWVkaWEgY2hhbmdlXG4gICAgICAgIHRoaXMuX2Z1c2VNYXRjaE1lZGlhU2VydmljZS5vbk1lZGlhQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBHZXQgdGhlIGFjdGl2ZSBzdGF0dXNcbiAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IHRoaXMuX21lZGlhT2JzZXJ2ZXIuaXNBY3RpdmUodGhpcy5sb2NrZWRPcGVuKTtcblxuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBib3RoIHN0YXR1cyBhcmUgdGhlIHNhbWUsIGRvbid0IGFjdFxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5fd2FzQWN0aXZlID09PSBpc0FjdGl2ZSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gQWN0aXZhdGUgdGhlIGxvY2tlZE9wZW5cbiAgICAgICAgICAgICAgICBpZiAoIGlzQWN0aXZlIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgbG9ja2VkT3BlbiBzdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvY2tlZE9wZW4gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFNob3cgdGhlIHNpZGViYXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd1NpZGViYXIoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBGb3JjZSB0aGUgdGhlIG9wZW5lZCBzdGF0dXMgdG8gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRW1pdCB0aGUgJ29wZW5lZENoYW5nZWQnIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlZC5lbWl0KHRoaXMub3BlbmVkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgc2lkZWJhciB3YXMgZm9sZGVkLCBmb3JjZWZ1bGx5IGZvbGQgaXQgYWdhaW5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLl93YXNGb2xkZWQgKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFbmFibGUgdGhlIGFuaW1hdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuYWJsZUFuaW1hdGlvbnMoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRm9sZFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2xkZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBIaWRlIHRoZSBiYWNrZHJvcCBpZiBhbnkgZXhpc3RzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVCYWNrZHJvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBEZS1BY3RpdmF0ZSB0aGUgbG9ja2VkT3BlblxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0aGUgbG9ja2VkT3BlbiBzdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0xvY2tlZE9wZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBVbmZvbGQgdGhlIHNpZGViYXIgaW4gY2FzZSBpZiBpdCB3YXMgZm9sZGVkXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5mb2xkKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yY2UgdGhlIHRoZSBvcGVuZWQgc3RhdHVzIHRvIGNsb3NlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gRW1pdCB0aGUgJ29wZW5lZENoYW5nZWQnIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3BlbmVkQ2hhbmdlZC5lbWl0KHRoaXMub3BlbmVkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBIaWRlIHRoZSBzaWRlYmFyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVTaWRlYmFyKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gU3RvcmUgdGhlIG5ldyBhY3RpdmUgc3RhdHVzXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FzQWN0aXZlID0gaXNBY3RpdmU7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXR1cCB0aGUgaW5pdGlhbCBmb2xkZWQgc3RhdHVzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3NldHVwRm9sZGVkKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFJldHVybiwgaWYgc2lkZWJhciBpcyBub3QgZm9sZGVkXG4gICAgICAgIGlmICggIXRoaXMuZm9sZGVkIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuIGlmIHRoZSBzaWRlYmFyIGlzIGNsb3NlZFxuICAgICAgICBpZiAoICF0aGlzLm9wZW5lZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByb2dyYW1tYXRpY2FsbHkgYWRkL3JlbW92ZSBwYWRkaW5nIHRvIHRoZSBlbGVtZW50XG4gICAgICAgIC8vIHRoYXQgY29tZXMgYWZ0ZXIgb3IgYmVmb3JlIGJhc2VkIG9uIHRoZSBwb3NpdGlvblxuICAgICAgICBsZXQgc2libGluZyxcbiAgICAgICAgICAgIHN0eWxlUnVsZTtcblxuICAgICAgICBjb25zdCBzdHlsZVZhbHVlID0gdGhpcy5mb2xkZWRXaWR0aCArICdweCc7XG5cbiAgICAgICAgLy8gR2V0IHRoZSBzaWJsaW5nIGFuZCBzZXQgdGhlIHN0eWxlIHJ1bGVcbiAgICAgICAgaWYgKCB0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcgKVxuICAgICAgICB7XG4gICAgICAgICAgICBzaWJsaW5nID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIHN0eWxlUnVsZSA9ICdwYWRkaW5nLWxlZnQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgc2libGluZyA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgc3R5bGVSdWxlID0gJ3BhZGRpbmctcmlnaHQnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gc2libGluZywgcmV0dXJuLi4uXG4gICAgICAgIGlmICggIXNpYmxpbmcgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBGb2xkIHRoZSBzaWRlYmFyXG4gICAgICAgIHRoaXMuZm9sZCgpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgZm9sZGVkIHdpZHRoXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgc3R5bGVWYWx1ZSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcsIHN0eWxlVmFsdWUpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtYXgtd2lkdGgnLCBzdHlsZVZhbHVlKTtcblxuICAgICAgICAvLyBTZXQgdGhlIHN0eWxlIGFuZCBjbGFzc1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShzaWJsaW5nLCBzdHlsZVJ1bGUsIHN0eWxlVmFsdWUpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmb2xkZWQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBiYWNrZHJvcFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9zaG93QmFja2Ryb3AoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBiYWNrZHJvcCBlbGVtZW50XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgICAgLy8gQWRkIGEgY2xhc3MgdG8gdGhlIGJhY2tkcm9wIGVsZW1lbnRcbiAgICAgICAgdGhpcy5fYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZnVzZS1zaWRlYmFyLW92ZXJsYXknKTtcblxuICAgICAgICAvLyBBZGQgYSBjbGFzcyBkZXBlbmRpbmcgb24gdGhlIGludmlzaWJsZU92ZXJsYXkgb3B0aW9uXG4gICAgICAgIGlmICggdGhpcy5pbnZpc2libGVPdmVybGF5IClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZnVzZS1zaWRlYmFyLW92ZXJsYXktaW52aXNpYmxlJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBcHBlbmQgdGhlIGJhY2tkcm9wIHRvIHRoZSBwYXJlbnQgb2YgdGhlIHNpZGViYXJcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQsIHRoaXMuX2JhY2tkcm9wKTtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGVudGVyIGFuaW1hdGlvbiBhbmQgYXR0YWNoIGl0IHRvIHRoZSBwbGF5ZXJcbiAgICAgICAgdGhpcy5fcGxheWVyID1cbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkJ1aWxkZXJcbiAgICAgICAgICAgICAgICAuYnVpbGQoW1xuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKCczMDBtcyBlYXNlJywgc3R5bGUoe29wYWNpdHk6IDF9KSlcbiAgICAgICAgICAgICAgICBdKS5jcmVhdGUodGhpcy5fYmFja2Ryb3ApO1xuXG4gICAgICAgIC8vIFBsYXkgdGhlIGFuaW1hdGlvblxuICAgICAgICB0aGlzLl9wbGF5ZXIucGxheSgpO1xuXG4gICAgICAgIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgb3ZlcmxheVxuICAgICAgICB0aGlzLl9iYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgYmFja2Ryb3BcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaGlkZUJhY2tkcm9wKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICggIXRoaXMuX2JhY2tkcm9wIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBsZWF2ZSBhbmltYXRpb24gYW5kIGF0dGFjaCBpdCB0byB0aGUgcGxheWVyXG4gICAgICAgIHRoaXMuX3BsYXllciA9XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRpb25CdWlsZGVyXG4gICAgICAgICAgICAgICAgLmJ1aWxkKFtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnMzAwbXMgZWFzZScsIHN0eWxlKHtvcGFjaXR5OiAwfSkpXG4gICAgICAgICAgICAgICAgXSkuY3JlYXRlKHRoaXMuX2JhY2tkcm9wKTtcblxuICAgICAgICAvLyBQbGF5IHRoZSBhbmltYXRpb25cbiAgICAgICAgdGhpcy5fcGxheWVyLnBsYXkoKTtcblxuICAgICAgICAvLyBPbmNlIHRoZSBhbmltYXRpb24gaXMgZG9uZS4uLlxuICAgICAgICB0aGlzLl9wbGF5ZXIub25Eb25lKCgpID0+IHtcblxuICAgICAgICAgICAgLy8gSWYgdGhlIGJhY2tkcm9wIHN0aWxsIGV4aXN0cy4uLlxuICAgICAgICAgICAgaWYgKCB0aGlzLl9iYWNrZHJvcCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSBiYWNrZHJvcFxuICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tkcm9wLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fYmFja2Ryb3ApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tkcm9wID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHNvbWUgcHJvcGVydGllcyBvZiB0aGUgc2lkZWJhclxuICAgICAqIGFuZCBtYWtlIGl0IHZpc2libGVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfc2hvd1NpZGViYXIoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBib3gtc2hhZG93IHN0eWxlXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2JveC1zaGFkb3cnKTtcblxuICAgICAgICAvLyBNYWtlIHRoZSBzaWRlYmFyIGludmlzaWJsZVxuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2aXNpYmlsaXR5Jyk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlIHNvbWUgcHJvcGVydGllcyBvZiB0aGUgc2lkZWJhclxuICAgICAqIGFuZCBtYWtlIGl0IGludmlzaWJsZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9oaWRlU2lkZWJhcihkZWxheSA9IHRydWUpOiB2b2lkXG4gICAge1xuICAgICAgICBjb25zdCBkZWxheUFtb3VudCA9IGRlbGF5ID8gMzAwIDogMDtcblxuICAgICAgICAvLyBBZGQgYSBkZWxheSBzbyBjbG9zZSBhbmltYXRpb24gY2FuIHBsYXlcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgYm94LXNoYWRvd1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYm94LXNoYWRvdycsICdub25lJyk7XG5cbiAgICAgICAgICAgIC8vIE1ha2UgdGhlIHNpZGViYXIgaW52aXNpYmxlXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xuICAgICAgICB9LCBkZWxheUFtb3VudCk7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIHRoZSBhbmltYXRpb25zXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2VuYWJsZUFuaW1hdGlvbnMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gUmV0dXJuIGlmIGFuaW1hdGlvbnMgYWxyZWFkeSBlbmFibGVkXG4gICAgICAgIGlmICggdGhpcy5fYW5pbWF0aW9uc0VuYWJsZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmFibGUgdGhlIGFuaW1hdGlvbnNcbiAgICAgICAgdGhpcy5fYW5pbWF0aW9uc0VuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQdWJsaWMgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBPcGVuIHRoZSBzaWRlYmFyXG4gICAgICovXG4gICAgb3BlbigpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIHRoaXMub3BlbmVkIHx8IHRoaXMuaXNMb2NrZWRPcGVuIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5hYmxlIHRoZSBhbmltYXRpb25zXG4gICAgICAgIHRoaXMuX2VuYWJsZUFuaW1hdGlvbnMoKTtcblxuICAgICAgICAvLyBTaG93IHRoZSBzaWRlYmFyXG4gICAgICAgIHRoaXMuX3Nob3dTaWRlYmFyKCk7XG5cbiAgICAgICAgLy8gU2hvdyB0aGUgYmFja2Ryb3BcbiAgICAgICAgdGhpcy5fc2hvd0JhY2tkcm9wKCk7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBvcGVuZWQgc3RhdHVzXG4gICAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcblxuICAgICAgICAvLyBFbWl0IHRoZSAnb3BlbmVkQ2hhbmdlZCcgZXZlbnRcbiAgICAgICAgdGhpcy5vcGVuZWRDaGFuZ2VkLmVtaXQodGhpcy5vcGVuZWQpO1xuXG4gICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBzaWRlYmFyXG4gICAgICovXG4gICAgY2xvc2UoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCAhdGhpcy5vcGVuZWQgfHwgdGhpcy5pc0xvY2tlZE9wZW4gKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmFibGUgdGhlIGFuaW1hdGlvbnNcbiAgICAgICAgdGhpcy5fZW5hYmxlQW5pbWF0aW9ucygpO1xuXG4gICAgICAgIC8vIEhpZGUgdGhlIGJhY2tkcm9wXG4gICAgICAgIHRoaXMuX2hpZGVCYWNrZHJvcCgpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgb3BlbmVkIHN0YXR1c1xuICAgICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEVtaXQgdGhlICdvcGVuZWRDaGFuZ2VkJyBldmVudFxuICAgICAgICB0aGlzLm9wZW5lZENoYW5nZWQuZW1pdCh0aGlzLm9wZW5lZCk7XG5cbiAgICAgICAgLy8gSGlkZSB0aGUgc2lkZWJhclxuICAgICAgICB0aGlzLl9oaWRlU2lkZWJhcigpO1xuXG4gICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBvcGVuL2Nsb3NlIHRoZSBzaWRlYmFyXG4gICAgICovXG4gICAgdG9nZ2xlT3BlbigpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIHRoaXMub3BlbmVkIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3VzZWVudGVyXG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gICAgb25Nb3VzZUVudGVyKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIE9ubHkgd29yayBpZiB0aGUgYXV0byB0cmlnZ2VyIGlzIGVuYWJsZWRcbiAgICAgICAgaWYgKCAhdGhpcy5mb2xkZWRBdXRvVHJpZ2dlck9uSG92ZXIgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVuZm9sZFRlbXBvcmFyaWx5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW91c2VsZWF2ZVxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICAgIG9uTW91c2VMZWF2ZSgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBPbmx5IHdvcmsgaWYgdGhlIGF1dG8gdHJpZ2dlciBpcyBlbmFibGVkXG4gICAgICAgIGlmICggIXRoaXMuZm9sZGVkQXV0b1RyaWdnZXJPbkhvdmVyIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5mb2xkVGVtcG9yYXJpbHkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGb2xkIHRoZSBzaWRlYmFyIHBlcm1hbmVudGx5XG4gICAgICovXG4gICAgZm9sZCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBPbmx5IHdvcmsgaWYgdGhlIHNpZGViYXIgaXMgbm90IGZvbGRlZFxuICAgICAgICBpZiAoIHRoaXMuZm9sZGVkIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5hYmxlIHRoZSBhbmltYXRpb25zXG4gICAgICAgIHRoaXMuX2VuYWJsZUFuaW1hdGlvbnMoKTtcblxuICAgICAgICAvLyBGb2xkXG4gICAgICAgIHRoaXMuZm9sZGVkID0gdHJ1ZTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbmZvbGQgdGhlIHNpZGViYXIgcGVybWFuZW50bHlcbiAgICAgKi9cbiAgICB1bmZvbGQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gT25seSB3b3JrIGlmIHRoZSBzaWRlYmFyIGlzIGZvbGRlZFxuICAgICAgICBpZiAoICF0aGlzLmZvbGRlZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVuYWJsZSB0aGUgYW5pbWF0aW9uc1xuICAgICAgICB0aGlzLl9lbmFibGVBbmltYXRpb25zKCk7XG5cbiAgICAgICAgLy8gVW5mb2xkXG4gICAgICAgIHRoaXMuZm9sZGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHRoZSBzaWRlYmFyIGZvbGQvdW5mb2xkIHBlcm1hbmVudGx5XG4gICAgICovXG4gICAgdG9nZ2xlRm9sZCgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIHRoaXMuZm9sZGVkIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy51bmZvbGQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZm9sZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRm9sZCB0aGUgdGVtcG9yYXJpbHkgdW5mb2xkZWQgc2lkZWJhciBiYWNrXG4gICAgICovXG4gICAgZm9sZFRlbXBvcmFyaWx5KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIE9ubHkgd29yayBpZiB0aGUgc2lkZWJhciBpcyBmb2xkZWRcbiAgICAgICAgaWYgKCAhdGhpcy5mb2xkZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBFbmFibGUgdGhlIGFuaW1hdGlvbnNcbiAgICAgICAgdGhpcy5fZW5hYmxlQW5pbWF0aW9ucygpO1xuXG4gICAgICAgIC8vIEZvbGQgdGhlIHNpZGViYXIgYmFja1xuICAgICAgICB0aGlzLnVuZm9sZGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBmb2xkZWQgd2lkdGhcbiAgICAgICAgY29uc3Qgc3R5bGVWYWx1ZSA9IHRoaXMuZm9sZGVkV2lkdGggKyAncHgnO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgc3R5bGVWYWx1ZSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21pbi13aWR0aCcsIHN0eWxlVmFsdWUpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtYXgtd2lkdGgnLCBzdHlsZVZhbHVlKTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbmZvbGQgdGhlIHNpZGViYXIgdGVtcG9yYXJpbHlcbiAgICAgKi9cbiAgICB1bmZvbGRUZW1wb3JhcmlseSgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBPbmx5IHdvcmsgaWYgdGhlIHNpZGViYXIgaXMgZm9sZGVkXG4gICAgICAgIGlmICggIXRoaXMuZm9sZGVkIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5hYmxlIHRoZSBhbmltYXRpb25zXG4gICAgICAgIHRoaXMuX2VuYWJsZUFuaW1hdGlvbnMoKTtcblxuICAgICAgICAvLyBVbmZvbGQgdGhlIHNpZGViYXIgdGVtcG9yYXJpbHlcbiAgICAgICAgdGhpcy51bmZvbGRlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBmb2xkZWQgd2lkdGhcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnbWluLXdpZHRoJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZVN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ21heC13aWR0aCcpO1xuXG4gICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbn1cbiJdfQ==