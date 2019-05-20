import { Injectable } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
var FuseProgressBarService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {Router} _router
     */
    function FuseProgressBarService(_router) {
        this._router = _router;
        // Initialize the service
        this._init();
    }
    Object.defineProperty(FuseProgressBarService.prototype, "bufferValue", {
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Buffer value
         */
        get: function () {
            return this._bufferValue.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FuseProgressBarService.prototype.setBufferValue = function (value) {
        this._bufferValue.next(value);
    };
    Object.defineProperty(FuseProgressBarService.prototype, "mode", {
        /**
         * Mode
         */
        get: function () {
            return this._mode.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FuseProgressBarService.prototype.setMode = function (value) {
        this._mode.next(value);
    };
    Object.defineProperty(FuseProgressBarService.prototype, "value", {
        /**
         * Value
         */
        get: function () {
            return this._value.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FuseProgressBarService.prototype.setValue = function (value) {
        this._value.next(value);
    };
    Object.defineProperty(FuseProgressBarService.prototype, "visible", {
        /**
         * Visible
         */
        get: function () {
            return this._visible.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    FuseProgressBarService.prototype._init = function () {
        var _this = this;
        // Initialize the behavior subjects
        this._bufferValue = new BehaviorSubject(0);
        this._mode = new BehaviorSubject('indeterminate');
        this._value = new BehaviorSubject(0);
        this._visible = new BehaviorSubject(false);
        // Subscribe to the router events to show/hide the loading bar
        this._router.events
            .pipe(filter(function (event) { return event instanceof NavigationStart; }))
            .subscribe(function () {
            _this.show();
        });
        this._router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd || event instanceof NavigationError || event instanceof NavigationCancel; }))
            .subscribe(function () {
            _this.hide();
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Show the progress bar
     */
    FuseProgressBarService.prototype.show = function () {
        this._visible.next(true);
    };
    /**
     * Hide the progress bar
     */
    FuseProgressBarService.prototype.hide = function () {
        this._visible.next(false);
    };
    FuseProgressBarService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseProgressBarService.ctorParameters = function () { return [
        { type: Router }
    ]; };
    FuseProgressBarService.ngInjectableDef = i0.defineInjectable({ factory: function FuseProgressBarService_Factory() { return new FuseProgressBarService(i0.inject(i1.Router)); }, token: FuseProgressBarService, providedIn: "root" });
    return FuseProgressBarService;
}());
export { FuseProgressBarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3MtYmFyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3Byb2dyZXNzLWJhci9wcm9ncmVzcy1iYXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RyxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBRXhDO0lBV0k7Ozs7T0FJRztJQUNILGdDQUNZLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBR3ZCLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQVNELHNCQUFJLCtDQUFXO1FBUGYsd0dBQXdHO1FBQ3hHLGNBQWM7UUFDZCx3R0FBd0c7UUFFeEc7O1dBRUc7YUFDSDtZQUVJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM1QyxDQUFDOzs7T0FBQTtJQUVELCtDQUFjLEdBQWQsVUFBZSxLQUFhO1FBRXhCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFLRCxzQkFBSSx3Q0FBSTtRQUhSOztXQUVHO2FBQ0g7WUFFSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDckMsQ0FBQzs7O09BQUE7SUFFRCx3Q0FBTyxHQUFQLFVBQVEsS0FBMkQ7UUFFL0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUtELHNCQUFJLHlDQUFLO1FBSFQ7O1dBRUc7YUFDSDtZQUVJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVELHlDQUFRLEdBQVIsVUFBUyxLQUFhO1FBRWxCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFLRCxzQkFBSSwyQ0FBTztRQUhYOztXQUVHO2FBQ0g7WUFFSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsQ0FBQzs7O09BQUE7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7OztPQUlHO0lBQ0ssc0NBQUssR0FBYjtRQUFBLGlCQW9CQztRQWxCRyxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyw4REFBOEQ7UUFDOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQUssSUFBSyxPQUFBLEtBQUssWUFBWSxlQUFlLEVBQWhDLENBQWdDLENBQUMsQ0FBQzthQUN6RCxTQUFTLENBQUM7WUFDUCxLQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFUCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07YUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUMsS0FBSyxJQUFLLE9BQUEsS0FBSyxZQUFZLGFBQWEsSUFBSSxLQUFLLFlBQVksZUFBZSxJQUFJLEtBQUssWUFBWSxnQkFBZ0IsRUFBdkcsQ0FBdUcsQ0FBQyxDQUFDO2FBQ2hJLFNBQVMsQ0FBQztZQUNQLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsbUJBQW1CO0lBQ25CLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILHFDQUFJLEdBQUo7UUFFSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBSSxHQUFKO1FBRUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Z0JBNUhKLFVBQVUsU0FBQztvQkFDUixVQUFVLEVBQUUsTUFBTTtpQkFDckI7Ozs7Z0JBTjJFLE1BQU07OztpQ0FEbEY7Q0FrSUMsQUE3SEQsSUE2SEM7U0ExSFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNhbmNlbCwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yLCBOYXZpZ2F0aW9uU3RhcnQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGdXNlUHJvZ3Jlc3NCYXJTZXJ2aWNlXG57XG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX2J1ZmZlclZhbHVlOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPjtcbiAgICBwcml2YXRlIF9tb2RlOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nPjtcbiAgICBwcml2YXRlIF92YWx1ZTogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj47XG4gICAgcHJpdmF0ZSBfdmlzaWJsZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Um91dGVyfSBfcm91dGVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgc2VydmljZVxuICAgICAgICB0aGlzLl9pbml0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIEFjY2Vzc29yc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBCdWZmZXIgdmFsdWVcbiAgICAgKi9cbiAgICBnZXQgYnVmZmVyVmFsdWUoKTogT2JzZXJ2YWJsZTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnVmZmVyVmFsdWUuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgc2V0QnVmZmVyVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX2J1ZmZlclZhbHVlLm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vZGVcbiAgICAgKi9cbiAgICBnZXQgbW9kZSgpOiBPYnNlcnZhYmxlPGFueT5cbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHNldE1vZGUodmFsdWU6ICdkZXRlcm1pbmF0ZScgfCAnaW5kZXRlcm1pbmF0ZScgfCAnYnVmZmVyJyB8ICdxdWVyeScpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLl9tb2RlLm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFZhbHVlXG4gICAgICovXG4gICAgZ2V0IHZhbHVlKCk6IE9ic2VydmFibGU8YW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIH1cblxuICAgIHNldFZhbHVlKHZhbHVlOiBudW1iZXIpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLl92YWx1ZS5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBWaXNpYmxlXG4gICAgICovXG4gICAgZ2V0IHZpc2libGUoKTogT2JzZXJ2YWJsZTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlzaWJsZS5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgUHJpdmF0ZSBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSBfaW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBiZWhhdmlvciBzdWJqZWN0c1xuICAgICAgICB0aGlzLl9idWZmZXJWYWx1ZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoMCk7XG4gICAgICAgIHRoaXMuX21vZGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KCdpbmRldGVybWluYXRlJyk7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gbmV3IEJlaGF2aW9yU3ViamVjdCgwKTtcbiAgICAgICAgdGhpcy5fdmlzaWJsZSA9IG5ldyBCZWhhdmlvclN1YmplY3QoZmFsc2UpO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgcm91dGVyIGV2ZW50cyB0byBzaG93L2hpZGUgdGhlIGxvYWRpbmcgYmFyXG4gICAgICAgIHRoaXMuX3JvdXRlci5ldmVudHNcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcigoZXZlbnQpID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvdygpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fcm91dGVyLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUoZmlsdGVyKChldmVudCkgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVycm9yIHx8IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQdWJsaWMgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBwcm9ncmVzcyBiYXJcbiAgICAgKi9cbiAgICBzaG93KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBwcm9ncmVzcyBiYXJcbiAgICAgKi9cbiAgICBoaWRlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX3Zpc2libGUubmV4dChmYWxzZSk7XG4gICAgfVxufVxuXG4iXX0=