import { ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseNavigationService } from '../../navigation.service';
export class FuseNavVerticalItemComponent {
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
FuseNavVerticalItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-nav-vertical-item',
                template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <!-- item.url -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && !item.function\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && !item.function\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.function -->\n    <span class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && item.function\"\n          (click)=\"item.function()\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </span>\n\n    <!-- item.url && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && item.function\"\n       (click)=\"item.function()\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <ng-template #itemContent>\n        <mat-icon class=\"nav-link-icon\" *ngIf=\"item.icon\">{{item.icon}}</mat-icon>\n        <span class=\"nav-link-title\" [translate]=\"item.translate\">{{item.title}}</span>\n        <span class=\"nav-link-badge\" *ngIf=\"item.badge\" [translate]=\"item.badge.translate\"\n              [ngStyle]=\"{'background-color': item.badge.bg,'color': item.badge.fg}\">\n            {{item.badge.title}}\n        </span>\n    </ng-template>\n\n</ng-container>",
                styles: [".folded:not(.unfolded) :host .nav-link>.nav-link-badge,.folded:not(.unfolded) :host .nav-link>.nav-link-title{opacity:0;transition:opacity .2s}"]
            }] }
];
/** @nocollapse */
FuseNavVerticalItemComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: FuseNavigationService }
];
FuseNavVerticalItemComponent.propDecorators = {
    classes: [{ type: HostBinding, args: ['class',] }],
    item: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL25hdmlnYXRpb24vdmVydGljYWwvaXRlbS9pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUczQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU9qRSxNQUFNLE9BQU8sNEJBQTRCO0lBV3JDOztPQUVHO0lBRUg7Ozs7T0FJRztJQUNILFlBQ1ksa0JBQXFDLEVBQ3JDLHNCQUE2QztRQUQ3Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFuQnpELFlBQU8sR0FBRyxVQUFVLENBQUM7UUFzQmpCLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxvQkFBb0I7SUFDcEIsd0dBQXdHO0lBRXhHOztPQUVHO0lBQ0gsUUFBUTtRQUVKLCtCQUErQjtRQUMvQixLQUFLLENBQ0QsSUFBSSxDQUFDLHNCQUFzQixDQUFDLHFCQUFxQixFQUNqRCxJQUFJLENBQUMsc0JBQXNCLENBQUMsdUJBQXVCLEVBQ25ELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyx1QkFBdUIsQ0FDdEQsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBRVosaUJBQWlCO1lBQ2pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFFUCxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7OztZQWhFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFLLHdCQUF3QjtnQkFDckMseTBFQUFvQzs7YUFFdkM7Ozs7WUFYUSxpQkFBaUI7WUFLakIscUJBQXFCOzs7c0JBU3pCLFdBQVcsU0FBQyxPQUFPO21CQUduQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgbWVyZ2UsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRnVzZU5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgRnVzZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3IgICA6ICdmdXNlLW5hdi12ZXJ0aWNhbC1pdGVtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzICA6IFsnLi9pdGVtLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnVzZU5hdlZlcnRpY2FsSXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gICAgY2xhc3NlcyA9ICduYXYtaXRlbSc7XG5cbiAgICBASW5wdXQoKVxuICAgIGl0ZW06IEZ1c2VOYXZpZ2F0aW9uSXRlbTtcblxuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF91bnN1YnNjcmliZUFsbDogU3ViamVjdDxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtDaGFuZ2VEZXRlY3RvclJlZn0gX2NoYW5nZURldGVjdG9yUmVmXG4gICAgICogQHBhcmFtIHtGdXNlTmF2aWdhdGlvblNlcnZpY2V9IF9mdXNlTmF2aWdhdGlvblNlcnZpY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIF9mdXNlTmF2aWdhdGlvblNlcnZpY2U6IEZ1c2VOYXZpZ2F0aW9uU2VydmljZVxuICAgIClcbiAgICB7XG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIExpZmVjeWNsZSBob29rc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0XG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIG5hdmlnYXRpb24gaXRlbVxuICAgICAgICBtZXJnZShcbiAgICAgICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbk5hdmlnYXRpb25JdGVtQWRkZWQsXG4gICAgICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25OYXZpZ2F0aW9uSXRlbVVwZGF0ZWQsXG4gICAgICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25OYXZpZ2F0aW9uSXRlbVJlbW92ZWRcbiAgICAgICAgKS5waXBlKHRha2VVbnRpbCh0aGlzLl91bnN1YnNjcmliZUFsbCkpXG4gICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcblxuICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLmNvbXBsZXRlKCk7XG4gICAgfVxufVxuIl19