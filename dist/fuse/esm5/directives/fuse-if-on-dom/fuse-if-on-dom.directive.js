import { Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';
var FuseIfOnDomDirective = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {TemplateRef<any>} _templateRef
     * @param {ViewContainerRef} _viewContainerRef
     */
    function FuseIfOnDomDirective(_elementRef, _templateRef, _viewContainerRef) {
        this._elementRef = _elementRef;
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
        // Set the defaults
        this.isCreated = false;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * After content checked
     */
    FuseIfOnDomDirective.prototype.ngAfterContentChecked = function () {
        var _this = this;
        if (document.body.contains(this._elementRef.nativeElement) && !this.isCreated) {
            setTimeout(function () {
                _this._viewContainerRef.createEmbeddedView(_this._templateRef);
            }, 300);
            this.isCreated = true;
        }
        else if (this.isCreated && !document.body.contains(this._elementRef.nativeElement)) {
            this._viewContainerRef.clear();
            this.isCreated = false;
        }
    };
    FuseIfOnDomDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[fuseIfOnDom]'
                },] }
    ];
    /** @nocollapse */
    FuseIfOnDomDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: TemplateRef },
        { type: ViewContainerRef }
    ]; };
    return FuseIfOnDomDirective;
}());
export { FuseIfOnDomDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVzZS1pZi1vbi1kb20uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9mdXNlLWlmLW9uLWRvbS9mdXNlLWlmLW9uLWRvbS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRztJQU9JOzs7Ozs7T0FNRztJQUNILDhCQUNZLFdBQXVCLEVBQ3ZCLFlBQThCLEVBQzlCLGlCQUFtQztRQUZuQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixpQkFBWSxHQUFaLFlBQVksQ0FBa0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUczQyxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELHdHQUF3RztJQUN4RyxvQkFBb0I7SUFDcEIsd0dBQXdHO0lBRXhHOztPQUVHO0lBQ0gsb0RBQXFCLEdBQXJCO1FBQUEsaUJBY0M7UUFaRyxJQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUM5RTtZQUNJLFVBQVUsQ0FBQztnQkFDUCxLQUFJLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO2FBQ0ksSUFBSyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFDbkY7WUFDSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDMUI7SUFDTCxDQUFDOztnQkE3Q0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxlQUFlO2lCQUM1Qjs7OztnQkFKd0MsVUFBVTtnQkFBRSxXQUFXO2dCQUFFLGdCQUFnQjs7SUFnRGxGLDJCQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7U0EzQ1ksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50Q2hlY2tlZCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1tmdXNlSWZPbkRvbV0nXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VJZk9uRG9tRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50Q2hlY2tlZFxue1xuICAgIGlzQ3JlYXRlZDogYm9vbGVhbjtcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0VsZW1lbnRSZWZ9IF9lbGVtZW50UmVmXG4gICAgICogQHBhcmFtIHtUZW1wbGF0ZVJlZjxhbnk+fSBfdGVtcGxhdGVSZWZcbiAgICAgKiBAcGFyYW0ge1ZpZXdDb250YWluZXJSZWZ9IF92aWV3Q29udGFpbmVyUmVmXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX3RlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LFxuICAgICAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmXG4gICAgKVxuICAgIHtcbiAgICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0c1xuICAgICAgICB0aGlzLmlzQ3JlYXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gQCBMaWZlY3ljbGUgaG9va3NcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQWZ0ZXIgY29udGVudCBjaGVja2VkXG4gICAgICovXG4gICAgbmdBZnRlckNvbnRlbnRDaGVja2VkKCk6IHZvaWRcbiAgICB7XG4gICAgICAgIGlmICggZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpICYmICF0aGlzLmlzQ3JlYXRlZCApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdDb250YWluZXJSZWYuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMuX3RlbXBsYXRlUmVmKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB0aGlzLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIHRoaXMuaXNDcmVhdGVkICYmICFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkgKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLl92aWV3Q29udGFpbmVyUmVmLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmlzQ3JlYXRlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19