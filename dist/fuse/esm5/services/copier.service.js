/**
 * This class is based on the code in the following projects:
 * https://github.com/zenorocha/select
 * https://github.com/zenorocha/clipboard.js/
 *
 * Both released under MIT license - © Zeno Rocha
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
var FuseCopierService = /** @class */ (function () {
    function FuseCopierService() {
    }
    /**
     * Copy the text value to the clipboard
     *
     * @param {string} text
     * @returns {boolean}
     */
    FuseCopierService.prototype.copyText = function (text) {
        this.createTextareaAndSelect(text);
        var copySuccessful = document.execCommand('copy');
        this._removeFake();
        return copySuccessful;
    };
    /**
     * Creates a hidden textarea element, sets its value from `text` property,
     * and makes a selection on it.
     *
     * @param {string} text
     */
    FuseCopierService.prototype.createTextareaAndSelect = function (text) {
        // Create a fake element to hold the contents to copy
        this.textarea = document.createElement('textarea');
        // Prevent zooming on iOS
        this.textarea.style.fontSize = '12pt';
        // Hide the element
        this.textarea.classList.add('cdk-visually-hidden');
        // Move element to the same position vertically
        var yPosition = window.pageYOffset || document.documentElement.scrollTop;
        this.textarea.style.top = yPosition + 'px';
        this.textarea.setAttribute('readonly', '');
        this.textarea.value = text;
        document.body.appendChild(this.textarea);
        this.textarea.select();
        this.textarea.setSelectionRange(0, this.textarea.value.length);
    };
    /**
     * Remove the text area from the DOM
     *
     * @private
     */
    FuseCopierService.prototype._removeFake = function () {
        if (this.textarea) {
            document.body.removeChild(this.textarea);
            this.textarea = null;
        }
    };
    FuseCopierService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    FuseCopierService.ngInjectableDef = i0.defineInjectable({ factory: function FuseCopierService_Factory() { return new FuseCopierService(); }, token: FuseCopierService, providedIn: "root" });
    return FuseCopierService;
}());
export { FuseCopierService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29waWVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9jb3BpZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQztJQUFBO0tBa0VDO0lBM0RHOzs7OztPQUtHO0lBQ0gsb0NBQVEsR0FBUixVQUFTLElBQVk7UUFFakIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRW5DLElBQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRW5CLE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLG1EQUF1QixHQUEvQixVQUFnQyxJQUFZO1FBRXhDLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbkQseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFFdEMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBRW5ELCtDQUErQztRQUMvQyxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDO1FBQzNFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRTNDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFFM0IsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyx1Q0FBVyxHQUFuQjtRQUVJLElBQUssSUFBSSxDQUFDLFFBQVEsRUFDbEI7WUFDSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDeEI7SUFDTCxDQUFDOztnQkFqRUosVUFBVSxTQUFDO29CQUNSLFVBQVUsRUFBRSxNQUFNO2lCQUNyQjs7OzRCQVhEO0NBMkVDLEFBbEVELElBa0VDO1NBL0RZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVGhpcyBjbGFzcyBpcyBiYXNlZCBvbiB0aGUgY29kZSBpbiB0aGUgZm9sbG93aW5nIHByb2plY3RzOlxuICogaHR0cHM6Ly9naXRodWIuY29tL3plbm9yb2NoYS9zZWxlY3RcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5vcm9jaGEvY2xpcGJvYXJkLmpzL1xuICpcbiAqIEJvdGggcmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgLSDCqSBaZW5vIFJvY2hhXG4gKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBGdXNlQ29waWVyU2VydmljZVxue1xuICAgIHByaXZhdGUgdGV4dGFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBDb3B5IHRoZSB0ZXh0IHZhbHVlIHRvIHRoZSBjbGlwYm9hcmRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgY29weVRleHQodGV4dDogc3RyaW5nKTogYm9vbGVhblxuICAgIHtcbiAgICAgICAgdGhpcy5jcmVhdGVUZXh0YXJlYUFuZFNlbGVjdCh0ZXh0KTtcblxuICAgICAgICBjb25zdCBjb3B5U3VjY2Vzc2Z1bCA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZha2UoKTtcblxuICAgICAgICByZXR1cm4gY29weVN1Y2Nlc3NmdWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGhpZGRlbiB0ZXh0YXJlYSBlbGVtZW50LCBzZXRzIGl0cyB2YWx1ZSBmcm9tIGB0ZXh0YCBwcm9wZXJ0eSxcbiAgICAgKiBhbmQgbWFrZXMgYSBzZWxlY3Rpb24gb24gaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgICAqL1xuICAgIHByaXZhdGUgY3JlYXRlVGV4dGFyZWFBbmRTZWxlY3QodGV4dDogc3RyaW5nKTogdm9pZFxuICAgIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgZmFrZSBlbGVtZW50IHRvIGhvbGQgdGhlIGNvbnRlbnRzIHRvIGNvcHlcbiAgICAgICAgdGhpcy50ZXh0YXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG5cbiAgICAgICAgLy8gUHJldmVudCB6b29taW5nIG9uIGlPU1xuICAgICAgICB0aGlzLnRleHRhcmVhLnN0eWxlLmZvbnRTaXplID0gJzEycHQnO1xuXG4gICAgICAgIC8vIEhpZGUgdGhlIGVsZW1lbnRcbiAgICAgICAgdGhpcy50ZXh0YXJlYS5jbGFzc0xpc3QuYWRkKCdjZGstdmlzdWFsbHktaGlkZGVuJyk7XG5cbiAgICAgICAgLy8gTW92ZSBlbGVtZW50IHRvIHRoZSBzYW1lIHBvc2l0aW9uIHZlcnRpY2FsbHlcbiAgICAgICAgY29uc3QgeVBvc2l0aW9uID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XG4gICAgICAgIHRoaXMudGV4dGFyZWEuc3R5bGUudG9wID0geVBvc2l0aW9uICsgJ3B4JztcblxuICAgICAgICB0aGlzLnRleHRhcmVhLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gICAgICAgIHRoaXMudGV4dGFyZWEudmFsdWUgPSB0ZXh0O1xuXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy50ZXh0YXJlYSk7XG5cbiAgICAgICAgdGhpcy50ZXh0YXJlYS5zZWxlY3QoKTtcbiAgICAgICAgdGhpcy50ZXh0YXJlYS5zZXRTZWxlY3Rpb25SYW5nZSgwLCB0aGlzLnRleHRhcmVhLnZhbHVlLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIHRoZSB0ZXh0IGFyZWEgZnJvbSB0aGUgRE9NXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHByaXZhdGUgX3JlbW92ZUZha2UoKTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCB0aGlzLnRleHRhcmVhIClcbiAgICAgICAge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLnRleHRhcmVhKTtcbiAgICAgICAgICAgIHRoaXMudGV4dGFyZWEgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19