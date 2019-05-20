import { Component, ContentChildren, ElementRef, HostBinding, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { FuseWidgetToggleDirective } from './widget-toggle.directive';
export class FuseWidgetComponent {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.flipped = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * After content init
     */
    ngAfterContentInit() {
        // Listen for the flip button click
        setTimeout(() => {
            this.toggleButtons.forEach(flipButton => {
                this._renderer.listen(flipButton.elementRef.nativeElement, 'click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    this.toggle();
                });
            });
        });
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle the flipped status
     */
    toggle() {
        this.flipped = !this.flipped;
    }
}
FuseWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-widget',
                template: "<ng-content></ng-content>\n",
                encapsulation: ViewEncapsulation.None,
                styles: ["fuse-widget{display:block;position:relative;-webkit-perspective:3000px;perspective:3000px;padding:12px}fuse-widget>div{position:relative;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;transition:transform 1s;transition:transform 1s,-webkit-transform 1s}fuse-widget>.fuse-widget-front{display:flex;flex-direction:column;flex:1 1 auto;position:relative;overflow:hidden;visibility:visible;width:100%;opacity:1;z-index:10;border-radius:8px;transition:transform .5s ease-out,visibility ease-in .2s,opacity ease-in .2s,-webkit-transform .5s ease-out;-webkit-transform:rotateY(0);transform:rotateY(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;border:1px solid}fuse-widget>.fuse-widget-back{display:block;position:absolute;top:12px;right:12px;bottom:12px;left:12px;overflow:hidden;visibility:hidden;opacity:0;z-index:10;border-radius:8px;transition:transform .5s ease-out,visibility ease-in .2s,opacity ease-in .2s,-webkit-transform .5s ease-out;-webkit-transform:rotateY(180deg);transform:rotateY(180deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;border:1px solid}fuse-widget>.fuse-widget-back [fuseWidgetToggle]{position:absolute;top:0;right:0}fuse-widget.flipped>.fuse-widget-front{visibility:hidden;opacity:0;-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}fuse-widget.flipped>.fuse-widget-back{display:block;visibility:visible;opacity:1;-webkit-transform:rotateY(360deg);transform:rotateY(360deg)}fuse-widget .mat-form-field.mat-form-field-type-mat-select .mat-form-field-wrapper{padding:16px 0}fuse-widget .mat-form-field.mat-form-field-type-mat-select .mat-form-field-wrapper .mat-form-field-infix{border:none;padding:0}fuse-widget .mat-form-field.mat-form-field-type-mat-select .mat-form-field-underline{display:none}"]
            }] }
];
/** @nocollapse */
FuseWidgetComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
FuseWidgetComponent.propDecorators = {
    flipped: [{ type: HostBinding, args: ['class.flipped',] }],
    toggleButtons: [{ type: ContentChildren, args: [FuseWidgetToggleDirective, { descendants: true },] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2lkZ2V0L3dpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVN0RSxNQUFNLE9BQU8sbUJBQW1CO0lBUTVCOzs7OztPQUtHO0lBQ0gsWUFDWSxXQUF1QixFQUN2QixTQUFvQjtRQURwQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBYmhDLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFnQmhCLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsb0JBQW9CO0lBQ3BCLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILGtCQUFrQjtRQUVkLG1DQUFtQztRQUNuQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUMxRSxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNsQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG1CQUFtQjtJQUNuQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxNQUFNO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDakMsQ0FBQzs7O1lBM0RKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQU8sYUFBYTtnQkFDNUIsdUNBQXdDO2dCQUV4QyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDeEM7Ozs7WUFSc0QsVUFBVTtZQUEwQixTQUFTOzs7c0JBWS9GLFdBQVcsU0FBQyxlQUFlOzRCQUczQixlQUFlLFNBQUMseUJBQXlCLEVBQUUsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZ1c2VXaWRnZXRUb2dnbGVEaXJlY3RpdmUgfSBmcm9tICcuL3dpZGdldC10b2dnbGUuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3IgICAgIDogJ2Z1c2Utd2lkZ2V0JyxcbiAgICB0ZW1wbGF0ZVVybCAgOiAnLi93aWRnZXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJscyAgICA6IFsnLi93aWRnZXQuY29tcG9uZW50LnNjc3MnXSxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuXG5leHBvcnQgY2xhc3MgRnVzZVdpZGdldENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXRcbntcbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLmZsaXBwZWQnKVxuICAgIGZsaXBwZWQgPSBmYWxzZTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oRnVzZVdpZGdldFRvZ2dsZURpcmVjdGl2ZSwge2Rlc2NlbmRhbnRzOiB0cnVlfSlcbiAgICB0b2dnbGVCdXR0b25zOiBRdWVyeUxpc3Q8RnVzZVdpZGdldFRvZ2dsZURpcmVjdGl2ZT47XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtFbGVtZW50UmVmfSBfZWxlbWVudFJlZlxuICAgICAqIEBwYXJhbSB7UmVuZGVyZXIyfSBfcmVuZGVyZXJcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMlxuICAgIClcbiAgICB7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIExpZmVjeWNsZSBob29rc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBBZnRlciBjb250ZW50IGluaXRcbiAgICAgKi9cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gTGlzdGVuIGZvciB0aGUgZmxpcCBidXR0b24gY2xpY2tcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUJ1dHRvbnMuZm9yRWFjaChmbGlwQnV0dG9uID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5saXN0ZW4oZmxpcEJ1dHRvbi5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEAgUHVibGljIG1ldGhvZHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogVG9nZ2xlIHRoZSBmbGlwcGVkIHN0YXR1c1xuICAgICAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLmZsaXBwZWQgPSAhdGhpcy5mbGlwcGVkO1xuICAgIH1cblxufVxuIl19