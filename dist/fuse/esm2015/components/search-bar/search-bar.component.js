import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FuseConfigService } from '../../services/config.service';
export class FuseSearchBarComponent {
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     */
    constructor(_fuseConfigService) {
        this._fuseConfigService = _fuseConfigService;
        // Set the defaults
        this.input = new EventEmitter();
        this.collapsed = true;
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
        // Subscribe to config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
            this.fuseConfig = config;
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
     * Collapse
     */
    collapse() {
        this.collapsed = true;
    }
    /**
     * Expand
     */
    expand() {
        this.collapsed = false;
    }
    /**
     * Search
     *
     * @param event
     */
    search(event) {
        this.input.emit(event.target.value);
    }
}
FuseSearchBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-search-bar',
                template: "<div class=\"fuse-search-bar\" [ngClass]=\"{'expanded':!collapsed}\">\n\n    <div class=\"fuse-search-bar-content\">\n\n        <label for=\"fuse-search-bar-input\">\n            <button mat-icon-button class=\"fuse-search-bar-expander\" aria-label=\"Expand Search Bar\" (click)=\"expand()\"\n                    *ngIf=\"collapsed\">\n                <mat-icon class=\"s-24 secondary-text\">search</mat-icon>\n            </button>\n        </label>\n\n        <input id=\"fuse-search-bar-input\" class=\"ml-24\" type=\"text\" placeholder=\"Search\" (input)=\"search($event)\"\n               fxFlex>\n\n        <button mat-icon-button class=\"fuse-search-bar-collapser\" (click)=\"collapse()\"\n                aria-label=\"Collapse Search Bar\">\n            <mat-icon class=\"s-24 secondary-text\">close</mat-icon>\n        </button>\n\n    </div>\n\n</div>",
                styles: [":host .fuse-search-bar{display:flex;flex:0 1 auto;min-width:64px;height:64px;font-size:13px}:host .fuse-search-bar .fuse-search-bar-content{display:flex;flex:1 1 auto;align-items:center;justify-content:flex-start}:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-collapser,:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-expander{cursor:pointer;padding:0 20px;margin:0;width:64px!important;height:64px!important;line-height:64px!important}@media screen and (max-width:599px){:host .fuse-search-bar{height:56px}:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-collapser,:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-expander{height:56px!important;line-height:56px!important}}:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-loader{width:64px!important;height:64px!important;line-height:64px!important}@media screen and (max-width:599px){:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-loader{height:56px!important;line-height:56px!important}}:host .fuse-search-bar .fuse-search-bar-content .fuse-search-bar-collapser{display:none}:host .fuse-search-bar .fuse-search-bar-content #fuse-search-bar-input{display:none;flex:1 0 auto;min-height:64px;font-size:16px;background-color:transparent;color:currentColor}:host .fuse-search-bar.expanded{position:absolute;top:0;right:0;bottom:0;left:0;z-index:10}:host .fuse-search-bar.expanded .fuse-search-bar-content #fuse-search-bar-input{display:flex}:host .fuse-search-bar.expanded .fuse-search-bar-content .fuse-search-bar-collapser{display:flex}:host body.fuse-search-bar-expanded #toolbar{z-index:999!important}"]
            }] }
];
/** @nocollapse */
FuseSearchBarComponent.ctorParameters = () => [
    { type: FuseConfigService }
];
FuseSearchBarComponent.propDecorators = {
    input: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3NlYXJjaC1iYXIvc2VhcmNoLWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQXFCLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQU9sRSxNQUFNLE9BQU8sc0JBQXNCO0lBVy9COzs7O09BSUc7SUFDSCxZQUNZLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBRzdDLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxRQUFRO1FBRUosOEJBQThCO1FBQzlCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNO2FBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2FBQ3JDLFNBQVMsQ0FDTixDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDN0IsQ0FBQyxDQUNKLENBQUM7SUFDVixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBRVAscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG1CQUFtQjtJQUNuQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxRQUFRO1FBRUosSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUVGLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLEtBQUs7UUFFUixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7OztZQTFGSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFLLGlCQUFpQjtnQkFDOUIsdzJCQUEwQzs7YUFFN0M7Ozs7WUFOUSxpQkFBaUI7OztvQkFZckIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEZ1c2VDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29uZmlnLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciAgIDogJ2Z1c2Utc2VhcmNoLWJhcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlYXJjaC1iYXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJscyAgOiBbJy4vc2VhcmNoLWJhci5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VTZWFyY2hCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxue1xuICAgIGNvbGxhcHNlZDogYm9vbGVhbjtcbiAgICBmdXNlQ29uZmlnOiBhbnk7XG5cbiAgICBAT3V0cHV0KClcbiAgICBpbnB1dDogRXZlbnRFbWl0dGVyPGFueT47XG5cbiAgICAvLyBQcml2YXRlXG4gICAgcHJpdmF0ZSBfdW5zdWJzY3JpYmVBbGw6IFN1YmplY3Q8YW55PjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1c2VDb25maWdTZXJ2aWNlfSBfZnVzZUNvbmZpZ1NlcnZpY2VcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZnVzZUNvbmZpZ1NlcnZpY2U6IEZ1c2VDb25maWdTZXJ2aWNlXG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBwcml2YXRlIGRlZmF1bHRzXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgTGlmZWN5Y2xlIGhvb2tzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIE9uIGluaXRcbiAgICAgKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBTdWJzY3JpYmUgdG8gY29uZmlnIGNoYW5nZXNcbiAgICAgICAgdGhpcy5fZnVzZUNvbmZpZ1NlcnZpY2UuY29uZmlnXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fdW5zdWJzY3JpYmVBbGwpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoY29uZmlnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnVzZUNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9uIGRlc3Ryb3lcbiAgICAgKi9cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkXG4gICAge1xuICAgICAgICAvLyBVbnN1YnNjcmliZSBmcm9tIGFsbCBzdWJzY3JpcHRpb25zXG4gICAgICAgIHRoaXMuX3Vuc3Vic2NyaWJlQWxsLm5leHQoKTtcbiAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmVBbGwuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgUHVibGljIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQ29sbGFwc2VcbiAgICAgKi9cbiAgICBjb2xsYXBzZSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXhwYW5kXG4gICAgICovXG4gICAgZXhwYW5kKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMuY29sbGFwc2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBzZWFyY2goZXZlbnQpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmlucHV0LmVtaXQoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICB9XG5cbn1cbiJdfQ==