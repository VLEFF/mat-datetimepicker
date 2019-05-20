import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMatchMediaService } from '../../services/match-media.service';
import { FuseNavigationService } from '../navigation/navigation.service';
var FuseShortcutsComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {CookieService} _cookieService
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {MediaObserver} _mediaObserver
     * @param {Renderer2} _renderer
     */
    function FuseShortcutsComponent(_cookieService, _fuseMatchMediaService, _fuseNavigationService, _mediaObserver, _renderer) {
        this._cookieService = _cookieService;
        this._fuseMatchMediaService = _fuseMatchMediaService;
        this._fuseNavigationService = _fuseNavigationService;
        this._mediaObserver = _mediaObserver;
        this._renderer = _renderer;
        // Set the defaults
        this.shortcutItems = [];
        this.searching = false;
        this.mobileShortcutsPanelActive = false;
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    FuseShortcutsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get the navigation items and flatten them
        this.filteredNavigationItems = this.navigationItems = this._fuseNavigationService.getFlatNavigation(this.navigation);
        if (this._cookieService.check('FUSE2.shortcuts')) {
            this.shortcutItems = JSON.parse(this._cookieService.get('FUSE2.shortcuts'));
        }
        else {
            // User's shortcut items
            this.shortcutItems = [
                {
                    'title': 'Calendar',
                    'type': 'item',
                    'icon': 'today',
                    'url': '/apps/calendar'
                },
                {
                    'title': 'Mail',
                    'type': 'item',
                    'icon': 'email',
                    'url': '/apps/mail'
                },
                {
                    'title': 'Contacts',
                    'type': 'item',
                    'icon': 'account_box',
                    'url': '/apps/contacts'
                },
                {
                    'title': 'To-Do',
                    'type': 'item',
                    'icon': 'check_box',
                    'url': '/apps/todo'
                }
            ];
        }
        // Subscribe to media changes
        this._fuseMatchMediaService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(function () {
            if (_this._mediaObserver.isActive('gt-sm')) {
                _this.hideMobileShortcutsPanel();
            }
        });
    };
    /**
     * On destroy
     */
    FuseShortcutsComponent.prototype.ngOnDestroy = function () {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Search
     *
     * @param event
     */
    FuseShortcutsComponent.prototype.search = function (event) {
        var value = event.target.value.toLowerCase();
        if (value === '') {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;
            return;
        }
        this.searching = true;
        this.filteredNavigationItems = this.navigationItems.filter(function (navigationItem) {
            return navigationItem.title.toLowerCase().includes(value);
        });
    };
    /**
     * Toggle shortcut
     *
     * @param event
     * @param itemToToggle
     */
    FuseShortcutsComponent.prototype.toggleShortcut = function (event, itemToToggle) {
        event.stopPropagation();
        for (var i = 0; i < this.shortcutItems.length; i++) {
            if (this.shortcutItems[i].url === itemToToggle.url) {
                this.shortcutItems.splice(i, 1);
                // Save to the cookies
                this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
                return;
            }
        }
        this.shortcutItems.push(itemToToggle);
        // Save to the cookies
        this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
    };
    /**
     * Is in shortcuts?
     *
     * @param navigationItem
     * @returns {any}
     */
    FuseShortcutsComponent.prototype.isInShortcuts = function (navigationItem) {
        return this.shortcutItems.find(function (item) {
            return item.url === navigationItem.url;
        });
    };
    /**
     * On menu open
     */
    FuseShortcutsComponent.prototype.onMenuOpen = function () {
        var _this = this;
        setTimeout(function () {
            _this.searchInputField.nativeElement.focus();
        });
    };
    /**
     * Show mobile shortcuts
     */
    FuseShortcutsComponent.prototype.showMobileShortcutsPanel = function () {
        this.mobileShortcutsPanelActive = true;
        this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    };
    /**
     * Hide mobile shortcuts
     */
    FuseShortcutsComponent.prototype.hideMobileShortcutsPanel = function () {
        this.mobileShortcutsPanelActive = false;
        this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    };
    FuseShortcutsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-shortcuts',
                    template: "<div id=\"fuse-shortcuts\" #shortcuts>\n\n    <div class=\"shortcuts-mobile-toggle\" *ngIf=\"!mobileShortcutsPanelActive\" fxLayout=\"row\" fxLayoutAlign=\"start center\"\n         fxHide fxShow.lt-md>\n        <button mat-icon-button (click)=\"showMobileShortcutsPanel()\">\n            <mat-icon class=\"amber-600-fg\">star</mat-icon>\n        </button>\n    </div>\n\n    <div class=\"shortcuts\" fxLayout=\"row\" fxHide fxShow.gt-sm>\n\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex=\"0 1 auto\">\n\n            <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\n                <div class=\"w-40 h-40 p-4\" fxLayout=\"row\" fxLayoutAlign=\"center center\"\n                     *ngFor=\"let shortcutItem of shortcutItems\">\n\n                    <a mat-icon-button matTooltip=\"{{shortcutItem.title}}\" [routerLink]=\"shortcutItem.url\">\n                        <mat-icon class=\"secondary-text\" *ngIf=\"shortcutItem.icon\">{{shortcutItem.icon}}</mat-icon>\n                        <span *ngIf=\"!shortcutItem.icon\" class=\"h2 secondary-text text-bold\">\n                            {{shortcutItem.title.substr(0, 1).toUpperCase()}}\n                        </span>\n                    </a>\n\n                </div>\n\n                <button mat-icon-button [matMenuTriggerFor]=\"addMenu\" matTooltip=\"Click to add/remove shortcut\"\n                        (menuOpened)=\"onMenuOpen()\">\n                    <mat-icon class=\"amber-600-fg\">star</mat-icon>\n                </button>\n\n            </div>\n\n            <div class=\"shortcuts-mobile-close\" fxLayout=\"row\" fxLayoutAlign=\"start center\" fxHide fxShow.lt-md>\n                <button mat-icon-button (click)=\"hideMobileShortcutsPanel()\">\n                    <mat-icon>close</mat-icon>\n                </button>\n            </div>\n\n        </div>\n\n        <mat-menu #addMenu=\"matMenu\" class=\"w-240\">\n\n            <mat-form-field class=\"px-16 w-100-p\" (click)=\"$event.stopPropagation()\" floatLabel=\"never\">\n                <input #searchInput matInput placeholder=\"Search for an app or a page\" (input)=\"search($event)\">\n            </mat-form-field>\n\n            <mat-divider></mat-divider>\n\n            <mat-nav-list *ngIf=\"!searching\" style=\"max-height: 312px; overflow: auto\" fusePerfectScrollbar>\n\n                <mat-list-item *ngFor=\"let shortcutItem of shortcutItems\"\n                               (click)=\"toggleShortcut($event, shortcutItem)\">\n\n                    <div class=\"w-100-p\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\n                        <mat-icon mat-list-icon class=\"mr-8 secondary-text\" *ngIf=\"shortcutItem.icon\">\n                            {{shortcutItem.icon}}\n                        </mat-icon>\n\n                        <span class=\"h2 w-32 h-32 p-4 mr-8 secondary-text text-bold\" fxLayout=\"row\"\n                              fxLayoutAlign=\"center center\" *ngIf=\"!shortcutItem.icon\">\n                            {{shortcutItem.title.substr(0, 1).toUpperCase()}}\n                        </span>\n\n                        <p matLine fxFlex>{{shortcutItem.title}}</p>\n\n                        <mat-icon class=\"ml-8 amber-fg\">star</mat-icon>\n\n                    </div>\n\n                </mat-list-item>\n\n                <mat-list-item *ngIf=\"shortcutItems.length === 0\">\n                    <p>\n                        <small>No shortcuts yet!</small>\n                    </p>\n                </mat-list-item>\n\n            </mat-nav-list>\n\n            <mat-nav-list *ngIf=\"searching\" style=\"max-height: 312px; overflow: auto\" fusePerfectScrollbar>\n\n                <mat-list-item *ngFor=\"let navigationItem of filteredNavigationItems\"\n                               (click)=\"toggleShortcut($event, navigationItem)\">\n\n                    <div class=\"w-100-p\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\n                        <mat-icon mat-list-icon class=\"mr-8 secondary-text\" *ngIf=\"navigationItem.icon\">\n                            {{navigationItem.icon}}\n                        </mat-icon>\n\n                        <span class=\"h2 w-32 h-32 p-4 mr-8 secondary-text text-bold\" fxLayout=\"row\"\n                              fxLayoutAlign=\"center center\" *ngIf=\"!navigationItem.icon\">\n                            {{navigationItem.title.substr(0, 1).toUpperCase()}}\n                        </span>\n\n                        <p matLine fxFlex>{{navigationItem.title}}</p>\n\n                        <mat-icon class=\"ml-8 amber-fg\" *ngIf=\"isInShortcuts(navigationItem)\">star</mat-icon>\n\n                    </div>\n\n                </mat-list-item>\n\n            </mat-nav-list>\n\n        </mat-menu>\n\n    </div>\n\n</div>\n",
                    styles: ["@media screen and (max-width:959px){:host #fuse-shortcuts.show-mobile-panel{position:absolute;top:0;right:0;bottom:0;left:0;z-index:99;padding:0 8px}:host #fuse-shortcuts.show-mobile-panel .shortcuts{display:flex!important;flex:1;height:100%}:host #fuse-shortcuts.show-mobile-panel .shortcuts>div{flex:1 1 auto!important}}"]
                }] }
    ];
    /** @nocollapse */
    FuseShortcutsComponent.ctorParameters = function () { return [
        { type: CookieService },
        { type: FuseMatchMediaService },
        { type: FuseNavigationService },
        { type: MediaObserver },
        { type: Renderer2 }
    ]; };
    FuseShortcutsComponent.propDecorators = {
        navigation: [{ type: Input }],
        searchInputField: [{ type: ViewChild, args: ['searchInput',] }],
        shortcutsEl: [{ type: ViewChild, args: ['shortcuts',] }]
    };
    return FuseShortcutsComponent;
}());
export { FuseShortcutsComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2hvcnRjdXRzL3Nob3J0Y3V0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFekU7SUF5Qkk7Ozs7Ozs7O09BUUc7SUFDSCxnQ0FDWSxjQUE2QixFQUM3QixzQkFBNkMsRUFDN0Msc0JBQTZDLEVBQzdDLGNBQTZCLEVBQzdCLFNBQW9CO1FBSnBCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBdUI7UUFDN0MsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3QyxtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUM3QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRzVCLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsMEJBQTBCLEdBQUcsS0FBSyxDQUFDO1FBRXhDLDJCQUEyQjtRQUMzQixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUks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U0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7SUFFRDs7T0FFRztJQUNILHlEQUF3QixHQUF4QjtRQUVJLElBQUksQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUNwRixDQUFDOztnQkF2TkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBSyxnQkFBZ0I7b0JBQzdCLGl1SkFBeUM7O2lCQUU1Qzs7OztnQkFYUSxhQUFhO2dCQUliLHFCQUFxQjtnQkFDckIscUJBQXFCO2dCQU5yQixhQUFhO2dCQURvQyxTQUFTOzs7NkJBc0I5RCxLQUFLO21DQUdMLFNBQVMsU0FBQyxhQUFhOzhCQUd2QixTQUFTLFNBQUMsV0FBVzs7SUFxTTFCLDZCQUFDO0NBQUEsQUF4TkQsSUF3TkM7U0FuTlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZWRpYU9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvZmxleC1sYXlvdXQnO1xuaW1wb3J0IHsgQ29va2llU2VydmljZSB9IGZyb20gJ25neC1jb29raWUtc2VydmljZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZ1c2VNYXRjaE1lZGlhU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL21hdGNoLW1lZGlhLnNlcnZpY2UnO1xuaW1wb3J0IHsgRnVzZU5hdmlnYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciAgIDogJ2Z1c2Utc2hvcnRjdXRzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2hvcnRjdXRzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHMgIDogWycuL3Nob3J0Y3V0cy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VTaG9ydGN1dHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIHNob3J0Y3V0SXRlbXM6IGFueVtdO1xuICAgIG5hdmlnYXRpb25JdGVtczogYW55W107XG4gICAgZmlsdGVyZWROYXZpZ2F0aW9uSXRlbXM6IGFueVtdO1xuICAgIHNlYXJjaGluZzogYm9vbGVhbjtcbiAgICBtb2JpbGVTaG9ydGN1dHNQYW5lbEFjdGl2ZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpXG4gICAgbmF2aWdhdGlvbjogYW55O1xuXG4gICAgQFZpZXdDaGlsZCgnc2VhcmNoSW5wdXQnKVxuICAgIHNlYXJjaElucHV0RmllbGQ7XG5cbiAgICBAVmlld0NoaWxkKCdzaG9ydGN1dHMnKVxuICAgIHNob3J0Y3V0c0VsOiBFbGVtZW50UmVmO1xuXG4gICAgLy8gUHJpdmF0ZVxuICAgIHByaXZhdGUgX3Vuc3Vic2NyaWJlQWxsOiBTdWJqZWN0PGFueT47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtDb29raWVTZXJ2aWNlfSBfY29va2llU2VydmljZVxuICAgICAqIEBwYXJhbSB7RnVzZU1hdGNoTWVkaWFTZXJ2aWNlfSBfZnVzZU1hdGNoTWVkaWFTZXJ2aWNlXG4gICAgICogQHBhcmFtIHtGdXNlTmF2aWdhdGlvblNlcnZpY2V9IF9mdXNlTmF2aWdhdGlvblNlcnZpY2VcbiAgICAgKiBAcGFyYW0ge01lZGlhT2JzZXJ2ZXJ9IF9tZWRpYU9ic2VydmVyXG4gICAgICogQHBhcmFtIHtSZW5kZXJlcjJ9IF9yZW5kZXJlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9jb29raWVTZXJ2aWNlOiBDb29raWVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9mdXNlTWF0Y2hNZWRpYVNlcnZpY2U6IEZ1c2VNYXRjaE1lZGlhU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlOiBGdXNlTmF2aWdhdGlvblNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX21lZGlhT2JzZXJ2ZXI6IE1lZGlhT2JzZXJ2ZXIsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjJcbiAgICApXG4gICAge1xuICAgICAgICAvLyBTZXQgdGhlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuc2hvcnRjdXRJdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLnNlYXJjaGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1vYmlsZVNob3J0Y3V0c1BhbmVsQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBwcml2YXRlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgTGlmZWN5Y2xlIGhvb2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIE9uIGluaXRcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBHZXQgdGhlIG5hdmlnYXRpb24gaXRlbXMgYW5kIGZsYXR0ZW4gdGhlbVxuICAgICAgICB0aGlzLmZpbHRlcmVkTmF2aWdhdGlvbkl0ZW1zID0gdGhpcy5uYXZpZ2F0aW9uSXRlbXMgPSB0aGlzLl9mdXNlTmF2aWdhdGlvblNlcnZpY2UuZ2V0RmxhdE5hdmlnYXRpb24odGhpcy5uYXZpZ2F0aW9uKTtcblxuICAgICAgICBpZiAoIHRoaXMuX2Nvb2tpZVNlcnZpY2UuY2hlY2soJ0ZVU0UyLnNob3J0Y3V0cycpIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaG9ydGN1dEl0ZW1zID0gSlNPTi5wYXJzZSh0aGlzLl9jb29raWVTZXJ2aWNlLmdldCgnRlVTRTIuc2hvcnRjdXRzJykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgLy8gVXNlcidzIHNob3J0Y3V0IGl0ZW1zXG4gICAgICAgICAgICB0aGlzLnNob3J0Y3V0SXRlbXMgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAnQ2FsZW5kYXInLFxuICAgICAgICAgICAgICAgICAgICAndHlwZScgOiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICdpY29uJyA6ICd0b2RheScsXG4gICAgICAgICAgICAgICAgICAgICd1cmwnICA6ICcvYXBwcy9jYWxlbmRhcidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ01haWwnLFxuICAgICAgICAgICAgICAgICAgICAndHlwZScgOiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICdpY29uJyA6ICdlbWFpbCcsXG4gICAgICAgICAgICAgICAgICAgICd1cmwnICA6ICcvYXBwcy9tYWlsJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAndGl0bGUnOiAnQ29udGFjdHMnLFxuICAgICAgICAgICAgICAgICAgICAndHlwZScgOiAnaXRlbScsXG4gICAgICAgICAgICAgICAgICAgICdpY29uJyA6ICdhY2NvdW50X2JveCcsXG4gICAgICAgICAgICAgICAgICAgICd1cmwnICA6ICcvYXBwcy9jb250YWN0cydcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ1RvLURvJyxcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnIDogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAnaWNvbicgOiAnY2hlY2tfYm94JyxcbiAgICAgICAgICAgICAgICAgICAgJ3VybCcgIDogJy9hcHBzL3RvZG8nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN1YnNjcmliZSB0byBtZWRpYSBjaGFuZ2VzXG4gICAgICAgIHRoaXMuX2Z1c2VNYXRjaE1lZGlhU2VydmljZS5vbk1lZGlhQ2hhbmdlXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLl9tZWRpYU9ic2VydmVyLmlzQWN0aXZlKCdndC1zbScpIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZU1vYmlsZVNob3J0Y3V0c1BhbmVsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT24gZGVzdHJveVxuICAgICAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIFVuc3Vic2NyaWJlIGZyb20gYWxsIHN1YnNjcmlwdGlvbnNcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwubmV4dCgpO1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbC5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQdWJsaWMgbWV0aG9kc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2hcbiAgICAgKlxuICAgICAqIEBwYXJhbSBldmVudFxuICAgICAqL1xuICAgIHNlYXJjaChldmVudCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgaWYgKCB2YWx1ZSA9PT0gJycgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZE5hdmlnYXRpb25JdGVtcyA9IHRoaXMubmF2aWdhdGlvbkl0ZW1zO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlYXJjaGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5maWx0ZXJlZE5hdmlnYXRpb25JdGVtcyA9IHRoaXMubmF2aWdhdGlvbkl0ZW1zLmZpbHRlcigobmF2aWdhdGlvbkl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuYXZpZ2F0aW9uSXRlbS50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHNob3J0Y3V0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKiBAcGFyYW0gaXRlbVRvVG9nZ2xlXG4gICAgICovXG4gICAgdG9nZ2xlU2hvcnRjdXQoZXZlbnQsIGl0ZW1Ub1RvZ2dsZSk6IHZvaWRcbiAgICB7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuc2hvcnRjdXRJdGVtcy5sZW5ndGg7IGkrKyApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5zaG9ydGN1dEl0ZW1zW2ldLnVybCA9PT0gaXRlbVRvVG9nZ2xlLnVybCApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG9ydGN1dEl0ZW1zLnNwbGljZShpLCAxKTtcblxuICAgICAgICAgICAgICAgIC8vIFNhdmUgdG8gdGhlIGNvb2tpZXNcbiAgICAgICAgICAgICAgICB0aGlzLl9jb29raWVTZXJ2aWNlLnNldCgnRlVTRTIuc2hvcnRjdXRzJywgSlNPTi5zdHJpbmdpZnkodGhpcy5zaG9ydGN1dEl0ZW1zKSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNob3J0Y3V0SXRlbXMucHVzaChpdGVtVG9Ub2dnbGUpO1xuXG4gICAgICAgIC8vIFNhdmUgdG8gdGhlIGNvb2tpZXNcbiAgICAgICAgdGhpcy5fY29va2llU2VydmljZS5zZXQoJ0ZVU0UyLnNob3J0Y3V0cycsIEpTT04uc3RyaW5naWZ5KHRoaXMuc2hvcnRjdXRJdGVtcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElzIGluIHNob3J0Y3V0cz9cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYXZpZ2F0aW9uSXRlbVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgaXNJblNob3J0Y3V0cyhuYXZpZ2F0aW9uSXRlbSk6IGFueVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvcnRjdXRJdGVtcy5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udXJsID09PSBuYXZpZ2F0aW9uSXRlbS51cmw7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIG1lbnUgb3BlblxuICAgICAqL1xuICAgIG9uTWVudU9wZW4oKTogdm9pZFxuICAgIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93IG1vYmlsZSBzaG9ydGN1dHNcbiAgICAgKi9cbiAgICBzaG93TW9iaWxlU2hvcnRjdXRzUGFuZWwoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5tb2JpbGVTaG9ydGN1dHNQYW5lbEFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuc2hvcnRjdXRzRWwubmF0aXZlRWxlbWVudCwgJ3Nob3ctbW9iaWxlLXBhbmVsJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSBtb2JpbGUgc2hvcnRjdXRzXG4gICAgICovXG4gICAgaGlkZU1vYmlsZVNob3J0Y3V0c1BhbmVsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMubW9iaWxlU2hvcnRjdXRzUGFuZWxBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5zaG9ydGN1dHNFbC5uYXRpdmVFbGVtZW50LCAnc2hvdy1tb2JpbGUtcGFuZWwnKTtcbiAgICB9XG59XG4iXX0=