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
export const FUSE_CONFIG = new InjectionToken('fuseCustomConfig');
export class FuseConfigService {
    /**
     * Constructor
     *
     * @param {Platform} _platform
     * @param {Router} _router
     * @param _config
     */
    constructor(_platform, _router, _config) {
        this._platform = _platform;
        this._router = _router;
        this._config = _config;
        // Set the default config from the user provided config (from forRoot)
        this._defaultConfig = _config;
        // Initialize the service
        this._init();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------
    /**
     * Set and get the config
     */
    set config(value) {
        // Get the value from the behavior subject
        let config = this._configSubject.getValue();
        // Merge the new config
        config = _.merge({}, config, value);
        // Notify the observers
        this._configSubject.next(config);
    }
    get config() {
        return this._configSubject.asObservable();
    }
    /**
     * Get default config
     *
     * @returns {any}
     */
    get defaultConfig() {
        return this._defaultConfig;
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
            .pipe(filter(event => event instanceof ResolveEnd))
            .subscribe(() => {
            if (!_.isEqual(this._configSubject.getValue().layout, this._defaultConfig.layout)) {
                // Clone the current config
                const config = _.cloneDeep(this._configSubject.getValue());
                // Reset the layout from the default config
                config.layout = _.cloneDeep(this._defaultConfig.layout);
                // Set the config
                this._configSubject.next(config);
            }
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Set config
     *
     * @param value
     * @param {{emitEvent: boolean}} opts
     */
    setConfig(value, opts = { emitEvent: true }) {
        // Get the value from the behavior subject
        let config = this._configSubject.getValue();
        // Merge the new config
        config = _.merge({}, config, value);
        // If emitEvent option is true...
        if (opts.emitEvent === true) {
            // Notify the observers
            this._configSubject.next(config);
        }
    }
    /**
     * Get config
     *
     * @returns {Observable<any>}
     */
    getConfig() {
        return this._configSubject.asObservable();
    }
    /**
     * Reset to the default config
     */
    resetToDefaults() {
        // Set the config from the default config
        this._configSubject.next(_.cloneDeep(this._defaultConfig));
    }
}
FuseConfigService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FuseConfigService.ctorParameters = () => [
    { type: Platform },
    { type: Router },
    { type: undefined, decorators: [{ type: Inject, args: [FUSE_CONFIG,] }] }
];
FuseConfigService.ngInjectableDef = i0.defineInjectable({ factory: function FuseConfigService_Factory() { return new FuseConfigService(i0.inject(i1.Platform), i0.inject(i2.Router), i0.inject(FUSE_CONFIG)); }, token: FuseConfigService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7Ozs7QUFFNUIscURBQXFEO0FBQ3JELE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxJQUFJLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBS2xFLE1BQU0sT0FBTyxpQkFBaUI7SUFNMUI7Ozs7OztPQU1HO0lBQ0gsWUFDWSxTQUFtQixFQUNuQixPQUFlLEVBQ00sT0FBTztRQUY1QixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDTSxZQUFPLEdBQVAsT0FBTyxDQUFBO1FBR3BDLHNFQUFzRTtRQUN0RSxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztRQUU5Qix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsY0FBYztJQUNkLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILElBQUksTUFBTSxDQUFDLEtBQUs7UUFFWiwwQ0FBMEM7UUFDMUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUU1Qyx1QkFBdUI7UUFDdkIsTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVwQyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQUksTUFBTTtRQUVOLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILElBQUksYUFBYTtRQUViLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7Ozs7T0FJRztJQUNLLEtBQUs7UUFFVDs7V0FFRztRQUNILElBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQ2pEO1lBQ0ksSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7U0FDaEQ7UUFFRCx5Q0FBeUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBRTVFLG1FQUFtRTtRQUNuRSxpRUFBaUU7UUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssWUFBWSxVQUFVLENBQUMsQ0FBQzthQUNsRCxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFDbEY7Z0JBQ0ksMkJBQTJCO2dCQUMzQixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFFM0QsMkNBQTJDO2dCQUMzQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFeEQsaUJBQWlCO2dCQUNqQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxtQkFBbUI7SUFDbkIsd0dBQXdHO0lBRXhHOzs7OztPQUtHO0lBQ0gsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsRUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFDO1FBRXJDLDBDQUEwQztRQUMxQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTVDLHVCQUF1QjtRQUN2QixNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBDLGlDQUFpQztRQUNqQyxJQUFLLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUM1QjtZQUNJLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNwQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsU0FBUztRQUVMLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxlQUFlO1FBRVgseUNBQXlDO1FBQ3pDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7O1lBbkpKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7OztZQVZRLFFBQVE7WUFESSxNQUFNOzRDQTRCbEIsTUFBTSxTQUFDLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvbHZlRW5kLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUGxhdGZvcm0gfSBmcm9tICdAYW5ndWxhci9jZGsvcGxhdGZvcm0nO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbi8vIENyZWF0ZSB0aGUgaW5qZWN0aW9uIHRva2VuIGZvciB0aGUgY3VzdG9tIHNldHRpbmdzXG5leHBvcnQgY29uc3QgRlVTRV9DT05GSUcgPSBuZXcgSW5qZWN0aW9uVG9rZW4oJ2Z1c2VDdXN0b21Db25maWcnKTtcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGdXNlQ29uZmlnU2VydmljZVxue1xuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF9jb25maWdTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8YW55PjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IF9kZWZhdWx0Q29uZmlnOiBhbnk7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtQbGF0Zm9ybX0gX3BsYXRmb3JtXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IF9yb3V0ZXJcbiAgICAgKiBAcGFyYW0gX2NvbmZpZ1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0sXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyLFxuICAgICAgICBASW5qZWN0KEZVU0VfQ09ORklHKSBwcml2YXRlIF9jb25maWdcbiAgICApXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIGRlZmF1bHQgY29uZmlnIGZyb20gdGhlIHVzZXIgcHJvdmlkZWQgY29uZmlnIChmcm9tIGZvclJvb3QpXG4gICAgICAgIHRoaXMuX2RlZmF1bHRDb25maWcgPSBfY29uZmlnO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBBY2Nlc3NvcnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogU2V0IGFuZCBnZXQgdGhlIGNvbmZpZ1xuICAgICAqL1xuICAgIHNldCBjb25maWcodmFsdWUpXG4gICAge1xuICAgICAgICAvLyBHZXQgdGhlIHZhbHVlIGZyb20gdGhlIGJlaGF2aW9yIHN1YmplY3RcbiAgICAgICAgbGV0IGNvbmZpZyA9IHRoaXMuX2NvbmZpZ1N1YmplY3QuZ2V0VmFsdWUoKTtcblxuICAgICAgICAvLyBNZXJnZSB0aGUgbmV3IGNvbmZpZ1xuICAgICAgICBjb25maWcgPSBfLm1lcmdlKHt9LCBjb25maWcsIHZhbHVlKTtcblxuICAgICAgICAvLyBOb3RpZnkgdGhlIG9ic2VydmVyc1xuICAgICAgICB0aGlzLl9jb25maWdTdWJqZWN0Lm5leHQoY29uZmlnKTtcbiAgICB9XG5cbiAgICBnZXQgY29uZmlnKCk6IGFueSB8IE9ic2VydmFibGU8YW55PlxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZ1N1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGRlZmF1bHQgY29uZmlnXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldCBkZWZhdWx0Q29uZmlnKCk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRDb25maWc7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFByaXZhdGUgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX2luaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIERpc2FibGUgY3VzdG9tIHNjcm9sbGJhcnMgaWYgYnJvd3NlciBpcyBtb2JpbGVcbiAgICAgICAgICovXG4gICAgICAgIGlmICggdGhpcy5fcGxhdGZvcm0uQU5EUk9JRCB8fCB0aGlzLl9wbGF0Zm9ybS5JT1MgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0Q29uZmlnLmN1c3RvbVNjcm9sbGJhcnMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCB0aGUgY29uZmlnIGZyb20gdGhlIGRlZmF1bHQgY29uZmlnXG4gICAgICAgIHRoaXMuX2NvbmZpZ1N1YmplY3QgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KF8uY2xvbmVEZWVwKHRoaXMuX2RlZmF1bHRDb25maWcpKTtcblxuICAgICAgICAvLyBSZWxvYWQgdGhlIGRlZmF1bHQgbGF5b3V0IGNvbmZpZyBvbiBldmVyeSBSb3V0ZXNSZWNvZ25pemVkIGV2ZW50XG4gICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IGxheW91dCBjb25maWcgaXMgZGlmZmVyZW50IGZyb20gdGhlIGRlZmF1bHQgb25lXG4gICAgICAgIHRoaXMuX3JvdXRlci5ldmVudHNcbiAgICAgICAgICAgIC5waXBlKGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIFJlc29sdmVFbmQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCAhXy5pc0VxdWFsKHRoaXMuX2NvbmZpZ1N1YmplY3QuZ2V0VmFsdWUoKS5sYXlvdXQsIHRoaXMuX2RlZmF1bHRDb25maWcubGF5b3V0KSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBDbG9uZSB0aGUgY3VycmVudCBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0gXy5jbG9uZURlZXAodGhpcy5fY29uZmlnU3ViamVjdC5nZXRWYWx1ZSgpKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgbGF5b3V0IGZyb20gdGhlIGRlZmF1bHQgY29uZmlnXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5sYXlvdXQgPSBfLmNsb25lRGVlcCh0aGlzLl9kZWZhdWx0Q29uZmlnLmxheW91dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHRoZSBjb25maWdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnU3ViamVjdC5uZXh0KGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFB1YmxpYyBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFNldCBjb25maWdcbiAgICAgKlxuICAgICAqIEBwYXJhbSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7e2VtaXRFdmVudDogYm9vbGVhbn19IG9wdHNcbiAgICAgKi9cbiAgICBzZXRDb25maWcodmFsdWUsIG9wdHMgPSB7ZW1pdEV2ZW50OiB0cnVlfSk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIEdldCB0aGUgdmFsdWUgZnJvbSB0aGUgYmVoYXZpb3Igc3ViamVjdFxuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5fY29uZmlnU3ViamVjdC5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIC8vIE1lcmdlIHRoZSBuZXcgY29uZmlnXG4gICAgICAgIGNvbmZpZyA9IF8ubWVyZ2Uoe30sIGNvbmZpZywgdmFsdWUpO1xuXG4gICAgICAgIC8vIElmIGVtaXRFdmVudCBvcHRpb24gaXMgdHJ1ZS4uLlxuICAgICAgICBpZiAoIG9wdHMuZW1pdEV2ZW50ID09PSB0cnVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gTm90aWZ5IHRoZSBvYnNlcnZlcnNcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZ1N1YmplY3QubmV4dChjb25maWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGNvbmZpZ1xuICAgICAqXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8YW55Pn1cbiAgICAgKi9cbiAgICBnZXRDb25maWcoKTogT2JzZXJ2YWJsZTxhbnk+XG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnU3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldCB0byB0aGUgZGVmYXVsdCBjb25maWdcbiAgICAgKi9cbiAgICByZXNldFRvRGVmYXVsdHMoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBjb25maWcgZnJvbSB0aGUgZGVmYXVsdCBjb25maWdcbiAgICAgICAgdGhpcy5fY29uZmlnU3ViamVjdC5uZXh0KF8uY2xvbmVEZWVwKHRoaXMuX2RlZmF1bHRDb25maWcpKTtcbiAgICB9XG59XG5cbiJdfQ==