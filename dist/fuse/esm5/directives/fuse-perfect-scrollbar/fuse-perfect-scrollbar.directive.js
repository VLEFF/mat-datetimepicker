import * as tslib_1 from "tslib";
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import PerfectScrollbar from 'perfect-scrollbar';
import * as _ from 'lodash';
import { FuseConfigService } from '../../services/config.service';
var FusePerfectScrollbarDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     * @param {FuseConfigService} _fuseConfigService
     * @param {Platform} _platform
     * @param {Router} _router
     */
    function FusePerfectScrollbarDirective(elementRef, _fuseConfigService, _platform, _router) {
        this.elementRef = elementRef;
        this._fuseConfigService = _fuseConfigService;
        this._platform = _platform;
        this._router = _router;
        // Set the defaults
        this.isInitialized = false;
        this.isMobile = false;
        // Set the private defaults
        this._enabled = false;
        this._debouncedUpdate = _.debounce(this.update, 150);
        this._options = {
            updateOnRouteChange: false
        };
        this._unsubscribeAll = new Subject();
    }
    Object.defineProperty(FusePerfectScrollbarDirective.prototype, "fusePerfectScrollbarOptions", {
        get: function () {
            // Return the options
            return this._options;
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Perfect Scrollbar options
         *
         * @param value
         */
        set: function (value) {
            // Merge the options
            this._options = _.merge({}, this._options, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FusePerfectScrollbarDirective.prototype, "enabled", {
        get: function () {
            // Return the enabled status
            return this._enabled;
        },
        /**
         * Is enabled
         *
         * @param {boolean | ""} value
         */
        set: function (value) {
            // If nothing is provided with the directive (empty string),
            // we will take that as a true
            if (value === '') {
                value = true;
            }
            // Return, if both values are the same
            if (this.enabled === value) {
                return;
            }
            // Store the value
            this._enabled = value;
            // If enabled...
            if (this.enabled) {
                // Init the directive
                this._init();
            }
            else {
                // Otherwise destroy it
                this._destroy();
            }
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * After view init
     */
    FusePerfectScrollbarDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Check if scrollbars enabled or not from the main config
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (settings) {
            _this.enabled = settings.customScrollbars;
        });
        // Scroll to the top on every route change
        if (this.fusePerfectScrollbarOptions.updateOnRouteChange) {
            this._router.events
                .pipe(takeUntil(this._unsubscribeAll), filter(function (event) { return event instanceof NavigationEnd; }))
                .subscribe(function () {
                setTimeout(function () {
                    _this.scrollToTop();
                    _this.update();
                }, 0);
            });
        }
    };
    /**
     * On destroy
     */
    FusePerfectScrollbarDirective.prototype.ngOnDestroy = function () {
        this._destroy();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    FusePerfectScrollbarDirective.prototype._init = function () {
        // Return, if already initialized
        if (this.isInitialized) {
            return;
        }
        // Check if is mobile
        if (this._platform.ANDROID || this._platform.IOS) {
            this.isMobile = true;
        }
        // Return if it's mobile
        if (this.isMobile) {
            // Return...
            return;
        }
        // Set as initialized
        this.isInitialized = true;
        // Initialize the perfect-scrollbar
        this.ps = new PerfectScrollbar(this.elementRef.nativeElement, tslib_1.__assign({}, this.fusePerfectScrollbarOptions));
        // Unbind 'keydown' events of PerfectScrollbar since it causes an extremely
        // high CPU usage on Angular Material inputs.
        // Loop through all the event elements of this PerfectScrollbar instance
        this.ps.event.eventElements.forEach(function (eventElement) {
            // If we hit to the element with a 'keydown' event...
            if (typeof eventElement.handlers['keydown'] !== 'undefined') {
                // Unbind it
                eventElement.element.removeEventListener('keydown', eventElement.handlers['keydown'][0]);
            }
        });
    };
    /**
     * Destroy
     *
     * @private
     */
    FusePerfectScrollbarDirective.prototype._destroy = function () {
        if (!this.isInitialized || !this.ps) {
            return;
        }
        // Destroy the perfect-scrollbar
        this.ps.destroy();
        // Clean up
        this.ps = null;
        this.isInitialized = false;
    };
    /**
     * Update scrollbars on window resize
     *
     * @private
     */
    FusePerfectScrollbarDirective.prototype._updateOnResize = function () {
        this._debouncedUpdate();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Document click
     *
     * @param {Event} event
     */
    FusePerfectScrollbarDirective.prototype.documentClick = function (event) {
        if (!this.isInitialized || !this.ps) {
            return;
        }
        // Update the scrollbar on document click..
        // This isn't the most elegant solution but there is no other way
        // of knowing when the contents of the scrollable container changes.
        // Therefore, we update scrollbars on every document click.
        this.ps.update();
    };
    /**
     * Update the scrollbar
     */
    FusePerfectScrollbarDirective.prototype.update = function () {
        if (!this.isInitialized) {
            return;
        }
        // Update the perfect-scrollbar
        this.ps.update();
    };
    /**
     * Destroy the scrollbar
     */
    FusePerfectScrollbarDirective.prototype.destroy = function () {
        this.ngOnDestroy();
    };
    /**
     * Scroll to X
     *
     * @param {number} x
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToX = function (x, speed) {
        this.animateScrolling('scrollLeft', x, speed);
    };
    /**
     * Scroll to Y
     *
     * @param {number} y
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToY = function (y, speed) {
        this.animateScrolling('scrollTop', y, speed);
    };
    /**
     * Scroll to top
     *
     * @param {number} offset
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToTop = function (offset, speed) {
        this.animateScrolling('scrollTop', (offset || 0), speed);
    };
    /**
     * Scroll to left
     *
     * @param {number} offset
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToLeft = function (offset, speed) {
        this.animateScrolling('scrollLeft', (offset || 0), speed);
    };
    /**
     * Scroll to right
     *
     * @param {number} offset
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToRight = function (offset, speed) {
        var width = this.elementRef.nativeElement.scrollWidth;
        this.animateScrolling('scrollLeft', width - (offset || 0), speed);
    };
    /**
     * Scroll to bottom
     *
     * @param {number} offset
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.scrollToBottom = function (offset, speed) {
        var height = this.elementRef.nativeElement.scrollHeight;
        this.animateScrolling('scrollTop', height - (offset || 0), speed);
    };
    /**
     * Animate scrolling
     *
     * @param {string} target
     * @param {number} value
     * @param {number} speed
     */
    FusePerfectScrollbarDirective.prototype.animateScrolling = function (target, value, speed) {
        var _this = this;
        if (!speed) {
            this.elementRef.nativeElement[target] = value;
            // PS has weird event sending order, this is a workaround for that
            this.update();
            this.update();
        }
        else if (value !== this.elementRef.nativeElement[target]) {
            var newValue_1 = 0;
            var scrollCount_1 = 0;
            var oldTimestamp_1 = performance.now();
            var oldValue_1 = this.elementRef.nativeElement[target];
            var cosParameter_1 = (oldValue_1 - value) / 2;
            var step_1 = function (newTimestamp) {
                scrollCount_1 += Math.PI / (speed / (newTimestamp - oldTimestamp_1));
                newValue_1 = Math.round(value + cosParameter_1 + cosParameter_1 * Math.cos(scrollCount_1));
                // Only continue animation if scroll position has not changed
                if (_this.elementRef.nativeElement[target] === oldValue_1) {
                    if (scrollCount_1 >= Math.PI) {
                        _this.elementRef.nativeElement[target] = value;
                        // PS has weird event sending order, this is a workaround for that
                        _this.update();
                        _this.update();
                    }
                    else {
                        _this.elementRef.nativeElement[target] = oldValue_1 = newValue_1;
                        oldTimestamp_1 = newTimestamp;
                        window.requestAnimationFrame(step_1);
                    }
                }
            };
            window.requestAnimationFrame(step_1);
        }
    };
    FusePerfectScrollbarDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fusePerfectScrollbar]'
                },] }
    ];
    /** @nocollapse */
    FusePerfectScrollbarDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FuseConfigService },
        { type: Platform },
        { type: Router }
    ]; };
    FusePerfectScrollbarDirective.propDecorators = {
        fusePerfectScrollbarOptions: [{ type: Input }],
        enabled: [{ type: Input, args: ['fusePerfectScrollbar',] }],
        _updateOnResize: [{ type: HostListener, args: ['window:resize',] }],
        documentClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
    };
    return FusePerfectScrollbarDirective;
}());
export { FusePerfectScrollbarDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZS1wZXJmZWN0LXNjcm9sbGJhci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2Z1c2UtcGVyZmVjdC1zY3JvbGxiYXIvZnVzZS1wZXJmZWN0LXNjcm9sbGJhci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3JHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLGdCQUFnQixNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRWxFO0lBZUk7Ozs7Ozs7T0FPRztJQUNILHVDQUNXLFVBQXNCLEVBQ3JCLGtCQUFxQyxFQUNyQyxTQUFtQixFQUNuQixPQUFlO1FBSGhCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDckIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNyQyxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFHdkIsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBRXRCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJ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QUMsR0FBRyxVQUFRLEdBQUcsVUFBUSxDQUFDO3dCQUU1RCxjQUFZLEdBQUcsWUFBWSxDQUFDO3dCQUU1QixNQUFNLENBQUMscUJBQXFCLENBQUMsTUFBSSxDQUFDLENBQUM7cUJBQ3RDO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDO1lBRUYsTUFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQUksQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQzs7Z0JBM1pKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsd0JBQXdCO2lCQUNyQzs7OztnQkFaa0MsVUFBVTtnQkFRcEMsaUJBQWlCO2dCQU5qQixRQUFRO2dCQURPLE1BQU07Ozs4Q0E2RHpCLEtBQUs7MEJBa0JMLEtBQUssU0FBQyxzQkFBc0I7a0NBa0s1QixZQUFZLFNBQUMsZUFBZTtnQ0FlNUIsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDOztJQXFLOUMsb0NBQUM7Q0FBQSxBQTVaRCxJQTRaQztTQXpaWSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFBsYXRmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BsYXRmb3JtJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IFBlcmZlY3RTY3JvbGxiYXIgZnJvbSAncGVyZmVjdC1zY3JvbGxiYXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBGdXNlQ29uZmlnU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbmZpZy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbZnVzZVBlcmZlY3RTY3JvbGxiYXJdJ1xufSlcbmV4cG9ydCBjbGFzcyBGdXNlUGVyZmVjdFNjcm9sbGJhckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveVxue1xuICAgIGlzSW5pdGlhbGl6ZWQ6IGJvb2xlYW47XG4gICAgaXNNb2JpbGU6IGJvb2xlYW47XG4gICAgcHM6IFBlcmZlY3RTY3JvbGxiYXIgfCBhbnk7XG5cbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfZW5hYmxlZDogYm9vbGVhbiB8ICcnO1xuICAgIHByaXZhdGUgX2RlYm91bmNlZFVwZGF0ZTogYW55O1xuICAgIHByaXZhdGUgX29wdGlvbnM6IGFueTtcbiAgICBwcml2YXRlIF91bnN1YnNjcmliZUFsbDogU3ViamVjdDxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudFJlZn0gZWxlbWVudFJlZlxuICAgICAqIEBwYXJhbSB7RnVzZUNvbmZpZ1NlcnZpY2V9IF9mdXNlQ29uZmlnU2VydmljZVxuICAgICAqIEBwYXJhbSB7UGxhdGZvcm19IF9wbGF0Zm9ybVxuICAgICAqIEBwYXJhbSB7Um91dGVyfSBfcm91dGVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHB1YmxpYyBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9mdXNlQ29uZmlnU2VydmljZTogRnVzZUNvbmZpZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3BsYXRmb3JtOiBQbGF0Zm9ybSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJcbiAgICApXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTW9iaWxlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBwcml2YXRlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkVXBkYXRlID0gXy5kZWJvdW5jZSh0aGlzLnVwZGF0ZSwgMTUwKTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHVwZGF0ZU9uUm91dGVDaGFuZ2U6IGZhbHNlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgQWNjZXNzb3JzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFBlcmZlY3QgU2Nyb2xsYmFyIG9wdGlvbnNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IGZ1c2VQZXJmZWN0U2Nyb2xsYmFyT3B0aW9ucyh2YWx1ZSlcbiAgICB7XG4gICAgICAgIC8vIE1lcmdlIHRoZSBvcHRpb25zXG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBfLm1lcmdlKHt9LCB0aGlzLl9vcHRpb25zLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0IGZ1c2VQZXJmZWN0U2Nyb2xsYmFyT3B0aW9ucygpOiBhbnlcbiAgICB7XG4gICAgICAgIC8vIFJldHVybiB0aGUgb3B0aW9uc1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJcyBlbmFibGVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW4gfCBcIlwifSB2YWx1ZVxuICAgICAqL1xuICAgIEBJbnB1dCgnZnVzZVBlcmZlY3RTY3JvbGxiYXInKVxuICAgIHNldCBlbmFibGVkKHZhbHVlOiBib29sZWFuIHwgJycpXG4gICAge1xuICAgICAgICAvLyBJZiBub3RoaW5nIGlzIHByb3ZpZGVkIHdpdGggdGhlIGRpcmVjdGl2ZSAoZW1wdHkgc3RyaW5nKSxcbiAgICAgICAgLy8gd2Ugd2lsbCB0YWtlIHRoYXQgYXMgYSB0cnVlXG4gICAgICAgIGlmICggdmFsdWUgPT09ICcnIClcbiAgICAgICAge1xuICAgICAgICAgICAgdmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmV0dXJuLCBpZiBib3RoIHZhbHVlcyBhcmUgdGhlIHNhbWVcbiAgICAgICAgaWYgKCB0aGlzLmVuYWJsZWQgPT09IHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RvcmUgdGhlIHZhbHVlXG4gICAgICAgIHRoaXMuX2VuYWJsZWQgPSB2YWx1ZTtcblxuICAgICAgICAvLyBJZiBlbmFibGVkLi4uXG4gICAgICAgIGlmICggdGhpcy5lbmFibGVkIClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gSW5pdCB0aGUgZGlyZWN0aXZlXG4gICAgICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgZGVzdHJveSBpdFxuICAgICAgICAgICAgdGhpcy5fZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGVuYWJsZWQoKTogYm9vbGVhbiB8ICcnXG4gICAge1xuICAgICAgICAvLyBSZXR1cm4gdGhlIGVuYWJsZWQgc3RhdHVzXG4gICAgICAgIHJldHVybiB0aGlzLl9lbmFibGVkO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgdmlldyBpbml0XG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIENoZWNrIGlmIHNjcm9sbGJhcnMgZW5hYmxlZCBvciBub3QgZnJvbSB0aGUgbWFpbiBjb25maWdcbiAgICAgICAgdGhpcy5fZnVzZUNvbmZpZ1NlcnZpY2UuY29uZmlnXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoc2V0dGluZ3MpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVkID0gc2V0dGluZ3MuY3VzdG9tU2Nyb2xsYmFycztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIFNjcm9sbCB0byB0aGUgdG9wIG9uIGV2ZXJ5IHJvdXRlIGNoYW5nZVxuICAgICAgICBpZiAoIHRoaXMuZnVzZVBlcmZlY3RTY3JvbGxiYXJPcHRpb25zLnVwZGF0ZU9uUm91dGVDaGFuZ2UgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIuZXZlbnRzXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl91bnN1YnNjcmliZUFsbCksXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9Ub3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gZGVzdHJveVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX2Rlc3Ryb3koKTtcblxuICAgICAgICAvLyBVbnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLm5leHQoKTtcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgUHJpdmF0ZSBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gUmV0dXJuLCBpZiBhbHJlYWR5IGluaXRpYWxpemVkXG4gICAgICAgIGlmICggdGhpcy5pc0luaXRpYWxpemVkIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXMgbW9iaWxlXG4gICAgICAgIGlmICggdGhpcy5fcGxhdGZvcm0uQU5EUk9JRCB8fCB0aGlzLl9wbGF0Zm9ybS5JT1MgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmlzTW9iaWxlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiBpZiBpdCdzIG1vYmlsZVxuICAgICAgICBpZiAoIHRoaXMuaXNNb2JpbGUgKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBSZXR1cm4uLi5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCBhcyBpbml0aWFsaXplZFxuICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHBlcmZlY3Qtc2Nyb2xsYmFyXG4gICAgICAgIHRoaXMucHMgPSBuZXcgUGVyZmVjdFNjcm9sbGJhcih0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwge1xuICAgICAgICAgICAgLi4udGhpcy5mdXNlUGVyZmVjdFNjcm9sbGJhck9wdGlvbnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVW5iaW5kICdrZXlkb3duJyBldmVudHMgb2YgUGVyZmVjdFNjcm9sbGJhciBzaW5jZSBpdCBjYXVzZXMgYW4gZXh0cmVtZWx5XG4gICAgICAgIC8vIGhpZ2ggQ1BVIHVzYWdlIG9uIEFuZ3VsYXIgTWF0ZXJpYWwgaW5wdXRzLlxuICAgICAgICAvLyBMb29wIHRocm91Z2ggYWxsIHRoZSBldmVudCBlbGVtZW50cyBvZiB0aGlzIFBlcmZlY3RTY3JvbGxiYXIgaW5zdGFuY2VcbiAgICAgICAgdGhpcy5wcy5ldmVudC5ldmVudEVsZW1lbnRzLmZvckVhY2goKGV2ZW50RWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSBoaXQgdG8gdGhlIGVsZW1lbnQgd2l0aCBhICdrZXlkb3duJyBldmVudC4uLlxuICAgICAgICAgICAgaWYgKCB0eXBlb2YgZXZlbnRFbGVtZW50LmhhbmRsZXJzWydrZXlkb3duJ10gIT09ICd1bmRlZmluZWQnIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBVbmJpbmQgaXRcbiAgICAgICAgICAgICAgICBldmVudEVsZW1lbnQuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZXZlbnRFbGVtZW50LmhhbmRsZXJzWydrZXlkb3duJ11bMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICggIXRoaXMuaXNJbml0aWFsaXplZCB8fCAhdGhpcy5wcyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlc3Ryb3kgdGhlIHBlcmZlY3Qtc2Nyb2xsYmFyXG4gICAgICAgIHRoaXMucHMuZGVzdHJveSgpO1xuXG4gICAgICAgIC8vIENsZWFuIHVwXG4gICAgICAgIHRoaXMucHMgPSBudWxsO1xuICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgc2Nyb2xsYmFycyBvbiB3aW5kb3cgcmVzaXplXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxuICAgIF91cGRhdGVPblJlc2l6ZSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLl9kZWJvdW5jZWRVcGRhdGUoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgUHVibGljIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogRG9jdW1lbnQgY2xpY2tcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudCddKVxuICAgIGRvY3VtZW50Q2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCAhdGhpcy5pc0luaXRpYWxpemVkIHx8ICF0aGlzLnBzIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzY3JvbGxiYXIgb24gZG9jdW1lbnQgY2xpY2suLlxuICAgICAgICAvLyBUaGlzIGlzbid0IHRoZSBtb3N0IGVsZWdhbnQgc29sdXRpb24gYnV0IHRoZXJlIGlzIG5vIG90aGVyIHdheVxuICAgICAgICAvLyBvZiBrbm93aW5nIHdoZW4gdGhlIGNvbnRlbnRzIG9mIHRoZSBzY3JvbGxhYmxlIGNvbnRhaW5lciBjaGFuZ2VzLlxuICAgICAgICAvLyBUaGVyZWZvcmUsIHdlIHVwZGF0ZSBzY3JvbGxiYXJzIG9uIGV2ZXJ5IGRvY3VtZW50IGNsaWNrLlxuICAgICAgICB0aGlzLnBzLnVwZGF0ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgc2Nyb2xsYmFyXG4gICAgICovXG4gICAgdXBkYXRlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICggIXRoaXMuaXNJbml0aWFsaXplZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgcGVyZmVjdC1zY3JvbGxiYXJcbiAgICAgICAgdGhpcy5wcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHRoZSBzY3JvbGxiYXJcbiAgICAgKi9cbiAgICBkZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMubmdPbkRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgdG8gWFxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWRcbiAgICAgKi9cbiAgICBzY3JvbGxUb1goeDogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVNjcm9sbGluZygnc2Nyb2xsTGVmdCcsIHgsIHNwZWVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgdG8gWVxuICAgICAqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHlcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWRcbiAgICAgKi9cbiAgICBzY3JvbGxUb1koeTogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVNjcm9sbGluZygnc2Nyb2xsVG9wJywgeSwgc3BlZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNjcm9sbCB0byB0b3BcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWRcbiAgICAgKi9cbiAgICBzY3JvbGxUb1RvcChvZmZzZXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5hbmltYXRlU2Nyb2xsaW5nKCdzY3JvbGxUb3AnLCAob2Zmc2V0IHx8IDApLCBzcGVlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Nyb2xsIHRvIGxlZnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWRcbiAgICAgKi9cbiAgICBzY3JvbGxUb0xlZnQob2Zmc2V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVNjcm9sbGluZygnc2Nyb2xsTGVmdCcsIChvZmZzZXQgfHwgMCksIHNwZWVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgdG8gcmlnaHRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWRcbiAgICAgKi9cbiAgICBzY3JvbGxUb1JpZ2h0KG9mZnNldD86IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBjb25zdCB3aWR0aCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbFdpZHRoO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZVNjcm9sbGluZygnc2Nyb2xsTGVmdCcsIHdpZHRoIC0gKG9mZnNldCB8fCAwKSwgc3BlZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNjcm9sbCB0byBib3R0b21cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gc3BlZWRcbiAgICAgKi9cbiAgICBzY3JvbGxUb0JvdHRvbShvZmZzZXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZVNjcm9sbGluZygnc2Nyb2xsVG9wJywgaGVpZ2h0IC0gKG9mZnNldCB8fCAwKSwgc3BlZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuaW1hdGUgc2Nyb2xsaW5nXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGFyZ2V0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICovXG4gICAgYW5pbWF0ZVNjcm9sbGluZyh0YXJnZXQ6IHN0cmluZywgdmFsdWU6IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoICFzcGVlZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RhcmdldF0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgLy8gUFMgaGFzIHdlaXJkIGV2ZW50IHNlbmRpbmcgb3JkZXIsIHRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciB0aGF0XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICggdmFsdWUgIT09IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RhcmdldF0gKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSAwO1xuICAgICAgICAgICAgbGV0IHNjcm9sbENvdW50ID0gMDtcblxuICAgICAgICAgICAgbGV0IG9sZFRpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbdGFyZ2V0XTtcblxuICAgICAgICAgICAgY29uc3QgY29zUGFyYW1ldGVyID0gKG9sZFZhbHVlIC0gdmFsdWUpIC8gMjtcblxuICAgICAgICAgICAgY29uc3Qgc3RlcCA9IChuZXdUaW1lc3RhbXApID0+IHtcbiAgICAgICAgICAgICAgICBzY3JvbGxDb3VudCArPSBNYXRoLlBJIC8gKHNwZWVkIC8gKG5ld1RpbWVzdGFtcCAtIG9sZFRpbWVzdGFtcCkpO1xuXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlICsgY29zUGFyYW1ldGVyICsgY29zUGFyYW1ldGVyICogTWF0aC5jb3Moc2Nyb2xsQ291bnQpKTtcblxuICAgICAgICAgICAgICAgIC8vIE9ubHkgY29udGludWUgYW5pbWF0aW9uIGlmIHNjcm9sbCBwb3NpdGlvbiBoYXMgbm90IGNoYW5nZWRcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RhcmdldF0gPT09IG9sZFZhbHVlIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggc2Nyb2xsQ291bnQgPj0gTWF0aC5QSSApXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RhcmdldF0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUFMgaGFzIHdlaXJkIGV2ZW50IHNlbmRpbmcgb3JkZXIsIHRoaXMgaXMgYSB3b3JrYXJvdW5kIGZvciB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnRbdGFyZ2V0XSA9IG9sZFZhbHVlID0gbmV3VmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFRpbWVzdGFtcCA9IG5ld1RpbWVzdGFtcDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=