import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FuseMatSidenavHelperService {
    /**
     * Constructor
     */
    constructor() {
        this.sidenavInstances = [];
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Set sidenav
     *
     * @param id
     * @param instance
     */
    setSidenav(id, instance) {
        this.sidenavInstances[id] = instance;
    }
    /**
     * Get sidenav
     *
     * @param id
     * @returns {any}
     */
    getSidenav(id) {
        return this.sidenavInstances[id];
    }
}
FuseMatSidenavHelperService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FuseMatSidenavHelperService.ctorParameters = () => [];
FuseMatSidenavHelperService.ngInjectableDef = i0.defineInjectable({ factory: function FuseMatSidenavHelperService_Factory() { return new FuseMatSidenavHelperService(); }, token: FuseMatSidenavHelperService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZS1tYXQtc2lkZW5hdi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9mdXNlLW1hdC1zaWRlbmF2L2Z1c2UtbWF0LXNpZGVuYXYuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0zQyxNQUFNLE9BQU8sMkJBQTJCO0lBSXBDOztPQUVHO0lBQ0g7UUFFSSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsY0FBYztJQUNkLHdHQUF3RztJQUV4Rzs7Ozs7T0FLRztJQUNILFVBQVUsQ0FBQyxFQUFFLEVBQUUsUUFBUTtRQUVuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILFVBQVUsQ0FBQyxFQUFFO1FBRVQsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQzs7O1lBdkNKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdFNpZGVuYXYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRnVzZU1hdFNpZGVuYXZIZWxwZXJTZXJ2aWNlXG57XG4gICAgc2lkZW5hdkluc3RhbmNlczogTWF0U2lkZW5hdltdO1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICB0aGlzLnNpZGVuYXZJbnN0YW5jZXMgPSBbXTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgQWNjZXNzb3JzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFNldCBzaWRlbmF2XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWRcbiAgICAgKiBAcGFyYW0gaW5zdGFuY2VcbiAgICAgKi9cbiAgICBzZXRTaWRlbmF2KGlkLCBpbnN0YW5jZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuc2lkZW5hdkluc3RhbmNlc1tpZF0gPSBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgc2lkZW5hdlxuICAgICAqXG4gICAgICogQHBhcmFtIGlkXG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICBnZXRTaWRlbmF2KGlkKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5zaWRlbmF2SW5zdGFuY2VzW2lkXTtcbiAgICB9XG59XG4iXX0=