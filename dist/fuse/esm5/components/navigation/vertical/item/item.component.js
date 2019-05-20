import { ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseNavigationService } from '../../navigation.service';
var FuseNavVerticalItemComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    function FuseNavVerticalItemComponent(_changeDetectorRef, _fuseNavigationService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this.classes = 'nav-item';
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseNavVerticalItemComponent.prototype.ngOnInit = function () {
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
    FuseNavVerticalItemComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    FuseNavVerticalItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-nav-vertical-item',
                    template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <!-- item.url -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && !item.function\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && !item.function\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.function -->\n    <span class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && item.function\"\n          (click)=\"item.function()\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </span>\n\n    <!-- item.url && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <ng-template #itemContent>\n        <mat-icon class=\"nav-link-icon\" *ngIf=\"item.icon\">{{item.icon}}</mat-icon>\n        <span class=\"nav-link-title\" [translate]=\"item.translate\">{{item.title}}</span>\n        <span class=\"nav-link-badge\" *ngIf=\"item.badge\" [translate]=\"item.badge.translate\"\n              [ngStyle]=\"{'background-color': item.badge.bg,'color': item.badge.fg}\">\n            {{item.badge.title}}\n        </span>\n    </ng-template>\n\n</ng-container>",
                    styles: [".folded:not(.unfolded) :host .nav-link>.nav-link-badge,.folded:not(.unfolded) :host .nav-link>.nav-link-title{opacity:0;transition:opacity .2s}"]
                }] }
    ];
    /** @nocollapse */
    FuseNavVerticalItemComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FuseNavigationService }
    ]; };
    FuseNavVerticalItemComponent.propDecorators = {
        classes: [{ type: HostBinding, args: ['class',] }],
        item: [{ type: Input }]
    };
    return FuseNavVerticalItemComponent;
}());
export { FuseNavVerticalItemComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vdmVydGljYWwvaXRlbS9pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVqRTtJQWdCSTs7T0FFRztJQUVIOzs7O09BSUc7SUFDSCxzQ0FDWSxrQkFBcUMsRUFDckMsc0JBQTZDO1FBRDdDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQW5CekQsWUFBTyxHQUFHLFVBQVUsQ0FBQztRQXNCakIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCwrQ0FBUSxHQUFSO1FBQUEsaUJBYUM7UUFYRywrQkFBK0I7UUFDL0IsS0FBSyxDQUNELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxxQkFBcUIsRUFDakQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHVCQUF1QixFQUNuRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsdUJBQXVCLENBQ3RELENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDckMsU0FBUyxDQUFDO1lBRVAsaUJBQWlCO1lBQ2pCLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7T0FFRztJQUNILGtEQUFXLEdBQVg7UUFFSSxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7O2dCQWhFSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFLLHdCQUF3QjtvQkFDckMseTBFQUFvQzs7aUJBRXZDOzs7O2dCQVhRLGlCQUFpQjtnQkFLakIscUJBQXFCOzs7MEJBU3pCLFdBQVcsU0FBQyxPQUFPO3VCQUduQixLQUFLOztJQXVEVixtQ0FBQztDQUFBLEFBakVELElBaUVDO1NBNURZLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZ1c2VOYXZpZ2F0aW9uSXRlbSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IEZ1c2VOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL25hdmlnYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yICAgOiAnZnVzZS1uYXYtdmVydGljYWwtaXRlbScsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2l0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJscyAgOiBbJy4vaXRlbS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VOYXZWZXJ0aWNhbEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICAgIGNsYXNzZXMgPSAnbmF2LWl0ZW0nO1xuXG4gICAgQElucHV0KClcbiAgICBpdGVtOiBGdXNlTmF2aWdhdGlvbkl0ZW07XG5cbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVBbGw6IFN1YmplY3Q8YW55PjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IF9jaGFuZ2VEZXRlY3RvclJlZlxuICAgICAqIEBwYXJhbSB7RnVzZU5hdmlnYXRpb25TZXJ2aWNlfSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlOiBGdXNlTmF2aWdhdGlvblNlcnZpY2VcbiAgICApXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIHByaXZhdGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwgPSBuZXcgU3ViamVjdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdFxuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBuYXZpZ2F0aW9uIGl0ZW1cbiAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25OYXZpZ2F0aW9uSXRlbUFkZGVkLFxuICAgICAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkl0ZW1VcGRhdGVkLFxuICAgICAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkl0ZW1SZW1vdmVkXG4gICAgICAgICkucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG5cbiAgICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gZGVzdHJveVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwubmV4dCgpO1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5jb21wbGV0ZSgpO1xuICAgIH1cbn1cbiJdfQ==