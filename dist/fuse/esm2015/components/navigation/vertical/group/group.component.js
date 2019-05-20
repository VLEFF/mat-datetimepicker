import { ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseNavigationService } from '../../navigation.service';
export class FuseNavVerticalGroupComponent {
    /**
     * Constructor
     */
    /**
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     */
    constructor(_changeDetectorRef, _fuseNavigationService) {
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
    ngOnInit() {
        // Subscribe to navigation item
        merge(this._fuseNavigationService.onNavigationItemAdded, this._fuseNavigationService.onNavigationItemUpdated, this._fuseNavigationService.onNavigationItemRemoved).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
            // Mark for check
            this._changeDetectorRef.markForCheck();
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
FuseNavVerticalGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-nav-vertical-group',
                template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <div class=\"group-title\" [ngClass]=\"item.classes\">\n        <span class=\"hint-text\" [translate]=\"item.translate\">{{ item.title }}</span>\n    </div>\n\n    <div class=\"group-items\">\n        <ng-container *ngFor=\"let item of item.children\">\n            <fuse-nav-vertical-group *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-vertical-group>\n            <fuse-nav-vertical-collapsable *ngIf=\"item.type=='collapsable'\"\n                                           [item]=\"item\"></fuse-nav-vertical-collapsable>\n            <fuse-nav-vertical-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-vertical-item>\n        </ng-container>\n    </div>\n\n</ng-container>",
                styles: [".folded:not(.unfolded) :host>.group-title{align-items:center}.folded:not(.unfolded) :host>.group-title>span{opacity:0;transition:opacity .2s}.folded:not(.unfolded) :host>.group-title:before{content:'';display:block;position:absolute;min-width:1.6rem;border-top:2px solid;opacity:.2}"]
            }] }
];
/** @nocollapse */
FuseNavVerticalGroupComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: FuseNavigationService }
];
FuseNavVerticalGroupComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }],
    item: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uYXZpZ2F0aW9uL3ZlcnRpY2FsL2dyb3VwL2dyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU9qRSxNQUFNLE9BQU8sNkJBQTZCO0lBV3RDOztPQUVHO0lBRUg7Ozs7T0FJRztJQUNILFlBQ1ksa0JBQXFDLEVBQ3JDLHNCQUE2QztRQUQ3Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFuQnpELFlBQU8sR0FBRyxvQkFBb0IsQ0FBQztRQXNCM0IsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxRQUFRO1FBRUosK0JBQStCO1FBQy9CLEtBQUssQ0FDRCxJQUFJLENBQUMsc0JBQXNCLENBQUMscUJBQXFCLEVBQ2pELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx1QkFBdUIsRUFDbkQsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHVCQUF1QixDQUN0RCxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFFWixpQkFBaUI7WUFDakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsV0FBVztRQUVQLHFDQUFxQztRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQzs7O1lBaEVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUsseUJBQXlCO2dCQUN0QyxrdkJBQXFDOzthQUV4Qzs7OztZQVhRLGlCQUFpQjtZQUtqQixxQkFBcUI7OztzQkFTekIsV0FBVyxTQUFDLE9BQU87bUJBR25CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3RvclJlZiwgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGdXNlTmF2aWdhdGlvbkl0ZW0gfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcyc7XG5pbXBvcnQgeyBGdXNlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciAgIDogJ2Z1c2UtbmF2LXZlcnRpY2FsLWdyb3VwJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZ3JvdXAuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJscyAgOiBbJy4vZ3JvdXAuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlTmF2VmVydGljYWxHcm91cENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gICAgY2xhc3NlcyA9ICduYXYtZ3JvdXAgbmF2LWl0ZW0nO1xuXG4gICAgQElucHV0KClcbiAgICBpdGVtOiBGdXNlTmF2aWdhdGlvbkl0ZW07XG5cbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVBbGw6IFN1YmplY3Q8YW55PjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IF9jaGFuZ2VEZXRlY3RvclJlZlxuICAgICAqIEBwYXJhbSB7RnVzZU5hdmlnYXRpb25TZXJ2aWNlfSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlOiBGdXNlTmF2aWdhdGlvblNlcnZpY2VcbiAgICApXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIHByaXZhdGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwgPSBuZXcgU3ViamVjdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdFxuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBuYXZpZ2F0aW9uIGl0ZW1cbiAgICAgICAgbWVyZ2UoXG4gICAgICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25OYXZpZ2F0aW9uSXRlbUFkZGVkLFxuICAgICAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkl0ZW1VcGRhdGVkLFxuICAgICAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkl0ZW1SZW1vdmVkXG4gICAgICAgICkucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG5cbiAgICAgICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gZGVzdHJveVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwubmV4dCgpO1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5jb21wbGV0ZSgpO1xuICAgIH1cblxufVxuIl19