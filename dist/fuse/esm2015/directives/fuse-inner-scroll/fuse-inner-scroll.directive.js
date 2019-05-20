import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMatchMediaService } from '../../services/match-media.service';
export class FuseInnerScrollDirective {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {FuseMatchMediaService} _fuseMediaMatchService
     * @param {Renderer2} _renderer
     */
    constructor(_elementRef, _fuseMediaMatchService, _renderer) {
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
    ngOnInit() {
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
            .subscribe((alias) => {
            if (alias === 'xs') {
                this._removeClass();
            }
            else {
                this._addClass();
            }
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Return, if there is no parent
        if (!this._parent) {
            return;
        }
        // Remove the class
        this._removeClass();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Add the class name
     *
     * @private
     */
    _addClass() {
        // Add the inner-scroll class
        this._renderer.addClass(this._grandParent, 'inner-scroll');
    }
    /**
     * Remove the class name
     * @private
     */
    _removeClass() {
        // Remove the inner-scroll class
        this._renderer.removeClass(this._grandParent, 'inner-scroll');
    }
}
FuseInnerScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '.inner-scroll'
            },] }
];
/** @nocollapse */
FuseInnerScrollDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: FuseMatchMediaService },
    { type: Renderer2 }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZS1pbm5lci1zY3JvbGwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9mdXNlLWlubmVyLXNjcm9sbC9mdXNlLWlubmVyLXNjcm9sbC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQXFCLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUszRSxNQUFNLE9BQU8sd0JBQXdCO0lBT2pDOzs7Ozs7T0FNRztJQUNILFlBQ1ksV0FBdUIsRUFDdkIsc0JBQTZDLEVBQzdDLFNBQW9CO1FBRnBCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUc1QiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILFFBQVE7UUFFSixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXpFLGdDQUFnQztRQUNoQyxJQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDbEI7WUFDSSxPQUFPO1NBQ1Y7UUFFRCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUQsc0NBQXNDO1FBQ3RDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhO2FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBRWpCLElBQUssS0FBSyxLQUFLLElBQUksRUFDbkI7Z0JBQ0ksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3ZCO2lCQUVEO2dCQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzthQUNwQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUVQLGdDQUFnQztRQUNoQyxJQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDbEI7WUFDSSxPQUFPO1NBQ1Y7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxvQkFBb0I7SUFDcEIsd0dBQXdHO0lBRXhHOzs7O09BSUc7SUFDSyxTQUFTO1FBRWIsNkJBQTZCO1FBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFlBQVk7UUFHaEIsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDbEUsQ0FBQzs7O1lBM0dKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTthQUM1Qjs7OztZQVJtQixVQUFVO1lBSXJCLHFCQUFxQjtZQUpxQixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZ1c2VNYXRjaE1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21hdGNoLW1lZGlhLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJy5pbm5lci1zY3JvbGwnXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VJbm5lclNjcm9sbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX3BhcmVudDogYW55O1xuICAgIHByaXZhdGUgX2dyYW5kUGFyZW50OiBhbnk7XG4gICAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVBbGw6IFN1YmplY3Q8YW55PjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnRSZWZ9IF9lbGVtZW50UmVmXG4gICAgICogQHBhcmFtIHtGdXNlTWF0Y2hNZWRpYVNlcnZpY2V9IF9mdXNlTWVkaWFNYXRjaFNlcnZpY2VcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmVyMn0gX3JlbmRlcmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2Z1c2VNZWRpYU1hdGNoU2VydmljZTogRnVzZU1hdGNoTWVkaWFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBwcml2YXRlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgTGlmZWN5Y2xlIGhvb2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIE9uIGluaXRcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBHZXQgdGhlIHBhcmVudFxuICAgICAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgLy8gUmV0dXJuLCBpZiB0aGVyZSBpcyBubyBwYXJlbnRcbiAgICAgICAgaWYgKCAhdGhpcy5fcGFyZW50IClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IHRoZSBncmFuZCBwYXJlbnRcbiAgICAgICAgdGhpcy5fZ3JhbmRQYXJlbnQgPSB0aGlzLl9yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuX3BhcmVudCk7XG5cbiAgICAgICAgLy8gUmVnaXN0ZXIgdG8gdGhlIG1lZGlhIHF1ZXJ5IGNoYW5nZXNcbiAgICAgICAgdGhpcy5fZnVzZU1lZGlhTWF0Y2hTZXJ2aWNlLm9uTWVkaWFDaGFuZ2VcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl91bnN1YnNjcmliZUFsbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChhbGlhcykgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBhbGlhcyA9PT0gJ3hzJyApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmVDbGFzcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRDbGFzcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBSZXR1cm4sIGlmIHRoZXJlIGlzIG5vIHBhcmVudFxuICAgICAgICBpZiAoICF0aGlzLl9wYXJlbnQgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgdGhlIGNsYXNzXG4gICAgICAgIHRoaXMuX3JlbW92ZUNsYXNzKCk7XG5cbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIGNsYXNzIG5hbWVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfYWRkQ2xhc3MoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gQWRkIHRoZSBpbm5lci1zY3JvbGwgY2xhc3NcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZ3JhbmRQYXJlbnQsICdpbm5lci1zY3JvbGwnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgdGhlIGNsYXNzIG5hbWVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3JlbW92ZUNsYXNzKCk6IHZvaWRcbiAgICB7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBpbm5lci1zY3JvbGwgY2xhc3NcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZ3JhbmRQYXJlbnQsICdpbm5lci1zY3JvbGwnKTtcbiAgICB9XG59XG4iXX0=