import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseNavigationService } from './navigation.service';
var FuseNavigationComponent = /** @class */ (function () {
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    function FuseNavigationComponent(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this.layout = 'vertical';
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();
        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Load the navigation
            _this.navigation = _this._fuseNavigationService.getCurrentNavigation();
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
        // Subscribe to navigation item
        merge(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
    };
    FuseNavigationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-navigation',
                    template: "<div class=\"nav\" [ngClass]=\"{'horizontal':layout === 'horizontal', 'vertical':layout === 'vertical'}\">\n\n    <!-- Vertical Navigation Layout -->\n    <ng-container *ngIf=\"layout === 'vertical'\">\n\n        <ng-container *ngFor=\"let item of navigation\">\n\n            <fuse-nav-vertical-group *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-vertical-group>\n            <fuse-nav-vertical-collapsable *ngIf=\"item.type=='collapsable'\"\n                                           [item]=\"item\"></fuse-nav-vertical-collapsable>\n            <fuse-nav-vertical-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-vertical-item>\n\n        </ng-container>\n\n    </ng-container>\n    <!-- / Vertical Navigation Layout -->\n\n    <!-- Horizontal Navigation Layout -->\n    <ng-container *ngIf=\"layout === 'horizontal'\">\n\n        <ng-container *ngFor=\"let item of navigation\">\n\n            <fuse-nav-horizontal-collapsable *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-horizontal-collapsable>\n            <fuse-nav-horizontal-collapsable *ngIf=\"item.type=='collapsable'\"\n                                             [item]=\"item\"></fuse-nav-horizontal-collapsable>\n            <fuse-nav-horizontal-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-horizontal-item>\n\n        </ng-container>\n\n    </ng-container>\n    <!-- / Horizontal Navigation Layout -->\n\n</div>\n",
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: ["fuse-navigation{display:flex;flex:1 0 auto}fuse-navigation>.nav{margin:0;padding:0;width:100%}"]
                }] }
    ];
    /** @nocollapse */
    FuseNavigationComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FuseNavigationService }
    ]; };
    FuseNavigationComponent.propDecorators = {
        layout: [{ type: Input }],
        navigation: [{ type: Input }]
    };
    return FuseNavigationComponent;
}());
export { FuseNavigationComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRTdEO0lBa0JJOzs7O09BSUc7SUFDSCxpQ0FDWSxrQkFBcUMsRUFDckMsc0JBQTZDO1FBRDdDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQWZ6RCxXQUFNLEdBQUcsVUFBVSxDQUFDO1FBa0JoQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILDBDQUFRLEdBQVI7UUFBQSxpQkE0QkM7UUExQkcsZ0VBQWdFO1FBQ2hFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUV4Riw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQjthQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUM7WUFFUCxzQkFBc0I7WUFDdEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUVyRSxpQkFBaUI7WUFDakIsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO1FBRVAsK0JBQStCO1FBQy9CLEtBQUssQ0FDRCxJQUFJLENBQUMsc0JBQXNCLENBQUMscUJBQXFCLEVBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx1QkFBdUIsRUFDbkQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHVCQUF1QixDQUN0RCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQztZQUVQLGlCQUFpQjtZQUNqQixLQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDOztnQkFuRUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBUyxpQkFBaUI7b0JBQ2xDLGc2Q0FBOEM7b0JBRTlDLGFBQWEsRUFBSSxpQkFBaUIsQ0FBQyxJQUFJO29CQUN2QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTs7aUJBQ2xEOzs7O2dCQVppQyxpQkFBaUI7Z0JBSTFDLHFCQUFxQjs7O3lCQVd6QixLQUFLOzZCQUdMLEtBQUs7O0lBd0RWLDhCQUFDO0NBQUEsQUFwRUQsSUFvRUM7U0E3RFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGdXNlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuL25hdmlnYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yICAgICAgIDogJ2Z1c2UtbmF2aWdhdGlvbicsXG4gICAgdGVtcGxhdGVVcmwgICAgOiAnLi9uYXZpZ2F0aW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHMgICAgICA6IFsnLi9uYXZpZ2F0aW9uLmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbiAgOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VOYXZpZ2F0aW9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0XG57XG4gICAgQElucHV0KClcbiAgICBsYXlvdXQgPSAndmVydGljYWwnO1xuXG4gICAgQElucHV0KClcbiAgICBuYXZpZ2F0aW9uOiBhbnk7XG5cbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVBbGw6IFN1YmplY3Q8YW55PjtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtDaGFuZ2VEZXRlY3RvclJlZn0gX2NoYW5nZURldGVjdG9yUmVmXG4gICAgICogQHBhcmFtIHtGdXNlTmF2aWdhdGlvblNlcnZpY2V9IF9mdXNlTmF2aWdhdGlvblNlcnZpY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIF9mdXNlTmF2aWdhdGlvblNlcnZpY2U6IEZ1c2VOYXZpZ2F0aW9uU2VydmljZVxuICAgIClcbiAgICB7XG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIExpZmVjeWNsZSBob29rc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0XG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gTG9hZCB0aGUgbmF2aWdhdGlvbiBlaXRoZXIgZnJvbSB0aGUgaW5wdXQgb3IgZnJvbSB0aGUgc2VydmljZVxuICAgICAgICB0aGlzLm5hdmlnYXRpb24gPSB0aGlzLm5hdmlnYXRpb24gfHwgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLmdldEN1cnJlbnROYXZpZ2F0aW9uKCk7XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIHRoZSBjdXJyZW50IG5hdmlnYXRpb24gY2hhbmdlc1xuICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25OYXZpZ2F0aW9uQ2hhbmdlZFxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gTG9hZCB0aGUgbmF2aWdhdGlvblxuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbiA9IHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5nZXRDdXJyZW50TmF2aWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBuYXZpZ2F0aW9uIGl0ZW1cbiAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25OYXZpZ2F0aW9uSXRlbUFkZGVkLFxuICAgICAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkl0ZW1VcGRhdGVkLFxuICAgICAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkl0ZW1SZW1vdmVkXG4gICAgICAgICkucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG5cbiAgICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19