import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FuseSidebarService {
    /**
     * Constructor
     */
    constructor() {
        // Private
        this._registry = {};
    }
    /**
     * Add the sidebar to the registry
     *
     * @param key
     * @param sidebar
     */
    register(key, sidebar) {
        // Check if the key already being used
        if (this._registry[key]) {
            console.error(`The sidebar with the key '${key}' already exists. Either unregister it first or use a unique key.`);
            return;
        }
        // Add to the registry
        this._registry[key] = sidebar;
    }
    /**
     * Remove the sidebar from the registry
     *
     * @param key
     */
    unregister(key) {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);
        }
        // Unregister the sidebar
        delete this._registry[key];
    }
    /**
     * Return the sidebar with the given key
     *
     * @param key
     * @returns {FuseSidebarComponent}
     */
    getSidebar(key) {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn(`The sidebar with the key '${key}' doesn't exist in the registry.`);
            return;
        }
        // Return the sidebar
        return this._registry[key];
    }
}
FuseSidebarService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FuseSidebarService.ctorParameters = () => [];
FuseSidebarService.ngInjectableDef = i0.defineInjectable({ factory: function FuseSidebarService_Factory() { return new FuseSidebarService(); }, token: FuseSidebarService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zaWRlYmFyL3NpZGViYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU8zQyxNQUFNLE9BQU8sa0JBQWtCO0lBSzNCOztPQUVHO0lBQ0g7UUFOQSxVQUFVO1FBQ0YsY0FBUyxHQUE0QyxFQUFFLENBQUM7SUFRaEUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxPQUFPO1FBRWpCLHNDQUFzQztRQUN0QyxJQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQ3hCO1lBQ0ksT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsR0FBRyxtRUFBbUUsQ0FBQyxDQUFDO1lBRW5ILE9BQU87U0FDVjtRQUVELHNCQUFzQjtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFVBQVUsQ0FBQyxHQUFHO1FBRVYsOEJBQThCO1FBQzlCLElBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUN6QjtZQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsa0NBQWtDLENBQUMsQ0FBQztTQUNwRjtRQUVELHlCQUF5QjtRQUN6QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsVUFBVSxDQUFDLEdBQUc7UUFFViw4QkFBOEI7UUFDOUIsSUFBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQ3pCO1lBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxrQ0FBa0MsQ0FBQyxDQUFDO1lBRWpGLE9BQU87U0FDVjtRQUVELHFCQUFxQjtRQUNyQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7O1lBdkVKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgRnVzZVNpZGViYXJDb21wb25lbnQgfSBmcm9tICcuL3NpZGViYXIuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGdXNlU2lkZWJhclNlcnZpY2VcbntcbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfcmVnaXN0cnk6IHsgW2tleTogc3RyaW5nXTogRnVzZVNpZGViYXJDb21wb25lbnQgfSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIHRoZSBzaWRlYmFyIHRvIHRoZSByZWdpc3RyeVxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBzaWRlYmFyXG4gICAgICovXG4gICAgcmVnaXN0ZXIoa2V5LCBzaWRlYmFyKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGtleSBhbHJlYWR5IGJlaW5nIHVzZWRcbiAgICAgICAgaWYgKCB0aGlzLl9yZWdpc3RyeVtrZXldIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgVGhlIHNpZGViYXIgd2l0aCB0aGUga2V5ICcke2tleX0nIGFscmVhZHkgZXhpc3RzLiBFaXRoZXIgdW5yZWdpc3RlciBpdCBmaXJzdCBvciB1c2UgYSB1bmlxdWUga2V5LmApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdG8gdGhlIHJlZ2lzdHJ5XG4gICAgICAgIHRoaXMuX3JlZ2lzdHJ5W2tleV0gPSBzaWRlYmFyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgc2lkZWJhciBmcm9tIHRoZSByZWdpc3RyeVxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqL1xuICAgIHVucmVnaXN0ZXIoa2V5KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNpZGViYXIgZXhpc3RzXG4gICAgICAgIGlmICggIXRoaXMuX3JlZ2lzdHJ5W2tleV0gKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZSBzaWRlYmFyIHdpdGggdGhlIGtleSAnJHtrZXl9JyBkb2Vzbid0IGV4aXN0IGluIHRoZSByZWdpc3RyeS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVucmVnaXN0ZXIgdGhlIHNpZGViYXJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3JlZ2lzdHJ5W2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHRoZSBzaWRlYmFyIHdpdGggdGhlIGdpdmVuIGtleVxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEByZXR1cm5zIHtGdXNlU2lkZWJhckNvbXBvbmVudH1cbiAgICAgKi9cbiAgICBnZXRTaWRlYmFyKGtleSk6IEZ1c2VTaWRlYmFyQ29tcG9uZW50XG4gICAge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2lkZWJhciBleGlzdHNcbiAgICAgICAgaWYgKCAhdGhpcy5fcmVnaXN0cnlba2V5XSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIHNpZGViYXIgd2l0aCB0aGUga2V5ICcke2tleX0nIGRvZXNuJ3QgZXhpc3QgaW4gdGhlIHJlZ2lzdHJ5LmApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIHNpZGViYXJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5W2tleV07XG4gICAgfVxufVxuIl19