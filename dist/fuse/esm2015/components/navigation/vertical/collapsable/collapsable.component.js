import { ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../../animations';
import { FuseNavigationService } from '../../navigation.service';
export class FuseNavVerticalCollapsableComponent {
    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {Router} _router
     */
    constructor(_changeDetectorRef, _fuseNavigationService, _router) {
        this._changeDetectorRef = _changeDetectorRef;
        this._fuseNavigationService = _fuseNavigationService;
        this._router = _router;
        this.classes = 'nav-collapsable nav-item';
        this.isOpen = false;
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
        // Listen for router events
        this._router.events
            .pipe(filter(event => event instanceof NavigationEnd), takeUntil(this._unsubscribeAll))
            .subscribe((event) => {
            // Check if the url can be found in
            // one of the children of this item
            if (this.isUrlInChildren(this.item, event.urlAfterRedirects)) {
                this.expand();
            }
            else {
                this.collapse();
            }
        });
        // Listen for collapsing of any navigation item
        this._fuseNavigationService.onItemCollapsed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((clickedItem) => {
            if (clickedItem && clickedItem.children) {
                // Check if the clicked item is one
                // of the children of this item
                if (this.isChildrenOf(this.item, clickedItem)) {
                    return;
                }
                // Check if the url can be found in
                // one of the children of this item
                if (this.isUrlInChildren(this.item, this._router.url)) {
                    return;
                }
                // If the clicked item is not this item, collapse...
                if (this.item !== clickedItem) {
                    this.collapse();
                }
            }
        });
        // Check if the url can be found in
        // one of the children of this item
        if (this.isUrlInChildren(this.item, this._router.url)) {
            this.expand();
        }
        else {
            this.collapse();
        }
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle collapse
     *
     * @param ev
     */
    toggleOpen(ev) {
        ev.preventDefault();
        this.isOpen = !this.isOpen;
        // Navigation collapse toggled...
        this._fuseNavigationService.onItemCollapsed.next(this.item);
        this._fuseNavigationService.onItemCollapseToggled.next();
    }
    /**
     * Expand the collapsable navigation
     */
    expand() {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        // Mark for check
        this._changeDetectorRef.markForCheck();
        this._fuseNavigationService.onItemCollapseToggled.next();
    }
    /**
     * Collapse the collapsable navigation
     */
    collapse() {
        if (!this.isOpen) {
            return;
        }
        this.isOpen = false;
        // Mark for check
        this._changeDetectorRef.markForCheck();
        this._fuseNavigationService.onItemCollapseToggled.next();
    }
    /**
     * Check if the given parent has the
     * given item in one of its children
     *
     * @param parent
     * @param item
     * @returns {boolean}
     */
    isChildrenOf(parent, item) {
        if (!parent.children) {
            return false;
        }
        if (parent.children.indexOf(item) !== -1) {
            return true;
        }
        for (const children of parent.children) {
            if (children.children) {
                return this.isChildrenOf(children, item);
            }
        }
    }
    /**
     * Check if the given url can be found
     * in one of the given parent's children
     *
     * @param parent
     * @param url
     * @returns {boolean}
     */
    isUrlInChildren(parent, url) {
        if (!parent.children) {
            return false;
        }
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].children) {
                if (this.isUrlInChildren(parent.children[i], url)) {
                    return true;
                }
            }
            if (parent.children[i].url === url || url.includes(parent.children[i].url)) {
                return true;
            }
        }
        return false;
    }
}
FuseNavVerticalCollapsableComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-nav-vertical-collapsable',
                template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <!-- normal collapsable -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && !item.function\"\n       (click)=\"toggleOpen($event)\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.url -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && !item.function\"\n       (click)=\"toggleOpen($event)\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && !item.function\"\n       (click)=\"toggleOpen($event)\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.function -->\n    <span class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && item.function\"\n          (click)=\"toggleOpen($event);item.function()\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </span>\n\n    <!-- item.url && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && item.function\"\n       (click)=\"toggleOpen($event);item.function()\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && item.function\"\n       (click)=\"toggleOpen($event);item.function()\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <ng-template #itemContent>\n        <mat-icon class=\"nav-link-icon\" *ngIf=\"item.icon\">{{item.icon}}</mat-icon>\n        <span class=\"nav-link-title\" [translate]=\"item.translate\">{{item.title}}</span>\n        <span class=\"nav-link-badge\" *ngIf=\"item.badge\" [translate]=\"item.badge.translate\"\n              [ngStyle]=\"{'background-color': item.badge.bg,'color': item.badge.fg}\">\n            {{item.badge.title}}\n        </span>\n        <mat-icon class=\"collapsable-arrow\">keyboard_arrow_right</mat-icon>\n    </ng-template>\n\n    <div class=\"children\" [@slideInOut]=\"isOpen\">\n        <ng-container *ngFor=\"let item of item.children\">\n            <fuse-nav-vertical-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-vertical-item>\n            <fuse-nav-vertical-collapsable *ngIf=\"item.type=='collapsable'\"\n                                           [item]=\"item\"></fuse-nav-vertical-collapsable>\n            <fuse-nav-vertical-group *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-vertical-group>\n        </ng-container>\n    </div>\n\n</ng-container>\n",
                animations: fuseAnimations,
                styles: [".folded:not(.unfolded) :host .nav-link>span{opacity:0;transition:opacity .2s}.folded:not(.unfolded) :host.open .children{display:none!important}:host .nav-link .collapsable-arrow{transition:transform .3s ease-in-out,opacity .25s ease-in-out .1s,-webkit-transform .3s ease-in-out;-webkit-transform:rotate(0);transform:rotate(0)}:host>.children{overflow:hidden}:host.open>.nav-link .collapsable-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}"]
            }] }
];
/** @nocollapse */
FuseNavVerticalCollapsableComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: FuseNavigationService },
    { type: Router }
];
FuseNavVerticalCollapsableComponent.propDecorators = {
    item: [{ type: Input }],
    classes: [{ type: HostBinding, args: ['class',] }],
    isOpen: [{ type: HostBinding, args: ['class.open',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2FibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uYXZpZ2F0aW9uL3ZlcnRpY2FsL2NvbGxhcHNhYmxlL2NvbGxhcHNhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUduRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDeEQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFRakUsTUFBTSxPQUFPLG1DQUFtQztJQWM1Qzs7Ozs7O09BTUc7SUFDSCxZQUNZLGtCQUFxQyxFQUNyQyxzQkFBNkMsRUFDN0MsT0FBZTtRQUZmLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBbEIzQixZQUFPLEdBQUcsMEJBQTBCLENBQUM7UUFHOUIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQWtCbEIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxRQUFRO1FBRUosMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTTth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QU8sS0FBSyxDQUFDO1NBQ2hCO1FBRUQsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUNoRDtZQUNJLElBQUssTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQ2hDO2dCQUNJLElBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUNsRDtvQkFDSSxPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1lBRUQsSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUMzRTtnQkFDSSxPQUFPLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFFRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDOzs7WUF2UEosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBSywrQkFBK0I7Z0JBQzVDLCt2R0FBMkM7Z0JBRTNDLFVBQVUsRUFBRyxjQUFjOzthQUM5Qjs7OztZQWRRLGlCQUFpQjtZQU9qQixxQkFBcUI7WUFOTixNQUFNOzs7bUJBZ0J6QixLQUFLO3NCQUdMLFdBQVcsU0FBQyxPQUFPO3FCQUduQixXQUFXLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBtZXJnZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZ1c2VOYXZpZ2F0aW9uSXRlbSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzJztcbmltcG9ydCB7IGZ1c2VBbmltYXRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBGdXNlTmF2aWdhdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciAgIDogJ2Z1c2UtbmF2LXZlcnRpY2FsLWNvbGxhcHNhYmxlJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vY29sbGFwc2FibGUuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJscyAgOiBbJy4vY29sbGFwc2FibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgICBhbmltYXRpb25zIDogZnVzZUFuaW1hdGlvbnNcbn0pXG5leHBvcnQgY2xhc3MgRnVzZU5hdlZlcnRpY2FsQ29sbGFwc2FibGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIEBJbnB1dCgpXG4gICAgaXRlbTogRnVzZU5hdmlnYXRpb25JdGVtO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gICAgY2xhc3NlcyA9ICduYXYtY29sbGFwc2FibGUgbmF2LWl0ZW0nO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5vcGVuJylcbiAgICBwdWJsaWMgaXNPcGVuID0gZmFsc2U7XG5cbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVBbGw6IFN1YmplY3Q8YW55PjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0NoYW5nZURldGVjdG9yUmVmfSBfY2hhbmdlRGV0ZWN0b3JSZWZcbiAgICAgKiBAcGFyYW0ge0Z1c2VOYXZpZ2F0aW9uU2VydmljZX0gX2Z1c2VOYXZpZ2F0aW9uU2VydmljZVxuICAgICAqIEBwYXJhbSB7Um91dGVyfSBfcm91dGVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlOiBGdXNlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRlcjogUm91dGVyXG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBwcml2YXRlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgTGlmZWN5Y2xlIGhvb2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIE9uIGluaXRcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBMaXN0ZW4gZm9yIHJvdXRlciBldmVudHNcbiAgICAgICAgdGhpcy5fcm91dGVyLmV2ZW50c1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCksXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IE5hdmlnYXRpb25FbmQpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB1cmwgY2FuIGJlIGZvdW5kIGluXG4gICAgICAgICAgICAgICAgLy8gb25lIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGlzIGl0ZW1cbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuaXNVcmxJbkNoaWxkcmVuKHRoaXMuaXRlbSwgZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMpIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyBMaXN0ZW4gZm9yIGNvbGxhcHNpbmcgb2YgYW55IG5hdmlnYXRpb24gaXRlbVxuICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25JdGVtQ29sbGFwc2VkXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoY2xpY2tlZEl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjbGlja2VkSXRlbSAmJiBjbGlja2VkSXRlbS5jaGlsZHJlbiApXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSBjbGlja2VkIGl0ZW0gaXMgb25lXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvZiB0aGUgY2hpbGRyZW4gb2YgdGhpcyBpdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMuaXNDaGlsZHJlbk9mKHRoaXMuaXRlbSwgY2xpY2tlZEl0ZW0pIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIHRoZSB1cmwgY2FuIGJlIGZvdW5kIGluXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbmUgb2YgdGhlIGNoaWxkcmVuIG9mIHRoaXMgaXRlbVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLmlzVXJsSW5DaGlsZHJlbih0aGlzLml0ZW0sIHRoaXMuX3JvdXRlci51cmwpIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBjbGlja2VkIGl0ZW0gaXMgbm90IHRoaXMgaXRlbSwgY29sbGFwc2UuLi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5pdGVtICE9PSBjbGlja2VkSXRlbSApXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgdXJsIGNhbiBiZSBmb3VuZCBpblxuICAgICAgICAvLyBvbmUgb2YgdGhlIGNoaWxkcmVuIG9mIHRoaXMgaXRlbVxuICAgICAgICBpZiAoIHRoaXMuaXNVcmxJbkNoaWxkcmVuKHRoaXMuaXRlbSwgdGhpcy5fcm91dGVyLnVybCkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3Vic2NyaWJlIHRvIG5hdmlnYXRpb24gaXRlbVxuICAgICAgICBtZXJnZShcbiAgICAgICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbk5hdmlnYXRpb25JdGVtQWRkZWQsXG4gICAgICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25OYXZpZ2F0aW9uSXRlbVVwZGF0ZWQsXG4gICAgICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25OYXZpZ2F0aW9uSXRlbVJlbW92ZWRcbiAgICAgICAgKS5waXBlKHRha2VVbnRpbCh0aGlzLl91bnN1YnNjcmliZUFsbCkpXG4gICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcblxuICAgICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBkZXN0cm95XG4gICAgICovXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZnJvbSBhbGwgc3Vic2NyaXB0aW9uc1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5uZXh0KCk7XG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFB1YmxpYyBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBjb2xsYXBzZVxuICAgICAqXG4gICAgICogQHBhcmFtIGV2XG4gICAgICovXG4gICAgdG9nZ2xlT3Blbihldik6IHZvaWRcbiAgICB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5pc09wZW4gPSAhdGhpcy5pc09wZW47XG5cbiAgICAgICAgLy8gTmF2aWdhdGlvbiBjb2xsYXBzZSB0b2dnbGVkLi4uXG4gICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbkl0ZW1Db2xsYXBzZWQubmV4dCh0aGlzLml0ZW0pO1xuICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25JdGVtQ29sbGFwc2VUb2dnbGVkLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHBhbmQgdGhlIGNvbGxhcHNhYmxlIG5hdmlnYXRpb25cbiAgICAgKi9cbiAgICBleHBhbmQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCB0aGlzLmlzT3BlbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25JdGVtQ29sbGFwc2VUb2dnbGVkLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb2xsYXBzZSB0aGUgY29sbGFwc2FibGUgbmF2aWdhdGlvblxuICAgICAqL1xuICAgIGNvbGxhcHNlKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICggIXRoaXMuaXNPcGVuIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcblxuICAgICAgICAvLyBNYXJrIGZvciBjaGVja1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgICAgICB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2Uub25JdGVtQ29sbGFwc2VUb2dnbGVkLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gcGFyZW50IGhhcyB0aGVcbiAgICAgKiBnaXZlbiBpdGVtIGluIG9uZSBvZiBpdHMgY2hpbGRyZW5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYXJlbnRcbiAgICAgKiBAcGFyYW0gaXRlbVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzQ2hpbGRyZW5PZihwYXJlbnQsIGl0ZW0pOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoICFwYXJlbnQuY2hpbGRyZW4gKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGl0ZW0pICE9PSAtMSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICggY29uc3QgY2hpbGRyZW4gb2YgcGFyZW50LmNoaWxkcmVuIClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCBjaGlsZHJlbi5jaGlsZHJlbiApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNDaGlsZHJlbk9mKGNoaWxkcmVuLCBpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlbiB1cmwgY2FuIGJlIGZvdW5kXG4gICAgICogaW4gb25lIG9mIHRoZSBnaXZlbiBwYXJlbnQncyBjaGlsZHJlblxuICAgICAqXG4gICAgICogQHBhcmFtIHBhcmVudFxuICAgICAqIEBwYXJhbSB1cmxcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBpc1VybEluQ2hpbGRyZW4ocGFyZW50LCB1cmwpOiBib29sZWFuXG4gICAge1xuICAgICAgICBpZiAoICFwYXJlbnQuY2hpbGRyZW4gKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBwYXJlbnQuY2hpbGRyZW4ubGVuZ3RoOyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIHBhcmVudC5jaGlsZHJlbltpXS5jaGlsZHJlbiApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLmlzVXJsSW5DaGlsZHJlbihwYXJlbnQuY2hpbGRyZW5baV0sIHVybCkgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHBhcmVudC5jaGlsZHJlbltpXS51cmwgPT09IHVybCB8fCB1cmwuaW5jbHVkZXMocGFyZW50LmNoaWxkcmVuW2ldLnVybCkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxufVxuIl19