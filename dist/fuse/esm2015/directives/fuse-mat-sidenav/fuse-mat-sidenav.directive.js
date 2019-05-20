import { Directive, Input, HostListener, HostBinding } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMatchMediaService } from '../../services/match-media.service';
import { FuseMatSidenavHelperService } from '../fuse-mat-sidenav/fuse-mat-sidenav.service';
export class FuseMatSidenavHelperDirective {
    /**
     * Constructor
     *
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     * @param {MatSidenav} _matSidenav
     * @param {MediaObserver} _mediaObserver
     */
    constructor(_fuseMatchMediaService, _fuseMatSidenavHelperService, _matSidenav, _mediaObserver) {
        this._fuseMatchMediaService = _fuseMatchMediaService;
        this._fuseMatSidenavHelperService = _fuseMatSidenavHelperService;
        this._matSidenav = _matSidenav;
        this._mediaObserver = _mediaObserver;
        // Set the defaults
        this.isLockedOpen = true;
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
        // Register the sidenav to the service
        this._fuseMatSidenavHelperService.setSidenav(this.fuseMatSidenavHelper, this._matSidenav);
        if (this._mediaObserver.isActive(this.matIsLockedOpen)) {
            this.isLockedOpen = true;
            this._matSidenav.mode = 'side';
            this._matSidenav.toggle(true);
        }
        else {
            this.isLockedOpen = false;
            this._matSidenav.mode = 'over';
            this._matSidenav.toggle(false);
        }
        this._fuseMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            if (this._mediaObserver.isActive(this.matIsLockedOpen)) {
                this.isLockedOpen = true;
                this._matSidenav.mode = 'side';
                this._matSidenav.toggle(true);
            }
            else {
                this.isLockedOpen = false;
                this._matSidenav.mode = 'over';
                this._matSidenav.toggle(false);
            }
        });
    }
    /**
     * On destroy
     */
    ngOnDestroy() {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
FuseMatSidenavHelperDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fuseMatSidenavHelper]'
            },] }
];
/** @nocollapse */
FuseMatSidenavHelperDirective.ctorParameters = () => [
    { type: FuseMatchMediaService },
    { type: FuseMatSidenavHelperService },
    { type: MatSidenav },
    { type: MediaObserver }
];
FuseMatSidenavHelperDirective.propDecorators = {
    isLockedOpen: [{ type: HostBinding, args: ['class.mat-is-locked-open',] }],
    fuseMatSidenavHelper: [{ type: Input }],
    matIsLockedOpen: [{ type: Input }]
};
export class FuseMatSidenavTogglerDirective {
    /**
     * Constructor
     *
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     */
    constructor(_fuseMatSidenavHelperService) {
        this._fuseMatSidenavHelperService = _fuseMatSidenavHelperService;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * On click
     */
    onClick() {
        this._fuseMatSidenavHelperService.getSidenav(this.fuseMatSidenavToggler).toggle();
    }
}
FuseMatSidenavTogglerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[fuseMatSidenavToggler]'
            },] }
];
/** @nocollapse */
FuseMatSidenavTogglerDirective.ctorParameters = () => [
    { type: FuseMatSidenavHelperService }
];
FuseMatSidenavTogglerDirective.propDecorators = {
    fuseMatSidenavToggler: [{ type: Input }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZS1tYXQtc2lkZW5hdi5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2Z1c2UtbWF0LXNpZGVuYXYvZnVzZS1tYXQtc2lkZW5hdi5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsWUFBWSxFQUFhLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvRixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBSzNGLE1BQU0sT0FBTyw2QkFBNkI7SUFjdEM7Ozs7Ozs7T0FPRztJQUNILFlBQ1ksc0JBQTZDLEVBQzdDLDRCQUF5RCxFQUN6RCxXQUF1QixFQUN2QixjQUE2QjtRQUg3QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLGlDQUE0QixHQUE1Qiw0QkFBNEIsQ0FBNkI7UUFDekQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFHckMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRXpCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxvQkFBb0I7SUFDcEIsd0dBQXdHO0lBRXhHOztPQUVHO0lBQ0gsUUFBUTtRQUVKLHNDQUFzQztRQUN0QyxJQUFJLENBQUMsNEJBQTRCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFMUYsSUFBSyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQ3ZEO1lBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDO2FBRUQ7WUFDSSxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7WUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbEM7UUFFRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYTthQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEVBQ3ZEO2dCQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2pDO2lCQUVEO2dCQUNJLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBRVAscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDOzs7WUExRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx3QkFBd0I7YUFDckM7Ozs7WUFMUSxxQkFBcUI7WUFDckIsMkJBQTJCO1lBTjNCLFVBQVU7WUFDVixhQUFhOzs7MkJBWWpCLFdBQVcsU0FBQywwQkFBMEI7bUNBR3RDLEtBQUs7OEJBR0wsS0FBSzs7QUFxRlYsTUFBTSxPQUFPLDhCQUE4QjtJQUt2Qzs7OztPQUlHO0lBQ0gsWUFDWSw0QkFBeUQ7UUFBekQsaUNBQTRCLEdBQTVCLDRCQUE0QixDQUE2QjtJQUVyRSxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG1CQUFtQjtJQUNuQix3R0FBd0c7SUFFeEc7O09BRUc7SUFFSCxPQUFPO1FBRUgsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUN0RixDQUFDOzs7WUE3QkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx5QkFBeUI7YUFDdEM7Ozs7WUFqR1EsMkJBQTJCOzs7b0NBb0cvQixLQUFLO3NCQW9CTCxZQUFZLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIE9uSW5pdCwgSG9zdExpc3RlbmVyLCBPbkRlc3Ryb3ksIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXRTaWRlbmF2IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRnVzZU1hdGNoTWVkaWFTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbWF0Y2gtbWVkaWEuc2VydmljZSc7XG5pbXBvcnQgeyBGdXNlTWF0U2lkZW5hdkhlbHBlclNlcnZpY2UgfSBmcm9tICcuLi9mdXNlLW1hdC1zaWRlbmF2L2Z1c2UtbWF0LXNpZGVuYXYuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Z1c2VNYXRTaWRlbmF2SGVscGVyXSdcbn0pXG5leHBvcnQgY2xhc3MgRnVzZU1hdFNpZGVuYXZIZWxwZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MubWF0LWlzLWxvY2tlZC1vcGVuJylcbiAgICBpc0xvY2tlZE9wZW46IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIGZ1c2VNYXRTaWRlbmF2SGVscGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKVxuICAgIG1hdElzTG9ja2VkT3Blbjogc3RyaW5nO1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX3Vuc3Vic2NyaWJlQWxsOiBTdWJqZWN0PGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdXNlTWF0Y2hNZWRpYVNlcnZpY2V9IF9mdXNlTWF0Y2hNZWRpYVNlcnZpY2VcbiAgICAgKiBAcGFyYW0ge0Z1c2VNYXRTaWRlbmF2SGVscGVyU2VydmljZX0gX2Z1c2VNYXRTaWRlbmF2SGVscGVyU2VydmljZVxuICAgICAqIEBwYXJhbSB7TWF0U2lkZW5hdn0gX21hdFNpZGVuYXZcbiAgICAgKiBAcGFyYW0ge01lZGlhT2JzZXJ2ZXJ9IF9tZWRpYU9ic2VydmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2Z1c2VNYXRjaE1lZGlhU2VydmljZTogRnVzZU1hdGNoTWVkaWFTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9mdXNlTWF0U2lkZW5hdkhlbHBlclNlcnZpY2U6IEZ1c2VNYXRTaWRlbmF2SGVscGVyU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfbWF0U2lkZW5hdjogTWF0U2lkZW5hdixcbiAgICAgICAgcHJpdmF0ZSBfbWVkaWFPYnNlcnZlcjogTWVkaWFPYnNlcnZlclxuICAgIClcbiAgICB7XG4gICAgICAgIC8vIFNldCB0aGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5pc0xvY2tlZE9wZW4gPSB0cnVlO1xuXG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIExpZmVjeWNsZSBob29rc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0XG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gUmVnaXN0ZXIgdGhlIHNpZGVuYXYgdG8gdGhlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5fZnVzZU1hdFNpZGVuYXZIZWxwZXJTZXJ2aWNlLnNldFNpZGVuYXYodGhpcy5mdXNlTWF0U2lkZW5hdkhlbHBlciwgdGhpcy5fbWF0U2lkZW5hdik7XG5cbiAgICAgICAgaWYgKCB0aGlzLl9tZWRpYU9ic2VydmVyLmlzQWN0aXZlKHRoaXMubWF0SXNMb2NrZWRPcGVuKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2NrZWRPcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX21hdFNpZGVuYXYubW9kZSA9ICdzaWRlJztcbiAgICAgICAgICAgIHRoaXMuX21hdFNpZGVuYXYudG9nZ2xlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5pc0xvY2tlZE9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX21hdFNpZGVuYXYubW9kZSA9ICdvdmVyJztcbiAgICAgICAgICAgIHRoaXMuX21hdFNpZGVuYXYudG9nZ2xlKGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2Z1c2VNYXRjaE1lZGlhU2VydmljZS5vbk1lZGlhQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLl9tZWRpYU9ic2VydmVyLmlzQWN0aXZlKHRoaXMubWF0SXNMb2NrZWRPcGVuKSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmlzTG9ja2VkT3BlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdFNpZGVuYXYubW9kZSA9ICdzaWRlJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0U2lkZW5hdi50b2dnbGUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXNMb2NrZWRPcGVuID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hdFNpZGVuYXYubW9kZSA9ICdvdmVyJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWF0U2lkZW5hdi50b2dnbGUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBVbnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLm5leHQoKTtcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwuY29tcGxldGUoKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Z1c2VNYXRTaWRlbmF2VG9nZ2xlcl0nXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VNYXRTaWRlbmF2VG9nZ2xlckRpcmVjdGl2ZVxue1xuICAgIEBJbnB1dCgpXG4gICAgZnVzZU1hdFNpZGVuYXZUb2dnbGVyOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdXNlTWF0U2lkZW5hdkhlbHBlclNlcnZpY2V9IF9mdXNlTWF0U2lkZW5hdkhlbHBlclNlcnZpY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZnVzZU1hdFNpZGVuYXZIZWxwZXJTZXJ2aWNlOiBGdXNlTWF0U2lkZW5hdkhlbHBlclNlcnZpY2UpXG4gICAge1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQdWJsaWMgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBPbiBjbGlja1xuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcbiAgICBvbkNsaWNrKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuX2Z1c2VNYXRTaWRlbmF2SGVscGVyU2VydmljZS5nZXRTaWRlbmF2KHRoaXMuZnVzZU1hdFNpZGVuYXZUb2dnbGVyKS50b2dnbGUoKTtcbiAgICB9XG59XG4iXX0=