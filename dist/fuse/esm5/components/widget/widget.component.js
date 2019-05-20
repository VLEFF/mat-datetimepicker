import { Component, ContentChildren, ElementRef, HostBinding, QueryList, Renderer2, ViewEncapsulation } from '@angular/core';
import { FuseWidgetToggleDirective } from './widget-toggle.directive';
var FuseWidgetComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {Renderer2} _renderer
     */
    function FuseWidgetComponent(_elementRef, _renderer) {
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
    FuseWidgetComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // Listen for the flip button click
        setTimeout(function () {
            _this.toggleButtons.forEach(function (flipButton) {
                _this._renderer.listen(flipButton.elementRef.nativeElement, 'click', function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    _this.toggle();
                });
            });
        });
    };
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Toggle the flipped status
     */
    FuseWidgetComponent.prototype.toggle = function () {
        this.flipped = !this.flipped;
    };
    FuseWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-widget',
                    template: "<ng-content></ng-content>\n",
                    encapsulation: ViewEncapsulation.None,
                    styles: ["fuse-widget{display:block;position:relative;-webkit-perspective:3000px;perspective:3000px;padding:12px}fuse-widget>div{position:relative;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;transition:transform 1s;transition:transform 1s,-webkit-transform 1s}fuse-widget>.fuse-widget-front{display:flex;flex-direction:column;flex:1 1 auto;position:relative;overflow:hidden;visibility:visible;width:100%;opacity:1;z-index:10;border-radius:8px;transition:transform .5s ease-out,visibility ease-in .2s,opacity ease-in .2s,-webkit-transform .5s ease-out;-webkit-transform:rotateY(0);transform:rotateY(0);-webkit-backface-visibility:hidden;backface-visibility:hidden;border:1px solid}fuse-widget>.fuse-widget-back{display:block;position:absolute;top:12px;right:12px;bottom:12px;left:12px;overflow:hidden;visibility:hidden;opacity:0;z-index:10;border-radius:8px;transition:transform .5s ease-out,visibility ease-in .2s,opacity ease-in .2s,-webkit-transform .5s ease-out;-webkit-transform:rotateY(180deg);transform:rotateY(180deg);-webkit-backface-visibility:hidden;backface-visibility:hidden;border:1px solid}fuse-widget>.fuse-widget-back [fuseWidgetToggle]{position:absolute;top:0;right:0}fuse-widget.flipped>.fuse-widget-front{visibility:hidden;opacity:0;-webkit-transform:rotateY(180deg);transform:rotateY(180deg)}fuse-widget.flipped>.fuse-widget-back{display:block;visibility:visible;opacity:1;-webkit-transform:rotateY(360deg);transform:rotateY(360deg)}fuse-widget .mat-form-field.mat-form-field-type-mat-select .mat-form-field-wrapper{padding:16px 0}fuse-widget .mat-form-field.mat-form-field-type-mat-select .mat-form-field-wrapper .mat-form-field-infix{border:none;padding:0}fuse-widget .mat-form-field.mat-form-field-type-mat-select .mat-form-field-underline{display:none}"]
                }] }
    ];
    /** @nocollapse */
    FuseWidgetComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    FuseWidgetComponent.propDecorators = {
        flipped: [{ type: HostBinding, args: ['class.flipped',] }],
        toggleButtons: [{ type: ContentChildren, args: [FuseWidgetToggleDirective, { descendants: true },] }]
    };
    return FuseWidgetComponent;
}());
export { FuseWidgetComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtZHQvZnVzZS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvd2lkZ2V0L3dpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUV0RTtJQWVJOzs7OztPQUtHO0lBQ0gsNkJBQ1ksV0FBdUIsRUFDdkIsU0FBb0I7UUFEcEIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWJoQyxZQUFPLEdBQUcsS0FBSyxDQUFDO0lBZ0JoQixDQUFDO0lBRUQsd0dBQXdHO0lBQ3hHLG9CQUFvQjtJQUNwQix3R0FBd0c7SUFFeEc7O09BRUc7SUFDSCxnREFBa0IsR0FBbEI7UUFBQSxpQkFZQztRQVZHLG1DQUFtQztRQUNuQyxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVU7Z0JBQ2pDLEtBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxVQUFDLEtBQUs7b0JBQ3RFLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO29CQUN4QixLQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCx3R0FBd0c7SUFDeEcsbUJBQW1CO0lBQ25CLHdHQUF3RztJQUV4Rzs7T0FFRztJQUNILG9DQUFNLEdBQU47UUFFSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxDQUFDOztnQkEzREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBTyxhQUFhO29CQUM1Qix1Q0FBd0M7b0JBRXhDLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDeEM7Ozs7Z0JBUnNELFVBQVU7Z0JBQTBCLFNBQVM7OzswQkFZL0YsV0FBVyxTQUFDLGVBQWU7Z0NBRzNCLGVBQWUsU0FBQyx5QkFBeUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7O0lBaURuRSwwQkFBQztDQUFBLEFBN0RELElBNkRDO1NBdERZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGdXNlV2lkZ2V0VG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi93aWRnZXQtdG9nZ2xlLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yICAgICA6ICdmdXNlLXdpZGdldCcsXG4gICAgdGVtcGxhdGVVcmwgIDogJy4vd2lkZ2V0LmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHMgICAgOiBbJy4vd2lkZ2V0LmNvbXBvbmVudC5zY3NzJ10sXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxufSlcblxuZXhwb3J0IGNsYXNzIEZ1c2VXaWRnZXRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0XG57XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mbGlwcGVkJylcbiAgICBmbGlwcGVkID0gZmFsc2U7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKEZ1c2VXaWRnZXRUb2dnbGVEaXJlY3RpdmUsIHtkZXNjZW5kYW50czogdHJ1ZX0pXG4gICAgdG9nZ2xlQnV0dG9uczogUXVlcnlMaXN0PEZ1c2VXaWRnZXRUb2dnbGVEaXJlY3RpdmU+O1xuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RWxlbWVudFJlZn0gX2VsZW1lbnRSZWZcbiAgICAgKiBAcGFyYW0ge1JlbmRlcmVyMn0gX3JlbmRlcmVyXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjJcbiAgICApXG4gICAge1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgY29udGVudCBpbml0XG4gICAgICovXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWRcbiAgICB7XG4gICAgICAgIC8vIExpc3RlbiBmb3IgdGhlIGZsaXAgYnV0dG9uIGNsaWNrXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVCdXR0b25zLmZvckVhY2goZmxpcEJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGVuKGZsaXBCdXR0b24uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBAIFB1YmxpYyBtZXRob2RzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSB0aGUgZmxpcHBlZCBzdGF0dXNcbiAgICAgKi9cbiAgICB0b2dnbGUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5mbGlwcGVkID0gIXRoaXMuZmxpcHBlZDtcbiAgICB9XG5cbn1cbiJdfQ==