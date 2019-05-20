import * as tslib_1 from "tslib";
import { ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { fuseAnimations } from '../../../../animations';
import { FuseNavigationService } from '../../navigation.service';
var FuseNavVerticalCollapsableComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ChangeDetectorRef} _changeDetectorRef
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {Router} _router
     */
    function FuseNavVerticalCollapsableComponent(_changeDetectorRef, _fuseNavigationService, _router) {
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
    FuseNavVerticalCollapsableComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Listen for router events
        this._router.events
            .pipe(filter(function (event) { return event instanceof NavigationEnd; }), takeUntil(this._unsubscribeAll))
            .subscribe(function (event) {
            // Check if the url can be found in
            // one of the children of this item
            if (_this.isUrlInChildren(_this.item, event.urlAfterRedirects)) {
                _this.expand();
            }
            else {
                _this.collapse();
            }
        });
        // Listen for collapsing of any navigation item
        this._fuseNavigationService.onItemCollapsed
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function (clickedItem) {
            if (clickedItem && clickedItem.children) {
                // Check if the clicked item is one
                // of the children of this item
                if (_this.isChildrenOf(_this.item, clickedItem)) {
                    return;
                }
                // Check if the url can be found in
                // one of the children of this item
                if (_this.isUrlInChildren(_this.item, _this._router.url)) {
                    return;
                }
                // If the clicked item is not this item, collapse...
                if (_this.item !== clickedItem) {
                    _this.collapse();
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
            .subscribe(function () {
            // Mark for check
            _this._changeDetectorRef.markForCheck();
        });
    };
    /**
     * On destroy
     */
    FuseNavVerticalCollapsableComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle collapse
     *
     * @param ev
     */
    FuseNavVerticalCollapsableComponent.prototype.toggleOpen = function (ev) {
        ev.preventDefault();
        this.isOpen = !this.isOpen;
        // Navigation collapse toggled...
        this._fuseNavigationService.onItemCollapsed.next(this.item);
        this._fuseNavigationService.onItemCollapseToggled.next();
    };
    /**
     * Expand the collapsable navigation
     */
    FuseNavVerticalCollapsableComponent.prototype.expand = function () {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;
        // Mark for check
        this._changeDetectorRef.markForCheck();
        this._fuseNavigationService.onItemCollapseToggled.next();
    };
    /**
     * Collapse the collapsable navigation
     */
    FuseNavVerticalCollapsableComponent.prototype.collapse = function () {
        if (!this.isOpen) {
            return;
        }
        this.isOpen = false;
        // Mark for check
        this._changeDetectorRef.markForCheck();
        this._fuseNavigationService.onItemCollapseToggled.next();
    };
    /**
     * Check if the given parent has the
     * given item in one of its children
     *
     * @param parent
     * @param item
     * @returns {boolean}
     */
    FuseNavVerticalCollapsableComponent.prototype.isChildrenOf = function (parent, item) {
        var e_1, _a;
        if (!parent.children) {
            return false;
        }
        if (parent.children.indexOf(item) !== -1) {
            return true;
        }
        try {
            for (var _b = tslib_1.__values(parent.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                var children = _c.value;
                if (children.children) {
                    return this.isChildrenOf(children, item);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Check if the given url can be found
     * in one of the given parent's children
     *
     * @param parent
     * @param url
     * @returns {boolean}
     */
    FuseNavVerticalCollapsableComponent.prototype.isUrlInChildren = function (parent, url) {
        if (!parent.children) {
            return false;
        }
        for (var i = 0; i < parent.children.length; i++) {
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
    };
    FuseNavVerticalCollapsableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-nav-vertical-collapsable',
                    template: "<ng-container *ngIf=\"!item.hidden\">\n\n    <!-- normal collapsable -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && !item.function\"\n       (click)=\"toggleOpen($event)\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.url -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && !item.function\"\n       (click)=\"toggleOpen($event)\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\"\n       [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && !item.function\"\n       (click)=\"toggleOpen($event)\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.function -->\n    <span class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"!item.url && item.function\"\n          (click)=\"toggleOpen($event);item.function()\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </span>\n\n    <!-- item.url && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && !item.externalUrl && item.function\"\n       (click)=\"toggleOpen($event);item.function()\"\n       [routerLink]=\"[item.url]\" [routerLinkActive]=\"['active', 'accent']\"\n       [routerLinkActiveOptions]=\"{exact: item.exactMatch || false}\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <!-- item.externalUrl && item.function -->\n    <a class=\"nav-link\" [ngClass]=\"item.classes\" *ngIf=\"item.url && item.externalUrl && item.function\"\n       (click)=\"toggleOpen($event);item.function()\"\n       [href]=\"item.url\" [target]=\"item.openInNewTab ? '_blank' : '_self'\">\n        <ng-container *ngTemplateOutlet=\"itemContent\"></ng-container>\n    </a>\n\n    <ng-template #itemContent>\n        <mat-icon class=\"nav-link-icon\" *ngIf=\"item.icon\">{{item.icon}}</mat-icon>\n        <span class=\"nav-link-title\" [translate]=\"item.translate\">{{item.title}}</span>\n        <span class=\"nav-link-badge\" *ngIf=\"item.badge\" [translate]=\"item.badge.translate\"\n              [ngStyle]=\"{'background-color': item.badge.bg,'color': item.badge.fg}\">\n            {{item.badge.title}}\n        </span>\n        <mat-icon class=\"collapsable-arrow\">keyboard_arrow_right</mat-icon>\n    </ng-template>\n\n    <div class=\"children\" [@slideInOut]=\"isOpen\">\n        <ng-container *ngFor=\"let item of item.children\">\n            <fuse-nav-vertical-item *ngIf=\"item.type=='item'\" [item]=\"item\"></fuse-nav-vertical-item>\n            <fuse-nav-vertical-collapsable *ngIf=\"item.type=='collapsable'\"\n                                           [item]=\"item\"></fuse-nav-vertical-collapsable>\n            <fuse-nav-vertical-group *ngIf=\"item.type=='group'\" [item]=\"item\"></fuse-nav-vertical-group>\n        </ng-container>\n    </div>\n\n</ng-container>\n",
                    animations: fuseAnimations,
                    styles: [".folded:not(.unfolded) :host .nav-link>span{opacity:0;transition:opacity .2s}.folded:not(.unfolded) :host.open .children{display:none!important}:host .nav-link .collapsable-arrow{transition:transform .3s ease-in-out,opacity .25s ease-in-out .1s,-webkit-transform .3s ease-in-out;-webkit-transform:rotate(0);transform:rotate(0)}:host>.children{overflow:hidden}:host.open>.nav-link .collapsable-arrow{-webkit-transform:rotate(90deg);transform:rotate(90deg)}"]
                }] }
    ];
    /** @nocollapse */
    FuseNavVerticalCollapsableComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: FuseNavigationService },
        { type: Router }
    ]; };
    FuseNavVerticalCollapsableComponent.propDecorators = {
        item: [{ type: Input }],
        classes: [{ type: HostBinding, args: ['class',] }],
        isOpen: [{ type: HostBinding, args: ['class.open',] }]
    };
    return FuseNavVerticalCollapsableComponent;
}());
export { FuseNavVerticalCollapsableComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2FibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uYXZpZ2F0aW9uL3ZlcnRpY2FsL2NvbGxhcHNhYmxlL2NvbGxhcHNhYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWpFO0lBb0JJOzs7Ozs7T0FNRztJQUNILDZDQUNZLGtCQUFxQyxFQUNyQyxzQkFBNkMsRUFDN0MsT0FBZTtRQUZmLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBbEIzQixZQUFPLEdBQUcsMEJBQTBCLENBQUM7UUFHOUIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQWtCbEIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxzREFBUSxHQUFSO1FBQUEsaUJBMEVDO1FBeEVHLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1B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LEdBQWYsVUFBZ0IsTUFBTSxFQUFFLEdBQUc7UUFFdkIsSUFBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQ3JCO1lBQ0ksT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxLQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQ2hEO1lBQ0ksSUFBSyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFDaEM7Z0JBQ0ksSUFBSyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQ2xEO29CQUNJLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7WUFFRCxJQUFLLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQzNFO2dCQUNJLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7O2dCQXZQSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFLLCtCQUErQjtvQkFDNUMsK3ZHQUEyQztvQkFFM0MsVUFBVSxFQUFHLGNBQWM7O2lCQUM5Qjs7OztnQkFkUSxpQkFBaUI7Z0JBT2pCLHFCQUFxQjtnQkFOTixNQUFNOzs7dUJBZ0J6QixLQUFLOzBCQUdMLFdBQVcsU0FBQyxPQUFPO3lCQUduQixXQUFXLFNBQUMsWUFBWTs7SUEyTzdCLDBDQUFDO0NBQUEsQUF6UEQsSUF5UEM7U0FuUFksbUNBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IG1lcmdlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgRnVzZU5hdmlnYXRpb25JdGVtIH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMnO1xuaW1wb3J0IHsgZnVzZUFuaW1hdGlvbnMgfSBmcm9tICcuLi8uLi8uLi8uLi9hbmltYXRpb25zJztcbmltcG9ydCB7IEZ1c2VOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uL25hdmlnYXRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yICAgOiAnZnVzZS1uYXYtdmVydGljYWwtY29sbGFwc2FibGUnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb2xsYXBzYWJsZS5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzICA6IFsnLi9jb2xsYXBzYWJsZS5jb21wb25lbnQuc2NzcyddLFxuICAgIGFuaW1hdGlvbnMgOiBmdXNlQW5pbWF0aW9uc1xufSlcbmV4cG9ydCBjbGFzcyBGdXNlTmF2VmVydGljYWxDb2xsYXBzYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XG57XG4gICAgQElucHV0KClcbiAgICBpdGVtOiBGdXNlTmF2aWdhdGlvbkl0ZW07XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgICBjbGFzc2VzID0gJ25hdi1jb2xsYXBzYWJsZSBuYXYtaXRlbSc7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLm9wZW4nKVxuICAgIHB1YmxpYyBpc09wZW4gPSBmYWxzZTtcblxuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF91bnN1YnNjcmliZUFsbDogU3ViamVjdDxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IF9jaGFuZ2VEZXRlY3RvclJlZlxuICAgICAqIEBwYXJhbSB7RnVzZU5hdmlnYXRpb25TZXJ2aWNlfSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlXG4gICAgICogQHBhcmFtIHtSb3V0ZXJ9IF9yb3V0ZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIF9mdXNlTmF2aWdhdGlvblNlcnZpY2U6IEZ1c2VOYXZpZ2F0aW9uU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXJcbiAgICApXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIHByaXZhdGUgZGVmYXVsdHNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwgPSBuZXcgU3ViamVjdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogT24gaW5pdFxuICAgICAqL1xuICAgIG5nT25Jbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIExpc3RlbiBmb3Igcm91dGVyIGV2ZW50c1xuICAgICAgICB0aGlzLl9yb3V0ZXIuZXZlbnRzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBmaWx0ZXIoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSxcbiAgICAgICAgICAgICAgICB0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChldmVudDogTmF2aWdhdGlvbkVuZCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVybCBjYW4gYmUgZm91bmQgaW5cbiAgICAgICAgICAgICAgICAvLyBvbmUgb2YgdGhlIGNoaWxkcmVuIG9mIHRoaXMgaXRlbVxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5pc1VybEluQ2hpbGRyZW4odGhpcy5pdGVtLCBldmVudC51cmxBZnRlclJlZGlyZWN0cykgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExpc3RlbiBmb3IgY29sbGFwc2luZyBvZiBhbnkgbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbkl0ZW1Db2xsYXBzZWRcbiAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl91bnN1YnNjcmliZUFsbCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgIChjbGlja2VkSXRlbSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGNsaWNrZWRJdGVtICYmIGNsaWNrZWRJdGVtLmNoaWxkcmVuIClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGNsaWNrZWQgaXRlbSBpcyBvbmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9mIHRoZSBjaGlsZHJlbiBvZiB0aGlzIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdGhpcy5pc0NoaWxkcmVuT2YodGhpcy5pdGVtLCBjbGlja2VkSXRlbSkgKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHVybCBjYW4gYmUgZm91bmQgaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uZSBvZiB0aGUgY2hpbGRyZW4gb2YgdGhpcyBpdGVtXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMuaXNVcmxJbkNoaWxkcmVuKHRoaXMuaXRlbSwgdGhpcy5fcm91dGVyLnVybCkgKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNsaWNrZWQgaXRlbSBpcyBub3QgdGhpcyBpdGVtLCBjb2xsYXBzZS4uLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLml0ZW0gIT09IGNsaWNrZWRJdGVtIClcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSB1cmwgY2FuIGJlIGZvdW5kIGluXG4gICAgICAgIC8vIG9uZSBvZiB0aGUgY2hpbGRyZW4gb2YgdGhpcyBpdGVtXG4gICAgICAgIGlmICggdGhpcy5pc1VybEluQ2hpbGRyZW4odGhpcy5pdGVtLCB0aGlzLl9yb3V0ZXIudXJsKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gbmF2aWdhdGlvbiBpdGVtXG4gICAgICAgIG1lcmdlKFxuICAgICAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uTmF2aWdhdGlvbkl0ZW1BZGRlZCxcbiAgICAgICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbk5hdmlnYXRpb25JdGVtVXBkYXRlZCxcbiAgICAgICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbk5hdmlnYXRpb25JdGVtUmVtb3ZlZFxuICAgICAgICApLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuXG4gICAgICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2tcbiAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBVbnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLm5leHQoKTtcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgUHVibGljIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIGNvbGxhcHNlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZcbiAgICAgKi9cbiAgICB0b2dnbGVPcGVuKGV2KTogdm9pZFxuICAgIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmlzT3BlbiA9ICF0aGlzLmlzT3BlbjtcblxuICAgICAgICAvLyBOYXZpZ2F0aW9uIGNvbGxhcHNlIHRvZ2dsZWQuLi5cbiAgICAgICAgdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLm9uSXRlbUNvbGxhcHNlZC5uZXh0KHRoaXMuaXRlbSk7XG4gICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbkl0ZW1Db2xsYXBzZVRvZ2dsZWQubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4cGFuZCB0aGUgY29sbGFwc2FibGUgbmF2aWdhdGlvblxuICAgICAqL1xuICAgIGV4cGFuZCgpOiB2b2lkXG4gICAge1xuICAgICAgICBpZiAoIHRoaXMuaXNPcGVuIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuXG4gICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbkl0ZW1Db2xsYXBzZVRvZ2dsZWQubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbGxhcHNlIHRoZSBjb2xsYXBzYWJsZSBuYXZpZ2F0aW9uXG4gICAgICovXG4gICAgY29sbGFwc2UoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCAhdGhpcy5pc09wZW4gKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG4gICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrXG4gICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIHRoaXMuX2Z1c2VOYXZpZ2F0aW9uU2VydmljZS5vbkl0ZW1Db2xsYXBzZVRvZ2dsZWQubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHRoZSBnaXZlbiBwYXJlbnQgaGFzIHRoZVxuICAgICAqIGdpdmVuIGl0ZW0gaW4gb25lIG9mIGl0cyBjaGlsZHJlblxuICAgICAqXG4gICAgICogQHBhcmFtIHBhcmVudFxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNDaGlsZHJlbk9mKHBhcmVudCwgaXRlbSk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICggIXBhcmVudC5jaGlsZHJlbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggcGFyZW50LmNoaWxkcmVuLmluZGV4T2YoaXRlbSkgIT09IC0xIClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCBjb25zdCBjaGlsZHJlbiBvZiBwYXJlbnQuY2hpbGRyZW4gKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIGNoaWxkcmVuLmNoaWxkcmVuIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0NoaWxkcmVuT2YoY2hpbGRyZW4sIGl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIGdpdmVuIHVybCBjYW4gYmUgZm91bmRcbiAgICAgKiBpbiBvbmUgb2YgdGhlIGdpdmVuIHBhcmVudCdzIGNoaWxkcmVuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFyZW50XG4gICAgICogQHBhcmFtIHVybFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVXJsSW5DaGlsZHJlbihwYXJlbnQsIHVybCk6IGJvb2xlYW5cbiAgICB7XG4gICAgICAgIGlmICggIXBhcmVudC5jaGlsZHJlbiApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHBhcmVudC5jaGlsZHJlbi5sZW5ndGg7IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggcGFyZW50LmNoaWxkcmVuW2ldLmNoaWxkcmVuIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuaXNVcmxJbkNoaWxkcmVuKHBhcmVudC5jaGlsZHJlbltpXSwgdXJsKSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggcGFyZW50LmNoaWxkcmVuW2ldLnVybCA9PT0gdXJsIHx8IHVybC5pbmNsdWRlcyhwYXJlbnQuY2hpbGRyZW5baV0udXJsKSApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG59XG4iXX0=