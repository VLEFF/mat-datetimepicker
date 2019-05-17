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
const DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 * @template D
 */
export class MatDatetimepickerMonthView {
    /**
     * @param {?} _adapter
     * @param {?} _dateFormats
     */
    constructor(_adapter, _dateFormats) {
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
        const firstDayOfWeek = this._adapter.getFirstDayOfWeek();
        /** @type {?} */
        const narrowWeekdays = this._adapter.getDayOfWeekNames("narrow");
        /** @type {?} */
        const longWeekdays = this._adapter.getDayOfWeekNames("long");
        // Rotate the labels for days of the week based on the configured first day of the week.
        /** @type {?} */
        let weekdays = longWeekdays.map((/**
         * @param {?} long
         * @param {?} i
         * @return {?}
         */
        (long, i) => {
            return { long, narrow: narrowWeekdays[i] };
        }));
        this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
        this._activeDate = this._adapter.today();
    }
    /**
     * The date to display in this month view (everything other than the month and year is ignored).
     * @return {?}
     */
    get activeDate() {
        return this._activeDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set activeDate(value) {
        /** @type {?} */
        let oldActiveDate = this._activeDate;
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
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set selected(value) {
        this._selected = value;
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * Handles when a new date is selected.
     * @param {?} date
     * @return {?}
     */
    _dateSelected(date) {
        this.selectedChange.emit(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), date, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)));
        if (this.type === "date") {
            this._userSelection.emit();
        }
    }
    /**
     * Initializes this month view.
     * @private
     * @return {?}
     */
    _init() {
        this._selectedDate = this._getDateInCurrentMonth(this.selected);
        this._todayDate = this._getDateInCurrentMonth(this._adapter.today());
        /** @type {?} */
        let firstOfMonth = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
        this._firstWeekOffset =
            (DAYS_PER_WEEK + this._adapter.getDayOfWeek(firstOfMonth) -
                this._adapter.getFirstDayOfWeek()) % DAYS_PER_WEEK;
        this._createWeekCells();
    }
    /**
     * Creates MdCalendarCells for the dates in this month.
     * @private
     * @return {?}
     */
    _createWeekCells() {
        /** @type {?} */
        let daysInMonth = this._adapter.getNumDaysInMonth(this.activeDate);
        /** @type {?} */
        let dateNames = this._adapter.getDateNames();
        this._weeks = [[]];
        for (let i = 0, cell = this._firstWeekOffset; i < daysInMonth; i++, cell++) {
            if (cell == DAYS_PER_WEEK) {
                this._weeks.push([]);
                cell = 0;
            }
            /** @type {?} */
            let date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), i + 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
            /** @type {?} */
            let enabled = !this.dateFilter ||
                this.dateFilter(date);
            /** @type {?} */
            let ariaLabel = this._adapter.format(date, this._dateFormats.display.dateA11yLabel);
            this._weeks[this._weeks.length - 1]
                .push(new MatDatetimepickerCalendarCell(i + 1, dateNames[i], ariaLabel, enabled));
        }
    }
    /**
     * Gets the date in this month that the given Date falls on.
     * Returns null if the given Date is in another month.
     * @private
     * @param {?} date
     * @return {?}
     */
    _getDateInCurrentMonth(date) {
        return this._adapter.sameMonthAndYear(date, this.activeDate) ?
            this._adapter.getDate(date) : null;
    }
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    calendarState(direction) {
        this._calendarState = direction;
    }
    /**
     * @return {?}
     */
    _calendarStateDone() {
        this._calendarState = "";
    }
}
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
MatDatetimepickerMonthView.ctorParameters = () => [
    { type: DatetimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] }] }
];
MatDatetimepickerMonthView.propDecorators = {
    type: [{ type: Input }],
    _userSelection: [{ type: Output }],
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    dateFilter: [{ type: Input }],
    selectedChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9udGgtdmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXQtZGF0ZXRpbWVwaWNrZXIvY29yZS8iLCJzb3VyY2VzIjpbImRhdGV0aW1lcGlja2VyL21vbnRoLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBRUwsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBQ1IsTUFBTSxFQUNOLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsb0JBQW9CLEVBRXJCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUNMLGVBQWUsRUFDaEIsTUFBTSw2QkFBNkIsQ0FBQztBQUNyQyxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDNUQsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O01BRS9ELGFBQWEsR0FBRyxDQUFDOzs7Ozs7QUFhdkIsTUFBTSxPQUFPLDBCQUEwQjs7Ozs7SUFxRXJDLFlBQStCLFFBQTRCLEVBQ0csWUFBZ0M7UUFEL0QsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFDRyxpQkFBWSxHQUFaLFlBQVksQ0FBb0I7UUFwRXJGLFNBQUksR0FBMkMsTUFBTSxDQUFDO1FBRXJELG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQzs7OztRQTJDMUMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBSyxDQUFDO1FBd0IvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixNQUFNLDBCQUEwQixDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDckQ7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN0QixNQUFNLDBCQUEwQixDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDMUQ7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LENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7Ozs7OztJQUVPLGFBQWEsQ0FBQyxTQUFpQjtRQUNyQyxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztJQUNsQyxDQUFDOzs7O0lBRUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7OztZQXhLRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLCtCQUErQjtnQkFDekMsaXBCQUE4QjtnQkFDOUIsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMzQixhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFsQkMsZUFBZSx1QkF3RkYsUUFBUTs0Q0FDUixRQUFRLFlBQUksTUFBTSxTQUFDLG9CQUFvQjs7O21CQXBFbkQsS0FBSzs2QkFFTCxNQUFNO3lCQUtOLEtBQUs7dUJBc0JMLEtBQUs7eUJBYUwsS0FBSzs2QkFHTCxNQUFNOzs7O0lBN0NQLDBDQUErRDs7SUFFL0Qsb0RBQW9EOzs7OztJQXdCcEQsaURBQXVCOzs7OztJQWF2QiwrQ0FBcUI7Ozs7O0lBR3JCLGdEQUEwQzs7Ozs7SUFHMUMsb0RBQWlEOzs7OztJQUdqRCw0Q0FBMEM7Ozs7O0lBRzFDLHNEQUF5Qjs7Ozs7O0lBTXpCLG1EQUFzQjs7Ozs7SUFHdEIsZ0RBQW1COzs7OztJQUduQiwrQ0FBOEM7O0lBRTlDLG9EQUF1Qjs7SUFFWCw4Q0FBK0M7Ozs7O0lBQy9DLGtEQUFrRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge1xuICBNQVRfREFURVRJTUVfRk9STUFUUyxcbiAgTWF0RGF0ZXRpbWVGb3JtYXRzXG59IGZyb20gXCIuLi9hZGFwdGVyL2RhdGV0aW1lLWZvcm1hdHNcIjtcbmltcG9ydCB7XG4gIERhdGV0aW1lQWRhcHRlclxufSBmcm9tIFwiLi4vYWRhcHRlci9kYXRldGltZS1hZGFwdGVyXCI7XG5pbXBvcnQgeyBNYXREYXRldGltZXBpY2tlckNhbGVuZGFyQ2VsbCB9IGZyb20gXCIuL2NhbGVuZGFyLWJvZHlcIjtcbmltcG9ydCB7IHNsaWRlQ2FsZW5kYXIgfSBmcm9tIFwiLi9kYXRldGltZXBpY2tlci1hbmltYXRpb25zXCI7XG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gXCIuL2RhdGV0aW1lcGlja2VyLWVycm9yc1wiO1xuXG5jb25zdCBEQVlTX1BFUl9XRUVLID0gNztcblxuLyoqXG4gKiBBbiBpbnRlcm5hbCBjb21wb25lbnQgdXNlZCB0byBkaXNwbGF5IGEgc2luZ2xlIG1vbnRoIGluIHRoZSBkYXRlcGlja2VyLlxuICogQGRvY3MtcHJpdmF0ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwibWF0LWRhdGV0aW1lcGlja2VyLW1vbnRoLXZpZXdcIixcbiAgdGVtcGxhdGVVcmw6IFwibW9udGgtdmlldy5odG1sXCIsXG4gIGFuaW1hdGlvbnM6IFtzbGlkZUNhbGVuZGFyXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgTWF0RGF0ZXRpbWVwaWNrZXJNb250aFZpZXc8RD4gaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcblxuICBASW5wdXQoKSB0eXBlOiBcImRhdGVcIiB8IFwidGltZVwiIHwgXCJtb250aFwiIHwgXCJkYXRldGltZVwiID0gXCJkYXRlXCI7XG5cbiAgQE91dHB1dCgpIF91c2VyU2VsZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgZGF0ZSB0byBkaXNwbGF5IGluIHRoaXMgbW9udGggdmlldyAoZXZlcnl0aGluZyBvdGhlciB0aGFuIHRoZSBtb250aCBhbmQgeWVhciBpcyBpZ25vcmVkKS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBhY3RpdmVEYXRlKCk6IEQge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVEYXRlO1xuICB9XG5cbiAgc2V0IGFjdGl2ZURhdGUodmFsdWU6IEQpIHtcbiAgICBsZXQgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2FjdGl2ZURhdGU7XG4gICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHZhbHVlIHx8IHRoaXMuX2FkYXB0ZXIudG9kYXkoKTtcbiAgICBpZiAob2xkQWN0aXZlRGF0ZSAmJiB0aGlzLl9hY3RpdmVEYXRlICYmXG4gICAgICAhdGhpcy5fYWRhcHRlci5zYW1lTW9udGhBbmRZZWFyKG9sZEFjdGl2ZURhdGUsIHRoaXMuX2FjdGl2ZURhdGUpKSB7XG4gICAgICB0aGlzLl9pbml0KCk7XG4gICAgICBpZiAodGhpcy5fYWRhcHRlci5pc0luTmV4dE1vbnRoKG9sZEFjdGl2ZURhdGUsIHRoaXMuX2FjdGl2ZURhdGUpKSB7XG4gICAgICAgIHRoaXMuY2FsZW5kYXJTdGF0ZShcInJpZ2h0XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclN0YXRlKFwibGVmdFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hY3RpdmVEYXRlOiBEO1xuXG4gIC8qKiBUaGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUuICovXG4gIEBJbnB1dCgpXG4gIGdldCBzZWxlY3RlZCgpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gIH1cblxuICBzZXQgc2VsZWN0ZWQodmFsdWU6IEQpIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHZhbHVlO1xuICAgIHRoaXMuX3NlbGVjdGVkRGF0ZSA9IHRoaXMuX2dldERhdGVJbkN1cnJlbnRNb250aCh0aGlzLnNlbGVjdGVkKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBEO1xuXG4gIC8qKiBBIGZ1bmN0aW9uIHVzZWQgdG8gZmlsdGVyIHdoaWNoIGRhdGVzIGFyZSBzZWxlY3RhYmxlLiAqL1xuICBASW5wdXQoKSBkYXRlRmlsdGVyOiAoZGF0ZTogRCkgPT4gYm9vbGVhbjtcblxuICAvKiogRW1pdHMgd2hlbiBhIG5ldyBkYXRlIGlzIHNlbGVjdGVkLiAqL1xuICBAT3V0cHV0KCkgc2VsZWN0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEQ+KCk7XG5cbiAgLyoqIEdyaWQgb2YgY2FsZW5kYXIgY2VsbHMgcmVwcmVzZW50aW5nIHRoZSBkYXRlcyBvZiB0aGUgbW9udGguICovXG4gIF93ZWVrczogTWF0RGF0ZXRpbWVwaWNrZXJDYWxlbmRhckNlbGxbXVtdO1xuXG4gIC8qKiBUaGUgbnVtYmVyIG9mIGJsYW5rIGNlbGxzIGluIHRoZSBmaXJzdCByb3cgYmVmb3JlIHRoZSAxc3Qgb2YgdGhlIG1vbnRoLiAqL1xuICBfZmlyc3RXZWVrT2Zmc2V0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBkYXRlIG9mIHRoZSBtb250aCB0aGF0IHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgRGF0ZSBmYWxscyBvbi5cbiAgICogTnVsbCBpZiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIERhdGUgaXMgaW4gYW5vdGhlciBtb250aC5cbiAgICovXG4gIF9zZWxlY3RlZERhdGU6IG51bWJlcjtcblxuICAvKiogVGhlIGRhdGUgb2YgdGhlIG1vbnRoIHRoYXQgdG9kYXkgZmFsbHMgb24uIE51bGwgaWYgdG9kYXkgaXMgaW4gYW5vdGhlciBtb250aC4gKi9cbiAgX3RvZGF5RGF0ZTogbnVtYmVyO1xuXG4gIC8qKiBUaGUgbmFtZXMgb2YgdGhlIHdlZWtkYXlzLiAqL1xuICBfd2Vla2RheXM6IHsgbG9uZzogc3RyaW5nLCBuYXJyb3c6IHN0cmluZyB9W107XG5cbiAgX2NhbGVuZGFyU3RhdGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwdWJsaWMgX2FkYXB0ZXI6IERhdGV0aW1lQWRhcHRlcjxEPixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURVRJTUVfRk9STUFUUykgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM6IE1hdERhdGV0aW1lRm9ybWF0cykge1xuICAgIGlmICghdGhpcy5fYWRhcHRlcikge1xuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoXCJEYXRldGltZUFkYXB0ZXJcIik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9kYXRlRm9ybWF0cykge1xuICAgICAgdGhyb3cgY3JlYXRlTWlzc2luZ0RhdGVJbXBsRXJyb3IoXCJNQVRfREFURVRJTUVfRk9STUFUU1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdERheU9mV2VlayA9IHRoaXMuX2FkYXB0ZXIuZ2V0Rmlyc3REYXlPZldlZWsoKTtcbiAgICBjb25zdCBuYXJyb3dXZWVrZGF5cyA9IHRoaXMuX2FkYXB0ZXIuZ2V0RGF5T2ZXZWVrTmFtZXMoXCJuYXJyb3dcIik7XG4gICAgY29uc3QgbG9uZ1dlZWtkYXlzID0gdGhpcy5fYWRhcHRlci5nZXREYXlPZldlZWtOYW1lcyhcImxvbmdcIik7XG5cbiAgICAvLyBSb3RhdGUgdGhlIGxhYmVscyBmb3IgZGF5cyBvZiB0aGUgd2VlayBiYXNlZCBvbiB0aGUgY29uZmlndXJlZCBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXG4gICAgbGV0IHdlZWtkYXlzID0gbG9uZ1dlZWtkYXlzLm1hcCgobG9uZywgaSkgPT4ge1xuICAgICAgcmV0dXJuIHtsb25nLCBuYXJyb3c6IG5hcnJvd1dlZWtkYXlzW2ldfTtcbiAgICB9KTtcbiAgICB0aGlzLl93ZWVrZGF5cyA9IHdlZWtkYXlzLnNsaWNlKGZpcnN0RGF5T2ZXZWVrKS5jb25jYXQod2Vla2RheXMuc2xpY2UoMCwgZmlyc3REYXlPZldlZWspKTtcblxuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9hZGFwdGVyLnRvZGF5KCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgd2hlbiBhIG5ldyBkYXRlIGlzIHNlbGVjdGVkLiAqL1xuICBfZGF0ZVNlbGVjdGVkKGRhdGU6IG51bWJlcikge1xuICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLl9hZGFwdGVyLmNyZWF0ZURhdGV0aW1lKFxuICAgICAgdGhpcy5fYWRhcHRlci5nZXRZZWFyKHRoaXMuYWN0aXZlRGF0ZSksIHRoaXMuX2FkYXB0ZXIuZ2V0TW9udGgodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgIGRhdGUsIHRoaXMuX2FkYXB0ZXIuZ2V0SG91cih0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgdGhpcy5fYWRhcHRlci5nZXRNaW51dGUodGhpcy5hY3RpdmVEYXRlKSkpO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiZGF0ZVwiKSB7XG4gICAgICB0aGlzLl91c2VyU2VsZWN0aW9uLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKiogSW5pdGlhbGl6ZXMgdGhpcyBtb250aCB2aWV3LiAqL1xuICBwcml2YXRlIF9pbml0KCkge1xuICAgIHRoaXMuX3NlbGVjdGVkRGF0ZSA9IHRoaXMuX2dldERhdGVJbkN1cnJlbnRNb250aCh0aGlzLnNlbGVjdGVkKTtcbiAgICB0aGlzLl90b2RheURhdGUgPSB0aGlzLl9nZXREYXRlSW5DdXJyZW50TW9udGgodGhpcy5fYWRhcHRlci50b2RheSgpKTtcblxuICAgIGxldCBmaXJzdE9mTW9udGggPSB0aGlzLl9hZGFwdGVyLmNyZWF0ZURhdGV0aW1lKHRoaXMuX2FkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgdGhpcy5fYWRhcHRlci5nZXRNb250aCh0aGlzLmFjdGl2ZURhdGUpLCAxLFxuICAgICAgdGhpcy5fYWRhcHRlci5nZXRIb3VyKHRoaXMuYWN0aXZlRGF0ZSksXG4gICAgICB0aGlzLl9hZGFwdGVyLmdldE1pbnV0ZSh0aGlzLmFjdGl2ZURhdGUpKTtcbiAgICB0aGlzLl9maXJzdFdlZWtPZmZzZXQgPVxuICAgICAgKERBWVNfUEVSX1dFRUsgKyB0aGlzLl9hZGFwdGVyLmdldERheU9mV2VlayhmaXJzdE9mTW9udGgpIC1cbiAgICAgICAgdGhpcy5fYWRhcHRlci5nZXRGaXJzdERheU9mV2VlaygpKSAlIERBWVNfUEVSX1dFRUs7XG5cbiAgICB0aGlzLl9jcmVhdGVXZWVrQ2VsbHMoKTtcbiAgfVxuXG4gIC8qKiBDcmVhdGVzIE1kQ2FsZW5kYXJDZWxscyBmb3IgdGhlIGRhdGVzIGluIHRoaXMgbW9udGguICovXG4gIHByaXZhdGUgX2NyZWF0ZVdlZWtDZWxscygpIHtcbiAgICBsZXQgZGF5c0luTW9udGggPSB0aGlzLl9hZGFwdGVyLmdldE51bURheXNJbk1vbnRoKHRoaXMuYWN0aXZlRGF0ZSk7XG4gICAgbGV0IGRhdGVOYW1lcyA9IHRoaXMuX2FkYXB0ZXIuZ2V0RGF0ZU5hbWVzKCk7XG4gICAgdGhpcy5fd2Vla3MgPSBbW11dO1xuICAgIGZvciAobGV0IGkgPSAwLCBjZWxsID0gdGhpcy5fZmlyc3RXZWVrT2Zmc2V0OyBpIDwgZGF5c0luTW9udGg7IGkrKyAsIGNlbGwrKykge1xuICAgICAgaWYgKGNlbGwgPT0gREFZU19QRVJfV0VFSykge1xuICAgICAgICB0aGlzLl93ZWVrcy5wdXNoKFtdKTtcbiAgICAgICAgY2VsbCA9IDA7XG4gICAgICB9XG4gICAgICBsZXQgZGF0ZSA9IHRoaXMuX2FkYXB0ZXIuY3JlYXRlRGF0ZXRpbWUoXG4gICAgICAgIHRoaXMuX2FkYXB0ZXIuZ2V0WWVhcih0aGlzLmFjdGl2ZURhdGUpLFxuICAgICAgICB0aGlzLl9hZGFwdGVyLmdldE1vbnRoKHRoaXMuYWN0aXZlRGF0ZSksIGkgKyAxLFxuICAgICAgICB0aGlzLl9hZGFwdGVyLmdldEhvdXIodGhpcy5hY3RpdmVEYXRlKSxcbiAgICAgICAgdGhpcy5fYWRhcHRlci5nZXRNaW51dGUodGhpcy5hY3RpdmVEYXRlKSk7XG4gICAgICBsZXQgZW5hYmxlZCA9ICF0aGlzLmRhdGVGaWx0ZXIgfHxcbiAgICAgICAgdGhpcy5kYXRlRmlsdGVyKGRhdGUpO1xuICAgICAgbGV0IGFyaWFMYWJlbCA9IHRoaXMuX2FkYXB0ZXIuZm9ybWF0KGRhdGUsIHRoaXMuX2RhdGVGb3JtYXRzLmRpc3BsYXkuZGF0ZUExMXlMYWJlbCk7XG4gICAgICB0aGlzLl93ZWVrc1t0aGlzLl93ZWVrcy5sZW5ndGggLSAxXVxuICAgICAgICAucHVzaChuZXcgTWF0RGF0ZXRpbWVwaWNrZXJDYWxlbmRhckNlbGwoaSArIDEsIGRhdGVOYW1lc1tpXSwgYXJpYUxhYmVsLCBlbmFibGVkKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRhdGUgaW4gdGhpcyBtb250aCB0aGF0IHRoZSBnaXZlbiBEYXRlIGZhbGxzIG9uLlxuICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIGdpdmVuIERhdGUgaXMgaW4gYW5vdGhlciBtb250aC5cbiAgICovXG4gIHByaXZhdGUgX2dldERhdGVJbkN1cnJlbnRNb250aChkYXRlOiBEKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fYWRhcHRlci5zYW1lTW9udGhBbmRZZWFyKGRhdGUsIHRoaXMuYWN0aXZlRGF0ZSkgP1xuICAgICAgdGhpcy5fYWRhcHRlci5nZXREYXRlKGRhdGUpIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgY2FsZW5kYXJTdGF0ZShkaXJlY3Rpb246IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2NhbGVuZGFyU3RhdGUgPSBkaXJlY3Rpb247XG4gIH1cblxuICBfY2FsZW5kYXJTdGF0ZURvbmUoKSB7XG4gICAgdGhpcy5fY2FsZW5kYXJTdGF0ZSA9IFwiXCI7XG4gIH1cblxufVxuIl19