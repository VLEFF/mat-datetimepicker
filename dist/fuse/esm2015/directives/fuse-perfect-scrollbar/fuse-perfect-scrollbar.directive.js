import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import PerfectScrollbar from 'perfect-scrollbar';
import * as _ from 'lodash';
import { FuseConfigService } from '../../services/config.service';
export class FusePerfectScrollbarDirective {
    /**
     * Constructor
     *
     * @param {ElementRef} elementRef
     * @param {FuseConfigService} _fuseConfigService
     * @param {Platform} _platform
     * @param {Router} _router
     */
    constructor(elementRef, _fuseConfigService, _platform, _router) {
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
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Perfect Scrollbar options
     *
     * @param value
     */
    set fusePerfectScrollbarOptions(value) {
        // Merge the options
        this._options = _.merge({}, this._options, value);
    }
    get fusePerfectScrollbarOptions() {
        // Return the options
        return this._options;
    }
    /**
     * Is enabled
     *
     * @param {boolean | ""} value
     */
    set enabled(value) {
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
    }
    get enabled() {
        // Return the enabled status
        return this._enabled;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * After view init
     */
    ngAfterViewInit() {
        // Check if scrollbars enabled or not from the main config
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
            this.enabled = settings.customScrollbars;
        });
        // Scroll to the top on every route change
        if (this.fusePerfectScrollbarOptions.updateOnRouteChange) {
            this._router.events
                .pipe(takeUntil(this._unsubscribeAll), filter(event => event instanceof NavigationEnd))
                .subscribe(() => {
                setTimeout(() => {
                    this.scrollToTop();
                    this.update();
                }, 0);
            });
        }
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        this._destroy();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    _init() {
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
        this.ps = new PerfectScrollbar(this.elementRef.nativeElement, Object.assign({}, this.fusePerfectScrollbarOptions));
        // Unbind 'keydown' events of PerfectScrollbar since it causes an extremely
        // high CPU usage on Angular Material inputs.
        // Loop through all the event elements of this PerfectScrollbar instance
        this.ps.event.eventElements.forEach((eventElement) => {
            // If we hit to the element with a 'keydown' event...
            if (typeof eventElement.handlers['keydown'] !== 'undefined') {
                // Unbind it
                eventElement.element.removeEventListener('keydown', eventElement.handlers['keydown'][0]);
            }
        });
    }
    /**
     * Destroy
     *
     * @private
     */
    _destroy() {
        if (!this.isInitialized || !this.ps) {
            return;
        }
        // Destroy the perfect-scrollbar
        this.ps.destroy();
        // Clean up
        this.ps = null;
        this.isInitialized = false;
    }
    /**
     * Update scrollbars on window resize
     *
     * @private
     */
    _updateOnResize() {
        this._debouncedUpdate();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Document click
     *
     * @param {Event} event
     */
    documentClick(event) {
        if (!this.isInitialized || !this.ps) {
            return;
        }
        // Update the scrollbar on document click..
        // This isn't the most elegant solution but there is no other way
        // of knowing when the contents of the scrollable container changes.
        // Therefore, we update scrollbars on every document click.
        this.ps.update();
    }
    /**
     * Update the scrollbar
     */
    update() {
        if (!this.isInitialized) {
            return;
        }
        // Update the perfect-scrollbar
        this.ps.update();
    }
    /**
     * Destroy the scrollbar
     */
    destroy() {
        this.ngOnDestroy();
    }
    /**
     * Scroll to X
     *
     * @param {number} x
     * @param {number} speed
     */
    scrollToX(x, speed) {
        this.animateScrolling('scrollLeft', x, speed);
    }
    /**
     * Scroll to Y
     *
     * @param {number} y
     * @param {number} speed
     */
    scrollToY(y, speed) {
        this.animateScrolling('scrollTop', y, speed);
    }
    /**
     * Scroll to top
     *
     * @param {number} offset
     * @param {number} speed
     */
    scrollToTop(offset, speed) {
        this.animateScrolling('scrollTop', (offset || 0), speed);
    }
    /**
     * Scroll to left
     *
     * @param {number} offset
     * @param {number} speed
     */
    scrollToLeft(offset, speed) {
        this.animateScrolling('scrollLeft', (offset || 0), speed);
    }
    /**
     * Scroll to right
     *
     * @param {number} offset
     * @param {number} speed
     */
    scrollToRight(offset, speed) {
        const width = this.elementRef.nativeElement.scrollWidth;
        this.animateScrolling('scrollLeft', width - (offset || 0), speed);
    }
    /**
     * Scroll to bottom
     *
     * @param {number} offset
     * @param {number} speed
     */
    scrollToBottom(offset, speed) {
        const height = this.elementRef.nativeElement.scrollHeight;
        this.animateScrolling('scrollTop', height - (offset || 0), speed);
    }
    /**
     * Animate scrolling
     *
     * @param {string} target
     * @param {number} value
     * @param {number} speed
     */
    animateScrolling(target, value, speed) {
        if (!speed) {
            this.elementRef.nativeElement[target] = value;
            // PS has weird event sending order, this is a workaround for that
            this.update();
            this.update();
        }
        else if (value !== this.elementRef.nativeElement[target]) {
            let newValue = 0;
            let scrollCount = 0;
            let oldTimestamp = performance.now();
            let oldValue = this.elementRef.nativeElement[target];
            const cosParameter = (oldValue - value) / 2;
            const step = (newTimestamp) => {
                scrollCount += Math.PI / (speed / (newTimestamp - oldTimestamp));
                newValue = Math.round(value + cosParameter + cosParameter * Math.cos(scrollCount));
                // Only continue animation if scroll position has not changed
                if (this.elementRef.nativeElement[target] === oldValue) {
                    if (scrollCount >= Math.PI) {
                        this.elementRef.nativeElement[target] = value;
                        // PS has weird event sending order, this is a workaround for that
                        this.update();
                        this.update();
                    }
                    else {
                        this.elementRef.nativeElement[target] = oldValue = newValue;
                        oldTimestamp = newTimestamp;
                        window.requestAnimationFrame(step);
                    }
                }
            };
            window.requestAnimationFrame(step);
        }
    }
}
FusePerfectScrollbarDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fusePerfectScrollbar]'
            },] }
];
/** @nocollapse */
FusePerfectScrollbarDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: FuseConfigService },
    { type: Platform },
    { type: Router }
];
FusePerfectScrollbarDirective.propDecorators = {
    fusePerfectScrollbarOptions: [{ type: Input }],
    enabled: [{ type: Input, args: ['fusePerfectScrollbar',] }],
    _updateOnResize: [{ type: HostListener, args: ['window:resize',] }],
    documentClick: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZS1wZXJmZWN0LXNjcm9sbGJhci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2Z1c2UtcGVyZmVjdC1zY3JvbGxiYXIvZnVzZS1wZXJmZWN0LXNjcm9sbGJhci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sZ0JBQWdCLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFNUIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFLbEUsTUFBTSxPQUFPLDZCQUE2QjtJQVl0Qzs7Ozs7OztPQU9HO0lBQ0gsWUFDVyxVQUFzQixFQUNyQixrQkFBcUMsRUFDckMsU0FBbUIsRUFDbkIsT0FBZTtRQUhoQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3JCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBR3ZCLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUV0QiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxL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Q0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDdEM7aUJBQ0o7WUFDTCxDQUFDLENBQUM7WUFFRixNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdEM7SUFDTCxDQUFDOzs7WUEzWkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7YUFDckM7Ozs7WUFaa0MsVUFBVTtZQVFwQyxpQkFBaUI7WUFOakIsUUFBUTtZQURPLE1BQU07OzswQ0E2RHpCLEtBQUs7c0JBa0JMLEtBQUssU0FBQyxzQkFBc0I7OEJBa0s1QixZQUFZLFNBQUMsZUFBZTs0QkFlNUIsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wbGF0Zm9ybSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBQZXJmZWN0U2Nyb2xsYmFyIGZyb20gJ3BlcmZlY3Qtc2Nyb2xsYmFyJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgRnVzZUNvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb25maWcuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Z1c2VQZXJmZWN0U2Nyb2xsYmFyXSdcbn0pXG5leHBvcnQgY2xhc3MgRnVzZVBlcmZlY3RTY3JvbGxiYXJEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3lcbntcbiAgICBpc0luaXRpYWxpemVkOiBib29sZWFuO1xuICAgIGlzTW9iaWxlOiBib29sZWFuO1xuICAgIHBzOiBQZXJmZWN0U2Nyb2xsYmFyIHwgYW55O1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX2VuYWJsZWQ6IGJvb2xlYW4gfCAnJztcbiAgICBwcml2YXRlIF9kZWJvdW5jZWRVcGRhdGU6IGFueTtcbiAgICBwcml2YXRlIF9vcHRpb25zOiBhbnk7XG4gICAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVBbGw6IFN1YmplY3Q8YW55PjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnRSZWZ9IGVsZW1lbnRSZWZcbiAgICAgKiBAcGFyYW0ge0Z1c2VDb25maWdTZXJ2aWNlfSBfZnVzZUNvbmZpZ1NlcnZpY2VcbiAgICAgKiBAcGFyYW0ge1BsYXRmb3JtfSBfcGxhdGZvcm1cbiAgICAgKiBAcGFyYW0ge1JvdXRlcn0gX3JvdXRlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfZnVzZUNvbmZpZ1NlcnZpY2U6IEZ1c2VDb25maWdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01vYmlsZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl9lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RlYm91bmNlZFVwZGF0ZSA9IF8uZGVib3VuY2UodGhpcy51cGRhdGUsIDE1MCk7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSB7XG4gICAgICAgICAgICB1cGRhdGVPblJvdXRlQ2hhbmdlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIEFjY2Vzc29yc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBQZXJmZWN0IFNjcm9sbGJhciBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgKi9cbiAgICBASW5wdXQoKVxuICAgIHNldCBmdXNlUGVyZmVjdFNjcm9sbGJhck9wdGlvbnModmFsdWUpXG4gICAge1xuICAgICAgICAvLyBNZXJnZSB0aGUgb3B0aW9uc1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gXy5tZXJnZSh7fSwgdGhpcy5fb3B0aW9ucywgdmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBmdXNlUGVyZmVjdFNjcm9sbGJhck9wdGlvbnMoKTogYW55XG4gICAge1xuICAgICAgICAvLyBSZXR1cm4gdGhlIG9wdGlvbnNcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXMgZW5hYmxlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtib29sZWFuIHwgXCJcIn0gdmFsdWVcbiAgICAgKi9cbiAgICBASW5wdXQoJ2Z1c2VQZXJmZWN0U2Nyb2xsYmFyJylcbiAgICBzZXQgZW5hYmxlZCh2YWx1ZTogYm9vbGVhbiB8ICcnKVxuICAgIHtcbiAgICAgICAgLy8gSWYgbm90aGluZyBpcyBwcm92aWRlZCB3aXRoIHRoZSBkaXJlY3RpdmUgKGVtcHR5IHN0cmluZyksXG4gICAgICAgIC8vIHdlIHdpbGwgdGFrZSB0aGF0IGFzIGEgdHJ1ZVxuICAgICAgICBpZiAoIHZhbHVlID09PSAnJyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiwgaWYgYm90aCB2YWx1ZXMgYXJlIHRoZSBzYW1lXG4gICAgICAgIGlmICggdGhpcy5lbmFibGVkID09PSB2YWx1ZSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0b3JlIHRoZSB2YWx1ZVxuICAgICAgICB0aGlzLl9lbmFibGVkID0gdmFsdWU7XG5cbiAgICAgICAgLy8gSWYgZW5hYmxlZC4uLlxuICAgICAgICBpZiAoIHRoaXMuZW5hYmxlZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEluaXQgdGhlIGRpcmVjdGl2ZVxuICAgICAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIGRlc3Ryb3kgaXRcbiAgICAgICAgICAgIHRoaXMuX2Rlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBlbmFibGVkKCk6IGJvb2xlYW4gfCAnJ1xuICAgIHtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBlbmFibGVkIHN0YXR1c1xuICAgICAgICByZXR1cm4gdGhpcy5fZW5hYmxlZDtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgTGlmZWN5Y2xlIGhvb2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEFmdGVyIHZpZXcgaW5pdFxuICAgICAqL1xuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBDaGVjayBpZiBzY3JvbGxiYXJzIGVuYWJsZWQgb3Igbm90IGZyb20gdGhlIG1haW4gY29uZmlnXG4gICAgICAgIHRoaXMuX2Z1c2VDb25maWdTZXJ2aWNlLmNvbmZpZ1xuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKHNldHRpbmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlZCA9IHNldHRpbmdzLmN1c3RvbVNjcm9sbGJhcnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLyBTY3JvbGwgdG8gdGhlIHRvcCBvbiBldmVyeSByb3V0ZSBjaGFuZ2VcbiAgICAgICAgaWYgKCB0aGlzLmZ1c2VQZXJmZWN0U2Nyb2xsYmFyT3B0aW9ucy51cGRhdGVPblJvdXRlQ2hhbmdlIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fcm91dGVyLmV2ZW50c1xuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpLFxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFRvVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLl9kZXN0cm95KCk7XG5cbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFJldHVybiwgaWYgYWxyZWFkeSBpbml0aWFsaXplZFxuICAgICAgICBpZiAoIHRoaXMuaXNJbml0aWFsaXplZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIGlzIG1vYmlsZVxuICAgICAgICBpZiAoIHRoaXMuX3BsYXRmb3JtLkFORFJPSUQgfHwgdGhpcy5fcGxhdGZvcm0uSU9TIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pc01vYmlsZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gaWYgaXQncyBtb2JpbGVcbiAgICAgICAgaWYgKCB0aGlzLmlzTW9iaWxlIClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gUmV0dXJuLi4uXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgYXMgaW5pdGlhbGl6ZWRcbiAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBwZXJmZWN0LXNjcm9sbGJhclxuICAgICAgICB0aGlzLnBzID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHtcbiAgICAgICAgICAgIC4uLnRoaXMuZnVzZVBlcmZlY3RTY3JvbGxiYXJPcHRpb25zXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFVuYmluZCAna2V5ZG93bicgZXZlbnRzIG9mIFBlcmZlY3RTY3JvbGxiYXIgc2luY2UgaXQgY2F1c2VzIGFuIGV4dHJlbWVseVxuICAgICAgICAvLyBoaWdoIENQVSB1c2FnZSBvbiBBbmd1bGFyIE1hdGVyaWFsIGlucHV0cy5cbiAgICAgICAgLy8gTG9vcCB0aHJvdWdoIGFsbCB0aGUgZXZlbnQgZWxlbWVudHMgb2YgdGhpcyBQZXJmZWN0U2Nyb2xsYmFyIGluc3RhbmNlXG4gICAgICAgIHRoaXMucHMuZXZlbnQuZXZlbnRFbGVtZW50cy5mb3JFYWNoKChldmVudEVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgLy8gSWYgd2UgaGl0IHRvIHRoZSBlbGVtZW50IHdpdGggYSAna2V5ZG93bicgZXZlbnQuLi5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIGV2ZW50RWxlbWVudC5oYW5kbGVyc1sna2V5ZG93biddICE9PSAndW5kZWZpbmVkJyApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gVW5iaW5kIGl0XG4gICAgICAgICAgICAgICAgZXZlbnRFbGVtZW50LmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGV2ZW50RWxlbWVudC5oYW5kbGVyc1sna2V5ZG93biddWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoICF0aGlzLmlzSW5pdGlhbGl6ZWQgfHwgIXRoaXMucHMgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZXN0cm95IHRoZSBwZXJmZWN0LXNjcm9sbGJhclxuICAgICAgICB0aGlzLnBzLmRlc3Ryb3koKTtcblxuICAgICAgICAvLyBDbGVhbiB1cFxuICAgICAgICB0aGlzLnBzID0gbnVsbDtcbiAgICAgICAgdGhpcy5pc0luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHNjcm9sbGJhcnMgb24gd2luZG93IHJlc2l6ZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcbiAgICBfdXBkYXRlT25SZXNpemUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5fZGVib3VuY2VkVXBkYXRlKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFB1YmxpYyBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIERvY3VtZW50IGNsaWNrXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBkb2N1bWVudENsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICggIXRoaXMuaXNJbml0aWFsaXplZCB8fCAhdGhpcy5wcyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc2Nyb2xsYmFyIG9uIGRvY3VtZW50IGNsaWNrLi5cbiAgICAgICAgLy8gVGhpcyBpc24ndCB0aGUgbW9zdCBlbGVnYW50IHNvbHV0aW9uIGJ1dCB0aGVyZSBpcyBubyBvdGhlciB3YXlcbiAgICAgICAgLy8gb2Yga25vd2luZyB3aGVuIHRoZSBjb250ZW50cyBvZiB0aGUgc2Nyb2xsYWJsZSBjb250YWluZXIgY2hhbmdlcy5cbiAgICAgICAgLy8gVGhlcmVmb3JlLCB3ZSB1cGRhdGUgc2Nyb2xsYmFycyBvbiBldmVyeSBkb2N1bWVudCBjbGljay5cbiAgICAgICAgdGhpcy5wcy51cGRhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIHNjcm9sbGJhclxuICAgICAqL1xuICAgIHVwZGF0ZSgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoICF0aGlzLmlzSW5pdGlhbGl6ZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGRhdGUgdGhlIHBlcmZlY3Qtc2Nyb2xsYmFyXG4gICAgICAgIHRoaXMucHMudXBkYXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVzdHJveSB0aGUgc2Nyb2xsYmFyXG4gICAgICovXG4gICAgZGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm5nT25EZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Nyb2xsIHRvIFhcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICovXG4gICAgc2Nyb2xsVG9YKHg6IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmFuaW1hdGVTY3JvbGxpbmcoJ3Njcm9sbExlZnQnLCB4LCBzcGVlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Nyb2xsIHRvIFlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICovXG4gICAgc2Nyb2xsVG9ZKHk6IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmFuaW1hdGVTY3JvbGxpbmcoJ3Njcm9sbFRvcCcsIHksIHNwZWVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgdG8gdG9wXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICovXG4gICAgc2Nyb2xsVG9Ub3Aob2Zmc2V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuYW5pbWF0ZVNjcm9sbGluZygnc2Nyb2xsVG9wJywgKG9mZnNldCB8fCAwKSwgc3BlZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNjcm9sbCB0byBsZWZ0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICovXG4gICAgc2Nyb2xsVG9MZWZ0KG9mZnNldD86IG51bWJlciwgc3BlZWQ/OiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmFuaW1hdGVTY3JvbGxpbmcoJ3Njcm9sbExlZnQnLCAob2Zmc2V0IHx8IDApLCBzcGVlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2Nyb2xsIHRvIHJpZ2h0XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICovXG4gICAgc2Nyb2xsVG9SaWdodChvZmZzZXQ/OiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogdm9pZFxuICAgIHtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aDtcblxuICAgICAgICB0aGlzLmFuaW1hdGVTY3JvbGxpbmcoJ3Njcm9sbExlZnQnLCB3aWR0aCAtIChvZmZzZXQgfHwgMCksIHNwZWVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY3JvbGwgdG8gYm90dG9tXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNwZWVkXG4gICAgICovXG4gICAgc2Nyb2xsVG9Cb3R0b20ob2Zmc2V0PzogbnVtYmVyLCBzcGVlZD86IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcblxuICAgICAgICB0aGlzLmFuaW1hdGVTY3JvbGxpbmcoJ3Njcm9sbFRvcCcsIGhlaWdodCAtIChvZmZzZXQgfHwgMCksIHNwZWVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbmltYXRlIHNjcm9sbGluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRhcmdldFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzcGVlZFxuICAgICAqL1xuICAgIGFuaW1hdGVTY3JvbGxpbmcodGFyZ2V0OiBzdHJpbmcsIHZhbHVlOiBudW1iZXIsIHNwZWVkPzogbnVtYmVyKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCAhc3BlZWQgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0YXJnZXRdID0gdmFsdWU7XG5cbiAgICAgICAgICAgIC8vIFBTIGhhcyB3ZWlyZCBldmVudCBzZW5kaW5nIG9yZGVyLCB0aGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgdGhhdFxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHZhbHVlICE9PSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0YXJnZXRdIClcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IG5ld1ZhbHVlID0gMDtcbiAgICAgICAgICAgIGxldCBzY3JvbGxDb3VudCA9IDA7XG5cbiAgICAgICAgICAgIGxldCBvbGRUaW1lc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIGxldCBvbGRWYWx1ZSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RhcmdldF07XG5cbiAgICAgICAgICAgIGNvbnN0IGNvc1BhcmFtZXRlciA9IChvbGRWYWx1ZSAtIHZhbHVlKSAvIDI7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0ZXAgPSAobmV3VGltZXN0YW1wKSA9PiB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsQ291bnQgKz0gTWF0aC5QSSAvIChzcGVlZCAvIChuZXdUaW1lc3RhbXAgLSBvbGRUaW1lc3RhbXApKTtcblxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gTWF0aC5yb3VuZCh2YWx1ZSArIGNvc1BhcmFtZXRlciArIGNvc1BhcmFtZXRlciAqIE1hdGguY29zKHNjcm9sbENvdW50KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBPbmx5IGNvbnRpbnVlIGFuaW1hdGlvbiBpZiBzY3JvbGwgcG9zaXRpb24gaGFzIG5vdCBjaGFuZ2VkXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0YXJnZXRdID09PSBvbGRWYWx1ZSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHNjcm9sbENvdW50ID49IE1hdGguUEkgKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudFt0YXJnZXRdID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBTIGhhcyB3ZWlyZCBldmVudCBzZW5kaW5nIG9yZGVyLCB0aGlzIGlzIGEgd29ya2Fyb3VuZCBmb3IgdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50W3RhcmdldF0gPSBvbGRWYWx1ZSA9IG5ld1ZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRUaW1lc3RhbXAgPSBuZXdUaW1lc3RhbXA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHN0ZXApO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19