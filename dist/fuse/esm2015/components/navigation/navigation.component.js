import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseNavigationService } from './navigation.service';
export class FuseNavigationComponent {
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(_changeDetectorRef, _fuseNavigationService) {
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
    ngOnInit() {
        // Load the navigation either from the input or from the service
        this.navigation = this.navigation || this._fuseNavigationService.getCurrentNavigation();
        // Subscribe to the current navigation changes
        this._fuseNavigationService.onNavigationChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            // Load the navigation
            this.navigation = this._fuseNavigationService.getCurrentNavigation();
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
        // Subscribe to navigation item
        merge(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }
}
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
FuseNavigationComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: FuseNavigationService }
];
FuseNavigationComponent.propDecorators = {
    layout: [{ type: Input }],
    navigation: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQVUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEgsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBUzdELE1BQU0sT0FBTyx1QkFBdUI7SUFXaEM7Ozs7T0FJRztJQUNILFlBQ1ksa0JBQXFDLEVBQ3JDLHNCQUE2QztRQUQ3Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFmekQsV0FBTSxHQUFHLFVBQVUsQ0FBQztRQWtCaEIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxRQUFRO1FBRUosZ0VBQWdFO1FBQ2hFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsc0JBQXNCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUV4Riw4Q0FBOEM7UUFDOUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG1CQUFtQjthQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBRVosc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFFckUsaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVQLCtCQUErQjtRQUMvQixLQUFLLENBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHFCQUFxQixFQUNqRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsdUJBQXVCLEVBQ25ELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FDdEQsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBRVosaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7OztZQW5FSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFTLGlCQUFpQjtnQkFDbEMsZzZDQUE4QztnQkFFOUMsYUFBYSxFQUFJLGlCQUFpQixDQUFDLElBQUk7Z0JBQ3ZDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOzthQUNsRDs7OztZQVppQyxpQkFBaUI7WUFJMUMscUJBQXFCOzs7cUJBV3pCLEtBQUs7eUJBR0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRnVzZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciAgICAgICA6ICdmdXNlLW5hdmlnYXRpb24nLFxuICAgIHRlbXBsYXRlVXJsICAgIDogJy4vbmF2aWdhdGlvbi5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzICAgICAgOiBbJy4vbmF2aWdhdGlvbi5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb24gIDogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBGdXNlTmF2aWdhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdFxue1xuICAgIEBJbnB1dCgpXG4gICAgbGF5b3V0ID0gJ3ZlcnRpY2FsJztcblxuICAgIEBJbnB1dCgpXG4gICAgbmF2aWdhdGlvbjogYW55O1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX3Vuc3Vic2NyaWJlQWxsOiBTdWJqZWN0PGFueT47XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IF9jaGFuZ2VEZXRlY3RvclJlZlxuICAgICAqIEBwYXJhbSB7RnVzZU5hdmlnYXRpb25TZXJ2aWNlfSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlOiBGdXNlTmF2aWdhdGlvblNlcnZpY2VcbiAgICApXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIHByaXZhdGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwgPSBuZXcgU3ViamVjdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdFxuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIExvYWQgdGhlIG5hdmlnYXRpb24gZWl0aGVyIGZyb20gdGhlIGlucHV0IG9yIGZyb20gdGhlIHNlcnZpY2VcbiAgICAgICAgdGhpcy5uYXZpZ2F0aW9uID0gdGhpcy5uYXZpZ2F0aW9uIHx8IHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5nZXRDdXJyZW50TmF2aWdhdGlvbigpO1xuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byB0aGUgY3VycmVudCBuYXZpZ2F0aW9uIGNoYW5nZXNcbiAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkNoYW5nZWRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl91bnN1YnNjcmliZUFsbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIExvYWQgdGhlIG5hdmlnYXRpb25cbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb24gPSB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2UuZ2V0Q3VycmVudE5hdmlnYXRpb24oKTtcblxuICAgICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkl0ZW1BZGRlZCxcbiAgICAgICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbk5hdmlnYXRpb25JdGVtVXBkYXRlZCxcbiAgICAgICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbk5hdmlnYXRpb25JdGVtUmVtb3ZlZFxuICAgICAgICApLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==