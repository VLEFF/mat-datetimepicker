import { DateAdapter } from '@angular/material/core';
import { A11yModule } from '@angular/cdk/a11y';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT, CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { DOWN_ARROW, END, ENTER, HOME, LEFT_ARROW, PAGE_DOWN, PAGE_UP, RIGHT_ARROW, UP_ARROW, ESCAPE } from '@angular/cdk/keycodes';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DateAdapter as DateAdapter$1, MAT_DATE_LOCALE, MatNativeDateModule, NativeDateModule, MatDatepickerIntl, MAT_DATEPICKER_SCROLL_STRATEGY, MAT_INPUT_VALUE_ACCESSOR, MatButtonModule, MatDialogModule, MatIconModule } from '@angular/material';
import { Subject, Subscription, merge, of } from 'rxjs';
import { InjectionToken, Inject, Injectable, Optional, NgModule, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewEncapsulation, ViewChild, ViewContainerRef, Directive, forwardRef } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template D
 */
class DatetimeAdapter extends DateAdapter {
    /**
     * @param {?} _delegate
     */
    constructor(_delegate) {
        super();
        this._delegate = _delegate;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    getValidDateOrNull(obj) {
        return (this.isDateInstance(obj) && this.isValid(obj)) ? obj : null;
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    compareDatetime(first$$1, second) {
        return this.compareDate(first$$1, second) ||
            this.getHour(first$$1) - this.getHour(second) ||
            this.getMinute(first$$1) - this.getMinute(second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameDatetime(first$$1, second) {
        if (first$$1 && second) {
            /** @type {?} */
            const firstValid = this.isValid(first$$1);
            /** @type {?} */
            const secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDatetime(first$$1, second);
            }
            return firstValid === secondValid;
        }
        return first$$1 === second;
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameYear(first$$1, second) {
        return first$$1 && second && this.getYear(first$$1) === this.getYear(second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameDay(first$$1, second) {
        return first$$1 && second && this.getDate(first$$1) === this.getDate(second) && this.sameMonthAndYear(first$$1, second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameHour(first$$1, second) {
        return first$$1 && second && this.getHour(first$$1) === this.getHour(second) && this.sameDay(first$$1, second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameMinute(first$$1, second) {
        return first$$1 && second && this.getMinute(first$$1) === this.getMinute(second) && this.sameHour(first$$1, second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameMonthAndYear(first$$1, second) {
        if (first$$1 && second) {
            /** @type {?} */
            const firstValid = this.isValid(first$$1);
            /** @type {?} */
            const secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !(this.getYear(first$$1) - this.getYear(second) ||
                    this.getMonth(first$$1) - this.getMonth(second));
            }
            return firstValid === secondValid;
        }
        return first$$1 === second;
    }
    // delegate
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this._delegate.clone(date);
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this._delegate.addCalendarYears(date, years);
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        return this._delegate.addCalendarMonths(date, months);
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this._delegate.addCalendarDays(date, days);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYear(date) {
        return this._delegate.getYear(date);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMonth(date) {
        return this._delegate.getMonth(date);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDate(date) {
        return this._delegate.getDate(date);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getDayOfWeek(date) {
        return this._delegate.getDayOfWeek(date);
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getMonthNames(style$$1) {
        return this._delegate.getMonthNames(style$$1);
    }
    /**
     * @return {?}
     */
    getDateNames() {
        return this._delegate.getDateNames();
    }
    /**
     * @param {?} style
     * @return {?}
     */
    getDayOfWeekNames(style$$1) {
        return this._delegate.getDayOfWeekNames(style$$1);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getYearName(date) {
        return this._delegate.getYearName(date);
    }
    /**
     * @return {?}
     */
    getFirstDayOfWeek() {
        return this._delegate.getFirstDayOfWeek();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getNumDaysInMonth(date) {
        return this._delegate.getNumDaysInMonth(date);
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    createDate(year, month, date) {
        return this._delegate.createDate(year, month, date);
    }
    /**
     * @return {?}
     */
    today() {
        return this._delegate.today();
    }
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    parse(value, parseFormat) {
        return this._delegate.parse(value, parseFormat);
    }
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    format(date, displayFormat) {
        return this._delegate.format(date, displayFormat);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return this._delegate.toIso8601(date);
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    isDateInstance(obj) {
        return this._delegate.isDateInstance(obj);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    isValid(date) {
        return this._delegate.isValid(date);
    }
    /**
     * @return {?}
     */
    invalid() {
        return this._delegate.invalid();
    }
    /**
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    clampDate(date, min, max) {
        if (min && this.compareDatetime(date, min) < 0) {
            return min;
        }
        if (max && this.compareDatetime(date, max) > 0) {
            return max;
        }
        return date;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MAT_DATETIME_FORMATS = new InjectionToken("mat-datetime-formats");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const ɵ0 = i => String(i);
/**
 * The default hour names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_HOUR_NAMES = range(24, ɵ0);
const ɵ1 = i => String(i);
/**
 * The default minute names to use if Intl API is not available.
 * @type {?}
 */
const DEFAULT_MINUTE_NAMES = range(60, ɵ1);
/**
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    const valuesArray = Array(length);
    for (let i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
class NativeDatetimeAdapter extends DatetimeAdapter {
    /**
     * @param {?} matDateLocale
     * @param {?} _delegate
     */
    constructor(matDateLocale, _delegate) {
        super(_delegate);
        this.setLocale(matDateLocale);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    clone(date) {
        return this.createDatetime(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date), this.getMinute(date));
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHour(date) {
        return date.getHours();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinute(date) {
        return date.getMinutes();
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    isInNextMonth(startDate, endDate) {
        /** @type {?} */
        const nextMonth = this.getDateInNextMonth(startDate);
        return this.sameMonthAndYear(nextMonth, endDate);
    }
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    createDatetime(year, month, date, hour, minute) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
        }
        if (date < 1) {
            throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
        }
        if (hour < 0 || hour > 23) {
            throw Error(`Invalid hour "${hour}". Hour has to be between 0 and 23.`);
        }
        if (minute < 0 || minute > 59) {
            throw Error(`Invalid minute "${minute}". Minute has to be between 0 and 59.`);
        }
        /** @type {?} */
        const result = this._createDateWithOverflow(year, month, date, hour, minute);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() !== month) {
            throw Error(`Invalid date "${date}" for month with index "${month}".`);
        }
        return result;
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    getDateInNextMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getFirstDateOfMonth(date) {
        /** @type {?} */
        const result = new Date();
        result.setFullYear(date.getFullYear(), date.getMonth(), 1);
        return result;
    }
    /**
     * @return {?}
     */
    getHourNames() {
        return DEFAULT_HOUR_NAMES;
    }
    /**
     * @return {?}
     */
    getMinuteNames() {
        return DEFAULT_MINUTE_NAMES;
    }
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    addCalendarYears(date, years) {
        return this.addCalendarMonths(date, years * 12);
    }
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    addCalendarMonths(date, months) {
        /** @type {?} */
        let newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHour(date), this.getMinute(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) !== ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0, this.getHour(date), this.getMinute(date));
        }
        return newDate;
    }
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    addCalendarDays(date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHour(date), this.getMinute(date));
    }
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    addCalendarHours(date, hours) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date) + hours, this.getMinute(date));
    }
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    addCalendarMinutes(date, minutes) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date), this.getMinute(date) + minutes);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    toIso8601(date) {
        return super.toIso8601(date) + "T" + [
            this._2digit(date.getUTCHours()),
            this._2digit(date.getUTCMinutes())
        ].join(":");
    }
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    _stripDirectionalityCharacters(str) {
        return str.replace(/[\u200e\u200f]/g, "");
    }
    /**
     * Pads a number to make it two digits.
     * @private
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    _2digit(n) {
        return ("00" + n).slice(-2);
    }
    /**
     * Creates a date but allows the month and date to overflow.
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @return {?}
     */
    _createDateWithOverflow(year, month, date, hours, minutes) {
        /** @type {?} */
        const result = new Date(year, month, date, hours, minutes);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    }
}
NativeDatetimeAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NativeDatetimeAdapter.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] }] },
    { type: DateAdapter$1 }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const MAT_NATIVE_DATETIME_FORMATS = {
    parse: {},
    display: {
        dateInput: { year: "numeric", month: "2-digit", day: "2-digit" },
        monthInput: { month: "long" },
        datetimeInput: { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" },
        timeInput: { hour: "2-digit", minute: "2-digit" },
        monthYearLabel: { year: "numeric", month: "short" },
        dateA11yLabel: { year: "numeric", month: "long", day: "numeric" },
        monthYearA11yLabel: { year: "numeric", month: "long" },
        popupHeaderDateLabel: { weekday: "short", month: "short", day: "2-digit" }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable max-classes-per-file
class NativeDatetimeModule {
}
NativeDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [NativeDateModule],
                providers: [
                    {
                        provide: DatetimeAdapter,
                        useClass: NativeDatetimeAdapter
                    }
                ]
            },] }
];
const ɵ0$1 = MAT_NATIVE_DATETIME_FORMATS;
class MatNativeDatetimeModule {
}
MatNativeDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    NativeDatetimeModule,
                    MatNativeDateModule
                ],
                providers: [{ provide: MAT_DATETIME_FORMATS, useValue: ɵ0$1 }]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 * @type {?}
 */
const fadeInContent = trigger("fadeInContent", [
    state("showing", style({ opacity: 1 })),
    transition("void => showing", [
        style({ opacity: 0 }),
        animate(`150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)`)
    ])
]);
/** @type {?} */
const slideCalendar = trigger("slideCalendar", [
    transition("* => left", [
        animate(180, keyframes([
            style({ transform: "translateX(100%)", offset: 0.5 }),
            style({ transform: "translateX(-100%)", offset: 0.51 }),
            style({ transform: "translateX(0)", offset: 1 })
        ]))
    ]),
    transition("* => right", [
        animate(180, keyframes([
            style({ transform: "translateX(-100%)", offset: 0.5 }),
            style({ transform: "translateX(100%)", offset: 0.51 }),
            style({ transform: "translateX(0)", offset: 1 })
        ]))
    ])
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@docs-private
 * @param {?} provider
 * @return {?}
 */
function createMissingDateImplError(provider) {
    return Error(`MatDatetimepicker: No provider found for ${provider}. You must import one of the following ` +
        `modules at your application root: MatNativeDatetimeModule, MatMomentDatetimeModule, or provide a ` +
        `custom implementation.`);
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const MatDatetimepickerFilterType = {
    DATE: 0, HOUR: 1, MINUTE: 2,
};
MatDatetimepickerFilterType[MatDatetimepickerFilterType.DATE] = 'DATE';
MatDatetimepickerFilterType[MatDatetimepickerFilterType.HOUR] = 'HOUR';
MatDatetimepickerFilterType[MatDatetimepickerFilterType.MINUTE] = 'MINUTE';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * A calendar that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
class MatDatetimepickerCalendar {
    /**
     * @param {?} _elementRef
     * @param {?} _intl
     * @param {?} _ngZone
     * @param {?} _adapter
     * @param {?} _dateFormats
     * @param {?} changeDetectorRef
     */
    constructor(_elementRef, _intl, _ngZone, _adapter, _dateFormats, changeDetectorRef) {
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
        this._dateFilterForViews = (date) => {
            return !!date &&
                (!this.dateFilter || this.dateFilter(date, MatDatetimepickerFilterType.DATE)) &&
                (!this.minDate || this._adapter.compareDate(date, this.minDate) >= 0) &&
                (!this.maxDate || this._adapter.compareDate(date, this.maxDate) <= 0);
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
        this._intlChanges = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
    }
    /**
     * A date representing the period (month or year) to start the calendar in.
     * @return {?}
     */
    get startAt() {
        return this._startAt;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set startAt(value) {
        this._startAt = this._adapter.getValidDateOrNull(value);
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
        this._selected = this._adapter.getValidDateOrNull(value);
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        this._minDate = this._adapter.getValidDateOrNull(value);
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        this._maxDate = this._adapter.getValidDateOrNull(value);
    }
    /**
     * The current active date. This determines which time period is shown and which date is
     * highlighted when using keyboard navigation.
     * @return {?}
     */
    get _activeDate() {
        return this._clampedActiveDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set _activeDate(value) {
        /** @type {?} */
        const oldActiveDate = this._clampedActiveDate;
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
    }
    /**
     * @return {?}
     */
    _userSelected() {
        this._userSelection.emit();
    }
    /**
     * The label for the current calendar view.
     * @return {?}
     */
    get _yearLabel() {
        return this._adapter.getYearName(this._activeDate);
    }
    /**
     * @return {?}
     */
    get _monthYearLabel() {
        return this._currentView === "month" ? this._adapter.getMonthNames("long")[this._adapter.getMonth(this._activeDate)] :
            this._adapter.getYearName(this._activeDate);
    }
    /**
     * @return {?}
     */
    get _dateLabel() {
        switch (this.type) {
            case "month":
                return this._adapter.getMonthNames("long")[this._adapter.getMonth(this._activeDate)];
            default:
                return this._adapter.format(this._activeDate, this._dateFormats.display.popupHeaderDateLabel);
        }
    }
    /**
     * @return {?}
     */
    get _hoursLabel() {
        return this._2digit(this._adapter.getHour(this._activeDate));
    }
    /**
     * @return {?}
     */
    get _minutesLabel() {
        return this._2digit(this._adapter.getMinute(this._activeDate));
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._intlChanges.unsubscribe();
    }
    /**
     * Handles date selection in the month view.
     * @param {?} date
     * @return {?}
     */
    _dateSelected(date) {
        if (this.type === "date") {
            if (!this._adapter.sameDate(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
        else {
            this._activeDate = date;
            this._currentView = "clock";
        }
    }
    /**
     * Handles month selection in the year view.
     * @param {?} month
     * @return {?}
     */
    _monthSelected(month) {
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
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _timeSelected(date) {
        if (this._clockView !== "minute") {
            this._activeDate = date;
            this._clockView = "minute";
        }
        else {
            if (!this._adapter.sameDatetime(date, this.selected)) {
                this.selectedChange.emit(date);
            }
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    _onActiveDateChange(date) {
        this._activeDate = date;
    }
    /**
     * @return {?}
     */
    _yearClicked() {
        this._currentView = "year";
    }
    /**
     * @return {?}
     */
    _dateClicked() {
        if (this.type !== "month") {
            this._currentView = "month";
        }
    }
    /**
     * @return {?}
     */
    _hoursClicked() {
        this._currentView = "clock";
        this._clockView = "hour";
    }
    /**
     * @return {?}
     */
    _minutesClicked() {
        this._currentView = "clock";
        this._clockView = "minute";
    }
    /**
     * Handles user clicks on the previous button.
     * @return {?}
     */
    _previousClicked() {
        this._activeDate = this._currentView === "month" ?
            this._adapter.addCalendarMonths(this._activeDate, -1) :
            this._adapter.addCalendarYears(this._activeDate, -1);
    }
    /**
     * Handles user clicks on the next button.
     * @return {?}
     */
    _nextClicked() {
        this._activeDate = this._currentView === "month" ?
            this._adapter.addCalendarMonths(this._activeDate, 1) :
            this._adapter.addCalendarYears(this._activeDate, 1);
    }
    /**
     * Whether the previous period button is enabled.
     * @return {?}
     */
    _previousEnabled() {
        if (!this.minDate) {
            return true;
        }
        return !this.minDate || !this._isSameView(this._activeDate, this.minDate);
    }
    /**
     * Whether the next period button is enabled.
     * @return {?}
     */
    _nextEnabled() {
        return !this.maxDate || !this._isSameView(this._activeDate, this.maxDate);
    }
    /**
     * Handles keydown events on the calendar body.
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydown(event) {
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
    }
    /**
     * @return {?}
     */
    _focusActiveCell() {
        this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.asObservable().pipe(first()).subscribe(() => {
                this._elementRef.nativeElement.focus();
            });
        });
    }
    /**
     * Whether the two dates represent the same view in the current view mode (month or year).
     * @private
     * @param {?} date1
     * @param {?} date2
     * @return {?}
     */
    _isSameView(date1, date2) {
        return this._currentView === "month" ?
            this._adapter.getYear(date1) === this._adapter.getYear(date2) &&
                this._adapter.getMonth(date1) === this._adapter.getMonth(date2) :
            this._adapter.getYear(date1) === this._adapter.getYear(date2);
    }
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @private
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydownInMonthView(event) {
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
    }
    /**
     * Handles keydown events on the calendar body when calendar is in year view.
     * @private
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydownInYearView(event) {
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
    }
    /**
     * Handles keydown events on the calendar body when calendar is in month view.
     * @private
     * @param {?} event
     * @return {?}
     */
    _handleCalendarBodyKeydownInClockView(event) {
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
    }
    /**
     * Determine the date for the month that comes before the given month in the same column in the
     * calendar table.
     * @private
     * @param {?} date
     * @return {?}
     */
    _prevMonthInSameCol(date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        /** @type {?} */
        const increment = this._adapter.getMonth(date) <= 4 ? -5 :
            (this._adapter.getMonth(date) >= 7 ? -7 : -12);
        return this._adapter.addCalendarMonths(date, increment);
    }
    /**
     * Determine the date for the month that comes after the given month in the same column in the
     * calendar table.
     * @private
     * @param {?} date
     * @return {?}
     */
    _nextMonthInSameCol(date) {
        // Determine how many months to jump forward given that there are 2 empty slots at the beginning
        // of each year.
        /** @type {?} */
        const increment = this._adapter.getMonth(date) <= 4 ? 7 :
            (this._adapter.getMonth(date) >= 7 ? 5 : 12);
        return this._adapter.addCalendarMonths(date, increment);
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
    /**
     * @private
     * @param {?} n
     * @return {?}
     */
    _2digit(n) {
        return ("00" + n).slice(-2);
    }
}
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
MatDatetimepickerCalendar.ctorParameters = () => [
    { type: ElementRef },
    { type: MatDatepickerIntl },
    { type: NgZone },
    { type: DatetimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] }] },
    { type: ChangeDetectorRef }
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
class MatDatetimepickerCalendarCell {
    /**
     * @param {?} value
     * @param {?} displayValue
     * @param {?} ariaLabel
     * @param {?} enabled
     */
    constructor(value, displayValue, ariaLabel, enabled) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
    }
}
/**
 * An internal component used to display calendar data in a table.
 * \@docs-private
 */
class MatDatetimepickerCalendarBody {
    constructor() {
        /**
         * The number of columns in the table.
         */
        this.numCols = 7;
        /**
         * Whether to allow selection of disabled cells.
         */
        this.allowDisabledSelection = false;
        /**
         * The cell number of the active cell in the table.
         */
        this.activeCell = 0;
        /**
         * Emits when a new value is selected.
         */
        this.selectedValueChange = new EventEmitter();
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    _cellClicked(cell) {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChange.emit(cell.value);
    }
    /**
     * The number of blank cells to put at the beginning for the first row.
     * @return {?}
     */
    get _firstRowOffset() {
        return this.rows && this.rows.length && this.rows[0].length ?
            this.numCols - this.rows[0].length : 0;
    }
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    _isActiveCell(rowIndex, colIndex) {
        /** @type {?} */
        let cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }
        return cellNumber === this.activeCell;
    }
}
MatDatetimepickerCalendarBody.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line:component-selector
                selector: "[mat-datetimepicker-calendar-body]",
                template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"_firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\n  <td class=\"mat-datetimepicker-calendar-body-label\" [attr.colspan]=\"numCols\" >{{ label }}</td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n  <!--\n    We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n  -->\n  <td *ngIf=\"rowIndex === 0 && _firstRowOffset\"\n      aria-hidden=\"true\"\n      class=\"mat-datetimepicker-calendar-body-label\"\n      [attr.colspan]=\"_firstRowOffset\">\n    {{ _firstRowOffset >= labelMinRequiredCells ? label : '' }}\n  </td>\n  <td *ngFor=\"let item of row; let colIndex = index\"\n      role=\"gridcell\"\n      class=\"mat-datetimepicker-calendar-body-cell\"\n      [class.mat-datetimepicker-calendar-body-disabled]=\"!item.enabled\"\n      [class.mat-datetimepicker-calendar-body-active]=\"_isActiveCell(rowIndex, colIndex)\"\n      [attr.aria-label]=\"item.ariaLabel\"\n      [attr.aria-disabled]=\"!item.enabled || null\"\n      (click)=\"_cellClicked(item)\">\n    <div class=\"mat-datetimepicker-calendar-body-cell-content\"\n         [class.mat-datetimepicker-calendar-body-selected]=\"selectedValue === item.value\"\n         [class.mat-datetimepicker-calendar-body-today]=\"todayValue === item.value\">\n      {{ item.displayValue }}\n    </div>\n  </td>\n</tr>\n",
                host: {
                    "class": "mat-datetimepicker-calendar-body"
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mat-datetimepicker-calendar-body{font-size:13px;min-width:224px}.mat-datetimepicker-calendar-body-label{padding:7.14286% 0 7.14286% 7.14286%;height:0;line-height:0;color:rgba(0,0,0,.54);-webkit-transform:translateX(-6px);transform:translateX(-6px);text-align:left}.mat-datetimepicker-calendar-body-cell{position:relative;width:14.28571%;height:0;line-height:0;padding:7.14286% 0;text-align:center;outline:0;cursor:pointer}.mat-datetimepicker-calendar-body-disabled{cursor:default;pointer-events:none}.mat-datetimepicker-calendar-body-cell-content{position:absolute;top:5%;left:5%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;color:rgba(0,0,0,.87);border:1px solid transparent;border-radius:50%}.mat-datetimepicker-calendar-body-disabled>.mat-datetimepicker-calendar-body-cell-content:not(.mat-datetimepicker-calendar-body-selected){color:rgba(0,0,0,.38)}.mat-calendar:focus .mat-datetimepicker-calendar-body-active>.mat-datetimepicker-calendar-body-cell-content:not(.mat-datetimepicker-calendar-body-selected),:not(.mat-datetimepicker-calendar-body-disabled):hover>.mat-datetimepicker-calendar-body-cell-content:not(.mat-datetimepicker-calendar-body-selected){background-color:rgba(0,0,0,.12)}.mat-datetimepicker-calendar-body-disabled>.mat-datetimepicker-calendar-body-today:not(.mat-datetimepicker-calendar-body-selected){border-color:rgba(0,0,0,.18)}[dir=rtl] .mat-datetimepicker-calendar-body-label{padding:0 7.14286% 0 0;-webkit-transform:translateX(6px);transform:translateX(6px);text-align:right}"]
            }] }
];
MatDatetimepickerCalendarBody.propDecorators = {
    label: [{ type: Input }],
    rows: [{ type: Input }],
    todayValue: [{ type: Input }],
    selectedValue: [{ type: Input }],
    labelMinRequiredCells: [{ type: Input }],
    numCols: [{ type: Input }],
    allowDisabledSelection: [{ type: Input }],
    activeCell: [{ type: Input }],
    selectedValueChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const CLOCK_RADIUS = 50;
/** @type {?} */
const CLOCK_INNER_RADIUS = 27.5;
/** @type {?} */
const CLOCK_OUTER_RADIUS = 41.25;
/** @type {?} */
const CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
class MatDatetimepickerClock {
    /**
     * @param {?} _element
     * @param {?} _adapter
     */
    constructor(_element, _adapter) {
        this._element = _element;
        this._adapter = _adapter;
        this._userSelection = new EventEmitter();
        this._timeChanged = false;
        this.interval = 1;
        this.twelvehour = false;
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new EventEmitter();
        this.activeDateChange = new EventEmitter();
        /**
         * Hours and Minutes representing the clock view.
         */
        this._hours = [];
        this._minutes = [];
        /**
         * Whether the clock is in hour view.
         */
        this._hourView = true;
        this.mouseMoveListener = (event) => {
            this._handleMousemove(event);
        };
        this.mouseUpListener = () => {
            this._handleMouseup();
        };
    }
    /**
     * The date to display in this clock view.
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
        this._activeDate = this._adapter.clampDate(value, this.minDate, this.maxDate);
        if (!this._adapter.sameMinute(oldActiveDate, this._activeDate)) {
            this._init();
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
        this._selected = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
        if (this._selected) {
            this.activeDate = this._selected;
        }
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get minDate() {
        return this._minDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set minDate(value) {
        this._minDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get maxDate() {
        return this._maxDate;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxDate(value) {
        this._maxDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
    }
    /**
     * Whether the clock should be started in hour or minute view.
     * @param {?} value
     * @return {?}
     */
    set startView(value) {
        this._hourView = value != "minute";
    }
    /**
     * @return {?}
     */
    get _hand() {
        this._selectedHour = this._adapter.getHour(this.activeDate);
        this._selectedMinute = this._adapter.getMinute(this.activeDate);
        /** @type {?} */
        let deg = 0;
        /** @type {?} */
        let radius = CLOCK_OUTER_RADIUS;
        if (this._hourView) {
            /** @type {?} */
            let outer = this._selectedHour > 0 && this._selectedHour < 13;
            radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
            if (this.twelvehour) {
                radius = CLOCK_OUTER_RADIUS;
            }
            deg = Math.round(this._selectedHour * (360 / (24 / 2)));
        }
        else {
            deg = Math.round(this._selectedMinute * (360 / 60));
        }
        return {
            "transform": `rotate(${deg}deg)`,
            "height": `${radius}%`,
            "margin-top": `${50 - radius}%`
        };
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.activeDate = this._activeDate || this._adapter.today();
        this._init();
    }
    /**
     * Handles mousedown events on the clock body.
     * @param {?} event
     * @return {?}
     */
    _handleMousedown(event) {
        this._timeChanged = false;
        this.setTime(event);
        document.addEventListener("mousemove", this.mouseMoveListener);
        document.addEventListener("touchmove", this.mouseMoveListener);
        document.addEventListener("mouseup", this.mouseUpListener);
        document.addEventListener("touchend", this.mouseUpListener);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _handleMousemove(event) {
        event.preventDefault();
        this.setTime(event);
    }
    /**
     * @return {?}
     */
    _handleMouseup() {
        document.removeEventListener("mousemove", this.mouseMoveListener);
        document.removeEventListener("touchmove", this.mouseMoveListener);
        document.removeEventListener("mouseup", this.mouseUpListener);
        document.removeEventListener("touchend", this.mouseUpListener);
        if (this._timeChanged) {
            this.selectedChange.emit(this.activeDate);
            if (!this._hourView) {
                this._userSelection.emit();
            }
        }
    }
    /**
     * Initializes this clock view.
     * @private
     * @return {?}
     */
    _init() {
        this._hours.length = 0;
        this._minutes.length = 0;
        /** @type {?} */
        let hourNames = this._adapter.getHourNames();
        /** @type {?} */
        let minuteNames = this._adapter.getMinuteNames();
        if (this.twelvehour) {
            for (let i = 1; i < (hourNames.length / 2) + 1; i++) {
                /** @type {?} */
                let radian = i / 6 * Math.PI;
                /** @type {?} */
                let radius = CLOCK_OUTER_RADIUS;
                /** @type {?} */
                const date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), i + 1, 0);
                /** @type {?} */
                let enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) &&
                    (!this.maxDate || this._adapter.compareDatetime(date, this.maxDate) <= 0);
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? "00" : hourNames[i],
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS
                });
            }
        }
        else {
            for (let i = 0; i < hourNames.length; i++) {
                /** @type {?} */
                let radian = i / 6 * Math.PI;
                /** @type {?} */
                let outer = i > 0 && i < 13;
                /** @type {?} */
                let radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                /** @type {?} */
                const date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), i, 0);
                /** @type {?} */
                let enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) &&
                    (!this.maxDate || this._adapter.compareDatetime(date, this.maxDate) <= 0) &&
                    (!this.dateFilter || this.dateFilter(date, MatDatetimepickerFilterType.HOUR));
                this._hours.push({
                    value: i,
                    displayValue: i === 0 ? "00" : hourNames[i],
                    enabled: enabled,
                    top: CLOCK_RADIUS - Math.cos(radian) * radius - CLOCK_TICK_RADIUS,
                    left: CLOCK_RADIUS + Math.sin(radian) * radius - CLOCK_TICK_RADIUS,
                    fontSize: i > 0 && i < 13 ? "" : "80%"
                });
            }
        }
        for (let i = 0; i < minuteNames.length; i += 5) {
            /** @type {?} */
            let radian = i / 30 * Math.PI;
            /** @type {?} */
            const date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), i);
            /** @type {?} */
            let enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) &&
                (!this.maxDate || this._adapter.compareDatetime(date, this.maxDate) <= 0) &&
                (!this.dateFilter || this.dateFilter(date, MatDatetimepickerFilterType.MINUTE));
            this._minutes.push({
                value: i,
                displayValue: i === 0 ? "00" : minuteNames[i],
                enabled: enabled,
                top: CLOCK_RADIUS - Math.cos(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS,
                left: CLOCK_RADIUS + Math.sin(radian) * CLOCK_OUTER_RADIUS - CLOCK_TICK_RADIUS
            });
        }
    }
    /**
     * Set Time
     * @private
     * @param {?} event
     * @return {?}
     */
    setTime(event) {
        /** @type {?} */
        let trigger$$1 = this._element.nativeElement;
        /** @type {?} */
        let triggerRect = trigger$$1.getBoundingClientRect();
        /** @type {?} */
        let width = trigger$$1.offsetWidth;
        /** @type {?} */
        let height = trigger$$1.offsetHeight;
        /** @type {?} */
        let pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        /** @type {?} */
        let pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        /** @type {?} */
        let x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
        /** @type {?} */
        let y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
        /** @type {?} */
        let radian = Math.atan2(-x, y);
        /** @type {?} */
        let unit = Math.PI / (this._hourView ? 6 : (this.interval ? (30 / this.interval) : 30));
        /** @type {?} */
        let z = Math.sqrt(x * x + y * y);
        /** @type {?} */
        let outer = this._hourView && z > ((width * (CLOCK_OUTER_RADIUS / 100)) +
            (width * (CLOCK_INNER_RADIUS / 100))) / 2;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        /** @type {?} */
        let value = Math.round(radian / unit);
        /** @type {?} */
        let date;
        if (this._hourView) {
            if (this.twelvehour) {
                value = value === 0 ? 12 : value;
            }
            else {
                if (value === 12) {
                    value = 0;
                }
                value = outer ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            }
            date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), value, this._adapter.getMinute(this.activeDate));
        }
        else {
            if (this.interval) {
                value *= this.interval;
            }
            if (value === 60) {
                value = 0;
            }
            date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), value);
        }
        /** @type {?} */
        const clamped = this._adapter.clampDate(date, this.minDate, this.maxDate);
        if (date === clamped) {
            this._timeChanged = true;
            this.activeDate = clamped;
            this.activeDateChange.emit(this.activeDate);
        }
    }
}
MatDatetimepickerClock.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-clock",
                template: "<div class=\"mat-datetimepicker-clock\">\n  <div class=\"mat-datetimepicker-clock-center\"></div>\n  <div class=\"mat-datetimepicker-clock-hand\" [ngStyle]=\"_hand\"></div>\n  <div class=\"mat-datetimepicker-clock-hours\" [class.active]=\"_hourView\">\n    <div *ngFor=\"let item of _hours\"\n         class=\"mat-datetimepicker-clock-cell\"\n         [class.mat-datetimepicker-clock-cell-selected]=\"_selectedHour == item.value\"\n         [class.mat-datetimepicker-clock-cell-disabled]=\"!item.enabled\"\n         [style.top]=\"item.top+'%'\"\n         [style.left]=\"item.left+'%'\"\n         [style.fontSize]=\"item.fontSize\">{{ item.displayValue }}</div>\n  </div>\n  <div class=\"mat-datetimepicker-clock-minutes\" [class.active]=\"!_hourView\">\n    <div *ngFor=\"let item of _minutes\"\n         class=\"mat-datetimepicker-clock-cell\"\n         [class.mat-datetimepicker-clock-cell-selected]=\"_selectedMinute == item.value\"\n         [class.mat-datetimepicker-clock-cell-disabled]=\"!item.enabled\"\n         [style.top]=\"item.top+'%'\"\n         [style.left]=\"item.left+'%'\">{{ item.displayValue }}</div>\n  </div>\n</div>\n",
                host: {
                    "role": "clock",
                    "(mousedown)": "_handleMousedown($event)"
                },
                styles: [":host{position:relative;display:block;min-width:224px;margin:8px;font-size:14px;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.mat-datetimepicker-clock{position:relative;width:100%;height:0;padding-top:100%;background-color:#e0e0e0;border-radius:50%}.mat-datetimepicker-clock-center{position:absolute;top:50%;left:50%;width:2%;height:2%;margin:-1%;border-radius:50%}.mat-datetimepicker-clock-hand{position:absolute;top:0;right:0;bottom:0;left:0;width:1px;margin:0 auto;-webkit-transform-origin:bottom;transform-origin:bottom}.mat-datetimepicker-clock-hand::before{content:'';position:absolute;top:-4px;left:-4px;width:8px;height:8px;border-radius:50%}.mat-datetimepicker-clock-hours,.mat-datetimepicker-clock-minutes{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;visibility:hidden;transition:350ms;-webkit-transform:scale(1.2);transform:scale(1.2)}.mat-datetimepicker-clock-hours.active,.mat-datetimepicker-clock-minutes.active{opacity:1;visibility:visible;-webkit-transform:scale(1);transform:scale(1)}.mat-datetimepicker-clock-minutes{-webkit-transform:scale(.8);transform:scale(.8)}.mat-datetimepicker-clock-cell{position:absolute;display:flex;width:14.1666%;height:14.1666%;color:rgba(0,0,0,.87);justify-content:center;box-sizing:border-box;border-radius:50%;align-items:center;cursor:pointer}.mat-datetimepicker-clock-cell:not(.mat-datetimepicker-clock-cell-selected):not(.mat-datetimepicker-clock-cell-disabled):hover{background-color:rgba(0,0,0,.1)}.mat-datetimepicker-clock-cell.mat-datetimepicker-clock-cell-disabled{color:rgba(0,0,0,.38);pointer-events:none}.mat-datetimepicker-clock-cell.mat-datetimepicker-clock-cell-selected{color:#fff}"]
            }] }
];
/** @nocollapse */
MatDatetimepickerClock.ctorParameters = () => [
    { type: ElementRef },
    { type: DatetimeAdapter }
];
MatDatetimepickerClock.propDecorators = {
    _userSelection: [{ type: Output }],
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    startView: [{ type: Input }],
    dateFilter: [{ type: Input }],
    interval: [{ type: Input }],
    twelvehour: [{ type: Input }],
    selectedChange: [{ type: Output }],
    activeDateChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to generate a unique ID for each datepicker instance.
 * @type {?}
 */
let datetimepickerUid = 0;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 * @template D
 */
class MatDatetimepickerContent {
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._calendar._focusActiveCell();
    }
    /**
     * Handles keydown event on datepicker content.
     * @param {?} event The event.
     * @return {?}
     */
    _handleKeydown(event) {
        // tslint:disable-next-line:deprecation
        if (event.keyCode === ESCAPE) {
            this.datetimepicker.close();
            event.preventDefault();
            event.stopPropagation();
        }
    }
}
MatDatetimepickerContent.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-content",
                template: "<mat-datetimepicker-calendar class=\"mat-typography\" cdkTrapFocus\n              [id]=\"datetimepicker.id\"\n              [attr.mode]=\"datetimepicker.mode\"\n              [startView]=\"datetimepicker.startView\"\n              [type]=\"datetimepicker.type\"\n              [timeInterval]=\"datetimepicker.timeInterval\"\n              [minDate]=\"datetimepicker._minDate\"\n              [maxDate]=\"datetimepicker._maxDate\"\n              [dateFilter]=\"datetimepicker._dateFilter\"\n              [selected]=\"datetimepicker._selected\"\n              [startAt]=\"datetimepicker.startAt\"\n              (selectedChange)=\"datetimepicker._select($event)\"\n              (_userSelection)=\"datetimepicker.close()\">\n</mat-datetimepicker-calendar>\n",
                host: {
                    "class": "mat-datetimepicker-content",
                    "[class.mat-datetimepicker-content-touch]": "datetimepicker?.touchUi",
                    "(keydown)": "_handleKeydown($event)"
                },
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [".mat-datetimepicker-content{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);display:block;background-color:#fff;border-radius:2px;overflow:hidden}.mat-datetimepicker-calendar{width:296px;height:405px}.mat-datetimepicker-calendar[mode=landscape]{width:446px;height:328px}@media (min-width:480px){.mat-datetimepicker-calendar[mode=auto]{width:446px;height:328px}}.mat-datetimepicker-content-touch{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);display:block;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}.mat-datetimepicker-dialog .mat-dialog-container{padding:0}"]
            }] }
];
MatDatetimepickerContent.propDecorators = {
    _calendar: [{ type: ViewChild, args: [MatDatetimepickerCalendar,] }]
};
/**
 * @template D
 */
class MatDatetimepicker {
    /**
     * @param {?} _dialog
     * @param {?} _overlay
     * @param {?} _ngZone
     * @param {?} _viewContainerRef
     * @param {?} _scrollStrategy
     * @param {?} _dateAdapter
     * @param {?} _dir
     * @param {?} _document
     */
    constructor(_dialog, _overlay, _ngZone, _viewContainerRef, _scrollStrategy, _dateAdapter, _dir, _document) {
        this._dialog = _dialog;
        this._overlay = _overlay;
        this._ngZone = _ngZone;
        this._viewContainerRef = _viewContainerRef;
        this._scrollStrategy = _scrollStrategy;
        this._dateAdapter = _dateAdapter;
        this._dir = _dir;
        this._document = _document;
        /**
         * The view that the calendar should start in.
         */
        this.startView = "month";
        this.mode = "auto";
        this.timeInterval = 1;
        this._type = "date";
        this._touchUi = false;
        /**
         * Emits new selected date when selected date changes.
         * @deprecated Switch to the `dateChange` and `dateInput` binding on the input element.
         */
        this.selectedChanged = new EventEmitter();
        /**
         * Emits when the datepicker has been opened.
         */
        // tslint:disable-next-line:no-output-rename
        this.openedStream = new EventEmitter();
        /**
         * Emits when the datepicker has been closed.
         */
        // tslint:disable-next-line:no-output-rename
        this.closedStream = new EventEmitter();
        /**
         * Whether the calendar is open.
         */
        this.opened = false;
        /**
         * The id for the datepicker calendar.
         */
        this.id = `mat-datetimepicker-${datetimepickerUid++}`;
        this._validSelected = null;
        /**
         * The element that was focused before the datepicker was opened.
         */
        this._focusedElementBeforeOpen = null;
        this._inputSubscription = Subscription.EMPTY;
        /**
         * Emits when the datepicker is disabled.
         */
        this._disabledChange = new Subject();
        if (!this._dateAdapter) {
            throw createMissingDateImplError("DateAdapter");
        }
    }
    /**
     * The date to open the calendar to initially.
     * @return {?}
     */
    get startAt() {
        // If an explicit startAt is set we start there, otherwise we start at whatever the currently
        // selected value is.
        return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
    }
    /**
     * @param {?} date
     * @return {?}
     */
    set startAt(date) {
        this._startAt = this._dateAdapter.getValidDateOrNull(date);
    }
    /**
     * @return {?}
     */
    get openOnFocus() { return this._openOnFocus; }
    /**
     * @param {?} value
     * @return {?}
     */
    set openOnFocus(value) { this._openOnFocus = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    _handleFocus() {
        if (!this.opened && this.openOnFocus) {
            this.open();
        }
    }
    /**
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this._type = value || "date";
    }
    /**
     * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
     * than a popup and elements have more padding to allow for bigger touch targets.
     * @return {?}
     */
    get touchUi() {
        return this._touchUi;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set touchUi(value) {
        this._touchUi = coerceBooleanProperty(value);
    }
    /**
     * Whether the datepicker pop-up should be disabled.
     * @return {?}
     */
    get disabled() {
        return this._disabled === undefined && this._datepickerInput ?
            this._datepickerInput.disabled : !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
            this._disabledChange.next(newValue);
        }
    }
    /**
     * The currently selected date.
     * @return {?}
     */
    get _selected() {
        return this._validSelected;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set _selected(value) {
        this._validSelected = value;
    }
    /**
     * The minimum selectable date.
     * @return {?}
     */
    get _minDate() {
        return this._datepickerInput && this._datepickerInput.min;
    }
    /**
     * The maximum selectable date.
     * @return {?}
     */
    get _maxDate() {
        return this._datepickerInput && this._datepickerInput.max;
    }
    /**
     * @return {?}
     */
    get _dateFilter() {
        return this._datepickerInput && this._datepickerInput._dateFilter;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.close();
        this._inputSubscription.unsubscribe();
        this._disabledChange.complete();
        if (this._popupRef) {
            this._popupRef.dispose();
        }
    }
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    _select(date) {
        /** @type {?} */
        const oldValue = this._selected;
        this._selected = date;
        if (!this._dateAdapter.sameDatetime(oldValue, this._selected)) {
            // tslint:disable-next-line deprecation
            this.selectedChanged.emit(date);
        }
    }
    /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    _registerInput(input) {
        if (this._datepickerInput) {
            throw Error("A MatDatepicker can only be associated with a single input.");
        }
        this._datepickerInput = input;
        this._inputSubscription =
            this._datepickerInput._valueChange.subscribe((value) => this._selected = value);
    }
    /**
     * Open the calendar.
     * @return {?}
     */
    open() {
        if (this.opened || this.disabled) {
            return;
        }
        if (!this._datepickerInput) {
            throw Error("Attempted to open an MatDatepicker with no associated input.");
        }
        if (this._document) {
            this._focusedElementBeforeOpen = this._document.activeElement;
        }
        this.touchUi ? this._openAsDialog() : this._openAsPopup();
        this.opened = true;
        this.openedStream.emit();
    }
    /**
     * Close the calendar.
     * @return {?}
     */
    close() {
        if (!this.opened) {
            return;
        }
        if (this._popupRef && this._popupRef.hasAttached()) {
            this._popupRef.detach();
        }
        if (this._dialogRef) {
            this._dialogRef.close();
            this._dialogRef = null;
        }
        if (this._calendarPortal && this._calendarPortal.isAttached) {
            this._calendarPortal.detach();
        }
        /** @type {?} */
        const completeClose = () => {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (this.opened) {
                this.opened = false;
                this.closedStream.emit();
                this._focusedElementBeforeOpen = null;
            }
        };
        if (this._focusedElementBeforeOpen &&
            typeof this._focusedElementBeforeOpen.focus === "function") {
            // Because IE moves focus asynchronously, we can't count on it being restored before we've
            // marked the datepicker as closed. If the event fires out of sequence and the element that
            // we're refocusing opens the datepicker on focus, the user could be stuck with not being
            // able to close the calendar at all. We work around it by making the logic, that marks
            // the datepicker as closed, async as well.
            this._focusedElementBeforeOpen.focus();
            setTimeout(completeClose);
        }
        else {
            completeClose();
        }
    }
    /**
     * Open the calendar as a dialog.
     * @private
     * @return {?}
     */
    _openAsDialog() {
        this._dialogRef = this._dialog.open(MatDatetimepickerContent, {
            direction: this._dir ? this._dir.value : "ltr",
            viewContainerRef: this._viewContainerRef,
            panelClass: "mat-datetimepicker-dialog"
        });
        this._dialogRef.afterClosed().subscribe(() => this.close());
        this._dialogRef.componentInstance.datetimepicker = this;
    }
    /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    _openAsPopup() {
        if (!this._calendarPortal) {
            this._calendarPortal = new ComponentPortal(MatDatetimepickerContent, this._viewContainerRef);
        }
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            /** @type {?} */
            const componentRef = this._popupRef.attach(this._calendarPortal);
            componentRef.instance.datetimepicker = this;
            // Update the position once the calendar has rendered.
            this._ngZone.onStable.asObservable().pipe(first()).subscribe(() => {
                this._popupRef.updatePosition();
            });
        }
        this._popupRef.backdropClick().subscribe(() => this.close());
    }
    /**
     * Create the popup.
     * @private
     * @return {?}
     */
    _createPopup() {
        /** @type {?} */
        const overlayConfig = new OverlayConfig({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: "mat-overlay-transparent-backdrop",
            direction: this._dir ? this._dir.value : "ltr",
            scrollStrategy: this._scrollStrategy(),
            panelClass: "mat-datetimepicker-popup"
        });
        this._popupRef = this._overlay.create(overlayConfig);
    }
    /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    _createPopupPositionStrategy() {
        return this._overlay.position()
            .flexibleConnectedTo(this._datepickerInput.getConnectedOverlayOrigin())
            .withTransformOriginOn(".mat-datetimepicker-content")
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withLockedPosition()
            .withPositions([
            {
                originX: "start",
                originY: "bottom",
                overlayX: "start",
                overlayY: "top"
            },
            {
                originX: "start",
                originY: "top",
                overlayX: "start",
                overlayY: "bottom"
            },
            {
                originX: "end",
                originY: "bottom",
                overlayX: "end",
                overlayY: "top"
            },
            {
                originX: "end",
                originY: "top",
                overlayX: "end",
                overlayY: "bottom"
            }
        ]);
    }
}
MatDatetimepicker.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker",
                exportAs: "matDatetimepicker",
                template: "",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
MatDatetimepicker.ctorParameters = () => [
    { type: MatDialog },
    { type: Overlay },
    { type: NgZone },
    { type: ViewContainerRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DATEPICKER_SCROLL_STRATEGY,] }] },
    { type: DatetimeAdapter, decorators: [{ type: Optional }] },
    { type: Directionality, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [DOCUMENT,] }] }
];
MatDatetimepicker.propDecorators = {
    startAt: [{ type: Input }],
    startView: [{ type: Input }],
    mode: [{ type: Input }],
    timeInterval: [{ type: Input }],
    openOnFocus: [{ type: Input }],
    type: [{ type: Input }],
    touchUi: [{ type: Input }],
    disabled: [{ type: Input }],
    selectedChanged: [{ type: Output }],
    panelClass: [{ type: Input }],
    openedStream: [{ type: Output, args: ["opened",] }],
    closedStream: [{ type: Output, args: ["closed",] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable no-use-before-declare
/** @type {?} */
const MAT_DATETIMEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatDatetimepickerInput),
    multi: true
};
/** @type {?} */
const MAT_DATETIMEPICKER_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MatDatetimepickerInput),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
class MatDatetimepickerInputEvent {
    /**
     * @param {?} target
     * @param {?} targetElement
     */
    constructor(target, targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
}
/**
 * Directive used to connect an input to a MatDatepicker.
 * @template D
 */
class MatDatetimepickerInput {
    /**
     * @param {?} _elementRef
     * @param {?} _dateAdapter
     * @param {?} _dateFormats
     * @param {?} _formField
     */
    constructor(_elementRef, _dateAdapter, _dateFormats, _formField) {
        this._elementRef = _elementRef;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._formField = _formField;
        /**
         * Emits when a `change` event is fired on this `<input>`.
         */
        this.dateChange = new EventEmitter();
        /**
         * Emits when an `input` event is fired on this `<input>`.
         */
        this.dateInput = new EventEmitter();
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this._valueChange = new EventEmitter();
        /**
         * Emits when the disabled state has changed
         */
        this._disabledChange = new EventEmitter();
        this._onTouched = () => {
        };
        this._cvaOnChange = () => {
        };
        this._validatorOnChange = () => {
        };
        this._datepickerSubscription = Subscription.EMPTY;
        this._localeSubscription = Subscription.EMPTY;
        /**
         * The form control validator for whether the input parses.
         */
        this._parseValidator = () => {
            return this._lastValueValid ?
                null : { "matDatepickerParse": { "text": this._elementRef.nativeElement.value } };
        };
        /**
         * The form control validator for the min date.
         */
        this._minValidator = (control) => {
            /** @type {?} */
            const controlValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            return (!this.min || !controlValue ||
                this._dateAdapter.compareDatetime(this.min, controlValue) <= 0) ?
                null : { "matDatepickerMin": { "min": this.min, "actual": controlValue } };
        };
        /**
         * The form control validator for the max date.
         */
        this._maxValidator = (control) => {
            /** @type {?} */
            const controlValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            return (!this.max || !controlValue ||
                this._dateAdapter.compareDatetime(this.max, controlValue) >= 0) ?
                null : { "matDatepickerMax": { "max": this.max, "actual": controlValue } };
        };
        /**
         * The form control validator for the date filter.
         */
        this._filterValidator = (control) => {
            /** @type {?} */
            const controlValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
            return !this._dateFilter || !controlValue || this._dateFilter(controlValue, MatDatetimepickerFilterType.DATE) ?
                null : { "matDatepickerFilter": true };
        };
        /**
         * The combined form control validator for this input.
         */
        this._validator = Validators.compose([this._parseValidator, this._minValidator, this._maxValidator, this._filterValidator]);
        /**
         * Whether the last value set on the input was valid.
         */
        this._lastValueValid = false;
        if (!this._dateAdapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATETIME_FORMATS");
        }
        // Update the displayed date when the locale changes.
        this._localeSubscription = _dateAdapter.localeChanges.subscribe(() => {
            this.value = this.value;
        });
    }
    /**
     * The datepicker that this input is associated with.
     * @param {?} value
     * @return {?}
     */
    set matDatetimepicker(value) {
        this.registerDatepicker(value);
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    registerDatepicker(value) {
        if (value) {
            this._datepicker = value;
            this._datepicker._registerInput(this);
        }
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    set matDatepickerFilter(filter) {
        this._dateFilter = filter;
        this._validatorOnChange();
    }
    /**
     * The value of the input.
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        value = this._dateAdapter.deserialize(value);
        this._lastValueValid = !value || this._dateAdapter.isValid(value);
        value = this._dateAdapter.getValidDateOrNull(value);
        /** @type {?} */
        const oldDate = this.value;
        this._value = value;
        this._formatValue(value);
        // use timeout to ensure the datetimepicker is instantiated and we get the correct format
        setTimeout(() => {
            if (!this._dateAdapter.sameDatetime(oldDate, value)) {
                this._valueChange.emit(value);
            }
        });
    }
    /**
     * @private
     * @return {?}
     */
    getDisplayFormat() {
        switch (this._datepicker.type) {
            case "date":
                return this._dateFormats.display.dateInput;
            case "datetime":
                return this._dateFormats.display.datetimeInput;
            case "time":
                return this._dateFormats.display.timeInput;
            case "month":
                return this._dateFormats.display.monthInput;
        }
    }
    /**
     * @private
     * @return {?}
     */
    getParseFormat() {
        /** @type {?} */
        let parseFormat;
        switch (this._datepicker.type) {
            case "date":
                parseFormat = this._dateFormats.parse.dateInput;
                break;
            case "datetime":
                parseFormat = this._dateFormats.parse.datetimeInput;
                break;
            case "time":
                parseFormat = this._dateFormats.parse.timeInput;
                break;
            case "month":
                parseFormat = this._dateFormats.parse.monthInput;
                break;
        }
        if (!parseFormat) {
            parseFormat = this._dateFormats.parse.dateInput;
        }
        return parseFormat;
    }
    /**
     * The minimum valid date.
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._validatorOnChange();
    }
    /**
     * The maximum valid date.
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
        this._validatorOnChange();
    }
    /**
     * Whether the datepicker-input is disabled.
     * @return {?}
     */
    get disabled() {
        return !!this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const newValue = coerceBooleanProperty(value);
        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this._disabledChange.emit(newValue);
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        if (this._datepicker) {
            // tslint:disable-next-line deprecation
            this._datepickerSubscription = this._datepicker.selectedChanged.subscribe((selected) => {
                this.value = selected;
                this._cvaOnChange(selected);
                this._onTouched();
                this.dateInput.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
                this.dateChange.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._datepickerSubscription.unsubscribe();
        this._localeSubscription.unsubscribe();
        this._valueChange.complete();
        this._disabledChange.complete();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnValidatorChange(fn) {
        this._validatorOnChange = fn;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        return this._validator ? this._validator(c) : null;
    }
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return {?} The element to connect the popup to.
     */
    getConnectedOverlayOrigin() {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
    }
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._cvaOnChange = fn;
    }
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} disabled
     * @return {?}
     */
    setDisabledState(disabled) {
        this.disabled = disabled;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    _onKeydown(event) {
        // tslint:disable-next-line:deprecation
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this._datepicker.open();
            event.preventDefault();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    _onInput(value) {
        /** @type {?} */
        let date = this._dateAdapter.parse(value, this.getParseFormat());
        this._lastValueValid = !date || this._dateAdapter.isValid(date);
        date = this._dateAdapter.getValidDateOrNull(date);
        this._value = date;
        this._cvaOnChange(date);
        this._valueChange.emit(date);
        this.dateInput.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
    }
    /**
     * @return {?}
     */
    _onChange() {
        this.dateChange.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
    }
    /**
     * Handles blur events on the input.
     * @return {?}
     */
    _onBlur() {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this._formatValue(this.value);
        }
        this._onTouched();
    }
    /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    _formatValue(value) {
        this._elementRef.nativeElement.value =
            value ? this._dateAdapter.format(value, this.getDisplayFormat()) : "";
    }
}
MatDatetimepickerInput.decorators = [
    { type: Directive, args: [{
                selector: "input[matDatetimepicker]",
                providers: [
                    MAT_DATETIMEPICKER_VALUE_ACCESSOR,
                    MAT_DATETIMEPICKER_VALIDATORS,
                    { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatDatetimepickerInput },
                ],
                host: {
                    "[attr.aria-haspopup]": "true",
                    "[attr.aria-owns]": "(_datepicker?.opened && _datepicker.id) || null",
                    "[attr.min]": "min ? _dateAdapter.toIso8601(min) : null",
                    "[attr.max]": "max ? _dateAdapter.toIso8601(max) : null",
                    "[disabled]": "disabled",
                    "(focus)": "_datepicker._handleFocus()",
                    "(input)": "_onInput($event.target.value)",
                    "(change)": "_onChange()",
                    "(blur)": "_onBlur()",
                    "(keydown)": "_onKeydown($event)"
                },
                exportAs: "matDatepickerInput"
            },] }
];
/** @nocollapse */
MatDatetimepickerInput.ctorParameters = () => [
    { type: ElementRef },
    { type: DatetimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] }] },
    { type: MatFormField, decorators: [{ type: Optional }] }
];
MatDatetimepickerInput.propDecorators = {
    matDatetimepicker: [{ type: Input }],
    matDatepickerFilter: [{ type: Input }],
    value: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    disabled: [{ type: Input }],
    dateChange: [{ type: Output }],
    dateInput: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template D
 */
class MatDatetimepickerToggle {
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
        const datepickerDisabled = this.datetimepicker ? this.datetimepicker._disabledChange : of();
        /** @type {?} */
        const inputDisabled = this.datetimepicker && this.datetimepicker._datepickerInput ?
            this.datetimepicker._datepickerInput._disabledChange : of();
        this._stateChanges.unsubscribe();
        this._stateChanges = merge(this._intl.changes, datepickerDisabled, inputDisabled)
            .subscribe(() => this._changeDetectorRef.markForCheck());
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DAYS_PER_WEEK = 7;
/**
 * An internal component used to display a single month in the datepicker.
 * \@docs-private
 * @template D
 */
class MatDatetimepickerMonthView {
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
        let weekdays = longWeekdays.map((long, i) => {
            return { long, narrow: narrowWeekdays[i] };
        });
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An internal component used to display a single year in the datepicker.
 * \@docs-private
 * @template D
 */
class MatDatetimepickerYearView {
    /**
     * @param {?} _adapter
     * @param {?} _dateFormats
     */
    constructor(_adapter, _dateFormats) {
        this._adapter = _adapter;
        this._dateFormats = _dateFormats;
        this._userSelection = new EventEmitter();
        this.type = "date";
        /**
         * Emits when a new month is selected.
         */
        this.selectedChange = new EventEmitter();
        if (!this._adapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATETIME_FORMATS");
        }
        this._activeDate = this._adapter.today();
    }
    /**
     * The date to display in this year view (everything other than the year is ignored).
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
            !this._adapter.sameYear(oldActiveDate, this._activeDate)) {
            this._init();
            // if (oldActiveDate < this._activeDate) {
            //  this.calendarState('right');
            // } else {
            //  this.calendarState('left');
            // }
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
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._init();
    }
    /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    _monthSelected(month) {
        this.selectedChange.emit(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)));
        if (this.type === "month") {
            this._userSelection.emit();
        }
    }
    /**
     * Initializes this month view.
     * @private
     * @return {?}
     */
    _init() {
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._adapter.today());
        this._yearLabel = this._adapter.getYearName(this.activeDate);
        /** @type {?} */
        let monthNames = this._adapter.getMonthNames("short");
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map(row => row.map(month => this._createCellForMonth(month, monthNames[month])));
    }
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    _getMonthInCurrentYear(date) {
        return this._adapter.sameYear(date, this.activeDate) ?
            this._adapter.getMonth(date) : null;
    }
    /**
     * Creates an MdCalendarCell for the given month.
     * @private
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    _createCellForMonth(month, monthName) {
        /** @type {?} */
        let ariaLabel = this._adapter.format(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)), this._dateFormats.display.monthYearA11yLabel);
        return new MatDatetimepickerCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._isMonthEnabled(month));
    }
    /**
     * Whether the given month is enabled.
     * @private
     * @param {?} month
     * @return {?}
     */
    _isMonthEnabled(month) {
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
        let firstOfMonth = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
        // If any date in the month is enabled count the month as enabled.
        for (let date = firstOfMonth; this._adapter.getMonth(date) == month; date = this._adapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    }
    // private calendarState(direction: string): void {
    //   this._calendarState = direction;
    // }
    /**
     * @return {?}
     */
    _calendarStateDone() {
        this._calendarState = "";
    }
}
MatDatetimepickerYearView.decorators = [
    { type: Component, args: [{
                selector: "mat-datetimepicker-year-view",
                template: "<table class=\"mat-datetimepicker-calendar-table\">\n  <thead class=\"mat-datetimepicker-calendar-table-header\"></thead>\n  <tbody [@slideCalendar]=\"_calendarState\"\n         (@slideCalendar.done)=\"_calendarStateDone()\"\n         mat-datetimepicker-calendar-body\n         role=\"grid\"\n         allowDisabledSelection=\"true\"\n         [label]=\"_yearLabel\"\n         [rows]=\"_months\"\n         [todayValue]=\"_todayMonth\"\n         [selectedValue]=\"_selectedMonth\"\n         [labelMinRequiredCells]=\"2\"\n         [activeCell]=\"_adapter.getMonth(activeDate)\"\n         (selectedValueChange)=\"_monthSelected($event)\"></tbody>\n</table>\n",
                animations: [slideCalendar],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
MatDatetimepickerYearView.ctorParameters = () => [
    { type: DatetimeAdapter, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATETIME_FORMATS,] }] }
];
MatDatetimepickerYearView.propDecorators = {
    _userSelection: [{ type: Output }],
    type: [{ type: Input }],
    activeDate: [{ type: Input }],
    selected: [{ type: Input }],
    dateFilter: [{ type: Input }],
    selectedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MatDatetimepickerModule {
}
MatDatetimepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MatButtonModule,
                    MatDialogModule,
                    MatIconModule,
                    OverlayModule,
                    A11yModule
                ],
                entryComponents: [
                    MatDatetimepickerContent
                ],
                declarations: [
                    MatDatetimepickerCalendar,
                    MatDatetimepickerCalendarBody,
                    MatDatetimepickerClock,
                    MatDatetimepicker,
                    MatDatetimepickerToggle,
                    MatDatetimepickerInput,
                    MatDatetimepickerContent,
                    MatDatetimepickerMonthView,
                    MatDatetimepickerYearView
                ],
                exports: [
                    MatDatetimepickerCalendar,
                    MatDatetimepickerCalendarBody,
                    MatDatetimepickerClock,
                    MatDatetimepicker,
                    MatDatetimepickerToggle,
                    MatDatetimepickerInput,
                    MatDatetimepickerContent,
                    MatDatetimepickerMonthView,
                    MatDatetimepickerYearView
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { NativeDatetimeModule, MatNativeDatetimeModule, DatetimeAdapter, MAT_DATETIME_FORMATS, NativeDatetimeAdapter, MAT_NATIVE_DATETIME_FORMATS, MatDatetimepickerModule, MatDatetimepickerCalendar, MatDatetimepickerCalendarCell, MatDatetimepickerCalendarBody, MatDatetimepickerContent, MatDatetimepicker, MatDatetimepickerFilterType, MAT_DATETIMEPICKER_VALUE_ACCESSOR, MAT_DATETIMEPICKER_VALIDATORS, MatDatetimepickerInputEvent, MatDatetimepickerInput, MatDatetimepickerToggle, MatDatetimepickerMonthView, MatDatetimepickerYearView, MatDatetimepickerClock as ɵb, slideCalendar as ɵa };

//# sourceMappingURL=mat-datetimepicker-core.js.map