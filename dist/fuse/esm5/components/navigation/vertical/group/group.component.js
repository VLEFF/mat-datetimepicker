import { ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseNavigationService } from '../../navigation.service';
var FuseNavVerticalGroupComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    function FuseNavVerticalGroupComponent(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this.classes = 'nav-group nav-item';
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavVerticalGroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Subscribe to navigation item
        merge(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * On destroy
     */
    FuseNavVerticalGroupComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    FuseNavVerticalGroupComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-nav-vertical-group',
                    template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <div class=\"group-title\" [ngClass]=\"item.classes\">\n        <span class=\"hint-text\" [translate]=\"item.translate\">{{ item.title }}</span>\n    </div>\n\n    <div class=\"group-items\">\n        <ng-container *ngFor=\"let item of item.children\">\n            <fuse-nav-vertical-group *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-vertical-group>\n            <fuse-nav-vertical-collapsable *ngIf=\"item.type=='collapsable'\"\n                                           [item]=\"item\"></fuse-nav-vertical-collapsable>\n            <fuse-nav-vertical-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-vertical-item>\n        </ng-container>\n    </div>\n\n</ng-container>",
                    styles: [".folded:not(.unfolded) :host>.group-title{align-items:center}.folded:not(.unfolded) :host>.group-title>span{opacity:0;transition:opacity .2s}.folded:not(.unfolded) :host>.group-title:before{content:'';display:block;position:absolute;min-width:1.6rem;border-top:2px solid;opacity:.2}"]
                }] }
    ];
    /** @nocollapse */
    FuseNavVerticalGroupComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FuseNavigationService }
    ]; };
    FuseNavVerticalGroupComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        item: [{ type: Input }]
    };
    return FuseNavVerticalGroupComponent;
}());
export { FuseNavVerticalGroupComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uYXZpZ2F0aW9uL3ZlcnRpY2FsL2dyb3VwL2dyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTtJQWdCSTs7T0FFRztJQUVIOzs7O09BSUc7SUFDSCx1Q0FDWSxrQkFBcUMsRUFDckMsc0JBQTZDO1FBRDdDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQW5CekQsWUFBTyxHQUFHLG9CQUFvQixDQUFDO1FBc0IzQiwyQkFBMkI7UUFDM0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILGdEQUFRLEdBQVI7UUFBQSxpQkFhQztRQVhHLCtCQUErQjtRQUMvQixLQUFLLENBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHFCQUFxQixFQUNqRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsdUJBQXVCLEVBQ25ELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FDdEQsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUM7WUFFUCxpQkFBaUI7WUFDakIsS0FBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbURBQVcsR0FBWDtRQUVJLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7Z0JBaEVKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUsseUJBQXlCO29CQUN0QyxrdkJBQXFDOztpQkFFeEM7Ozs7Z0JBWFEsaUJBQWlCO2dCQUtqQixxQkFBcUI7OzswQkFTekIsV0FBVyxTQUFDLE9BQU87dUJBR25CLEtBQUs7O0lBd0RWLG9DQUFDO0NBQUEsQUFsRUQsSUFrRUM7U0E3RFksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRnVzZU5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgRnVzZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3IgICA6ICdmdXNlLW5hdi12ZXJ0aWNhbC1ncm91cCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2dyb3VwLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHMgIDogWycuL2dyb3VwLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnVzZU5hdlZlcnRpY2FsR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICAgIGNsYXNzZXMgPSAnbmF2LWdyb3VwIG5hdi1pdGVtJztcblxuICAgIEBJbnB1dCgpXG4gICAgaXRlbTogRnVzZU5hdmlnYXRpb25JdGVtO1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX3Vuc3Vic2NyaWJlQWxsOiBTdWJqZWN0PGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0NoYW5nZURldGVjdG9yUmVmfSBfY2hhbmdlRGV0ZWN0b3JSZWZcbiAgICAgKiBAcGFyYW0ge0Z1c2VOYXZpZ2F0aW9uU2VydmljZX0gX2Z1c2VOYXZpZ2F0aW9uU2VydmljZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgX2Z1c2VOYXZpZ2F0aW9uU2VydmljZTogRnVzZU5hdmlnYXRpb25TZXJ2aWNlXG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBwcml2YXRlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgTGlmZWN5Y2xlIGhvb2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIE9uIGluaXRcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkl0ZW1BZGRlZCxcbiAgICAgICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbk5hdmlnYXRpb25JdGVtVXBkYXRlZCxcbiAgICAgICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbk5hdmlnYXRpb25JdGVtUmVtb3ZlZFxuICAgICAgICApLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBVbnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLm5leHQoKTtcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwuY29tcGxldGUoKTtcbiAgICB9XG5cbn1cbiJdfQ==