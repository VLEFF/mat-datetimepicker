import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as _ from 'lodash';
import * as i0 from "@angular/core";
var FuseNavigationService = /** @class */ (function () {
    /**
     * Constructor
     */
    function FuseNavigationService() {
        this._registry = {};
        // Set the defaults
        this.onItemCollapsed = new Subject();
        this.onItemCollapseToggled = new Subject();
        // Set the private defaults
        this._currentNavigationKey = null;
        this._onNavigationChanged = new BehaviorSubject(null);
        this._onNavigationRegistered = new BehaviorSubject(null);
        this._onNavigationUnregistered = new BehaviorSubject(null);
        this._onNavigationItemAdded = new BehaviorSubject(null);
        this._onNavigationItemUpdated = new BehaviorSubject(null);
        this._onNavigationItemRemoved = new BehaviorSubject(null);
    }
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationChanged", {
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Get onNavigationChanged
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationChanged.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationRegistered", {
        /**
         * Get onNavigationRegistered
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationRegistered.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationUnregistered", {
        /**
         * Get onNavigationUnregistered
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationUnregistered.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationItemAdded", {
        /**
         * Get onNavigationItemAdded
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationItemAdded.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationItemUpdated", {
        /**
         * Get onNavigationItemUpdated
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationItemUpdated.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseNavigationService.prototype, "onNavigationItemRemoved", {
        /**
         * Get onNavigationItemRemoved
         *
         * @returns {Observable<any>}
         */
        get: function () {
            return this._onNavigationItemRemoved.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Register the given navigation
     * with the given key
     *
     * @param key
     * @param navigation
     */
    FuseNavigationService.prototype.register = function (key, navigation) {
        // Check if the key already being used
        if (this._registry[key]) {
            console.error("The navigation with the key '" + key + "' already exists. Either unregister it first or use a unique key.");
            return;
        }
        // Add to the registry
        this._registry[key] = navigation;
        // Notify the subject
        this._onNavigationRegistered.next([key, navigation]);
    };
    /**
     * Unregister the navigation from the registry
     * @param key
     */
    FuseNavigationService.prototype.unregister = function (key) {
        // Check if the navigation exists
        if (!this._registry[key]) {
            console.warn("The navigation with the key '" + key + "' doesn't exist in the registry.");
        }
        // Unregister the sidebar
        delete this._registry[key];
        // Notify the subject
        this._onNavigationUnregistered.next(key);
    };
    /**
     * Get navigation from registry by key
     *
     * @param key
     * @returns {any}
     */
    FuseNavigationService.prototype.getNavigation = function (key) {
        // Check if the navigation exists
        if (!this._registry[key]) {
            console.warn("The navigation with the key '" + key + "' doesn't exist in the registry.");
            return;
        }
        // Return the sidebar
        return this._registry[key];
    };
    /**
     * Get flattened navigation array
     *
     * @param navigation
     * @param flatNavigation
     * @returns {any[]}
     */
    FuseNavigationService.prototype.getFlatNavigation = function (navigation, flatNavigation) {
        if (flatNavigation === void 0) { flatNavigation = []; }
        var e_1, _a;
        try {
            for (var navigation_1 = tslib_1.__values(navigation), navigation_1_1 = navigation_1.next(); !navigation_1_1.done; navigation_1_1 = navigation_1.next()) {
                var item = navigation_1_1.value;
                if (item.type === 'item') {
                    flatNavigation.push(item);
                    continue;
                }
                if (item.type === 'collapsable' || item.type === 'group') {
                    if (item.children) {
                        this.getFlatNavigation(item.children, flatNavigation);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (navigation_1_1 && !navigation_1_1.done && (_a = navigation_1.return)) _a.call(navigation_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return flatNavigation;
    };
    /**
     * Get the current navigation
     *
     * @returns {any}
     */
    FuseNavigationService.prototype.getCurrentNavigation = function () {
        if (!this._currentNavigationKey) {
            console.warn("The current navigation is not set.");
            return;
        }
        return this.getNavigation(this._currentNavigationKey);
    };
    /**
     * Set the navigation with the key
     * as the current navigation
     *
     * @param key
     */
    FuseNavigationService.prototype.setCurrentNavigation = function (key) {
        // Check if the sidebar exists
        if (!this._registry[key]) {
            console.warn("The navigation with the key '" + key + "' doesn't exist in the registry.");
            return;
        }
        // Set the current navigation key
        this._currentNavigationKey = key;
        // Notify the subject
        this._onNavigationChanged.next(key);
    };
    /**
     * Get navigation item by id from the
     * current navigation
     *
     * @param id
     * @param {any} navigation
     * @returns {any | boolean}
     */
    FuseNavigationService.prototype.getNavigationItem = function (id, navigation) {
        if (navigation === void 0) { navigation = null; }
        var e_2, _a;
        if (!navigation) {
            navigation = this.getCurrentNavigation();
        }
        try {
            for (var navigation_2 = tslib_1.__values(navigation), navigation_2_1 = navigation_2.next(); !navigation_2_1.done; navigation_2_1 = navigation_2.next()) {
                var item = navigation_2_1.value;
                if (item.id === id) {
                    return item;
                }
                if (item.children) {
                    var childItem = this.getNavigationItem(id, item.children);
                    if (childItem) {
                        return childItem;
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (navigation_2_1 && !navigation_2_1.done && (_a = navigation_2.return)) _a.call(navigation_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return false;
    };
    /**
     * Get the parent of the navigation item
     * with the id
     *
     * @param id
     * @param {any} navigation
     * @param parent
     */
    FuseNavigationService.prototype.getNavigationItemParent = function (id, navigation, parent) {
        if (navigation === void 0) { navigation = null; }
        if (parent === void 0) { parent = null; }
        var e_3, _a;
        if (!navigation) {
            navigation = this.getCurrentNavigation();
            parent = navigation;
        }
        try {
            for (var navigation_3 = tslib_1.__values(navigation), navigation_3_1 = navigation_3.next(); !navigation_3_1.done; navigation_3_1 = navigation_3.next()) {
                var item = navigation_3_1.value;
                if (item.id === id) {
                    return parent;
                }
                if (item.children) {
                    var childItem = this.getNavigationItemParent(id, item.children, item);
                    if (childItem) {
                        return childItem;
                    }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (navigation_3_1 && !navigation_3_1.done && (_a = navigation_3.return)) _a.call(navigation_3);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return false;
    };
    /**
     * Add a navigation item to the specified location
     *
     * @param item
     * @param id
     */
    FuseNavigationService.prototype.addNavigationItem = function (item, id) {
        // Get the current navigation
        var navigation = this.getCurrentNavigation();
        // Add to the end of the navigation
        if (id === 'end') {
            navigation.push(item);
            // Trigger the observable
            this._onNavigationItemAdded.next(true);
            return;
        }
        // Add to the start of the navigation
        if (id === 'start') {
            navigation.unshift(item);
            // Trigger the observable
            this._onNavigationItemAdded.next(true);
            return;
        }
        // Add it to a specific location
        var parent = this.getNavigationItem(id);
        if (parent) {
            // Check if parent has a children entry,
            // and add it if it doesn't
            if (!parent.children) {
                parent.children = [];
            }
            // Add the item
            parent.children.push(item);
        }
        // Trigger the observable
        this._onNavigationItemAdded.next(true);
    };
    /**
     * Update navigation item with the given id
     *
     * @param id
     * @param properties
     */
    FuseNavigationService.prototype.updateNavigationItem = function (id, properties) {
        // Get the navigation item
        var navigationItem = this.getNavigationItem(id);
        // If there is no navigation with the give id, return
        if (!navigationItem) {
            return;
        }
        // Merge the navigation properties
        _.merge(navigationItem, properties);
        // Trigger the observable
        this._onNavigationItemUpdated.next(true);
    };
    /**
     * Remove navigation item with the given id
     *
     * @param id
     */
    FuseNavigationService.prototype.removeNavigationItem = function (id) {
        var item = this.getNavigationItem(id);
        // Return, if there is not such an item
        if (!item) {
            return;
        }
        // Get the parent of the item
        var parent = this.getNavigationItemParent(id);
        // This check is required because of the first level
        // of the navigation, since the first level is not
        // inside the 'children' array
        parent = parent.children || parent;
        // Remove the item
        parent.splice(parent.indexOf(item), 1);
        // Trigger the observable
        this._onNavigationItemRemoved.next(true);
    };
    FuseNavigationService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseNavigationService.ctorParameters = function () { return []; };
    FuseNavigationService.ngInjectableDef = i0.defineInjectable({ factory: function FuseNavigationService_Factory() { return new FuseNavigationService(); }, token: FuseNavigationService, providedIn: "root" });
    return FuseNavigationService;
}());
export { FuseNavigationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsZUFBZSxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM1RCxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQzs7QUFJNUI7SUFtQkk7O09BRUc7SUFDSDtRQUxRLGNBQVMsR0FBMkIsRUFBRSxDQUFDO1FBTzNDLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7UUFFM0MsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQVdELHNCQUFJLHNEQUFtQjtRQVR2Qix3R0FBd0c7UUFDeEcsY0FBYztRQUNkLHdH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cUQ7UUFDckQsSUFBSyxDQUFDLGNBQWMsRUFDcEI7WUFDSSxPQUFPO1NBQ1Y7UUFFRCxrQ0FBa0M7UUFDbEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFFcEMseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxvREFBb0IsR0FBcEIsVUFBcUIsRUFBRTtRQUVuQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEMsdUNBQXVDO1FBQ3ZDLElBQUssQ0FBQyxJQUFJLEVBQ1Y7WUFDSSxPQUFPO1NBQ1Y7UUFFRCw2QkFBNkI7UUFDN0IsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLG9EQUFvRDtRQUNwRCxrREFBa0Q7UUFDbEQsOEJBQThCO1FBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQztRQUVuQyxrQkFBa0I7UUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXZDLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7O2dCQWphSixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7OztnQ0FSRDtDQXdhQyxBQWxhRCxJQWthQztTQS9aWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgRnVzZU5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi4vLi4vdHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VOYXZpZ2F0aW9uU2VydmljZVxue1xuICAgIG9uSXRlbUNvbGxhcHNlZDogU3ViamVjdDxhbnk+O1xuICAgIG9uSXRlbUNvbGxhcHNlVG9nZ2xlZDogU3ViamVjdDxhbnk+O1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX29uTmF2aWdhdGlvbkNoYW5nZWQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICAgIHByaXZhdGUgX29uTmF2aWdhdGlvblJlZ2lzdGVyZWQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+O1xuICAgIHByaXZhdGUgX29uTmF2aWdhdGlvblVucmVnaXN0ZXJlZDogQmVoYXZpb3JTdWJqZWN0PGFueT47XG4gICAgcHJpdmF0ZSBfb25OYXZpZ2F0aW9uSXRlbUFkZGVkOiBCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgICBwcml2YXRlIF9vbk5hdmlnYXRpb25JdGVtVXBkYXRlZDogQmVoYXZpb3JTdWJqZWN0PGFueT47XG4gICAgcHJpdmF0ZSBfb25OYXZpZ2F0aW9uSXRlbVJlbW92ZWQ6IEJlaGF2aW9yU3ViamVjdDxhbnk+O1xuXG4gICAgcHJpdmF0ZSBfY3VycmVudE5hdmlnYXRpb25LZXk6IHN0cmluZztcbiAgICBwcml2YXRlIF9yZWdpc3RyeTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMub25JdGVtQ29sbGFwc2VkID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgdGhpcy5vbkl0ZW1Db2xsYXBzZVRvZ2dsZWQgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl9jdXJyZW50TmF2aWdhdGlvbktleSA9IG51bGw7XG4gICAgICAgIHRoaXMuX29uTmF2aWdhdGlvbkNoYW5nZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgICB0aGlzLl9vbk5hdmlnYXRpb25SZWdpc3RlcmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICAgICAgdGhpcy5fb25OYXZpZ2F0aW9uVW5yZWdpc3RlcmVkID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICAgICAgdGhpcy5fb25OYXZpZ2F0aW9uSXRlbUFkZGVkID0gbmV3IEJlaGF2aW9yU3ViamVjdChudWxsKTtcbiAgICAgICAgdGhpcy5fb25OYXZpZ2F0aW9uSXRlbVVwZGF0ZWQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KG51bGwpO1xuICAgICAgICB0aGlzLl9vbk5hdmlnYXRpb25JdGVtUmVtb3ZlZCA9IG5ldyBCZWhhdmlvclN1YmplY3QobnVsbCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIEFjY2Vzc29yc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBHZXQgb25OYXZpZ2F0aW9uQ2hhbmdlZFxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXQgb25OYXZpZ2F0aW9uQ2hhbmdlZCgpOiBPYnNlcnZhYmxlPGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbk5hdmlnYXRpb25DaGFuZ2VkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBvbk5hdmlnYXRpb25SZWdpc3RlcmVkXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGdldCBvbk5hdmlnYXRpb25SZWdpc3RlcmVkKCk6IE9ic2VydmFibGU8YW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uTmF2aWdhdGlvblJlZ2lzdGVyZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG9uTmF2aWdhdGlvblVucmVnaXN0ZXJlZFxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXQgb25OYXZpZ2F0aW9uVW5yZWdpc3RlcmVkKCk6IE9ic2VydmFibGU8YW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29uTmF2aWdhdGlvblVucmVnaXN0ZXJlZC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgb25OYXZpZ2F0aW9uSXRlbUFkZGVkXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGdldCBvbk5hdmlnYXRpb25JdGVtQWRkZWQoKTogT2JzZXJ2YWJsZTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fb25OYXZpZ2F0aW9uSXRlbUFkZGVkLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCBvbk5hdmlnYXRpb25JdGVtVXBkYXRlZFxuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXQgb25OYXZpZ2F0aW9uSXRlbVVwZGF0ZWQoKTogT2JzZXJ2YWJsZTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fb25OYXZpZ2F0aW9uSXRlbVVwZGF0ZWQuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG9uTmF2aWdhdGlvbkl0ZW1SZW1vdmVkXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTxhbnk+fVxuICAgICAqL1xuICAgIGdldCBvbk5hdmlnYXRpb25JdGVtUmVtb3ZlZCgpOiBPYnNlcnZhYmxlPGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vbk5hdmlnYXRpb25JdGVtUmVtb3ZlZC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgUHVibGljIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgdGhlIGdpdmVuIG5hdmlnYXRpb25cbiAgICAgKiB3aXRoIHRoZSBnaXZlbiBrZXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gbmF2aWdhdGlvblxuICAgICAqL1xuICAgIHJlZ2lzdGVyKGtleSwgbmF2aWdhdGlvbik6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBrZXkgYWxyZWFkeSBiZWluZyB1c2VkXG4gICAgICAgIGlmICggdGhpcy5fcmVnaXN0cnlba2V5XSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYFRoZSBuYXZpZ2F0aW9uIHdpdGggdGhlIGtleSAnJHtrZXl9JyBhbHJlYWR5IGV4aXN0cy4gRWl0aGVyIHVucmVnaXN0ZXIgaXQgZmlyc3Qgb3IgdXNlIGEgdW5pcXVlIGtleS5gKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRvIHRoZSByZWdpc3RyeVxuICAgICAgICB0aGlzLl9yZWdpc3RyeVtrZXldID0gbmF2aWdhdGlvbjtcblxuICAgICAgICAvLyBOb3RpZnkgdGhlIHN1YmplY3RcbiAgICAgICAgdGhpcy5fb25OYXZpZ2F0aW9uUmVnaXN0ZXJlZC5uZXh0KFtrZXksIG5hdmlnYXRpb25dKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVyIHRoZSBuYXZpZ2F0aW9uIGZyb20gdGhlIHJlZ2lzdHJ5XG4gICAgICogQHBhcmFtIGtleVxuICAgICAqL1xuICAgIHVucmVnaXN0ZXIoa2V5KTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIG5hdmlnYXRpb24gZXhpc3RzXG4gICAgICAgIGlmICggIXRoaXMuX3JlZ2lzdHJ5W2tleV0gKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYFRoZSBuYXZpZ2F0aW9uIHdpdGggdGhlIGtleSAnJHtrZXl9JyBkb2Vzbid0IGV4aXN0IGluIHRoZSByZWdpc3RyeS5gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVucmVnaXN0ZXIgdGhlIHNpZGViYXJcbiAgICAgICAgZGVsZXRlIHRoaXMuX3JlZ2lzdHJ5W2tleV07XG5cbiAgICAgICAgLy8gTm90aWZ5IHRoZSBzdWJqZWN0XG4gICAgICAgIHRoaXMuX29uTmF2aWdhdGlvblVucmVnaXN0ZXJlZC5uZXh0KGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG5hdmlnYXRpb24gZnJvbSByZWdpc3RyeSBieSBrZXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldE5hdmlnYXRpb24oa2V5KTogYW55XG4gICAge1xuICAgICAgICAvLyBDaGVjayBpZiB0aGUgbmF2aWdhdGlvbiBleGlzdHNcbiAgICAgICAgaWYgKCAhdGhpcy5fcmVnaXN0cnlba2V5XSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIG5hdmlnYXRpb24gd2l0aCB0aGUga2V5ICcke2tleX0nIGRvZXNuJ3QgZXhpc3QgaW4gdGhlIHJlZ2lzdHJ5LmApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZXR1cm4gdGhlIHNpZGViYXJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlZ2lzdHJ5W2tleV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGZsYXR0ZW5lZCBuYXZpZ2F0aW9uIGFycmF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmF2aWdhdGlvblxuICAgICAqIEBwYXJhbSBmbGF0TmF2aWdhdGlvblxuICAgICAqIEByZXR1cm5zIHthbnlbXX1cbiAgICAgKi9cbiAgICBnZXRGbGF0TmF2aWdhdGlvbihuYXZpZ2F0aW9uLCBmbGF0TmF2aWdhdGlvbjogRnVzZU5hdmlnYXRpb25JdGVtW10gPSBbXSk6IGFueVxuICAgIHtcbiAgICAgICAgZm9yICggY29uc3QgaXRlbSBvZiBuYXZpZ2F0aW9uIClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCBpdGVtLnR5cGUgPT09ICdpdGVtJyApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmxhdE5hdmlnYXRpb24ucHVzaChpdGVtKTtcblxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGl0ZW0udHlwZSA9PT0gJ2NvbGxhcHNhYmxlJyB8fCBpdGVtLnR5cGUgPT09ICdncm91cCcgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICggaXRlbS5jaGlsZHJlbiApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEZsYXROYXZpZ2F0aW9uKGl0ZW0uY2hpbGRyZW4sIGZsYXROYXZpZ2F0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmxhdE5hdmlnYXRpb247XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IG5hdmlnYXRpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZ2V0Q3VycmVudE5hdmlnYXRpb24oKTogYW55XG4gICAge1xuICAgICAgICBpZiAoICF0aGlzLl9jdXJyZW50TmF2aWdhdGlvbktleSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgVGhlIGN1cnJlbnQgbmF2aWdhdGlvbiBpcyBub3Qgc2V0LmApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXROYXZpZ2F0aW9uKHRoaXMuX2N1cnJlbnROYXZpZ2F0aW9uS2V5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIG5hdmlnYXRpb24gd2l0aCB0aGUga2V5XG4gICAgICogYXMgdGhlIGN1cnJlbnQgbmF2aWdhdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqL1xuICAgIHNldEN1cnJlbnROYXZpZ2F0aW9uKGtleSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzaWRlYmFyIGV4aXN0c1xuICAgICAgICBpZiAoICF0aGlzLl9yZWdpc3RyeVtrZXldIClcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBUaGUgbmF2aWdhdGlvbiB3aXRoIHRoZSBrZXkgJyR7a2V5fScgZG9lc24ndCBleGlzdCBpbiB0aGUgcmVnaXN0cnkuYCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB0aGUgY3VycmVudCBuYXZpZ2F0aW9uIGtleVxuICAgICAgICB0aGlzLl9jdXJyZW50TmF2aWdhdGlvbktleSA9IGtleTtcblxuICAgICAgICAvLyBOb3RpZnkgdGhlIHN1YmplY3RcbiAgICAgICAgdGhpcy5fb25OYXZpZ2F0aW9uQ2hhbmdlZC5uZXh0KGtleSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IG5hdmlnYXRpb24gaXRlbSBieSBpZCBmcm9tIHRoZVxuICAgICAqIGN1cnJlbnQgbmF2aWdhdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGlkXG4gICAgICogQHBhcmFtIHthbnl9IG5hdmlnYXRpb25cbiAgICAgKiBAcmV0dXJucyB7YW55IHwgYm9vbGVhbn1cbiAgICAgKi9cbiAgICBnZXROYXZpZ2F0aW9uSXRlbShpZCwgbmF2aWdhdGlvbiA9IG51bGwpOiBhbnkgfCBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoICFuYXZpZ2F0aW9uIClcbiAgICAgICAge1xuICAgICAgICAgICAgbmF2aWdhdGlvbiA9IHRoaXMuZ2V0Q3VycmVudE5hdmlnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGNvbnN0IGl0ZW0gb2YgbmF2aWdhdGlvbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggaXRlbS5pZCA9PT0gaWQgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIGl0ZW0uY2hpbGRyZW4gKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkSXRlbSA9IHRoaXMuZ2V0TmF2aWdhdGlvbkl0ZW0oaWQsIGl0ZW0uY2hpbGRyZW4pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZEl0ZW0gKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkSXRlbTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBwYXJlbnQgb2YgdGhlIG5hdmlnYXRpb24gaXRlbVxuICAgICAqIHdpdGggdGhlIGlkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWRcbiAgICAgKiBAcGFyYW0ge2FueX0gbmF2aWdhdGlvblxuICAgICAqIEBwYXJhbSBwYXJlbnRcbiAgICAgKi9cbiAgICBnZXROYXZpZ2F0aW9uSXRlbVBhcmVudChpZCwgbmF2aWdhdGlvbiA9IG51bGwsIHBhcmVudCA9IG51bGwpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmICggIW5hdmlnYXRpb24gKVxuICAgICAgICB7XG4gICAgICAgICAgICBuYXZpZ2F0aW9uID0gdGhpcy5nZXRDdXJyZW50TmF2aWdhdGlvbigpO1xuICAgICAgICAgICAgcGFyZW50ID0gbmF2aWdhdGlvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGNvbnN0IGl0ZW0gb2YgbmF2aWdhdGlvbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggaXRlbS5pZCA9PT0gaWQgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJlbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggaXRlbS5jaGlsZHJlbiApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRJdGVtID0gdGhpcy5nZXROYXZpZ2F0aW9uSXRlbVBhcmVudChpZCwgaXRlbS5jaGlsZHJlbiwgaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkSXRlbSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRJdGVtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgYSBuYXZpZ2F0aW9uIGl0ZW0gdG8gdGhlIHNwZWNpZmllZCBsb2NhdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIGl0ZW1cbiAgICAgKiBAcGFyYW0gaWRcbiAgICAgKi9cbiAgICBhZGROYXZpZ2F0aW9uSXRlbShpdGVtLCBpZCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIEdldCB0aGUgY3VycmVudCBuYXZpZ2F0aW9uXG4gICAgICAgIGNvbnN0IG5hdmlnYXRpb246IGFueVtdID0gdGhpcy5nZXRDdXJyZW50TmF2aWdhdGlvbigpO1xuXG4gICAgICAgIC8vIEFkZCB0byB0aGUgZW5kIG9mIHRoZSBuYXZpZ2F0aW9uXG4gICAgICAgIGlmICggaWQgPT09ICdlbmQnIClcbiAgICAgICAge1xuICAgICAgICAgICAgbmF2aWdhdGlvbi5wdXNoKGl0ZW0pO1xuXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBvYnNlcnZhYmxlXG4gICAgICAgICAgICB0aGlzLl9vbk5hdmlnYXRpb25JdGVtQWRkZWQubmV4dCh0cnVlKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRvIHRoZSBzdGFydCBvZiB0aGUgbmF2aWdhdGlvblxuICAgICAgICBpZiAoIGlkID09PSAnc3RhcnQnIClcbiAgICAgICAge1xuICAgICAgICAgICAgbmF2aWdhdGlvbi51bnNoaWZ0KGl0ZW0pO1xuXG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHRoZSBvYnNlcnZhYmxlXG4gICAgICAgICAgICB0aGlzLl9vbk5hdmlnYXRpb25JdGVtQWRkZWQubmV4dCh0cnVlKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGl0IHRvIGEgc3BlY2lmaWMgbG9jYXRpb25cbiAgICAgICAgY29uc3QgcGFyZW50OiBhbnkgPSB0aGlzLmdldE5hdmlnYXRpb25JdGVtKGlkKTtcblxuICAgICAgICBpZiAoIHBhcmVudCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHBhcmVudCBoYXMgYSBjaGlsZHJlbiBlbnRyeSxcbiAgICAgICAgICAgIC8vIGFuZCBhZGQgaXQgaWYgaXQgZG9lc24ndFxuICAgICAgICAgICAgaWYgKCAhcGFyZW50LmNoaWxkcmVuIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIHRoZSBpdGVtXG4gICAgICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIG9ic2VydmFibGVcbiAgICAgICAgdGhpcy5fb25OYXZpZ2F0aW9uSXRlbUFkZGVkLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIG5hdmlnYXRpb24gaXRlbSB3aXRoIHRoZSBnaXZlbiBpZFxuICAgICAqXG4gICAgICogQHBhcmFtIGlkXG4gICAgICogQHBhcmFtIHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICB1cGRhdGVOYXZpZ2F0aW9uSXRlbShpZCwgcHJvcGVydGllcyk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIEdldCB0aGUgbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgIGNvbnN0IG5hdmlnYXRpb25JdGVtID0gdGhpcy5nZXROYXZpZ2F0aW9uSXRlbShpZCk7XG5cbiAgICAgICAgLy8gSWYgdGhlcmUgaXMgbm8gbmF2aWdhdGlvbiB3aXRoIHRoZSBnaXZlIGlkLCByZXR1cm5cbiAgICAgICAgaWYgKCAhbmF2aWdhdGlvbkl0ZW0gKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNZXJnZSB0aGUgbmF2aWdhdGlvbiBwcm9wZXJ0aWVzXG4gICAgICAgIF8ubWVyZ2UobmF2aWdhdGlvbkl0ZW0sIHByb3BlcnRpZXMpO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgdGhlIG9ic2VydmFibGVcbiAgICAgICAgdGhpcy5fb25OYXZpZ2F0aW9uSXRlbVVwZGF0ZWQubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgbmF2aWdhdGlvbiBpdGVtIHdpdGggdGhlIGdpdmVuIGlkXG4gICAgICpcbiAgICAgKiBAcGFyYW0gaWRcbiAgICAgKi9cbiAgICByZW1vdmVOYXZpZ2F0aW9uSXRlbShpZCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmdldE5hdmlnYXRpb25JdGVtKGlkKTtcblxuICAgICAgICAvLyBSZXR1cm4sIGlmIHRoZXJlIGlzIG5vdCBzdWNoIGFuIGl0ZW1cbiAgICAgICAgaWYgKCAhaXRlbSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCB0aGUgcGFyZW50IG9mIHRoZSBpdGVtXG4gICAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmdldE5hdmlnYXRpb25JdGVtUGFyZW50KGlkKTtcblxuICAgICAgICAvLyBUaGlzIGNoZWNrIGlzIHJlcXVpcmVkIGJlY2F1c2Ugb2YgdGhlIGZpcnN0IGxldmVsXG4gICAgICAgIC8vIG9mIHRoZSBuYXZpZ2F0aW9uLCBzaW5jZSB0aGUgZmlyc3QgbGV2ZWwgaXMgbm90XG4gICAgICAgIC8vIGluc2lkZSB0aGUgJ2NoaWxkcmVuJyBhcnJheVxuICAgICAgICBwYXJlbnQgPSBwYXJlbnQuY2hpbGRyZW4gfHwgcGFyZW50O1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgaXRlbVxuICAgICAgICBwYXJlbnQuc3BsaWNlKHBhcmVudC5pbmRleE9mKGl0ZW0pLCAxKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIHRoZSBvYnNlcnZhYmxlXG4gICAgICAgIHRoaXMuX29uTmF2aWdhdGlvbkl0ZW1SZW1vdmVkLm5leHQodHJ1ZSk7XG4gICAgfVxufVxuIl19