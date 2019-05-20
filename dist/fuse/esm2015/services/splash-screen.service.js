import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
export class FuseSplashScreenService {
    /**
     * Constructor
     *
     * @param {AnimationBuilder} _animationBuilder
     * @param _document
     * @param {Router} _router
     */
    constructor(_animationBuilder, _document, _router) {
        this._animationBuilder = _animationBuilder;
        this._document = _document;
        this._router = _router;
        // Initialize
        this._init();
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Initialize
     *
     * @private
     */
    _init() {
        // Get the splash screen element
        this.splashScreenEl = this._document.body.querySelector('#fuse-splash-screen');
        // If the splash screen element exists...
        if (this.splashScreenEl) {
            // Hide it on the first NavigationEnd event
            this._router.events
                .pipe(filter((event => event instanceof NavigationEnd)), take(1))
                .subscribe(() => {
                setTimeout(() => {
                    this.hide();
                });
            });
        }
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Show the splash screen
     */
    show() {
        this.player =
            this._animationBuilder
                .build([
                style({
                    opacity: '0',
                    zIndex: '99999'
                }),
                animate('400ms ease', style({ opacity: '1' }))
            ]).create(this.splashScreenEl);
        setTimeout(() => {
            this.player.play();
        }, 0);
    }
    /**
     * Hide the splash screen
     */
    hide() {
        this.player =
            this._animationBuilder
                .build([
                style({ opacity: '1' }),
                animate('400ms ease', style({
                    opacity: '0',
                    zIndex: '-10'
                }))
            ]).create(this.splashScreenEl);
        setTimeout(() => {
            this.player.play();
        }, 0);
    }
}
FuseSplashScreenService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
FuseSplashScreenService.ctorParameters = () => [
    { type: AnimationBuilder },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: Router }
];
FuseSplashScreenService.ngInjectableDef = i0.defineInjectable({ factory: function FuseSplashScreenService_Factory() { return new FuseSplashScreenService(i0.inject(i1.AnimationBuilder), i0.inject(i2.DOCUMENT), i0.inject(i3.Router)); }, token: FuseSplashScreenService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsYXNoLXNjcmVlbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsic2VydmljZXMvc3BsYXNoLXNjcmVlbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFtQixLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN4RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXhELE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7O0FBSzlDLE1BQU0sT0FBTyx1QkFBdUI7SUFLaEM7Ozs7OztPQU1HO0lBQ0gsWUFDWSxpQkFBbUMsRUFDakIsU0FBYyxFQUNoQyxPQUFlO1FBRmYsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFLO1FBQ2hDLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFHdkIsYUFBYTtRQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7Ozs7T0FJRztJQUNLLEtBQUs7UUFFVCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUUvRSx5Q0FBeUM7UUFDekMsSUFBSyxJQUFJLENBQUMsY0FBYyxFQUN4QjtZQUNJLDJDQUEyQztZQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU07aUJBQ2QsSUFBSSxDQUNELE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLGFBQWEsQ0FBQyxDQUFDLEVBQ2pELElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDVjtpQkFDQSxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNaLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNoQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ1Y7SUFDTCxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG1CQUFtQjtJQUNuQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxJQUFJO1FBRUEsSUFBSSxDQUFDLE1BQU07WUFDUCxJQUFJLENBQUMsaUJBQWlCO2lCQUNqQixLQUFLLENBQUM7Z0JBQ0gsS0FBSyxDQUFDO29CQUNGLE9BQU8sRUFBRSxHQUFHO29CQUNaLE1BQU0sRUFBRyxPQUFPO2lCQUNuQixDQUFDO2dCQUNGLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7YUFDL0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFFdkMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1YsQ0FBQztJQUVEOztPQUVHO0lBQ0gsSUFBSTtRQUVBLElBQUksQ0FBQyxNQUFNO1lBQ1AsSUFBSSxDQUFDLGlCQUFpQjtpQkFDakIsS0FBSyxDQUFDO2dCQUNILEtBQUssQ0FBQyxFQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUMsQ0FBQztnQkFDckIsT0FBTyxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUM7b0JBQ3hCLE9BQU8sRUFBRSxHQUFHO29CQUNaLE1BQU0sRUFBRyxLQUFLO2lCQUNqQixDQUFDLENBQUM7YUFDTixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUV2QyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDVixDQUFDOzs7WUFsR0osVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCOzs7O1lBUGlCLGdCQUFnQjs0Q0FzQnpCLE1BQU0sU0FBQyxRQUFRO1lBckJBLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkJ1aWxkZXIsIEFuaW1hdGlvblBsYXllciwgc3R5bGUgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IE5hdmlnYXRpb25FbmQsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IGZpbHRlciwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGdXNlU3BsYXNoU2NyZWVuU2VydmljZVxue1xuICAgIHNwbGFzaFNjcmVlbkVsOiBhbnk7XG4gICAgcGxheWVyOiBBbmltYXRpb25QbGF5ZXI7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtBbmltYXRpb25CdWlsZGVyfSBfYW5pbWF0aW9uQnVpbGRlclxuICAgICAqIEBwYXJhbSBfZG9jdW1lbnRcbiAgICAgKiBAcGFyYW0ge1JvdXRlcn0gX3JvdXRlclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIF9hbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxuICAgICAgICBwcml2YXRlIF9yb3V0ZXI6IFJvdXRlclxuICAgIClcbiAgICB7XG4gICAgICAgIC8vIEluaXRpYWxpemVcbiAgICAgICAgdGhpcy5faW5pdCgpO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBQcml2YXRlIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIF9pbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIEdldCB0aGUgc3BsYXNoIHNjcmVlbiBlbGVtZW50XG4gICAgICAgIHRoaXMuc3BsYXNoU2NyZWVuRWwgPSB0aGlzLl9kb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoJyNmdXNlLXNwbGFzaC1zY3JlZW4nKTtcblxuICAgICAgICAvLyBJZiB0aGUgc3BsYXNoIHNjcmVlbiBlbGVtZW50IGV4aXN0cy4uLlxuICAgICAgICBpZiAoIHRoaXMuc3BsYXNoU2NyZWVuRWwgKVxuICAgICAgICB7XG4gICAgICAgICAgICAvLyBIaWRlIGl0IG9uIHRoZSBmaXJzdCBOYXZpZ2F0aW9uRW5kIGV2ZW50XG4gICAgICAgICAgICB0aGlzLl9yb3V0ZXIuZXZlbnRzXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcigoZXZlbnQgPT4gZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kKSksXG4gICAgICAgICAgICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFB1YmxpYyBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIHNwbGFzaCBzY3JlZW5cbiAgICAgKi9cbiAgICBzaG93KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIHRoaXMucGxheWVyID1cbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGlvbkJ1aWxkZXJcbiAgICAgICAgICAgICAgICAuYnVpbGQoW1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB6SW5kZXggOiAnOTk5OTknXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlKCc0MDBtcyBlYXNlJywgc3R5bGUoe29wYWNpdHk6ICcxJ30pKVxuICAgICAgICAgICAgICAgIF0pLmNyZWF0ZSh0aGlzLnNwbGFzaFNjcmVlbkVsKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBsYXkoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgc3BsYXNoIHNjcmVlblxuICAgICAqL1xuICAgIGhpZGUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPVxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0aW9uQnVpbGRlclxuICAgICAgICAgICAgICAgIC5idWlsZChbXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlKHtvcGFjaXR5OiAnMSd9KSxcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZSgnNDAwbXMgZWFzZScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6ICcwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHpJbmRleCA6ICctMTAnXG4gICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgIF0pLmNyZWF0ZSh0aGlzLnNwbGFzaFNjcmVlbkVsKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnBsYXkoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfVxufVxuIl19