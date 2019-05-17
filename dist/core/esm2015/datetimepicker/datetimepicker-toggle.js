/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from "@angular/core";
import { MatDatepickerIntl } from "@angular/material";
import { merge, of as observableOf, Subscription } from "rxjs";
import { MatDatetimepicker } from "./datetimepicker";
/**
 * @template D
 */
export class MatDatetimepickerToggle {
    /**
     * @param {?} _intl
     * @param {?} _changeDetectorRef
     */
    constructor(_intl, _changeDetectorRef) {
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._stateChanges = Subscription.EMPTY;
    }
    /**
     * Whether the toggle button is disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined ? this.datetimepicker.disabled : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.datepicker) {
            this._watchStateChanges();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._stateChanges.unsubscribe();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._watchStateChanges();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _open(event) {
        if (this.datetimepicker && !this.disabled) {
            this.datetimepicker.open();
            event.stopPropagation();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _watchStateChanges() {
        /** @type {?} */
        const datepickerDisabled = this.datetimepicker ? this.datetimepicker._disabledChange : observableOf();
        /** @type {?} */
        const inputDisabled = this.datetimepicker && this.datetimepicker._datepickerInput ?
            this.datetimepicker._datepickerInput._disabledChange : observableOf();
        this._stateChanges.unsubscribe();
        this._stateChanges = merge(this._intl.changes, datepickerDisabled, inputDisabled)
            .subscribe((/**
         * @return {?}
         */
        () => this._changeDetectorRef.markForCheck()));
    }
}
MatDatetimepickerToggle.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-toggle",
                template: "<button mat-icon-button type=\"button\" [attr.aria-label]=\"_intl.openCalendarLabel\"\n        [disabled]=\"disabled\" (click)=\"_open($event)\">\n  <mat-icon [ngSwitch]=\"datetimepicker.type\">\n    <svg *ngSwitchCase=\"'time'\" viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" fill=\"currentColor\"\n            style=\"vertical-align: top\" focusable=\"false\">\n      <path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path>\n    </svg>\n    <svg *ngSwitchCase=\"'datetime'\" viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" fill=\"currentColor\"\n            style=\"vertical-align: top\" focusable=\"false\">\n      <path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path>\n    </svg>\n    <svg *ngSwitchDefault viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" fill=\"currentColor\"\n        style=\"vertical-align: top\" focusable=\"false\">\n      <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n      <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\n    </svg>\n  </mat-icon>\n</button>\n",
                host: {
                    "class": "mat-datetimepicker-toggle"
                },
                exportAs: "matDatetimepickerToggle",
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
MatDatetimepickerToggle.ctorParameters = () => [
    { type: MatDatepickerIntl },
    { type: ChangeDetectorRef }
];
MatDatetimepickerToggle.propDecorators = {
    datetimepicker: [{ type: Input, args: ["for",] }],
    disabled: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerToggle.prototype._stateChanges;
    /**
     * Datepicker instance that the button will toggle.
     * @type {?}
     */
    MatDatetimepickerToggle.prototype.datetimepicker;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerToggle.prototype._disabled;
    /** @type {?} */
    MatDatetimepickerToggle.prototype._intl;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerToggle.prototype._changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWVwaWNrZXItdG9nZ2xlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1hdC1kYXRldGltZXBpY2tlci9jb3JlLyIsInNvdXJjZXMiOlsiZGF0ZXRpbWVwaWNrZXIvZGF0ZXRpbWVwaWNrZXItdG9nZ2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsS0FBSyxFQUlMLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxZQUFZLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7O0FBYXJELE1BQU0sT0FBTyx1QkFBdUI7Ozs7O0lBaUJsQyxZQUFtQixLQUF3QixFQUFVLGtCQUFxQztRQUF2RSxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFoQmxGLGtCQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQWdCa0QsQ0FBQzs7Ozs7SUFUOUYsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hGLENBQUM7Ozs7O0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7Ozs7O0lBS0QsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRTtZQUN0QixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUMzQjtJQUNILENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBRUQsS0FBSyxDQUFDLEtBQVk7UUFDaEIsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzNCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7Ozs7O0lBRU8sa0JBQWtCOztjQUNsQixrQkFBa0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFOztjQUMvRixhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDL0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRTtRQUV6RSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQzthQUM1RSxTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLEVBQUMsQ0FBQztJQUMvRCxDQUFDOzs7WUEzREYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSwyQkFBMkI7Z0JBQ3JDLDBuREFBeUM7Z0JBQ3pDLElBQUksRUFBRTtvQkFDSixPQUFPLEVBQUUsMkJBQTJCO2lCQUNyQztnQkFDRCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFkUSxpQkFBaUI7WUFSeEIsaUJBQWlCOzs7NkJBNEJoQixLQUFLLFNBQUMsS0FBSzt1QkFHWCxLQUFLOzs7Ozs7O0lBUE4sZ0RBQTJDOzs7OztJQUkzQyxpREFBbUQ7Ozs7O0lBVW5ELDRDQUEyQjs7SUFFZix3Q0FBK0I7Ozs7O0lBQUUscURBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSBcIkBhbmd1bGFyL2Nkay9jb2VyY2lvblwiO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBPbkNoYW5nZXMsXG4gIE9uRGVzdHJveSxcbiAgU2ltcGxlQ2hhbmdlcyxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1hdERhdGVwaWNrZXJJbnRsIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsXCI7XG5pbXBvcnQgeyBtZXJnZSwgb2YgYXMgb2JzZXJ2YWJsZU9mLCBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgTWF0RGF0ZXRpbWVwaWNrZXIgfSBmcm9tIFwiLi9kYXRldGltZXBpY2tlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibWF0LWRhdGV0aW1lcGlja2VyLXRvZ2dsZVwiLFxuICB0ZW1wbGF0ZVVybDogXCJkYXRldGltZXBpY2tlci10b2dnbGUuaHRtbFwiLFxuICBob3N0OiB7XG4gICAgXCJjbGFzc1wiOiBcIm1hdC1kYXRldGltZXBpY2tlci10b2dnbGVcIlxuICB9LFxuICBleHBvcnRBczogXCJtYXREYXRldGltZXBpY2tlclRvZ2dsZVwiLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXRpbWVwaWNrZXJUb2dnbGU8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3N0YXRlQ2hhbmdlcyA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKiogRGF0ZXBpY2tlciBpbnN0YW5jZSB0aGF0IHRoZSBidXR0b24gd2lsbCB0b2dnbGUuICovXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KFwiZm9yXCIpIGRhdGV0aW1lcGlja2VyOiBNYXREYXRldGltZXBpY2tlcjxEPjtcblxuICAvKiogV2hldGhlciB0aGUgdG9nZ2xlIGJ1dHRvbiBpcyBkaXNhYmxlZC4gKi9cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5kYXRldGltZXBpY2tlci5kaXNhYmxlZCA6ICEhdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2Rpc2FibGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBfaW50bDogTWF0RGF0ZXBpY2tlckludGwsIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuZGF0ZXBpY2tlcikge1xuICAgICAgdGhpcy5fd2F0Y2hTdGF0ZUNoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9zdGF0ZUNoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICB0aGlzLl93YXRjaFN0YXRlQ2hhbmdlcygpO1xuICB9XG5cbiAgX29wZW4oZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZGF0ZXRpbWVwaWNrZXIgJiYgIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuZGF0ZXRpbWVwaWNrZXIub3BlbigpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfd2F0Y2hTdGF0ZUNoYW5nZXMoKSB7XG4gICAgY29uc3QgZGF0ZXBpY2tlckRpc2FibGVkID0gdGhpcy5kYXRldGltZXBpY2tlciA/IHRoaXMuZGF0ZXRpbWVwaWNrZXIuX2Rpc2FibGVkQ2hhbmdlIDogb2JzZXJ2YWJsZU9mKCk7XG4gICAgY29uc3QgaW5wdXREaXNhYmxlZCA9IHRoaXMuZGF0ZXRpbWVwaWNrZXIgJiYgdGhpcy5kYXRldGltZXBpY2tlci5fZGF0ZXBpY2tlcklucHV0ID9cbiAgICAgICAgdGhpcy5kYXRldGltZXBpY2tlci5fZGF0ZXBpY2tlcklucHV0Ll9kaXNhYmxlZENoYW5nZSA6IG9ic2VydmFibGVPZigpO1xuXG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc3RhdGVDaGFuZ2VzID0gbWVyZ2UodGhpcy5faW50bC5jaGFuZ2VzLCBkYXRlcGlja2VyRGlzYWJsZWQsIGlucHV0RGlzYWJsZWQpXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICB9XG59XG4iXX0=