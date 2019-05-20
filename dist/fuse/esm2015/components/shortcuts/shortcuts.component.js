import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseMatchMediaService } from '../../services/match-media.service';
import { FuseNavigationService } from '../navigation/navigation.service';
export class FuseShortcutsComponent {
    /**
     * Constructor
     *
     * @param {CookieService} _cookieService
     * @param {FuseMatchMediaService} _fuseMatchMediaService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {MediaObserver} _mediaObserver
     * @param {Renderer2} _renderer
     */
    constructor(_cookieService, _fuseMatchMediaService, _fuseNavigationService, _mediaObserver, _renderer) {
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
    ngOnInit() {
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
            .subscribe(() => {
            if (this._mediaObserver.isActive('gt-sm')) {
                this.hideMobileShortcutsPanel();
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Search
     *
     * @param event
     */
    search(event) {
        const value = event.target.value.toLowerCase();
        if (value === '') {
            this.searching = false;
            this.filteredNavigationItems = this.navigationItems;
            return;
        }
        this.searching = true;
        this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
            return navigationItem.title.toLowerCase().includes(value);
        });
    }
    /**
     * Toggle shortcut
     *
     * @param event
     * @param itemToToggle
     */
    toggleShortcut(event, itemToToggle) {
        event.stopPropagation();
        for (let i = 0; i < this.shortcutItems.length; i++) {
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
    }
    /**
     * Is in shortcuts?
     *
     * @param navigationItem
     * @returns {any}
     */
    isInShortcuts(navigationItem) {
        return this.shortcutItems.find(item => {
            return item.url === navigationItem.url;
        });
    }
    /**
     * On menu open
     */
    onMenuOpen() {
        setTimeout(() => {
            this.searchInputField.nativeElement.focus();
        });
    }
    /**
     * Show mobile shortcuts
     */
    showMobileShortcutsPanel() {
        this.mobileShortcutsPanelActive = true;
        this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }
    /**
     * Hide mobile shortcuts
     */
    hideMobileShortcutsPanel() {
        this.mobileShortcutsPanelActive = false;
        this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
    }
}
FuseShortcutsComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-shortcuts',
                template: "<div id=\"fuse-shortcuts\" #shortcuts>\n\n    <div class=\"shortcuts-mobile-toggle\" *ngIf=\"!mobileShortcutsPanelActive\" fxLayout=\"row\" fxLayoutAlign=\"start center\"\n         fxHide fxShow.lt-md>\n        <button mat-icon-button (click)=\"showMobileShortcutsPanel()\">\n            <mat-icon class=\"amber-600-fg\">star</mat-icon>\n        </button>\n    </div>\n\n    <div class=\"shortcuts\" fxLayout=\"row\" fxHide fxShow.gt-sm>\n\n        <div fxLayout=\"row\" fxLayoutAlign=\"space-between center\" fxFlex=\"0 1 auto\">\n\n            <div fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\n                <div class=\"w-40 h-40 p-4\" fxLayout=\"row\" fxLayoutAlign=\"center center\"\n                     *ngFor=\"let shortcutItem of shortcutItems\">\n\n                    <a mat-icon-button matTooltip=\"{{shortcutItem.title}}\" [routerLink]=\"shortcutItem.url\">\n                        <mat-icon class=\"secondary-text\" *ngIf=\"shortcutItem.icon\">{{shortcutItem.icon}}</mat-icon>\n                        <span *ngIf=\"!shortcutItem.icon\" class=\"h2 secondary-text text-bold\">\n                            {{shortcutItem.title.substr(0, 1).toUpperCase()}}\n                        </span>\n                    </a>\n\n                </div>\n\n                <button mat-icon-button [matMenuTriggerFor]=\"addMenu\" matTooltip=\"Click to add/remove shortcut\"\n                        (menuOpened)=\"onMenuOpen()\">\n                    <mat-icon class=\"amber-600-fg\">star</mat-icon>\n                </button>\n\n            </div>\n\n            <div class=\"shortcuts-mobile-close\" fxLayout=\"row\" fxLayoutAlign=\"start center\" fxHide fxShow.lt-md>\n                <button mat-icon-button (click)=\"hideMobileShortcutsPanel()\">\n                    <mat-icon>close</mat-icon>\n                </button>\n            </div>\n\n        </div>\n\n        <mat-menu #addMenu=\"matMenu\" class=\"w-240\">\n\n            <mat-form-field class=\"px-16 w-100-p\" (click)=\"$event.stopPropagation()\" floatLabel=\"never\">\n                <input #searchInput matInput placeholder=\"Search for an app or a page\" (input)=\"search($event)\">\n            </mat-form-field>\n\n            <mat-divider></mat-divider>\n\n            <mat-nav-list *ngIf=\"!searching\" style=\"max-height: 312px; overflow: auto\" fusePerfectScrollbar>\n\n                <mat-list-item *ngFor=\"let shortcutItem of shortcutItems\"\n                               (click)=\"toggleShortcut($event, shortcutItem)\">\n\n                    <div class=\"w-100-p\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\n                        <mat-icon mat-list-icon class=\"mr-8 secondary-text\" *ngIf=\"shortcutItem.icon\">\n                            {{shortcutItem.icon}}\n                        </mat-icon>\n\n                        <span class=\"h2 w-32 h-32 p-4 mr-8 secondary-text text-bold\" fxLayout=\"row\"\n                              fxLayoutAlign=\"center center\" *ngIf=\"!shortcutItem.icon\">\n                            {{shortcutItem.title.substr(0, 1).toUpperCase()}}\n                        </span>\n\n                        <p matLine fxFlex>{{shortcutItem.title}}</p>\n\n                        <mat-icon class=\"ml-8 amber-fg\">star</mat-icon>\n\n                    </div>\n\n                </mat-list-item>\n\n                <mat-list-item *ngIf=\"shortcutItems.length === 0\">\n                    <p>\n                        <small>No shortcuts yet!</small>\n                    </p>\n                </mat-list-item>\n\n            </mat-nav-list>\n\n            <mat-nav-list *ngIf=\"searching\" style=\"max-height: 312px; overflow: auto\" fusePerfectScrollbar>\n\n                <mat-list-item *ngFor=\"let navigationItem of filteredNavigationItems\"\n                               (click)=\"toggleShortcut($event, navigationItem)\">\n\n                    <div class=\"w-100-p\" fxLayout=\"row\" fxLayoutAlign=\"start center\">\n\n                        <mat-icon mat-list-icon class=\"mr-8 secondary-text\" *ngIf=\"navigationItem.icon\">\n                            {{navigationItem.icon}}\n                        </mat-icon>\n\n                        <span class=\"h2 w-32 h-32 p-4 mr-8 secondary-text text-bold\" fxLayout=\"row\"\n                              fxLayoutAlign=\"center center\" *ngIf=\"!navigationItem.icon\">\n                            {{navigationItem.title.substr(0, 1).toUpperCase()}}\n                        </span>\n\n                        <p matLine fxFlex>{{navigationItem.title}}</p>\n\n                        <mat-icon class=\"ml-8 amber-fg\" *ngIf=\"isInShortcuts(navigationItem)\">star</mat-icon>\n\n                    </div>\n\n                </mat-list-item>\n\n            </mat-nav-list>\n\n        </mat-menu>\n\n    </div>\n\n</div>\n",
                styles: ["@media screen and (max-width:959px){:host #fuse-shortcuts.show-mobile-panel{position:absolute;top:0;right:0;bottom:0;left:0;z-index:99;padding:0 8px}:host #fuse-shortcuts.show-mobile-panel .shortcuts{display:flex!important;flex:1;height:100%}:host #fuse-shortcuts.show-mobile-panel .shortcuts>div{flex:1 1 auto!important}}"]
            }] }
];
/** @nocollapse */
FuseShortcutsComponent.ctorParameters = () => [
    { type: CookieService },
    { type: FuseMatchMediaService },
    { type: FuseNavigationService },
    { type: MediaObserver },
    { type: Renderer2 }
];
FuseShortcutsComponent.propDecorators = {
    navigation: [{ type: Input }],
    searchInputField: [{ type: ViewChild, args: ['searchInput',] }],
    shortcutsEl: [{ type: ViewChild, args: ['shortcuts',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRjdXRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvc2hvcnRjdXRzL3Nob3J0Y3V0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFPekUsTUFBTSxPQUFPLHNCQUFzQjtJQW9CL0I7Ozs7Ozs7O09BUUc7SUFDSCxZQUNZLGNBQTZCLEVBQzdCLHNCQUE2QyxFQUM3QyxzQkFBNkMsRUFDN0MsY0FBNkIsRUFDN0IsU0FBb0I7UUFKcEIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDN0IsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3QywyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXVCO1FBQzdDLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQzdCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFHNUIsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUM7UUFFeEMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxRQUFRO1FBRUosNENBQTRDO1FBQzVDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckgsSUFBSyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUNqRDtZQUNJLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7U0FDL0U7YUFFRDtZQUNJLHdCQUF3QjtZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHO2dCQUNqQjtvQkFDSSxPQUFPLEVBQUUsVUFBVTtvQkFDbkIsTUFBTSxFQUFHLE1BQU07b0JBQ2YsTUFBTSxFQUFHLE9BQU87b0JBQ2hCLEtBQUssRUFBSSxnQkFBZ0I7aUJBQzVCO2dCQUNEO29CQUNJLE9BQU8sRUFBRSxNQUFNO29CQUNmLE1BQU0sRUFBRyxNQUFNO29CQUNmLE1BQU0sRUFBRyxPQUFPO29CQUNoQixLQUFLLEVBQUksWUFBWTtpQkFDeEI7Z0JBQ0Q7b0JBQ0ksT0FBTyxFQUFFLFVBQVU7b0JBQ25CLE1BQU0sRUFBRyxNQUFNO29CQUNmLE1BQU0sRUFBRyxhQUFhO29CQUN0QixLQUFLLEVBQUksZ0JBQWdCO2lCQUM1QjtnQkFDRDtvQkFDSSxPQUFPLEVBQUUsT0FBTztvQkFDaEIsTUFBTSxFQUFHLE1BQU07b0JBQ2YsTUFBTSxFQUFHLFdBQVc7b0JBQ3BCLEtBQUssRUFBSSxZQUFZO2lCQUN4QjthQUNKLENBQUM7U0FDTDtRQUVELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsc0JBQXNCLENBQUMsYUFBYTthQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzthQUNyQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFDMUM7Z0JBQ0ksSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7YUFDbkM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRDs7T0FFRztJQUNILFdBQVc7UUFFUCxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsbUJBQW1CO0lBQ25CLHdHQUF3RztJQUV4Rzs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLEtBQUs7UUFFUixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUUvQyxJQUFLLEtBQUssS0FBSyxFQUFFLEVBQ2pCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFFcEQsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDMUUsT0FBTyxjQUFjLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNILGNBQWMsQ0FBQyxLQUFLLEVBQUUsWUFBWTtRQUU5QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFeEIsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUNuRDtZQUNJLElBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssWUFBWSxDQUFDLEdBQUcsRUFDbkQ7Z0JBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUVoQyxzQkFBc0I7Z0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBRS9FLE9BQU87YUFDVjtTQUNKO1FBRUQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFdEMsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsYUFBYSxDQUFDLGNBQWM7UUFFeEIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyxHQUFHLEtBQUssY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVU7UUFFTixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7T0FFRztJQUNILHdCQUF3QjtRQUVwQixJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVEOztPQUVHO0lBQ0gsd0JBQXdCO1FBRXBCLElBQUksQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztJQUNwRixDQUFDOzs7WUF2TkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBSyxnQkFBZ0I7Z0JBQzdCLGl1SkFBeUM7O2FBRTVDOzs7O1lBWFEsYUFBYTtZQUliLHFCQUFxQjtZQUNyQixxQkFBcUI7WUFOckIsYUFBYTtZQURvQyxTQUFTOzs7eUJBc0I5RCxLQUFLOytCQUdMLFNBQVMsU0FBQyxhQUFhOzBCQUd2QixTQUFTLFNBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFPYnNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2ZsZXgtbGF5b3V0JztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBGdXNlTWF0Y2hNZWRpYVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9tYXRjaC1tZWRpYS5zZXJ2aWNlJztcbmltcG9ydCB7IEZ1c2VOYXZpZ2F0aW9uU2VydmljZSB9IGZyb20gJy4uL25hdmlnYXRpb24vbmF2aWdhdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3IgICA6ICdmdXNlLXNob3J0Y3V0cycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3Nob3J0Y3V0cy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzICA6IFsnLi9zaG9ydGN1dHMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGdXNlU2hvcnRjdXRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgICBzaG9ydGN1dEl0ZW1zOiBhbnlbXTtcbiAgICBuYXZpZ2F0aW9uSXRlbXM6IGFueVtdO1xuICAgIGZpbHRlcmVkTmF2aWdhdGlvbkl0ZW1zOiBhbnlbXTtcbiAgICBzZWFyY2hpbmc6IGJvb2xlYW47XG4gICAgbW9iaWxlU2hvcnRjdXRzUGFuZWxBY3RpdmU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKVxuICAgIG5hdmlnYXRpb246IGFueTtcblxuICAgIEBWaWV3Q2hpbGQoJ3NlYXJjaElucHV0JylcbiAgICBzZWFyY2hJbnB1dEZpZWxkO1xuXG4gICAgQFZpZXdDaGlsZCgnc2hvcnRjdXRzJylcbiAgICBzaG9ydGN1dHNFbDogRWxlbWVudFJlZjtcblxuICAgIC8vIFByaXZhdGVcbiAgICBwcml2YXRlIF91bnN1YnNjcmliZUFsbDogU3ViamVjdDxhbnk+O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Q29va2llU2VydmljZX0gX2Nvb2tpZVNlcnZpY2VcbiAgICAgKiBAcGFyYW0ge0Z1c2VNYXRjaE1lZGlhU2VydmljZX0gX2Z1c2VNYXRjaE1lZGlhU2VydmljZVxuICAgICAqIEBwYXJhbSB7RnVzZU5hdmlnYXRpb25TZXJ2aWNlfSBfZnVzZU5hdmlnYXRpb25TZXJ2aWNlXG4gICAgICogQHBhcmFtIHtNZWRpYU9ic2VydmVyfSBfbWVkaWFPYnNlcnZlclxuICAgICAqIEBwYXJhbSB7UmVuZGVyZXIyfSBfcmVuZGVyZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfY29va2llU2VydmljZTogQ29va2llU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBfZnVzZU1hdGNoTWVkaWFTZXJ2aWNlOiBGdXNlTWF0Y2hNZWRpYVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgX2Z1c2VOYXZpZ2F0aW9uU2VydmljZTogRnVzZU5hdmlnYXRpb25TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIF9tZWRpYU9ic2VydmVyOiBNZWRpYU9ic2VydmVyLFxuICAgICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLnNob3J0Y3V0SXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5zZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tb2JpbGVTaG9ydGN1dHNQYW5lbEFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIFNldCB0aGUgcHJpdmF0ZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLl91bnN1YnNjcmliZUFsbCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIExpZmVjeWNsZSBob29rc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBPbiBpbml0XG4gICAgICovXG4gICAgbmdPbkluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gR2V0IHRoZSBuYXZpZ2F0aW9uIGl0ZW1zIGFuZCBmbGF0dGVuIHRoZW1cbiAgICAgICAgdGhpcy5maWx0ZXJlZE5hdmlnYXRpb25JdGVtcyA9IHRoaXMubmF2aWdhdGlvbkl0ZW1zID0gdGhpcy5fZnVzZU5hdmlnYXRpb25TZXJ2aWNlLmdldEZsYXROYXZpZ2F0aW9uKHRoaXMubmF2aWdhdGlvbik7XG5cbiAgICAgICAgaWYgKCB0aGlzLl9jb29raWVTZXJ2aWNlLmNoZWNrKCdGVVNFMi5zaG9ydGN1dHMnKSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hvcnRjdXRJdGVtcyA9IEpTT04ucGFyc2UodGhpcy5fY29va2llU2VydmljZS5nZXQoJ0ZVU0UyLnNob3J0Y3V0cycpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIFVzZXIncyBzaG9ydGN1dCBpdGVtc1xuICAgICAgICAgICAgdGhpcy5zaG9ydGN1dEl0ZW1zID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ0NhbGVuZGFyJyxcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnIDogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAnaWNvbicgOiAndG9kYXknLFxuICAgICAgICAgICAgICAgICAgICAndXJsJyAgOiAnL2FwcHMvY2FsZW5kYXInXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdNYWlsJyxcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnIDogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAnaWNvbicgOiAnZW1haWwnLFxuICAgICAgICAgICAgICAgICAgICAndXJsJyAgOiAnL2FwcHMvbWFpbCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgJ3RpdGxlJzogJ0NvbnRhY3RzJyxcbiAgICAgICAgICAgICAgICAgICAgJ3R5cGUnIDogJ2l0ZW0nLFxuICAgICAgICAgICAgICAgICAgICAnaWNvbicgOiAnYWNjb3VudF9ib3gnLFxuICAgICAgICAgICAgICAgICAgICAndXJsJyAgOiAnL2FwcHMvY29udGFjdHMnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICd0aXRsZSc6ICdUby1EbycsXG4gICAgICAgICAgICAgICAgICAgICd0eXBlJyA6ICdpdGVtJyxcbiAgICAgICAgICAgICAgICAgICAgJ2ljb24nIDogJ2NoZWNrX2JveCcsXG4gICAgICAgICAgICAgICAgICAgICd1cmwnICA6ICcvYXBwcy90b2RvJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gbWVkaWEgY2hhbmdlc1xuICAgICAgICB0aGlzLl9mdXNlTWF0Y2hNZWRpYVNlcnZpY2Uub25NZWRpYUNoYW5nZVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX3Vuc3Vic2NyaWJlQWxsKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICggdGhpcy5fbWVkaWFPYnNlcnZlci5pc0FjdGl2ZSgnZ3Qtc20nKSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGVNb2JpbGVTaG9ydGN1dHNQYW5lbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBVbnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLm5leHQoKTtcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgUHVibGljIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBzZWFyY2goZXZlbnQpOiB2b2lkXG4gICAge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIGlmICggdmFsdWUgPT09ICcnIClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROYXZpZ2F0aW9uSXRlbXMgPSB0aGlzLm5hdmlnYXRpb25JdGVtcztcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWFyY2hpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyZWROYXZpZ2F0aW9uSXRlbXMgPSB0aGlzLm5hdmlnYXRpb25JdGVtcy5maWx0ZXIoKG5hdmlnYXRpb25JdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmF2aWdhdGlvbkl0ZW0udGl0bGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBzaG9ydGN1dFxuICAgICAqXG4gICAgICogQHBhcmFtIGV2ZW50XG4gICAgICogQHBhcmFtIGl0ZW1Ub1RvZ2dsZVxuICAgICAqL1xuICAgIHRvZ2dsZVNob3J0Y3V0KGV2ZW50LCBpdGVtVG9Ub2dnbGUpOiB2b2lkXG4gICAge1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnNob3J0Y3V0SXRlbXMubGVuZ3RoOyBpKysgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuc2hvcnRjdXRJdGVtc1tpXS51cmwgPT09IGl0ZW1Ub1RvZ2dsZS51cmwgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvcnRjdXRJdGVtcy5zcGxpY2UoaSwgMSk7XG5cbiAgICAgICAgICAgICAgICAvLyBTYXZlIHRvIHRoZSBjb29raWVzXG4gICAgICAgICAgICAgICAgdGhpcy5fY29va2llU2VydmljZS5zZXQoJ0ZVU0UyLnNob3J0Y3V0cycsIEpTT04uc3RyaW5naWZ5KHRoaXMuc2hvcnRjdXRJdGVtcykpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zaG9ydGN1dEl0ZW1zLnB1c2goaXRlbVRvVG9nZ2xlKTtcblxuICAgICAgICAvLyBTYXZlIHRvIHRoZSBjb29raWVzXG4gICAgICAgIHRoaXMuX2Nvb2tpZVNlcnZpY2Uuc2V0KCdGVVNFMi5zaG9ydGN1dHMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLnNob3J0Y3V0SXRlbXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJcyBpbiBzaG9ydGN1dHM/XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbmF2aWdhdGlvbkl0ZW1cbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGlzSW5TaG9ydGN1dHMobmF2aWdhdGlvbkl0ZW0pOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3J0Y3V0SXRlbXMuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnVybCA9PT0gbmF2aWdhdGlvbkl0ZW0udXJsO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPbiBtZW51IG9wZW5cbiAgICAgKi9cbiAgICBvbk1lbnVPcGVuKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hJbnB1dEZpZWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvdyBtb2JpbGUgc2hvcnRjdXRzXG4gICAgICovXG4gICAgc2hvd01vYmlsZVNob3J0Y3V0c1BhbmVsKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMubW9iaWxlU2hvcnRjdXRzUGFuZWxBY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLnNob3J0Y3V0c0VsLm5hdGl2ZUVsZW1lbnQsICdzaG93LW1vYmlsZS1wYW5lbCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUgbW9iaWxlIHNob3J0Y3V0c1xuICAgICAqL1xuICAgIGhpZGVNb2JpbGVTaG9ydGN1dHNQYW5lbCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLm1vYmlsZVNob3J0Y3V0c1BhbmVsQWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuc2hvcnRjdXRzRWwubmF0aXZlRWxlbWVudCwgJ3Nob3ctbW9iaWxlLXBhbmVsJyk7XG4gICAgfVxufVxuIl19