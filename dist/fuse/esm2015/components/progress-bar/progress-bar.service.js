import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
export class FuseProgressBarService {
    /**
     * Constructor
     *
     * @param {Router} _router
     */
    constructor(_router) {
        this._router = _router;
        // Initialize the service
        this._init();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Buffer value
     */
    get bufferValue() {
        return this._bufferValue.asObservable();
    }
    setBufferValue(value) {
        this._bufferValue.next(value);
    }
    /**
     * Mode
     */
    get mode() {
        return this._mode.asObservable();
    }
    setMode(value) {
        this._mode.next(value);
    }
    /**
     * Value
     */
    get value() {
        return this._value.asObservable();
    }
    setValue(value) {
        this._value.next(value);
    }
    /**
     * Visible
     */
    get visible() {
        return this._visible.asObservable();
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
        // Initialize the behavior subjects
        this._bufferValue = new BehaviorSubject(0);
        this._mode = new BehaviorSubject('indeterminate');
        this._value = new BehaviorSubject(0);
        this._visible = new BehaviorSubject(false);
        // Subscribe to the router events to show/hide the loading bar
        this._router.events
            .pipe(filter((event) => event instanceof NavigationStart))
            .subscribe(() => {
            this.show();
        });
        this._router.events
            .pipe(filter((event) => event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel))
            .subscribe(() => {
            this.hide();
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Show the progress bar
     */
    show() {
        this._visible.next(true);
    }
    /**
     * Hide the progress bar
     */
    hide() {
        this._visible.next(false);
    }
}
FuseProgressBarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FuseProgressBarService.ctorParameters = () => [
    { type: Router }
];
FuseProgressBarService.ngInjectableDef = i0.defineInjectable({ factory: function FuseProgressBarService_Factory() { return new FuseProgressBarService(i0.inject(i1.Router)); }, token: FuseProgressBarService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3Byb2dyZXNzLWJhci9wcm9ncmVzcy1iYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBS3hDLE1BQU0sT0FBTyxzQkFBc0I7SUFRL0I7Ozs7T0FJRztJQUNILFlBQ1ksT0FBZTtRQUFmLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFHdkIseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLGNBQWM7SUFDZCx3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxJQUFJLFdBQVc7UUFFWCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFhO1FBRXhCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksSUFBSTtRQUVKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQTJEO1FBRS9ELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksS0FBSztRQUVMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQWE7UUFFbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSSxPQUFPO1FBRVAsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7OztPQUlHO0lBQ0ssS0FBSztRQUVULG1DQUFtQztRQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTNDLDhEQUE4RDtRQUM5RCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07YUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLFlBQVksZUFBZSxDQUFDLENBQUM7YUFDekQsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUVQLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTthQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssWUFBWSxhQUFhLElBQUksS0FBSyxZQUFZLGVBQWUsSUFBSSxLQUFLLFlBQVksZ0JBQWdCLENBQUMsQ0FBQzthQUNoSSxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxtQkFBbUI7SUFDbkIsd0dBQXdHO0lBRXhHOztPQUVHO0lBQ0gsSUFBSTtRQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUk7UUFFQSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7WUE1SEosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7O1lBTjJFLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ2FuY2VsLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IsIE5hdmlnYXRpb25TdGFydCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VQcm9ncmVzc0JhclNlcnZpY2VcbntcbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfYnVmZmVyVmFsdWU6IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+O1xuICAgIHByaXZhdGUgX21vZGU6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+O1xuICAgIHByaXZhdGUgX3ZhbHVlOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPjtcbiAgICBwcml2YXRlIF92aXNpYmxlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IF9yb3V0ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJcbiAgICApXG4gICAge1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBzZXJ2aWNlXG4gICAgICAgIHRoaXMuX2luaXQoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgQWNjZXNzb3JzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEJ1ZmZlciB2YWx1ZVxuICAgICAqL1xuICAgIGdldCBidWZmZXJWYWx1ZSgpOiBPYnNlcnZhYmxlPGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idWZmZXJWYWx1ZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICBzZXRCdWZmZXJWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5fYnVmZmVyVmFsdWUubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW9kZVxuICAgICAqL1xuICAgIGdldCBtb2RlKCk6IE9ic2VydmFibGU8YW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vZGUuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgc2V0TW9kZSh2YWx1ZTogJ2RldGVybWluYXRlJyB8ICdpbmRldGVybWluYXRlJyB8ICdidWZmZXInIHwgJ3F1ZXJ5Jyk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX21vZGUubmV4dCh2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVmFsdWVcbiAgICAgKi9cbiAgICBnZXQgdmFsdWUoKTogT2JzZXJ2YWJsZTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWUuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX3ZhbHVlLm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZpc2libGVcbiAgICAgKi9cbiAgICBnZXQgdmlzaWJsZSgpOiBPYnNlcnZhYmxlPGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aXNpYmxlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQcml2YXRlIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9pbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIGJlaGF2aW9yIHN1YmplY3RzXG4gICAgICAgIHRoaXMuX2J1ZmZlclZhbHVlID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgICAgICAgdGhpcy5fbW9kZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoJ2luZGV0ZXJtaW5hdGUnKTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KDApO1xuICAgICAgICB0aGlzLl92aXNpYmxlID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIHRoZSByb3V0ZXIgZXZlbnRzIHRvIHNob3cvaGlkZSB0aGUgbG9hZGluZyBiYXJcbiAgICAgICAgdGhpcy5fcm91dGVyLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uU3RhcnQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9yb3V0ZXIuZXZlbnRzXG4gICAgICAgICAgICAucGlwZShmaWx0ZXIoKGV2ZW50KSA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQgfHwgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IgfHwgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uQ2FuY2VsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFB1YmxpYyBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIHByb2dyZXNzIGJhclxuICAgICAqL1xuICAgIHNob3coKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5fdmlzaWJsZS5uZXh0KHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIHByb2dyZXNzIGJhclxuICAgICAqL1xuICAgIGhpZGUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5fdmlzaWJsZS5uZXh0KGZhbHNlKTtcbiAgICB9XG59XG5cbiJdfQ==