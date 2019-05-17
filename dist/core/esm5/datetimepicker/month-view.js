/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable */
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Optional, Output, ViewEncapsulation } from "@angular/core";
import { MAT_DATETIME_FORMATS } from "../adapter/datetime-formats";
import { DatetimeAdapter } from "../adapter/datetime-adapter";
import { MatDatetimepickerCalendarCell } from "./calendar-body";
import { slideCalendar } from "./datetimepicker-animations";
import { createMissingDateImplError } from "./datetimepicker-errors";
/** @type {?} */
var DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 * @template D
 */
var MatDatetimepickerMonthView = /** @class */ (function () {
    function MatDatetimepickerMonthView(_adapter, _dateFormats) {
        this._adapter = _adapter;
        this._dateFormats = _dateFormats;
        this.type = "date";
        this._userSelection = new EventEmitter();
        /**
         * Emits when a new date is selected.
         */
        this.selectedChange = new EventEmitter();
        if (!this._adapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATETIME_FORMATS");
        }
        /** @type {?} */
        var firstDayOfWeek = this._adapter.getFirstDayOfWeek();
        /** @type {?} */
        var narrowWeekdays = this._adapter.getDayOfWeekNames("narrow");
        /** @type {?} */
        var longWeekdays = this._adapter.getDayOfWeekNames("long");
        // Rotate the labels for days of the week based on the configured first day of the week.
        /** @type {?} */
        var weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        function (long, i) {
            return { long: long, narrow: narrowWeekdays[i] };
        }));
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this._adapter.today();
    }
    Object.defineProperty(MatDatetimepickerMonthView.prototype, "activeDate", {
        /**
         * The date to display in this month view (everything other than the month and year is ignored).
         */
        get: /**
         * The date to display in this month view (everything other than the month and year is ignored).
         * @return {?}
         */
        function () {
            return this._activeDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._activeDate;
            this._activeDate = value || this._adapter.today();
            if (oldActiveDate && this._activeDate &&
                !this._adapter.sameMonthAndYear(oldActiveDate, this._activeDate)) {
                this._init();
                if (this._adapter.isInNextMonth(oldActiveDate, this._activeDate)) {
                    this.calendarState("right");
                }
                else {
                    this.calendarState("left");
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerMonthView.prototype, "selected", {
        /** The currently selected date. */
        get: /**
         * The currently selected date.
         * @return {?}
         */
        function () {
            return this._selected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._selected = value;
            this._selectedDate = this._getDateInCurrentMonth(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._init();
    };
    /** Handles when a new date is selected. */
    /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._dateSelected = /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this.selectedChange.emit(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), date, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)));
        if (this.type === "date") {
            this._userSelection.emit();
        }
    };
    /** Initializes this month view. */
    /**
     * Initializes this month view.
     * @private
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._init = /**
     * Initializes this month view.
     * @private
     * @return {?}
     */
    function () {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._adapter.today());
        /** @type {?} */
        var firstOfMonth = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
        this._firstWeekOffset =
            (DAYS_PER_WEEK + this._adapter.getDayOfWeek(firstOfMonth) -
                this._adapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this._createWeekCells();
    };
    /** Creates MdCalendarCells for the dates in this month. */
    /**
     * Creates MdCalendarCells for the dates in this month.
     * @private
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._createWeekCells = /**
     * Creates MdCalendarCells for the dates in this month.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var daysInMonth = this._adapter.getNumDaysInMonth(this.activeDate);
        /** @type {?} */
        var dateNames = this._adapter.getDateNames();
        this._weeks = [[]];
        for (var i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell == DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            /** @type {?} */
            var date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), i + 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
            /** @type {?} */
            var enabled = !this.dateFilter ||
                this.dateFilter(date);
            /** @type {?} */
            var ariaLabel = this._adapter.format(date, this._dateFormats.display.dateA11yLabel);
            this._weeks[this._weeks.length - 1]
                .push(new MatDatetimepickerCalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
        }
    };
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     */
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @private
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._getDateInCurrentMonth = /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._adapter.sameMonthAndYear(date, this.activeDate) ?
            this._adapter.getDate(date) : null;
    };
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype.calendarState = /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        this._calendarState = direction;
    };
    /**
     * @return {?}
     */
    MatDatetimepickerMonthView.prototype._calendarStateDone = /**
     * @return {?}
     */
    function () {
        this._calendarState = "";
    };
    MatDatetimepickerMonthView.decorators = [
        { type: Component, args: [{
                    selector: "mat-datetimepicker-month-view",
                    template: "<table class=\"mat-datetimepicker-calendar-table\">\n  <thead class=\"mat-datetimepicker-calendar-table-header\">\n    <tr><th *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th></tr>\n  </thead>\n  <tbody [@slideCalendar]=\"_calendarState\"\n         (@slideCalendar.done)=\"_calendarStateDone()\"\n         mat-datetimepicker-calendar-body\n         role=\"grid\"\n         [rows]=\"_weeks\"\n         [todayValue]=\"_todayDate\"\n         [selectedValue]=\"_selectedDate\"\n         [activeCell]=\"_adapter.getDate(activeDate) - 1\"\n         (selectedValueChange)=\"_dateSelected($event)\"></tbody>\n</table>\n",
                    animations: [slideCalendar],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    MatDatetimepickerMonthView.ctorParameters = function () { return [
        { type: DatetimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] }] }
    ]; };
    MatDatetimepickerMonthView.propDecorators = {
        type: [{ type: Input }],
        _userSelection: [{ type: Output }],
        activeDate: [{ type: Input }],
        selected: [{ type: Input }],
        dateFilter: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return MatDatetimepickerMonthView;
}());
export { MatDatetimepickerMonthView };
if (false) {
    /** @type {?} */
    MatDatetimepickerMonthView.prototype.type;
    /** @type {?} */
    MatDatetimepickerMonthView.prototype._userSelection;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerMonthView.prototype._activeDate;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerMonthView.prototype._selected;
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    MatDatetimepickerMonthView.prototype.dateFilter;
    /**
     * Emits when a new date is selected.
     * @type {?}
     */
    MatDatetimepickerMonthView.prototype.selectedChange;
    /**
     * Grid of calendar cells representing the dates of the month.
     * @type {?}
     */
    MatDatetimepickerMonthView.prototype._weeks;
    /**
     * The number of blank cells in the first row before the 1st of the month.
     * @type {?}
     */
    MatDatetimepickerMonthView.prototype._firstWeekOffset;
    /**
     * The date of the month that the currently selected Date falls on.
     * Null if the currently selected Date is in another month.
     * @type {?}
     */
    MatDatetimepickerMonthView.prototype._selectedDate;
    /**
     * The date of the month that today falls on. Null if today is in another month.
     * @type {?}
     */
    MatDatetimepickerMonthView.prototype._todayDate;
    /**
     * The names of the weekdays.
     * @type {?}
     */
    MatDatetimepickerMonthView.prototype._weekdays;
    /** @type {?} */
    MatDatetimepickerMonthView.prototype._calendarState;
    /** @type {?} */
    MatDatetimepickerMonthView.prototype._adapter;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerMonthView.prototype._dateFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXQtZGF0ZXRpbWVwaWNrZXIvY29yZS8iLCJzb3VyY2VzIjpbImRhdGV0aW1lcGlja2VyL21vbnRoLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsb0JBQW9CLEVBRXJCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUNMLGVBQWUsRUFDaEIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0lBRS9ELGFBQWEsR0FBRyxDQUFDOzs7Ozs7QUFNdkI7SUE0RUUsb0NBQStCLFFBQTRCLEVBQ0csWUFBZ0M7UUFEL0QsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFDRyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFwRXJGLFNBQUksR0FBMkMsTUFBTSxDQUFDO1FBRXJELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQTJDMUMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO1FBd0IvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixNQUFNLDBCQUEwQixDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixNQUFNLDBCQUEwQixDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDMUQ7O1lBRUssY0FBYyxHQUFHLElBQUks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aW50OmRpc2FibGUgKi9cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgT3B0aW9uYWwsXG4gIE91dHB1dCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gIE1BVF9EQVRFVElNRV9GT1JNQVRTLFxuICBNYXREYXRldGltZUZvcm1hdHNcbn0gZnJvbSBcIi4uL2FkYXB0ZXIvZGF0ZXRpbWUtZm9ybWF0c1wiO1xuaW1wb3J0IHtcbiAgRGF0ZXRpbWVBZGFwdGVyXG59IGZyb20gXCIuLi9hZGFwdGVyL2RhdGV0aW1lLWFkYXB0ZXJcIjtcbmltcG9ydCB7IE1hdERhdGV0aW1lcGlja2VyQ2FsZW5kYXJDZWxsIH0gZnJvbSBcIi4vY2FsZW5kYXItYm9keVwiO1xuaW1wb3J0IHsgc2xpZGVDYWxlbmRhciB9IGZyb20gXCIuL2RhdGV0aW1lcGlja2VyLWFuaW1hdGlvbnNcIjtcbmltcG9ydCB7IGNyZWF0ZU1pc3NpbmdEYXRlSW1wbEVycm9yIH0gZnJvbSBcIi4vZGF0ZXRpbWVwaWNrZXItZXJyb3JzXCI7XG5cbmNvbnN0IERBWVNfUEVSX1dFRUsgPSA3O1xuXG4vKipcbiAqIEFuIGludGVybmFsIGNvbXBvbmVudCB1c2VkIHRvIGRpc3BsYXkgYSBzaW5nbGUgbW9udGggaW4gdGhlIGRhdGVwaWNrZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJtYXQtZGF0ZXRpbWVwaWNrZXItbW9udGgtdmlld1wiLFxuICB0ZW1wbGF0ZVVybDogXCJtb250aC12aWV3Lmh0bWxcIixcbiAgYW5pbWF0aW9uczogW3NsaWRlQ2FsZW5kYXJdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNYXREYXRldGltZXBpY2tlck1vbnRoVmlldzxEPiBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuXG4gIEBJbnB1dCgpIHR5cGU6IFwiZGF0ZVwiIHwgXCJ0aW1lXCIgfCBcIm1vbnRoXCIgfCBcImRhdGV0aW1lXCIgPSBcImRhdGVcIjtcblxuICBAT3V0cHV0KCkgX3VzZXJTZWxlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRlIHRvIGRpc3BsYXkgaW4gdGhpcyBtb250aCB2aWV3IChldmVyeXRoaW5nIG90aGVyIHRoYW4gdGhlIG1vbnRoIGFuZCB5ZWFyIGlzIGlnbm9yZWQpLlxuICAgKi9cbiAgQElucHV0KClcbiAgZ2V0IGFjdGl2ZURhdGUoKTogRCB7XG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZURhdGU7XG4gIH1cblxuICBzZXQgYWN0aXZlRGF0ZSh2YWx1ZTogRCkge1xuICAgIGxldCBvbGRBY3RpdmVEYXRlID0gdGhpcy5fYWN0aXZlRGF0ZTtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdmFsdWUgfHwgdGhpcy5fYWRhcHRlci50b2RheSgpO1xuICAgIGlmIChvbGRBY3RpdmVEYXRlICYmIHRoaXMuX2FjdGl2ZURhdGUgJiZcbiAgICAgICF0aGlzLl9hZGFwdGVyLnNhbWVNb250aEFuZFllYXIob2xkQWN0aXZlRGF0ZSwgdGhpcy5fYWN0aXZlRGF0ZSkpIHtcbiAgICAgIHRoaXMuX2luaXQoKTtcbiAgICAgIGlmICh0aGlzLl9hZGFwdGVyLmlzSW5OZXh0TW9udGgob2xkQWN0aXZlRGF0ZSwgdGhpcy5fYWN0aXZlRGF0ZSkpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclN0YXRlKFwicmlnaHRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU3RhdGUoXCJsZWZ0XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FjdGl2ZURhdGU6IEQ7XG5cbiAgLyoqIFRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgZGF0ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IHNlbGVjdGVkKCk6IEQge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRCkge1xuICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsdWU7XG4gICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gdGhpcy5fZ2V0RGF0ZUluQ3VycmVudE1vbnRoKHRoaXMuc2VsZWN0ZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWQ6IEQ7XG5cbiAgLyoqIEEgZnVuY3Rpb24gdXNlZCB0byBmaWx0ZXIgd2hpY2ggZGF0ZXMgYXJlIHNlbGVjdGFibGUuICovXG4gIEBJbnB1dCgpIGRhdGVGaWx0ZXI6IChkYXRlOiBEKSA9PiBib29sZWFuO1xuXG4gIC8qKiBFbWl0cyB3aGVuIGEgbmV3IGRhdGUgaXMgc2VsZWN0ZWQuICovXG4gIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8RD4oKTtcblxuICAvKiogR3JpZCBvZiBjYWxlbmRhciBjZWxscyByZXByZXNlbnRpbmcgdGhlIGRhdGVzIG9mIHRoZSBtb250aC4gKi9cbiAgX3dlZWtzOiBNYXREYXRldGltZXBpY2tlckNhbGVuZGFyQ2VsbFtdW107XG5cbiAgLyoqIFRoZSBudW1iZXIgb2YgYmxhbmsgY2VsbHMgaW4gdGhlIGZpcnN0IHJvdyBiZWZvcmUgdGhlIDFzdCBvZiB0aGUgbW9udGguICovXG4gIF9maXJzdFdlZWtPZmZzZXQ6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIGRhdGUgb2YgdGhlIG1vbnRoIHRoYXQgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCBEYXRlIGZhbGxzIG9uLlxuICAgKiBOdWxsIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRGF0ZSBpcyBpbiBhbm90aGVyIG1vbnRoLlxuICAgKi9cbiAgX3NlbGVjdGVkRGF0ZTogbnVtYmVyO1xuXG4gIC8qKiBUaGUgZGF0ZSBvZiB0aGUgbW9udGggdGhhdCB0b2RheSBmYWxscyBvbi4gTnVsbCBpZiB0b2RheSBpcyBpbiBhbm90aGVyIG1vbnRoLiAqL1xuICBfdG9kYXlEYXRlOiBudW1iZXI7XG5cbiAgLyoqIFRoZSBuYW1lcyBvZiB0aGUgd2Vla2RheXMuICovXG4gIF93ZWVrZGF5czogeyBsb25nOiBzdHJpbmcsIG5hcnJvdzogc3RyaW5nIH1bXTtcblxuICBfY2FsZW5kYXJTdGF0ZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIHB1YmxpYyBfYWRhcHRlcjogRGF0ZXRpbWVBZGFwdGVyPEQ+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE1BVF9EQVRFVElNRV9GT1JNQVRTKSBwcml2YXRlIF9kYXRlRm9ybWF0czogTWF0RGF0ZXRpbWVGb3JtYXRzKSB7XG4gICAgaWYgKCF0aGlzLl9hZGFwdGVyKSB7XG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcihcIkRhdGV0aW1lQWRhcHRlclwiKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcihcIk1BVF9EQVRFVElNRV9GT1JNQVRTXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0RGF5T2ZXZWVrID0gdGhpcy5fYWRhcHRlci5nZXRGaXJzdERheU9mV2VlaygpO1xuICAgIGNvbnN0IG5hcnJvd1dlZWtkYXlzID0gdGhpcy5fYWRhcHRlci5nZXREYXlPZldlZWtOYW1lcyhcIm5hcnJvd1wiKTtcbiAgICBjb25zdCBsb25nV2Vla2RheXMgPSB0aGlzLl9hZGFwdGVyLmdldERheU9mV2Vla05hbWVzKFwibG9uZ1wiKTtcblxuICAgIC8vIFJvdGF0ZSB0aGUgbGFiZWxzIGZvciBkYXlzIG9mIHRoZSB3ZWVrIGJhc2VkIG9uIHRoZSBjb25maWd1cmVkIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cbiAgICBsZXQgd2Vla2RheXMgPSBsb25nV2Vla2RheXMubWFwKChsb25nLCBpKSA9PiB7XG4gICAgICByZXR1cm4ge2xvbmcsIG5hcnJvdzogbmFycm93V2Vla2RheXNbaV19O1xuICAgIH0pO1xuICAgIHRoaXMuX3dlZWtkYXlzID0gd2Vla2RheXMuc2xpY2UoZmlyc3REYXlPZldlZWspLmNvbmNhdCh3ZWVrZGF5cy5zbGljZSgwLCBmaXJzdERheU9mV2VlaykpO1xuXG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2FkYXB0ZXIudG9kYXkoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyB3aGVuIGEgbmV3IGRhdGUgaXMgc2VsZWN0ZWQuICovXG4gIF9kYXRlU2VsZWN0ZWQoZGF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuX2FkYXB0ZXIuY3JlYXRlRGF0ZXRpbWUoXG4gICAgICB0aGlzLl9hZGFwdGVyLmdldFllYXIodGhpcy5hY3RpdmVEYXRlKSwgdGhpcy5fYWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgZGF0ZSwgdGhpcy5fYWRhcHRlci5nZXRIb3VyKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICB0aGlzLl9hZGFwdGVyLmdldE1pbnV0ZSh0aGlzLmFjdGl2ZURhdGUpKSk7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gXCJkYXRlXCIpIHtcbiAgICAgIHRoaXMuX3VzZXJTZWxlY3Rpb24uZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBJbml0aWFsaXplcyB0aGlzIG1vbnRoIHZpZXcuICovXG4gIHByaXZhdGUgX2luaXQoKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWREYXRlID0gdGhpcy5fZ2V0RGF0ZUluQ3VycmVudE1vbnRoKHRoaXMuc2VsZWN0ZWQpO1xuICAgIHRoaXMuX3RvZGF5RGF0ZSA9IHRoaXMuX2dldERhdGVJbkN1cnJlbnRNb250aCh0aGlzLl9hZGFwdGVyLnRvZGF5KCkpO1xuXG4gICAgbGV0IGZpcnN0T2ZNb250aCA9IHRoaXMuX2FkYXB0ZXIuY3JlYXRlRGF0ZXRpbWUodGhpcy5fYWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICB0aGlzLl9hZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksIDEsXG4gICAgICB0aGlzLl9hZGFwdGVyLmdldEhvdXIodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgIHRoaXMuX2FkYXB0ZXIuZ2V0TWludXRlKHRoaXMuYWN0aXZlRGF0ZSkpO1xuICAgIHRoaXMuX2ZpcnN0V2Vla09mZnNldCA9XG4gICAgICAoREFZU19QRVJfV0VFSyArIHRoaXMuX2FkYXB0ZXIuZ2V0RGF5T2ZXZWVrKGZpcnN0T2ZNb250aCkgLVxuICAgICAgICB0aGlzLl9hZGFwdGVyLmdldEZpcnN0RGF5T2ZXZWVrKCkpICUgREFZU19QRVJfV0VFSztcblxuICAgIHRoaXMuX2NyZWF0ZVdlZWtDZWxscygpO1xuICB9XG5cbiAgLyoqIENyZWF0ZXMgTWRDYWxlbmRhckNlbGxzIGZvciB0aGUgZGF0ZXMgaW4gdGhpcyBtb250aC4gKi9cbiAgcHJpdmF0ZSBfY3JlYXRlV2Vla0NlbGxzKCkge1xuICAgIGxldCBkYXlzSW5Nb250aCA9IHRoaXMuX2FkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgodGhpcy5hY3RpdmVEYXRlKTtcbiAgICBsZXQgZGF0ZU5hbWVzID0gdGhpcy5fYWRhcHRlci5nZXREYXRlTmFtZXMoKTtcbiAgICB0aGlzLl93ZWVrcyA9IFtbXV07XG4gICAgZm9yIChsZXQgaSA9IDAsIGNlbGwgPSB0aGlzLl9maXJzdFdlZWtPZmZzZXQ7IGkgPCBkYXlzSW5Nb250aDsgaSsrICwgY2VsbCsrKSB7XG4gICAgICBpZiAoY2VsbCA9PSBEQVlTX1BFUl9XRUVLKSB7XG4gICAgICAgIHRoaXMuX3dlZWtzLnB1c2goW10pO1xuICAgICAgICBjZWxsID0gMDtcbiAgICAgIH1cbiAgICAgIGxldCBkYXRlID0gdGhpcy5fYWRhcHRlci5jcmVhdGVEYXRldGltZShcbiAgICAgICAgdGhpcy5fYWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICAgIHRoaXMuX2FkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSwgaSArIDEsXG4gICAgICAgIHRoaXMuX2FkYXB0ZXIuZ2V0SG91cih0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICB0aGlzLl9hZGFwdGVyLmdldE1pbnV0ZSh0aGlzLmFjdGl2ZURhdGUpKTtcbiAgICAgIGxldCBlbmFibGVkID0gIXRoaXMuZGF0ZUZpbHRlciB8fFxuICAgICAgICB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSk7XG4gICAgICBsZXQgYXJpYUxhYmVsID0gdGhpcy5fYWRhcHRlci5mb3JtYXQoZGF0ZSwgdGhpcy5fZGF0ZUZvcm1hdHMuZGlzcGxheS5kYXRlQTExeUxhYmVsKTtcbiAgICAgIHRoaXMuX3dlZWtzW3RoaXMuX3dlZWtzLmxlbmd0aCAtIDFdXG4gICAgICAgIC5wdXNoKG5ldyBNYXREYXRldGltZXBpY2tlckNhbGVuZGFyQ2VsbChpICsgMSwgZGF0ZU5hbWVzW2ldLCBhcmlhTGFiZWwsIGVuYWJsZWQpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZGF0ZSBpbiB0aGlzIG1vbnRoIHRoYXQgdGhlIGdpdmVuIERhdGUgZmFsbHMgb24uXG4gICAqIFJldHVybnMgbnVsbCBpZiB0aGUgZ2l2ZW4gRGF0ZSBpcyBpbiBhbm90aGVyIG1vbnRoLlxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0RGF0ZUluQ3VycmVudE1vbnRoKGRhdGU6IEQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hZGFwdGVyLnNhbWVNb250aEFuZFllYXIoZGF0ZSwgdGhpcy5hY3RpdmVEYXRlKSA/XG4gICAgICB0aGlzLl9hZGFwdGVyLmdldERhdGUoZGF0ZSkgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBjYWxlbmRhclN0YXRlKGRpcmVjdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fY2FsZW5kYXJTdGF0ZSA9IGRpcmVjdGlvbjtcbiAgfVxuXG4gIF9jYWxlbmRhclN0YXRlRG9uZSgpIHtcbiAgICB0aGlzLl9jYWxlbmRhclN0YXRlID0gXCJcIjtcbiAgfVxuXG59XG4iXX0=