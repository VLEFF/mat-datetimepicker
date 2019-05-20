import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/platform";
import * as i2 from "@angular/router";
// Create the injection token for the custom settings
export var FUSE_CONFIG = new InjectionToken('fuseCustomConfig');
var FuseConfigService = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {Platform} _platform
     * @param {Router} _router
     * @param _config
     */
    function FuseConfigService(_platform, _router, _config) {
        this._platform = _platform;
        this._router = _router;
        this._config = _config;
        // Set the default config from the user provided config (from forRoot)
        this._defaultConfig = _config;
        // Initialize the service
        this._init();
    }
    Object.defineProperty(FuseConfigService.prototype, "config", {
        get: function () {
            return this._configSubject.asObservable();
        },
        // -----------------------------------------------------------------------------------------------------
        // @ Accessors
        // -----------------------------------------------------------------------------------------------------
        /**
         * Set and get the config
         */
        set: function (value) {
            // Get the value from the behavior subject
            var config = this._configSubject.getValue();
            // Merge the new config
            config = _.merge({}, config, value);
            // Notify the observers
            this._configSubject.next(config);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FuseConfigService.prototype, "defaultConfig", {
        /**
         * Get default config
         *
         * @returns {any}
         */
        get: function () {
            return this._defaultConfig;
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
    FuseConfigService.prototype._init = function () {
        var _this = this;
        /**
         * Disable custom scrollbars if browser is mobile
         */
        if (this._platform.ANDROID || this._platform.IOS) {
            this._defaultConfig.customScrollbars = false;
        }
        // Set the config from the default config
        this._configSubject = new BehaviorSubject(_.cloneDeep(this._defaultConfig));
        // Reload the default layout config on every RoutesRecognized event
        // if the current layout config is different from the default one
        this._router.events
            .pipe(filter(function (event) { return event instanceof ResolveEnd; }))
            .subscribe(function () {
            if (!_.isEqual(_this._configSubject.getValue().layout, _this._defaultConfig.layout)) {
                // Clone the current config
                var config = _.cloneDeep(_this._configSubject.getValue());
                // Reset the layout from the default config
                config.layout = _.cloneDeep(_this._defaultConfig.layout);
                // Set the config
                _this._configSubject.next(config);
            }
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Set config
     *
     * @param value
     * @param {{emitEvent: boolean}} opts
     */
    FuseConfigService.prototype.setConfig = function (value, opts) {
        if (opts === void 0) { opts = { emitEvent: true }; }
        // Get the value from the behavior subject
        var config = this._configSubject.getValue();
        // Merge the new config
        config = _.merge({}, config, value);
        // If emitEvent option is true...
        if (opts.emitEvent === true) {
            // Notify the observers
            this._configSubject.next(config);
        }
    };
    /**
     * Get config
     *
     * @returns {Observable<any>}
     */
    FuseConfigService.prototype.getConfig = function () {
        return this._configSubject.asObservable();
    };
    /**
     * Reset to the default config
     */
    FuseConfigService.prototype.resetToDefaults = function () {
        // Set the config from the default config
        this._configSubject.next(_.cloneDeep(this._defaultConfig));
    };
    FuseConfigService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FuseConfigService.ctorParameters = function () { return [
        { type: Platform },
        { type: Router },
        { type: undefined, decorators: [{ type: Inject, args: [FUSE_CONFIG,] }] }
    ]; };
    FuseConfigService.ngInjectableDef = i0.defineInjectable({ factory: function FuseConfigService_Factory() { return new FuseConfigService(i0.inject(i1.Platform), i0.inject(i2.Router), i0.inject(FUSE_CONFIG)); }, token: FuseConfigService, providedIn: "root" });
    return FuseConfigService;
}());
export { FuseConfigService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7QUFFNUIscURBQXFEO0FBQ3JELE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRWxFO0lBU0k7Ozs7OztPQU1HO0lBQ0gsMkJBQ1ksU0FBbUIsRUFDbkIsT0FBZSxFQUNNLE9BQU87UUFGNUIsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ00sWUFBTyxHQUFQLE9BQU8sQ0FBQTtRQUdwQyxzRUFBc0U7UUFDdEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUM7UUFFOUIseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBU0Qsc0JBQUkscUNBQU07YUFZVjtZQUVJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUM5QyxDQUFDO1FBdEJELHdHQUF3RztRQUN4RyxjQUFjO1FBQ2Qsd0dBQXdHO1FBRXhHOztXQUVHO2FBQ0gsVUFBVyxLQUFLO1lBRVosMENBQTBDO1lBQzFDLElBQUksTUFBTSxH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O0lBQy9ELENBQUM7O2dCQW5KSixVQUFVLFNBQUM7b0JBQ1IsVUFBVSxFQUFFLE1BQU07aUJBQ3JCOzs7O2dCQVZRLFFBQVE7Z0JBREksTUFBTTtnREE0QmxCLE1BQU0sU0FBQyxXQUFXOzs7NEJBN0IzQjtDQThKQyxBQXBKRCxJQW9KQztTQWpKWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvbHZlRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbi8vIENyZWF0ZSB0aGUgaW5qZWN0aW9uIHRva2VuIGZvciB0aGUgY3VzdG9tIHNldHRpbmdzXG5leHBvcnQgY29uc3QgRlVTRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ2Z1c2VDdXN0b21Db25maWcnKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGdXNlQ29uZmlnU2VydmljZVxue1xuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF9jb25maWdTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0Q29uZmlnOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtQbGF0Zm9ybX0gX3BsYXRmb3JtXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IF9yb3V0ZXJcbiAgICAgKiBAcGFyYW0gX2NvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICBASW5qZWN0KEZVU0VfQ09ORklHKSBwcml2YXRlIF9jb25maWdcbiAgICApXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgY29uZmlnIGZyb20gdGhlIHVzZXIgcHJvdmlkZWQgY29uZmlnIChmcm9tIGZvclJvb3QpXG4gICAgICAgIHRoaXMuX2RlZmF1bHRDb25maWcgPSBfY29uZmlnO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBBY2Nlc3NvcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuZCBnZXQgdGhlIGNvbmZpZ1xuICAgICAqL1xuICAgIHNldCBjb25maWcodmFsdWUpXG4gICAge1xuICAgICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGJlaGF2aW9yIHN1YmplY3RcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuX2NvbmZpZ1N1YmplY3QuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBNZXJnZSB0aGUgbmV3IGNvbmZpZ1xuICAgICAgICBjb25maWcgPSBfLm1lcmdlKHt9LCBjb25maWcsIHZhbHVlKTtcblxuICAgICAgICAvLyBOb3RpZnkgdGhlIG9ic2VydmVyc1xuICAgICAgICB0aGlzLl9jb25maWdTdWJqZWN0Lm5leHQoY29uZmlnKTtcbiAgICB9XG5cbiAgICBnZXQgY29uZmlnKCk6IGFueSB8IE9ic2VydmFibGU8YW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZ1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRlZmF1bHQgY29uZmlnXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldCBkZWZhdWx0Q29uZmlnKCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb25maWc7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgY3VzdG9tIHNjcm9sbGJhcnMgaWYgYnJvd3NlciBpcyBtb2JpbGVcbiAgICAgICAgICovXG4gICAgICAgIGlmICggdGhpcy5fcGxhdGZvcm0uQU5EUk9JRCB8fCB0aGlzLl9wbGF0Zm9ybS5JT1MgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0Q29uZmlnLmN1c3RvbVNjcm9sbGJhcnMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB0aGUgY29uZmlnIGZyb20gdGhlIGRlZmF1bHQgY29uZmlnXG4gICAgICAgIHRoaXMuX2NvbmZpZ1N1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KF8uY2xvbmVEZWVwKHRoaXMuX2RlZmF1bHRDb25maWcpKTtcblxuICAgICAgICAvLyBSZWxvYWQgdGhlIGRlZmF1bHQgbGF5b3V0IGNvbmZpZyBvbiBldmVyeSBSb3V0ZXNSZWNvZ25pemVkIGV2ZW50XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IGxheW91dCBjb25maWcgaXMgZGlmZmVyZW50IGZyb20gdGhlIGRlZmF1bHQgb25lXG4gICAgICAgIHRoaXMuX3JvdXRlci5ldmVudHNcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIFJlc29sdmVFbmQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCAhXy5pc0VxdWFsKHRoaXMuX2NvbmZpZ1N1YmplY3QuZ2V0VmFsdWUoKS5sYXlvdXQsIHRoaXMuX2RlZmF1bHRDb25maWcubGF5b3V0KSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBDbG9uZSB0aGUgY3VycmVudCBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0gXy5jbG9uZURlZXAodGhpcy5fY29uZmlnU3ViamVjdC5nZXRWYWx1ZSgpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgbGF5b3V0IGZyb20gdGhlIGRlZmF1bHQgY29uZmlnXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5sYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLl9kZWZhdWx0Q29uZmlnLmxheW91dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnU3ViamVjdC5uZXh0KGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFB1YmxpYyBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFNldCBjb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7e2VtaXRFdmVudDogYm9vbGVhbn19IG9wdHNcbiAgICAgKi9cbiAgICBzZXRDb25maWcodmFsdWUsIG9wdHMgPSB7ZW1pdEV2ZW50OiB0cnVlfSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgYmVoYXZpb3Igc3ViamVjdFxuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5fY29uZmlnU3ViamVjdC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIE1lcmdlIHRoZSBuZXcgY29uZmlnXG4gICAgICAgIGNvbmZpZyA9IF8ubWVyZ2Uoe30sIGNvbmZpZywgdmFsdWUpO1xuXG4gICAgICAgIC8vIElmIGVtaXRFdmVudCBvcHRpb24gaXMgdHJ1ZS4uLlxuICAgICAgICBpZiAoIG9wdHMuZW1pdEV2ZW50ID09PSB0cnVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTm90aWZ5IHRoZSBvYnNlcnZlcnNcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ1N1YmplY3QubmV4dChjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGNvbmZpZ1xuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRDb25maWcoKTogT2JzZXJ2YWJsZTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldCB0byB0aGUgZGVmYXVsdCBjb25maWdcbiAgICAgKi9cbiAgICByZXNldFRvRGVmYXVsdHMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBjb25maWcgZnJvbSB0aGUgZGVmYXVsdCBjb25maWdcbiAgICAgICAgdGhpcy5fY29uZmlnU3ViamVjdC5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuX2RlZmF1bHRDb25maWcpKTtcbiAgICB9XG59XG5cbiJdfQ==