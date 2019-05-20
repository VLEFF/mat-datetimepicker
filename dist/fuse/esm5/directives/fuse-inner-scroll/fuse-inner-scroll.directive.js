import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMatchMediaService } from '../../services/match-media.service';
var FuseInnerScrollDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {FuseMatchMediaService} _fuseMediaMatchService
     * @param {Renderer2} _renderer
     */
    function FuseInnerScrollDirective(_elementRef, _fuseMediaMatchService, _renderer) {
        this._elementRef = _elementRef;
        this._fuseMediaMatchService = _fuseMediaMatchService;
        this._renderer = _renderer;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseInnerScrollDirective.prototype.ngOnInit = function () {
        var _this = this;
        // Get the parent
        this._parent = this._renderer.parentNode(this._elementRef.nativeElement);
        // Return, if there is no parent
        if (!this._parent) {
            return;
        }
        // Get the grand parent
        this._grandParent = this._renderer.parentNode(this._parent);
        // Register to the media query changes
        this._fuseMediaMatchService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (alias) {
            if (alias === 'xs') {
                _this._removeClass();
            }
            else {
                _this._addClass();
            }
        });
    };
    /**
     * On destroy
     */
    FuseInnerScrollDirective.prototype.ngOnDestroy = function () {
        // Return, if there is no parent
        if (!this._parent) {
            return;
        }
        // Remove the class
        this._removeClass();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Add the class name
     *
     * @private
     */
    FuseInnerScrollDirective.prototype._addClass = function () {
        // Add the inner-scroll class
        this._renderer.addClass(this._grandParent, 'inner-scroll');
    };
    /**
     * Remove the class name
     * @private
     */
    FuseInnerScrollDirective.prototype._removeClass = function () {
        // Remove the inner-scroll class
        this._renderer.removeClass(this._grandParent, 'inner-scroll');
    };
    FuseInnerScrollDirective.decorators = [
        { type: Directive, args: [{
                    selector: '.inner-scroll'
                },] }
    ];
    /** @nocollapse */
    FuseInnerScrollDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: FuseMatchMediaService },
        { type: Renderer2 }
    ]; };
    return FuseInnerScrollDirective;
}());
export { FuseInnerScrollDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZS1pbm5lci1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9mdXNlLWlubmVyLXNjcm9sbC9mdXNlLWlubmVyLXNjcm9sbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUUzRTtJQVVJOzs7Ozs7T0FNRztJQUNILGtDQUNZLFdBQXVCLEVBQ3ZCLHNCQUE2QyxFQUM3QyxTQUFvQjtRQUZwQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFHNUIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCwyQ0FBUSxHQUFSO1FBQUEsaUJBNEJDO1FBMUJHLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFekUsZ0NBQWdDO1FBQ2hDLElBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNsQjtZQUNJLE9BQU87U0FDVjtRQUVELHVCQUF1QjtRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1RCxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLGFBQWE7YUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDckMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUViLElBQUssS0FBSyxLQUFLLElBQUksRUFDbkI7Z0JBQ0ksS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3ZCO2lCQUVEO2dCQUNJLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsOENBQVcsR0FBWDtRQUVJLGdDQUFnQztRQUNoQyxJQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDbEI7WUFDSSxPQUFPO1NBQ1Y7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxvQkFBb0I7SUFDcEIsd0dBQXdHO0lBRXhHOzs7O09BSUc7SUFDSyw0Q0FBUyxHQUFqQjtRQUVJLDZCQUE2QjtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRDs7O09BR0c7SUFDSywrQ0FBWSxHQUFwQjtRQUdJLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7O2dCQTNHSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7aUJBQzVCOzs7O2dCQVJtQixVQUFVO2dCQUlyQixxQkFBcUI7Z0JBSnFCLFNBQVM7O0lBa0g1RCwrQkFBQztDQUFBLEFBNUdELElBNEdDO1NBekdZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGdXNlTWF0Y2hNZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tYXRjaC1tZWRpYS5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICcuaW5uZXItc2Nyb2xsJ1xufSlcbmV4cG9ydCBjbGFzcyBGdXNlSW5uZXJTY3JvbGxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF9wYXJlbnQ6IGFueTtcbiAgICBwcml2YXRlIF9ncmFuZFBhcmVudDogYW55O1xuICAgIHByaXZhdGUgX3Vuc3Vic2NyaWJlQWxsOiBTdWJqZWN0PGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50UmVmfSBfZWxlbWVudFJlZlxuICAgICAqIEBwYXJhbSB7RnVzZU1hdGNoTWVkaWFTZXJ2aWNlfSBfZnVzZU1lZGlhTWF0Y2hTZXJ2aWNlXG4gICAgICogQHBhcmFtIHtSZW5kZXJlcjJ9IF9yZW5kZXJlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICBwcml2YXRlIF9mdXNlTWVkaWFNYXRjaFNlcnZpY2U6IEZ1c2VNYXRjaE1lZGlhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgIClcbiAgICB7XG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIExpZmVjeWNsZSBob29rc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0XG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gR2V0IHRoZSBwYXJlbnRcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gdGhpcy5fcmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIC8vIFJldHVybiwgaWYgdGhlcmUgaXMgbm8gcGFyZW50XG4gICAgICAgIGlmICggIXRoaXMuX3BhcmVudCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB0aGUgZ3JhbmQgcGFyZW50XG4gICAgICAgIHRoaXMuX2dyYW5kUGFyZW50ID0gdGhpcy5fcmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLl9wYXJlbnQpO1xuXG4gICAgICAgIC8vIFJlZ2lzdGVyIHRvIHRoZSBtZWRpYSBxdWVyeSBjaGFuZ2VzXG4gICAgICAgIHRoaXMuX2Z1c2VNZWRpYU1hdGNoU2VydmljZS5vbk1lZGlhQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoYWxpYXMpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmICggYWxpYXMgPT09ICd4cycgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQ2xhc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3MoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gUmV0dXJuLCBpZiB0aGVyZSBpcyBubyBwYXJlbnRcbiAgICAgICAgaWYgKCAhdGhpcy5fcGFyZW50IClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBjbGFzc1xuICAgICAgICB0aGlzLl9yZW1vdmVDbGFzcygpO1xuXG4gICAgICAgIC8vIFVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwubmV4dCgpO1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQcml2YXRlIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBjbGFzcyBuYW1lXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2FkZENsYXNzKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIEFkZCB0aGUgaW5uZXItc2Nyb2xsIGNsYXNzXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2dyYW5kUGFyZW50LCAnaW5uZXItc2Nyb2xsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSBjbGFzcyBuYW1lXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9yZW1vdmVDbGFzcygpOiB2b2lkXG4gICAge1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgaW5uZXItc2Nyb2xsIGNsYXNzXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuX2dyYW5kUGFyZW50LCAnaW5uZXItc2Nyb2xsJyk7XG4gICAgfVxufVxuIl19