/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW } from "@angular/cdk/keycodes";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, NgZone, Optional, Output, ViewEncapsulation } from "@angular/core";
import { MatDatepickerIntl } from "@angular/material";
import { first } from "rxjs/operators";
import { DatetimeAdapter } from "../adapter/datetime-adapter";
import { MAT_DATETIME_FORMATS } from "../adapter/datetime-formats";
import { slideCalendar } from "./datetimepicker-animations";
import { createMissingDateImplError } from "./datetimepicker-errors";
import { MatDatetimepickerFilterType } from "./datetimepicker-filtertype";
/**
 * A calendar that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
var MatDatetimepickerCalendar = /** @class */ (function () {
    function MatDatetimepickerCalendar(_elementRef, _intl, _ngZone, _adapter, _dateFormats, changeDetectorRef) {
        var _this = this;
        this._elementRef = _elementRef;
        this._intl = _intl;
        this._ngZone = _ngZone;
        this._adapter = _adapter;
        this._dateFormats = _dateFormats;
        this._userSelection = new EventEmitter();
        this.type = "date";
        /**
         * Whether the calendar should be started in month or year view.
         */
        this.startView = "month";
        this.timeInterval = 1;
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        /**
         * Date filter for the month and year views.
         */
        this._dateFilterForViews = function (date) {
            return !!date &&
                (!_this.dateFilter || _this.dateFilter(date, MatDatetimepickerFilterType.DATE)) &&
                (!_this.minDate || _this._adapter.compareDate(date, _this.minDate) >= 0) &&
                (!_this.maxDate || _this._adapter.compareDate(date, _this.maxDate) <= 0);
        };
        /**
         * Whether the calendar is in month view.
         */
        this._currentView = "month";
        this._clockView = "hour";
        if (!this._adapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATETIME_FORMATS");
        }
        this._intlChanges = _intl.changes.subscribe(function () { return changeDetectorRef.markForCheck(); });
    }
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "startAt", {
        /** A date representing the period (month or year) to start the calendar in. */
        get: /**
         * A date representing the period (month or year) to start the calendar in.
         * @return {?}
         */
        function () {
            return this._startAt;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._startAt = this._adapter.getValidDateOrNull(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "selected", {
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
            this._selected = this._adapter.getValidDateOrNull(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "minDate", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () {
            return this._minDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._minDate = this._adapter.getValidDateOrNull(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "maxDate", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () {
            return this._maxDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._maxDate = this._adapter.getValidDateOrNull(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_activeDate", {
        /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         */
        get: /**
         * The current active date. This determines which time period is shown and which date is
         * highlighted when using keyboard navigation.
         * @return {?}
         */
        function () {
            return this._clampedActiveDate;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var oldActiveDate = this._clampedActiveDate;
            this._clampedActiveDate = this._adapter.clampDate(value, this.minDate, this.maxDate);
            if (oldActiveDate && this._clampedActiveDate && this._currentView === "month" &&
                !this._adapter.sameMonthAndYear(oldActiveDate, this._clampedActiveDate)) {
                if (this._adapter.isInNextMonth(oldActiveDate, this._clampedActiveDate)) {
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
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._userSelected = /**
     * @return {?}
     */
    function () {
        this._userSelection.emit();
    };
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_yearLabel", {
        /** The label for the current calendar view. */
        get: /**
         * The label for the current calendar view.
         * @return {?}
         */
        function () {
            return this._adapter.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_monthYearLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentView === "month" ? this._adapter.getMonthNames("long")[this._adapter.getMonth(this._activeDate)] :
                this._adapter.getYearName(this._activeDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_dateLabel", {
        get: /**
         * @return {?}
         */
        function () {
            switch (this.type) {
                case "month":
                    return this._adapter.getMonthNames("long")[this._adapter.getMonth(this._activeDate)];
                default:
                    return this._adapter.format(this._activeDate, this._dateFormats.display.popupHeaderDateLabel);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_hoursLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this._2digit(this._adapter.getHour(this._activeDate));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerCalendar.prototype, "_minutesLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this._2digit(this._adapter.getMinute(this._activeDate));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._activeDate = this.startAt || this._adapter.today();
        this._focusActiveCell();
        if (this.type === "month") {
            this._currentView = "year";
        }
        else if (this.type === "time") {
            this._currentView = "clock";
        }
        else {
            this._currentView = this.startView || "month";
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._intlChanges.unsubscribe();
    };
    /** Handles date selection in the month view. */
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._dateSelected = /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this.type === "date") {
            if (!this._adapter.sameDate(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
        else {
            this._activeDate = date;
            this._currentView = "clock";
        }
    };
    /** Handles month selection in the year view. */
    /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._monthSelected = /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    function (month) {
        if (this.type === "month") {
            if (!this._adapter.sameMonthAndYear(month, this.selected)) {
                this.selectedChange.emit(this._adapter.getFirstDateOfMonth(month));
            }
        }
        else {
            this._activeDate = month;
            this._currentView = "month";
            this._clockView = "hour";
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._timeSelected = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        if (this._clockView !== "minute") {
            this._activeDate = date;
            this._clockView = "minute";
        }
        else {
            if (!this._adapter.sameDatetime(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._onActiveDateChange = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this._activeDate = date;
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._yearClicked = /**
     * @return {?}
     */
    function () {
        this._currentView = "year";
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._dateClicked = /**
     * @return {?}
     */
    function () {
        if (this.type !== "month") {
            this._currentView = "month";
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._hoursClicked = /**
     * @return {?}
     */
    function () {
        this._currentView = "clock";
        this._clockView = "hour";
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._minutesClicked = /**
     * @return {?}
     */
    function () {
        this._currentView = "clock";
        this._clockView = "minute";
    };
    /** Handles user clicks on the previous button. */
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._previousClicked = /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    function () {
        this._activeDate = this._currentView === "month" ?
            this._adapter.addCalendarMonths(this._activeDate, -1) :
            this._adapter.addCalendarYears(this._activeDate, -1);
    };
    /** Handles user clicks on the next button. */
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._nextClicked = /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    function () {
        this._activeDate = this._currentView === "month" ?
            this._adapter.addCalendarMonths(this._activeDate, 1) :
            this._adapter.addCalendarYears(this._activeDate, 1);
    };
    /** Whether the previous period button is enabled. */
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._previousEnabled = /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    function () {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    };
    /** Whether the next period button is enabled. */
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._nextEnabled = /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    function () {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    };
    /** Handles keydown events on the calendar body. */
    /**
     * Handles keydown events on the calendar body.
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._handleCalendarBodyKeydown = /**
     * Handles keydown events on the calendar body.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // TODO(mmalerba): We currently allow keyboard navigation to disabled dates, but just prevent
        // disabled ones from being selected. This may not be ideal, we should look into whether
        // navigation should skip over disabled dates, and if so, how to implement that efficiently.
        if (this._currentView === "month") {
            this._handleCalendarBodyKeydownInMonthView(event);
        }
        else if (this._currentView === "year") {
            this._handleCalendarBodyKeydownInYearView(event);
        }
        else {
            this._handleCalendarBodyKeydownInClockView(event);
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._focusActiveCell = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._ngZone.runOutsideAngular(function () {
            _this._ngZone.onStable.asObservable().pipe(first()).subscribe(function () {
                _this._elementRef.nativeElement.focus();
            });
        });
    };
    /** Whether the two dates represent the same view in the current view mode (month or year). */
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._isSameView = /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    function (date1, date2) {
        return this._currentView === "month" ?
            this._adapter.getYear(date1) === this._adapter.getYear(date2) &&
                this._adapter.getMonth(date1) === this._adapter.getMonth(date2) :
            this._adapter.getYear(date1) === this._adapter.getYear(date2);
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @private
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._handleCalendarBodyKeydownInMonthView = /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, -7);
                break;
            case DOWN_ARROW:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, 7);
                break;
            case HOME:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, 1 - this._adapter.getDate(this._activeDate));
                break;
            case END:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, (this._adapter.getNumDaysInMonth(this._activeDate) -
                    this._adapter.getDate(this._activeDate)));
                break;
            case PAGE_UP:
                this._activeDate = event.altKey ?
                    this._adapter.addCalendarYears(this._activeDate, -1) :
                    this._adapter.addCalendarMonths(this._activeDate, -1);
                break;
            case PAGE_DOWN:
                this._activeDate = event.altKey ?
                    this._adapter.addCalendarYears(this._activeDate, 1) :
                    this._adapter.addCalendarMonths(this._activeDate, 1);
                break;
            case ENTER:
                if (this._dateFilterForViews(this._activeDate)) {
                    this._dateSelected(this._activeDate);
                    // Prevent unexpected default actions such as form submission.
                    event.preventDefault();
                }
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /** Handles keydown events on the calendar body when calendar is in year view. */
    /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @private
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._handleCalendarBodyKeydownInYearView = /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case LEFT_ARROW:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, -1);
                break;
            case RIGHT_ARROW:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, 1);
                break;
            case UP_ARROW:
                this._activeDate = this._prevMonthInSameCol(this._activeDate);
                break;
            case DOWN_ARROW:
                this._activeDate = this._nextMonthInSameCol(this._activeDate);
                break;
            case HOME:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, -this._adapter.getMonth(this._activeDate));
                break;
            case END:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, 11 - this._adapter.getMonth(this._activeDate));
                break;
            case PAGE_UP:
                this._activeDate =
                    this._adapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case PAGE_DOWN:
                this._activeDate =
                    this._adapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case ENTER:
                this._monthSelected(this._activeDate);
                break;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /** Handles keydown events on the calendar body when calendar is in month view. */
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @private
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._handleCalendarBodyKeydownInClockView = /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        switch (event.keyCode) {
            case UP_ARROW:
                this._activeDate = this._clockView === "hour" ?
                    this._adapter.addCalendarHours(this._activeDate, 1) :
                    this._adapter.addCalendarMinutes(this._activeDate, 1);
                break;
            case DOWN_ARROW:
                this._activeDate = this._clockView === "hour" ?
                    this._adapter.addCalendarHours(this._activeDate, -1) :
                    this._adapter.addCalendarMinutes(this._activeDate, -1);
                break;
            case ENTER:
                this._timeSelected(this._activeDate);
                return;
            default:
                // Don't prevent default or focus active cell on keys that we don't explicitly handle.
                return;
        }
        // Prevent unexpected default actions such as form submission.
        event.preventDefault();
    };
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     */
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     * @private
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._prevMonthInSameCol = /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        /** @type {?} */
        var increment = this._adapter.getMonth(date) <= 4 ? -5 :
            (this._adapter.getMonth(date) >= 7 ? -7 : -12);
        return this._adapter.addCalendarMonths(date, increment);
    };
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     */
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     * @private
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._nextMonthInSameCol = /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        /** @type {?} */
        var increment = this._adapter.getMonth(date) <= 4 ? 7 :
            (this._adapter.getMonth(date) >= 7 ? 5 : 12);
        return this._adapter.addCalendarMonths(date, increment);
    };
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype.calendarState = /**
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
    MatDatetimepickerCalendar.prototype._calendarStateDone = /**
     * @return {?}
     */
    function () {
        this._calendarState = "";
    };
    /**
     * @private
     * @param {?} n
     * @return {?}
     */
    MatDatetimepickerCalendar.prototype._2digit = /**
     * @private
     * @param {?} n
     * @return {?}
     */
    function (n) {
        return ("00" + n).slice(-2);
    };
    MatDatetimepickerCalendar.decorators = [
        { type: Component, args: [{
                    selector: "mat-datetimepicker-calendar",
                    template: "<div class=\"mat-datetimepicker-calendar-header\">\n  <div *ngIf=\"type !== 'time'\"\n       class=\"mat-datetimepicker-calendar-header-year\"\n       [class.active]=\"_currentView == 'year'\"\n       (click)=\"_yearClicked()\">{{ _yearLabel }}</div>\n  <div class=\"mat-datetimepicker-calendar-header-date-time\">\n    <span *ngIf=\"type !== 'time'\"\n          class=\"mat-datetimepicker-calendar-header-date\"\n          [class.active]=\"_currentView == 'month'\"\n          [class.not-clickable]=\"type === 'month'\"\n          (click)=\"_dateClicked()\">{{ _dateLabel }}</span>\n    <span *ngIf=\"type.endsWith('time')\"\n          class=\"mat-datetimepicker-calendar-header-time\"\n          [class.active]=\"_currentView == 'clock'\">\n      <span class=\"mat-datetimepicker-calendar-header-hours\"\n            [class.active]=\"_clockView == 'hour'\"\n            (click)=\"_hoursClicked()\">{{ _hoursLabel }}</span>:<span class=\"mat-datetimepicker-calendar-header-minutes\"\n                                                                     [class.active]=\"_clockView == 'minute'\"\n                                                                     (click)=\"_minutesClicked()\">{{ _minutesLabel }}</span>\n    </span>\n  </div>\n</div>\n<div class=\"mat-datetimepicker-calendar-content\" [ngSwitch]=\"_currentView\">\n  <div class=\"mat-month-content\" *ngIf=\"_currentView === 'month' || _currentView === 'year'\">\n    <div class=\"mat-datetimepicker-calendar-controls\">\n      <div class=\"mat-datetimepicker-calendar-previous-button\"\n           [class.disabled]=\"!_previousEnabled()\" (click)=\"_previousClicked()\"\n           aria-label=\"Previous month\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path>\n        </svg>\n      </div>\n      <div class=\"mat-datetimepicker-calendar-period-button\" [@slideCalendar]=\"_calendarState\" (@slideCalendar.done)=\"_calendarStateDone()\">\n        <strong>{{ _monthYearLabel }}</strong>\n      </div>\n      <div class=\"mat-datetimepicker-calendar-next-button\"\n           [class.disabled]=\"!_nextEnabled()\" (click)=\"_nextClicked()\"\n           aria-label=\"Next month\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path>\n        </svg>\n      </div>\n    </div>\n  </div>\n  <mat-datetimepicker-month-view *ngSwitchCase=\"'month'\"\n                  [activeDate]=\"_activeDate\"\n                  [type]=\"type\"\n                  [selected]=\"selected\"\n                  [dateFilter]=\"_dateFilterForViews\"\n                  (selectedChange)=\"_dateSelected($event)\"\n                  (_userSelection)=\"_userSelected()\">\n  </mat-datetimepicker-month-view>\n  <mat-datetimepicker-year-view *ngSwitchCase=\"'year'\"\n                 [activeDate]=\"_activeDate\"\n                 [type]=\"type\"\n                 [selected]=\"selected\"\n                 [dateFilter]=\"_dateFilterForViews\"\n                 (selectedChange)=\"_monthSelected($event)\"\n                 (_userSelection)=\"_userSelected()\">\n  </mat-datetimepicker-year-view>\n  <mat-datetimepicker-clock *ngSwitchDefault\n             [startView]=\"_clockView\"\n             [interval]=\"timeInterval\"\n             [minDate]=\"minDate\"\n             [maxDate]=\"maxDate\"\n             [dateFilter]=\"dateFilter\"\n             [selected]=\"_activeDate\"\n             (activeDateChange)=\"_onActiveDateChange($event)\"\n             (selectedChange)=\"_timeSelected($event)\"\n             (_userSelection)=\"_userSelected()\">\n  </mat-datetimepicker-clock>\n</div>\n",
                    host: {
                        "[class.mat-datetimepicker-calendar]": "true",
                        "tabindex": "0",
                        "(keydown)": "_handleCalendarBodyKeydown($event)"
                    },
                    animations: [slideCalendar],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".mat-datetimepicker-calendar{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block;outline:0}.mat-datetimepicker-calendar[mode=landscape]{display:flex}.mat-datetimepicker-calendar-header{padding:16px;font-size:14px;color:#fff;box-sizing:border-box}[mode=landscape] .mat-datetimepicker-calendar-header{width:150px;min-width:150px}.mat-datetimepicker-calendar-header-date-time,.mat-datetimepicker-calendar-header-year{width:100%;font-weight:500;white-space:nowrap}.mat-datetimepicker-calendar-header-date-time{font-size:30px;line-height:34px}[mode=landscape] .mat-datetimepicker-calendar-header-date-time{white-space:normal;word-wrap:break-word}.mat-datetimepicker-calendar-header-date:not(.active),.mat-datetimepicker-calendar-header-hours:not(.active),.mat-datetimepicker-calendar-header-minutes:not(.active),.mat-datetimepicker-calendar-header-year:not(.active){cursor:pointer;opacity:.6}.mat-datetimepicker-calendar-header-date.not-clickable,.mat-datetimepicker-calendar-header-hours.not-clickable,.mat-datetimepicker-calendar-header-minutes.not-clickable,.mat-datetimepicker-calendar-header-year.not-clickable{cursor:initial}.mat-datetimepicker-calendar-header-time{padding-left:8px}.mat-datetimepicker-calendar-header-time:not(.active){opacity:.6}.mat-datetimepicker-calendar-header-time:not(.active) .mat-datetimepicker-calendar-header-hours,.mat-datetimepicker-calendar-header-time:not(.active) .mat-datetimepicker-calendar-header-minutes{cursor:pointer;opacity:1}[mode=landscape] .mat-datetimepicker-calendar-header-time{display:block;padding-left:0}.mat-datetimepicker-calendar-content{width:100%;padding:0 8px 8px;outline:0;box-sizing:border-box;overflow:hidden}[mode=landscape] .mat-datetimepicker-calendar-content{padding-top:8px}.mat-datetimepicker-calendar-controls{display:flex;justify-content:space-between}.mat-datetimepicker-calendar-period-button{display:inline-block;height:48px;padding:12px;outline:0;border:0;background:0 0;box-sizing:border-box}.mat-datetimepicker-calendar-next-button,.mat-datetimepicker-calendar-previous-button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.mat-datetimepicker-calendar-next-button.disabled,.mat-datetimepicker-calendar-previous-button.disabled{color:rgba(0,0,0,.38);pointer-events:none}.mat-datetimepicker-calendar-next-button svg,.mat-datetimepicker-calendar-previous-button svg{fill:currentColor;vertical-align:top}.mat-datetimepicker-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mat-datetimepicker-calendar-table-header{color:rgba(0,0,0,.38)}.mat-datetimepicker-calendar-table-header th{text-align:center;font-size:11px;padding:0 0 8px}@media (min-width:480px){.mat-datetimepicker-calendar[mode=auto]{display:flex}.mat-datetimepicker-calendar[mode=auto] .mat-datetimepicker-calendar-header{width:150px;min-width:150px}.mat-datetimepicker-calendar[mode=auto] .mat-datetimepicker-calendar-header-date-time{white-space:normal;word-wrap:break-word}.mat-datetimepicker-calendar[mode=auto] .mat-datetimepicker-calendar-header-time{display:block;padding-left:0}.mat-datetimepicker-calendar[mode=auto] .mat-datetimepicker-calendar-content{padding-top:8px}}"]
                }] }
    ];
    /** @nocollapse */
    MatDatetimepickerCalendar.ctorParameters = function () { return [
        { type: ElementRef },
        { type: MatDatepickerIntl },
        { type: NgZone },
        { type: DatetimeAdapter, decorators: [{ type: Optional }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] }] },
        { type: ChangeDetectorRef }
    ]; };
    MatDatetimepickerCalendar.propDecorators = {
        _userSelection: [{ type: Output }],
        type: [{ type: Input }],
        startAt: [{ type: Input }],
        startView: [{ type: Input }],
        selected: [{ type: Input }],
        minDate: [{ type: Input }],
        maxDate: [{ type: Input }],
        timeInterval: [{ type: Input }],
        dateFilter: [{ type: Input }],
        selectedChange: [{ type: Output }]
    };
    return MatDatetimepickerCalendar;
}());
export { MatDatetimepickerCalendar };
if (false) {
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._intlChanges;
    /** @type {?} */
    MatDatetimepickerCalendar.prototype._userSelection;
    /** @type {?} */
    MatDatetimepickerCalendar.prototype.type;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._startAt;
    /**
     * Whether the calendar should be started in month or year view.
     * @type {?}
     */
    MatDatetimepickerCalendar.prototype.startView;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._selected;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._maxDate;
    /** @type {?} */
    MatDatetimepickerCalendar.prototype.timeInterval;
    /**
     * A function used to filter which dates are selectable.
     * @type {?}
     */
    MatDatetimepickerCalendar.prototype.dateFilter;
    /**
     * Emits when the currently selected date changes.
     * @type {?}
     */
    MatDatetimepickerCalendar.prototype.selectedChange;
    /**
     * Date filter for the month and year views.
     * @type {?}
     */
    MatDatetimepickerCalendar.prototype._dateFilterForViews;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._clampedActiveDate;
    /**
     * Whether the calendar is in month view.
     * @type {?}
     */
    MatDatetimepickerCalendar.prototype._currentView;
    /** @type {?} */
    MatDatetimepickerCalendar.prototype._clockView;
    /** @type {?} */
    MatDatetimepickerCalendar.prototype._calendarState;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._elementRef;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._intl;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._ngZone;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._adapter;
    /**
     * @type {?}
     * @private
     */
    MatDatetimepickerCalendar.prototype._dateFormats;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWF0LWRhdGV0aW1lcGlja2VyL2NvcmUvIiwic291cmNlcyI6WyJkYXRldGltZXBpY2tlci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0gsS0FBSyxFQUNMLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEVBQ1gsUUFBUSxFQUNULE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxNQUFNLEVBRU4sUUFBUSxFQUNSLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUM5RCxPQUFPLEVBQ0wsb0JBQW9CLEVBRXJCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzVELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDZCQUE2QixDQUFDOzs7Ozs7QUFNMUU7SUFvSkUsbUNBQW9CLFdBQXVCLEVBQ3ZCLEtBQXdCLEVBQ3hCLE9BQWUsRUFDSCxRQUE0QixFQUNFLFlBQWdDLEVBQ2xGLGlCQUFvQztRQUxoRCxpQkFlQztRQWZtQixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUN4QixZQUFPLEdBQVAs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O0NBQUEsQUF0Y0QsSUFzY0M7U0F6YlkseUJBQXlCOzs7Ozs7SUFFcEMsaURBQW1DOztJQUVuQyxtREFBb0Q7O0lBRXBELHlDQUErRDs7Ozs7SUFZL0QsNkNBQTJCOzs7OztJQUczQiw4Q0FBeUQ7Ozs7O0lBWXpELDhDQUE0Qjs7Ozs7SUFZNUIsNkNBQTJCOzs7OztJQVkzQiw2Q0FBMkI7O0lBRTNCLGlEQUFrQzs7Ozs7SUFHbEMsK0NBQTZFOzs7OztJQUc3RSxtREFBaUQ7Ozs7O0lBR2pELHdEQUtDOzs7OztJQXVCRCx1REFBOEI7Ozs7O0lBTzlCLGlEQUFtRDs7SUFDbkQsK0NBQXVDOztJQTZCdkMsbURBQXVCOzs7OztJQUVYLGdEQUErQjs7Ozs7SUFDL0IsMENBQWdDOzs7OztJQUNoQyw0Q0FBdUI7Ozs7O0lBQ3ZCLDZDQUFnRDs7Ozs7SUFDaEQsaURBQWtGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRE9XTl9BUlJPVyxcbiAgRU5ELFxuICBFTlRFUixcbiAgSE9NRSxcbiAgTEVGVF9BUlJPVyxcbiAgUEFHRV9ET1dOLFxuICBQQUdFX1VQLFxuICBSSUdIVF9BUlJPVyxcbiAgVVBfQVJST1dcbn0gZnJvbSBcIkBhbmd1bGFyL2Nkay9rZXljb2Rlc1wiO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0LFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkRlc3Ryb3ksXG4gIE9wdGlvbmFsLFxuICBPdXRwdXQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNYXREYXRlcGlja2VySW50bCB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbFwiO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IGZpcnN0IH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBEYXRldGltZUFkYXB0ZXIgfSBmcm9tIFwiLi4vYWRhcHRlci9kYXRldGltZS1hZGFwdGVyXCI7XG5pbXBvcnQge1xuICBNQVRfREFURVRJTUVfRk9STUFUUyxcbiAgTWF0RGF0ZXRpbWVGb3JtYXRzXG59IGZyb20gXCIuLi9hZGFwdGVyL2RhdGV0aW1lLWZvcm1hdHNcIjtcbmltcG9ydCB7IHNsaWRlQ2FsZW5kYXIgfSBmcm9tIFwiLi9kYXRldGltZXBpY2tlci1hbmltYXRpb25zXCI7XG5pbXBvcnQgeyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvciB9IGZyb20gXCIuL2RhdGV0aW1lcGlja2VyLWVycm9yc1wiO1xuaW1wb3J0IHsgTWF0RGF0ZXRpbWVwaWNrZXJGaWx0ZXJUeXBlIH0gZnJvbSBcIi4vZGF0ZXRpbWVwaWNrZXItZmlsdGVydHlwZVwiO1xuXG4vKipcbiAqIEEgY2FsZW5kYXIgdGhhdCBpcyB1c2VkIGFzIHBhcnQgb2YgdGhlIGRhdGVwaWNrZXIuXG4gKiBAZG9jcy1wcml2YXRlXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJtYXQtZGF0ZXRpbWVwaWNrZXItY2FsZW5kYXJcIixcbiAgdGVtcGxhdGVVcmw6IFwiY2FsZW5kYXIuaHRtbFwiLFxuICBzdHlsZVVybHM6IFtcImNhbGVuZGFyLnNjc3NcIl0sXG4gIGhvc3Q6IHtcbiAgICBcIltjbGFzcy5tYXQtZGF0ZXRpbWVwaWNrZXItY2FsZW5kYXJdXCI6IFwidHJ1ZVwiLFxuICAgIFwidGFiaW5kZXhcIjogXCIwXCIsXG4gICAgXCIoa2V5ZG93bilcIjogXCJfaGFuZGxlQ2FsZW5kYXJCb2R5S2V5ZG93bigkZXZlbnQpXCJcbiAgfSxcbiAgYW5pbWF0aW9uczogW3NsaWRlQ2FsZW5kYXJdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBNYXREYXRldGltZXBpY2tlckNhbGVuZGFyPEQ+IGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcblxuICBwcml2YXRlIF9pbnRsQ2hhbmdlczogU3Vic2NyaXB0aW9uO1xuXG4gIEBPdXRwdXQoKSBfdXNlclNlbGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcblxuICBASW5wdXQoKSB0eXBlOiBcImRhdGVcIiB8IFwidGltZVwiIHwgXCJtb250aFwiIHwgXCJkYXRldGltZVwiID0gXCJkYXRlXCI7XG5cbiAgLyoqIEEgZGF0ZSByZXByZXNlbnRpbmcgdGhlIHBlcmlvZCAobW9udGggb3IgeWVhcikgdG8gc3RhcnQgdGhlIGNhbGVuZGFyIGluLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc3RhcnRBdCgpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3N0YXJ0QXQ7XG4gIH1cblxuICBzZXQgc3RhcnRBdCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICB0aGlzLl9zdGFydEF0ID0gdGhpcy5fYWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhcnRBdDogRCB8IG51bGw7XG5cbiAgLyoqIFdoZXRoZXIgdGhlIGNhbGVuZGFyIHNob3VsZCBiZSBzdGFydGVkIGluIG1vbnRoIG9yIHllYXIgdmlldy4gKi9cbiAgQElucHV0KCkgc3RhcnRWaWV3OiBcImNsb2NrXCIgfCBcIm1vbnRoXCIgfCBcInllYXJcIiA9IFwibW9udGhcIjtcblxuICAvKiogVGhlIGN1cnJlbnRseSBzZWxlY3RlZCBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgc2VsZWN0ZWQoKTogRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZDtcbiAgfVxuXG4gIHNldCBzZWxlY3RlZCh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICB0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX2FkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGVkOiBEIHwgbnVsbDtcblxuICAvKiogVGhlIG1pbmltdW0gc2VsZWN0YWJsZSBkYXRlLiAqL1xuICBASW5wdXQoKVxuICBnZXQgbWluRGF0ZSgpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XG4gIH1cblxuICBzZXQgbWluRGF0ZSh2YWx1ZTogRCB8IG51bGwpIHtcbiAgICB0aGlzLl9taW5EYXRlID0gdGhpcy5fYWRhcHRlci5nZXRWYWxpZERhdGVPck51bGwodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWluRGF0ZTogRCB8IG51bGw7XG5cbiAgLyoqIFRoZSBtYXhpbXVtIHNlbGVjdGFibGUgZGF0ZS4gKi9cbiAgQElucHV0KClcbiAgZ2V0IG1heERhdGUoKTogRCB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9tYXhEYXRlO1xuICB9XG5cbiAgc2V0IG1heERhdGUodmFsdWU6IEQgfCBudWxsKSB7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IHRoaXMuX2FkYXB0ZXIuZ2V0VmFsaWREYXRlT3JOdWxsKHZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX21heERhdGU6IEQgfCBudWxsO1xuXG4gIEBJbnB1dCgpIHRpbWVJbnRlcnZhbDogbnVtYmVyID0gMTtcblxuICAvKiogQSBmdW5jdGlvbiB1c2VkIHRvIGZpbHRlciB3aGljaCBkYXRlcyBhcmUgc2VsZWN0YWJsZS4gKi9cbiAgQElucHV0KCkgZGF0ZUZpbHRlcjogKGRhdGU6IEQsIHR5cGU6IE1hdERhdGV0aW1lcGlja2VyRmlsdGVyVHlwZSkgPT4gYm9vbGVhbjtcblxuICAvKiogRW1pdHMgd2hlbiB0aGUgY3VycmVudGx5IHNlbGVjdGVkIGRhdGUgY2hhbmdlcy4gKi9cbiAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEPigpO1xuXG4gIC8qKiBEYXRlIGZpbHRlciBmb3IgdGhlIG1vbnRoIGFuZCB5ZWFyIHZpZXdzLiAqL1xuICBfZGF0ZUZpbHRlckZvclZpZXdzID0gKGRhdGU6IEQpID0+IHtcbiAgICByZXR1cm4gISFkYXRlICYmXG4gICAgICAoIXRoaXMuZGF0ZUZpbHRlciB8fCB0aGlzLmRhdGVGaWx0ZXIoZGF0ZSwgTWF0RGF0ZXRpbWVwaWNrZXJGaWx0ZXJUeXBlLkRBVEUpKSAmJlxuICAgICAgKCF0aGlzLm1pbkRhdGUgfHwgdGhpcy5fYWRhcHRlci5jb21wYXJlRGF0ZShkYXRlLCB0aGlzLm1pbkRhdGUpID49IDApICYmXG4gICAgICAoIXRoaXMubWF4RGF0ZSB8fCB0aGlzLl9hZGFwdGVyLmNvbXBhcmVEYXRlKGRhdGUsIHRoaXMubWF4RGF0ZSkgPD0gMCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgYWN0aXZlIGRhdGUuIFRoaXMgZGV0ZXJtaW5lcyB3aGljaCB0aW1lIHBlcmlvZCBpcyBzaG93biBhbmQgd2hpY2ggZGF0ZSBpc1xuICAgKiBoaWdobGlnaHRlZCB3aGVuIHVzaW5nIGtleWJvYXJkIG5hdmlnYXRpb24uXG4gICAqL1xuICBnZXQgX2FjdGl2ZURhdGUoKTogRCB7XG4gICAgcmV0dXJuIHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlO1xuICB9XG5cbiAgc2V0IF9hY3RpdmVEYXRlKHZhbHVlOiBEKSB7XG4gICAgY29uc3Qgb2xkQWN0aXZlRGF0ZSA9IHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlO1xuICAgIHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlID0gdGhpcy5fYWRhcHRlci5jbGFtcERhdGUodmFsdWUsIHRoaXMubWluRGF0ZSwgdGhpcy5tYXhEYXRlKTtcbiAgICBpZiAob2xkQWN0aXZlRGF0ZSAmJiB0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZSAmJiB0aGlzLl9jdXJyZW50VmlldyA9PT0gXCJtb250aFwiICYmXG4gICAgICAhdGhpcy5fYWRhcHRlci5zYW1lTW9udGhBbmRZZWFyKG9sZEFjdGl2ZURhdGUsIHRoaXMuX2NsYW1wZWRBY3RpdmVEYXRlKSkge1xuICAgICAgaWYgKHRoaXMuX2FkYXB0ZXIuaXNJbk5leHRNb250aChvbGRBY3RpdmVEYXRlLCB0aGlzLl9jbGFtcGVkQWN0aXZlRGF0ZSkpIHtcbiAgICAgICAgdGhpcy5jYWxlbmRhclN0YXRlKFwicmlnaHRcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhbGVuZGFyU3RhdGUoXCJsZWZ0XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NsYW1wZWRBY3RpdmVEYXRlOiBEO1xuXG4gIF91c2VyU2VsZWN0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXNlclNlbGVjdGlvbi5lbWl0KCk7XG4gIH1cblxuICAvKiogV2hldGhlciB0aGUgY2FsZW5kYXIgaXMgaW4gbW9udGggdmlldy4gKi9cbiAgX2N1cnJlbnRWaWV3OiBcImNsb2NrXCIgfCBcIm1vbnRoXCIgfCBcInllYXJcIiA9IFwibW9udGhcIjtcbiAgX2Nsb2NrVmlldzogXCJob3VyXCIgfCBcIm1pbnV0ZVwiID0gXCJob3VyXCI7XG5cbiAgLyoqIFRoZSBsYWJlbCBmb3IgdGhlIGN1cnJlbnQgY2FsZW5kYXIgdmlldy4gKi9cbiAgZ2V0IF95ZWFyTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYWRhcHRlci5nZXRZZWFyTmFtZSh0aGlzLl9hY3RpdmVEYXRlKTtcbiAgfVxuXG4gIGdldCBfbW9udGhZZWFyTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpZXcgPT09IFwibW9udGhcIiA/IHRoaXMuX2FkYXB0ZXIuZ2V0TW9udGhOYW1lcyhcImxvbmdcIilbdGhpcy5fYWRhcHRlci5nZXRNb250aCh0aGlzLl9hY3RpdmVEYXRlKV0gOlxuICAgICAgdGhpcy5fYWRhcHRlci5nZXRZZWFyTmFtZSh0aGlzLl9hY3RpdmVEYXRlKTtcbiAgfVxuXG4gIGdldCBfZGF0ZUxhYmVsKCk6IHN0cmluZyB7XG4gICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJtb250aFwiOlxuICAgICAgICByZXR1cm4gdGhpcy5fYWRhcHRlci5nZXRNb250aE5hbWVzKFwibG9uZ1wiKVt0aGlzLl9hZGFwdGVyLmdldE1vbnRoKHRoaXMuX2FjdGl2ZURhdGUpXTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGFwdGVyLmZvcm1hdCh0aGlzLl9hY3RpdmVEYXRlLCB0aGlzLl9kYXRlRm9ybWF0cy5kaXNwbGF5LnBvcHVwSGVhZGVyRGF0ZUxhYmVsKTtcbiAgICB9XG4gIH1cblxuICBnZXQgX2hvdXJzTGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fMmRpZ2l0KHRoaXMuX2FkYXB0ZXIuZ2V0SG91cih0aGlzLl9hY3RpdmVEYXRlKSk7XG4gIH1cblxuICBnZXQgX21pbnV0ZXNMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl8yZGlnaXQodGhpcy5fYWRhcHRlci5nZXRNaW51dGUodGhpcy5fYWN0aXZlRGF0ZSkpO1xuICB9XG5cbiAgX2NhbGVuZGFyU3RhdGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgICAgICAgICAgICBwcml2YXRlIF9pbnRsOiBNYXREYXRlcGlja2VySW50bCxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIHByaXZhdGUgX2FkYXB0ZXI6IERhdGV0aW1lQWRhcHRlcjxEPixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURVRJTUVfRk9STUFUUykgcHJpdmF0ZSBfZGF0ZUZvcm1hdHM6IE1hdERhdGV0aW1lRm9ybWF0cyxcbiAgICAgICAgICAgICAgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgaWYgKCF0aGlzLl9hZGFwdGVyKSB7XG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcihcIkRhdGV0aW1lQWRhcHRlclwiKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2RhdGVGb3JtYXRzKSB7XG4gICAgICB0aHJvdyBjcmVhdGVNaXNzaW5nRGF0ZUltcGxFcnJvcihcIk1BVF9EQVRFVElNRV9GT1JNQVRTXCIpO1xuICAgIH1cblxuICAgIHRoaXMuX2ludGxDaGFuZ2VzID0gX2ludGwuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCkpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLnN0YXJ0QXQgfHwgdGhpcy5fYWRhcHRlci50b2RheSgpO1xuICAgIHRoaXMuX2ZvY3VzQWN0aXZlQ2VsbCgpO1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwibW9udGhcIikge1xuICAgICAgdGhpcy5fY3VycmVudFZpZXcgPSBcInllYXJcIjtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gXCJ0aW1lXCIpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gXCJjbG9ja1wiO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9jdXJyZW50VmlldyA9IHRoaXMuc3RhcnRWaWV3IHx8IFwibW9udGhcIjtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLl9pbnRsQ2hhbmdlcy51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgLyoqIEhhbmRsZXMgZGF0ZSBzZWxlY3Rpb24gaW4gdGhlIG1vbnRoIHZpZXcuICovXG4gIF9kYXRlU2VsZWN0ZWQoZGF0ZTogRCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwiZGF0ZVwiKSB7XG4gICAgICBpZiAoIXRoaXMuX2FkYXB0ZXIuc2FtZURhdGUoZGF0ZSwgdGhpcy5zZWxlY3RlZCkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hY3RpdmVEYXRlID0gZGF0ZTtcbiAgICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gXCJjbG9ja1wiO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBIYW5kbGVzIG1vbnRoIHNlbGVjdGlvbiBpbiB0aGUgeWVhciB2aWV3LiAqL1xuICBfbW9udGhTZWxlY3RlZChtb250aDogRCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnR5cGUgPT09IFwibW9udGhcIikge1xuICAgICAgaWYgKCF0aGlzLl9hZGFwdGVyLnNhbWVNb250aEFuZFllYXIobW9udGgsIHRoaXMuc2VsZWN0ZWQpKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLl9hZGFwdGVyLmdldEZpcnN0RGF0ZU9mTW9udGgobW9udGgpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IG1vbnRoO1xuICAgICAgdGhpcy5fY3VycmVudFZpZXcgPSBcIm1vbnRoXCI7XG4gICAgICB0aGlzLl9jbG9ja1ZpZXcgPSBcImhvdXJcIjtcbiAgICB9XG4gIH1cblxuICBfdGltZVNlbGVjdGVkKGRhdGU6IEQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY2xvY2tWaWV3ICE9PSBcIm1pbnV0ZVwiKSB7XG4gICAgICB0aGlzLl9hY3RpdmVEYXRlID0gZGF0ZTtcbiAgICAgIHRoaXMuX2Nsb2NrVmlldyA9IFwibWludXRlXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5fYWRhcHRlci5zYW1lRGF0ZXRpbWUoZGF0ZSwgdGhpcy5zZWxlY3RlZCkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KGRhdGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF9vbkFjdGl2ZURhdGVDaGFuZ2UoZGF0ZTogRCkge1xuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSBkYXRlO1xuICB9XG5cbiAgX3llYXJDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gXCJ5ZWFyXCI7XG4gIH1cblxuICBfZGF0ZUNsaWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudHlwZSAhPT0gXCJtb250aFwiKSB7XG4gICAgICB0aGlzLl9jdXJyZW50VmlldyA9IFwibW9udGhcIjtcbiAgICB9XG4gIH1cblxuICBfaG91cnNDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gXCJjbG9ja1wiO1xuICAgIHRoaXMuX2Nsb2NrVmlldyA9IFwiaG91clwiO1xuICB9XG5cbiAgX21pbnV0ZXNDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRWaWV3ID0gXCJjbG9ja1wiO1xuICAgIHRoaXMuX2Nsb2NrVmlldyA9IFwibWludXRlXCI7XG4gIH1cblxuICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgcHJldmlvdXMgYnV0dG9uLiAqL1xuICBfcHJldmlvdXNDbGlja2VkKCk6IHZvaWQge1xuICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9jdXJyZW50VmlldyA9PT0gXCJtb250aFwiID9cbiAgICAgIHRoaXMuX2FkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSwgLTEpIDpcbiAgICAgIHRoaXMuX2FkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCAtMSk7XG4gIH1cblxuICAvKiogSGFuZGxlcyB1c2VyIGNsaWNrcyBvbiB0aGUgbmV4dCBidXR0b24uICovXG4gIF9uZXh0Q2xpY2tlZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fY3VycmVudFZpZXcgPT09IFwibW9udGhcIiA/XG4gICAgICB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIDEpIDpcbiAgICAgIHRoaXMuX2FkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCAxKTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSBwcmV2aW91cyBwZXJpb2QgYnV0dG9uIGlzIGVuYWJsZWQuICovXG4gIF9wcmV2aW91c0VuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLm1pbkRhdGUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gIXRoaXMubWluRGF0ZSB8fCAhdGhpcy5faXNTYW1lVmlldyh0aGlzLl9hY3RpdmVEYXRlLCB0aGlzLm1pbkRhdGUpO1xuICB9XG5cbiAgLyoqIFdoZXRoZXIgdGhlIG5leHQgcGVyaW9kIGJ1dHRvbiBpcyBlbmFibGVkLiAqL1xuICBfbmV4dEVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLm1heERhdGUgfHwgIXRoaXMuX2lzU2FtZVZpZXcodGhpcy5fYWN0aXZlRGF0ZSwgdGhpcy5tYXhEYXRlKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWRvd24gZXZlbnRzIG9uIHRoZSBjYWxlbmRhciBib2R5LiAqL1xuICBfaGFuZGxlQ2FsZW5kYXJCb2R5S2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIC8vIFRPRE8obW1hbGVyYmEpOiBXZSBjdXJyZW50bHkgYWxsb3cga2V5Ym9hcmQgbmF2aWdhdGlvbiB0byBkaXNhYmxlZCBkYXRlcywgYnV0IGp1c3QgcHJldmVudFxuICAgIC8vIGRpc2FibGVkIG9uZXMgZnJvbSBiZWluZyBzZWxlY3RlZC4gVGhpcyBtYXkgbm90IGJlIGlkZWFsLCB3ZSBzaG91bGQgbG9vayBpbnRvIHdoZXRoZXJcbiAgICAvLyBuYXZpZ2F0aW9uIHNob3VsZCBza2lwIG92ZXIgZGlzYWJsZWQgZGF0ZXMsIGFuZCBpZiBzbywgaG93IHRvIGltcGxlbWVudCB0aGF0IGVmZmljaWVudGx5LlxuICAgIGlmICh0aGlzLl9jdXJyZW50VmlldyA9PT0gXCJtb250aFwiKSB7XG4gICAgICB0aGlzLl9oYW5kbGVDYWxlbmRhckJvZHlLZXlkb3duSW5Nb250aFZpZXcoZXZlbnQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFZpZXcgPT09IFwieWVhclwiKSB7XG4gICAgICB0aGlzLl9oYW5kbGVDYWxlbmRhckJvZHlLZXlkb3duSW5ZZWFyVmlldyhldmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hhbmRsZUNhbGVuZGFyQm9keUtleWRvd25JbkNsb2NrVmlldyhldmVudCk7XG4gICAgfVxuICB9XG5cbiAgX2ZvY3VzQWN0aXZlQ2VsbCgpIHtcbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fbmdab25lLm9uU3RhYmxlLmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlyc3QoKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBXaGV0aGVyIHRoZSB0d28gZGF0ZXMgcmVwcmVzZW50IHRoZSBzYW1lIHZpZXcgaW4gdGhlIGN1cnJlbnQgdmlldyBtb2RlIChtb250aCBvciB5ZWFyKS4gKi9cbiAgcHJpdmF0ZSBfaXNTYW1lVmlldyhkYXRlMTogRCwgZGF0ZTI6IEQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpZXcgPT09IFwibW9udGhcIiA/XG4gICAgICB0aGlzLl9hZGFwdGVyLmdldFllYXIoZGF0ZTEpID09PSB0aGlzLl9hZGFwdGVyLmdldFllYXIoZGF0ZTIpICYmXG4gICAgICB0aGlzLl9hZGFwdGVyLmdldE1vbnRoKGRhdGUxKSA9PT0gdGhpcy5fYWRhcHRlci5nZXRNb250aChkYXRlMikgOlxuICAgICAgdGhpcy5fYWRhcHRlci5nZXRZZWFyKGRhdGUxKSA9PT0gdGhpcy5fYWRhcHRlci5nZXRZZWFyKGRhdGUyKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWRvd24gZXZlbnRzIG9uIHRoZSBjYWxlbmRhciBib2R5IHdoZW4gY2FsZW5kYXIgaXMgaW4gbW9udGggdmlldy4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlQ2FsZW5kYXJCb2R5S2V5ZG93bkluTW9udGhWaWV3KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIExFRlRfQVJST1c6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLl9hY3RpdmVEYXRlLCAtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBSSUdIVF9BUlJPVzpcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2FkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKHRoaXMuX2FjdGl2ZURhdGUsIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyRGF5cyh0aGlzLl9hY3RpdmVEYXRlLCAtNyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fYWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5fYWN0aXZlRGF0ZSwgNyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBIT01FOlxuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fYWRhcHRlci5hZGRDYWxlbmRhckRheXModGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgICAxIC0gdGhpcy5fYWRhcHRlci5nZXREYXRlKHRoaXMuX2FjdGl2ZURhdGUpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEVORDpcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2FkYXB0ZXIuYWRkQ2FsZW5kYXJEYXlzKHRoaXMuX2FjdGl2ZURhdGUsXG4gICAgICAgICAgKHRoaXMuX2FkYXB0ZXIuZ2V0TnVtRGF5c0luTW9udGgodGhpcy5fYWN0aXZlRGF0ZSkgLVxuICAgICAgICAgICAgdGhpcy5fYWRhcHRlci5nZXREYXRlKHRoaXMuX2FjdGl2ZURhdGUpKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQQUdFX1VQOlxuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlID0gZXZlbnQuYWx0S2V5ID9cbiAgICAgICAgICB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyWWVhcnModGhpcy5fYWN0aXZlRGF0ZSwgLTEpIDpcbiAgICAgICAgICB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIC0xKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBBR0VfRE9XTjpcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IGV2ZW50LmFsdEtleSA/XG4gICAgICAgICAgdGhpcy5fYWRhcHRlci5hZGRDYWxlbmRhclllYXJzKHRoaXMuX2FjdGl2ZURhdGUsIDEpIDpcbiAgICAgICAgICB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIGlmICh0aGlzLl9kYXRlRmlsdGVyRm9yVmlld3ModGhpcy5fYWN0aXZlRGF0ZSkpIHtcbiAgICAgICAgICB0aGlzLl9kYXRlU2VsZWN0ZWQodGhpcy5fYWN0aXZlRGF0ZSk7XG4gICAgICAgICAgLy8gUHJldmVudCB1bmV4cGVjdGVkIGRlZmF1bHQgYWN0aW9ucyBzdWNoIGFzIGZvcm0gc3VibWlzc2lvbi5cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIERvbid0IHByZXZlbnQgZGVmYXVsdCBvciBmb2N1cyBhY3RpdmUgY2VsbCBvbiBrZXlzIHRoYXQgd2UgZG9uJ3QgZXhwbGljaXRseSBoYW5kbGUuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBQcmV2ZW50IHVuZXhwZWN0ZWQgZGVmYXVsdCBhY3Rpb25zIHN1Y2ggYXMgZm9ybSBzdWJtaXNzaW9uLlxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICAvKiogSGFuZGxlcyBrZXlkb3duIGV2ZW50cyBvbiB0aGUgY2FsZW5kYXIgYm9keSB3aGVuIGNhbGVuZGFyIGlzIGluIHllYXIgdmlldy4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlQ2FsZW5kYXJCb2R5S2V5ZG93bkluWWVhclZpZXcoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6ZGVwcmVjYXRpb25cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICAgIGNhc2UgTEVGVF9BUlJPVzpcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2FkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSwgLTEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgUklHSFRfQVJST1c6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVVBfQVJST1c6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9wcmV2TW9udGhJblNhbWVDb2wodGhpcy5fYWN0aXZlRGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBET1dOX0FSUk9XOlxuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fbmV4dE1vbnRoSW5TYW1lQ29sKHRoaXMuX2FjdGl2ZURhdGUpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSE9NRTpcbiAgICAgICAgdGhpcy5fYWN0aXZlRGF0ZSA9IHRoaXMuX2FkYXB0ZXIuYWRkQ2FsZW5kYXJNb250aHModGhpcy5fYWN0aXZlRGF0ZSxcbiAgICAgICAgICAtdGhpcy5fYWRhcHRlci5nZXRNb250aCh0aGlzLl9hY3RpdmVEYXRlKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFTkQ6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKHRoaXMuX2FjdGl2ZURhdGUsXG4gICAgICAgICAgMTEgLSB0aGlzLl9hZGFwdGVyLmdldE1vbnRoKHRoaXMuX2FjdGl2ZURhdGUpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFBBR0VfVVA6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPVxuICAgICAgICAgIHRoaXMuX2FkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCBldmVudC5hbHRLZXkgPyAtMTAgOiAtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQQUdFX0RPV046XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPVxuICAgICAgICAgIHRoaXMuX2FkYXB0ZXIuYWRkQ2FsZW5kYXJZZWFycyh0aGlzLl9hY3RpdmVEYXRlLCBldmVudC5hbHRLZXkgPyAxMCA6IDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRU5URVI6XG4gICAgICAgIHRoaXMuX21vbnRoU2VsZWN0ZWQodGhpcy5fYWN0aXZlRGF0ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gRG9uJ3QgcHJldmVudCBkZWZhdWx0IG9yIGZvY3VzIGFjdGl2ZSBjZWxsIG9uIGtleXMgdGhhdCB3ZSBkb24ndCBleHBsaWNpdGx5IGhhbmRsZS5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFByZXZlbnQgdW5leHBlY3RlZCBkZWZhdWx0IGFjdGlvbnMgc3VjaCBhcyBmb3JtIHN1Ym1pc3Npb24uXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuXG4gIC8qKiBIYW5kbGVzIGtleWRvd24gZXZlbnRzIG9uIHRoZSBjYWxlbmRhciBib2R5IHdoZW4gY2FsZW5kYXIgaXMgaW4gbW9udGggdmlldy4gKi9cbiAgcHJpdmF0ZSBfaGFuZGxlQ2FsZW5kYXJCb2R5S2V5ZG93bkluQ2xvY2tWaWV3KGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmRlcHJlY2F0aW9uXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBjYXNlIFVQX0FSUk9XOlxuICAgICAgICB0aGlzLl9hY3RpdmVEYXRlID0gdGhpcy5fY2xvY2tWaWV3ID09PSBcImhvdXJcIiA/XG4gICAgICAgICAgdGhpcy5fYWRhcHRlci5hZGRDYWxlbmRhckhvdXJzKHRoaXMuX2FjdGl2ZURhdGUsIDEpIDpcbiAgICAgICAgICB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyTWludXRlcyh0aGlzLl9hY3RpdmVEYXRlLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERPV05fQVJST1c6XG4gICAgICAgIHRoaXMuX2FjdGl2ZURhdGUgPSB0aGlzLl9jbG9ja1ZpZXcgPT09IFwiaG91clwiID9cbiAgICAgICAgICB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFySG91cnModGhpcy5fYWN0aXZlRGF0ZSwgLTEpIDpcbiAgICAgICAgICB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyTWludXRlcyh0aGlzLl9hY3RpdmVEYXRlLCAtMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBFTlRFUjpcbiAgICAgICAgdGhpcy5fdGltZVNlbGVjdGVkKHRoaXMuX2FjdGl2ZURhdGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBEb24ndCBwcmV2ZW50IGRlZmF1bHQgb3IgZm9jdXMgYWN0aXZlIGNlbGwgb24ga2V5cyB0aGF0IHdlIGRvbid0IGV4cGxpY2l0bHkgaGFuZGxlLlxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUHJldmVudCB1bmV4cGVjdGVkIGRlZmF1bHQgYWN0aW9ucyBzdWNoIGFzIGZvcm0gc3VibWlzc2lvbi5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgZGF0ZSBmb3IgdGhlIG1vbnRoIHRoYXQgY29tZXMgYmVmb3JlIHRoZSBnaXZlbiBtb250aCBpbiB0aGUgc2FtZSBjb2x1bW4gaW4gdGhlXG4gICAqIGNhbGVuZGFyIHRhYmxlLlxuICAgKi9cbiAgcHJpdmF0ZSBfcHJldk1vbnRoSW5TYW1lQ29sKGRhdGU6IEQpOiBEIHtcbiAgICAvLyBEZXRlcm1pbmUgaG93IG1hbnkgbW9udGhzIHRvIGp1bXAgZm9yd2FyZCBnaXZlbiB0aGF0IHRoZXJlIGFyZSAyIGVtcHR5IHNsb3RzIGF0IHRoZSBiZWdpbm5pbmdcbiAgICAvLyBvZiBlYWNoIHllYXIuXG4gICAgY29uc3QgaW5jcmVtZW50ID0gdGhpcy5fYWRhcHRlci5nZXRNb250aChkYXRlKSA8PSA0ID8gLTUgOlxuICAgICAgKHRoaXMuX2FkYXB0ZXIuZ2V0TW9udGgoZGF0ZSkgPj0gNyA/IC03IDogLTEyKTtcbiAgICByZXR1cm4gdGhpcy5fYWRhcHRlci5hZGRDYWxlbmRhck1vbnRocyhkYXRlLCBpbmNyZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSB0aGUgZGF0ZSBmb3IgdGhlIG1vbnRoIHRoYXQgY29tZXMgYWZ0ZXIgdGhlIGdpdmVuIG1vbnRoIGluIHRoZSBzYW1lIGNvbHVtbiBpbiB0aGVcbiAgICogY2FsZW5kYXIgdGFibGUuXG4gICAqL1xuICBwcml2YXRlIF9uZXh0TW9udGhJblNhbWVDb2woZGF0ZTogRCk6IEQge1xuICAgIC8vIERldGVybWluZSBob3cgbWFueSBtb250aHMgdG8ganVtcCBmb3J3YXJkIGdpdmVuIHRoYXQgdGhlcmUgYXJlIDIgZW1wdHkgc2xvdHMgYXQgdGhlIGJlZ2lubmluZ1xuICAgIC8vIG9mIGVhY2ggeWVhci5cbiAgICBjb25zdCBpbmNyZW1lbnQgPSB0aGlzLl9hZGFwdGVyLmdldE1vbnRoKGRhdGUpIDw9IDQgPyA3IDpcbiAgICAgICh0aGlzLl9hZGFwdGVyLmdldE1vbnRoKGRhdGUpID49IDcgPyA1IDogMTIpO1xuICAgIHJldHVybiB0aGlzLl9hZGFwdGVyLmFkZENhbGVuZGFyTW9udGhzKGRhdGUsIGluY3JlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIGNhbGVuZGFyU3RhdGUoZGlyZWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9jYWxlbmRhclN0YXRlID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgX2NhbGVuZGFyU3RhdGVEb25lKCkge1xuICAgIHRoaXMuX2NhbGVuZGFyU3RhdGUgPSBcIlwiO1xuICB9XG5cbiAgcHJpdmF0ZSBfMmRpZ2l0KG46IG51bWJlcikge1xuICAgIHJldHVybiAoXCIwMFwiICsgbikuc2xpY2UoLTIpO1xuICB9XG59XG4iXX0=