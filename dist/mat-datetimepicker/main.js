(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/core/fesm5/mat-datetimepicker-core.js":
/*!****************************************************!*\
  !*** ./dist/core/fesm5/mat-datetimepicker-core.js ***!
  \****************************************************/
/*! exports provided: NativeDatetimeModule, MatNativeDatetimeModule, DatetimeAdapter, MAT_DATETIME_FORMATS, NativeDatetimeAdapter, MAT_NATIVE_DATETIME_FORMATS, MatDatetimepickerModule, MatDatetimepickerCalendar, MatDatetimepickerCalendarCell, MatDatetimepickerCalendarBody, MatDatetimepickerContent, MatDatetimepicker, MatDatetimepickerFilterType, MAT_DATETIMEPICKER_VALUE_ACCESSOR, MAT_DATETIMEPICKER_VALIDATORS, MatDatetimepickerInputEvent, MatDatetimepickerInput, MatDatetimepickerToggle, MatDatetimepickerMonthView, MatDatetimepickerYearView, ɵb, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeDatetimeModule", function() { return NativeDatetimeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatNativeDatetimeModule", function() { return MatNativeDatetimeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DatetimeAdapter", function() { return DatetimeAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_DATETIME_FORMATS", function() { return MAT_DATETIME_FORMATS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeDatetimeAdapter", function() { return NativeDatetimeAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_NATIVE_DATETIME_FORMATS", function() { return MAT_NATIVE_DATETIME_FORMATS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerModule", function() { return MatDatetimepickerModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerCalendar", function() { return MatDatetimepickerCalendar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerCalendarCell", function() { return MatDatetimepickerCalendarCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerCalendarBody", function() { return MatDatetimepickerCalendarBody; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerContent", function() { return MatDatetimepickerContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepicker", function() { return MatDatetimepicker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerFilterType", function() { return MatDatetimepickerFilterType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_DATETIMEPICKER_VALUE_ACCESSOR", function() { return MAT_DATETIMEPICKER_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_DATETIMEPICKER_VALIDATORS", function() { return MAT_DATETIMEPICKER_VALIDATORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerInputEvent", function() { return MatDatetimepickerInputEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerInput", function() { return MatDatetimepickerInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerToggle", function() { return MatDatetimepickerToggle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerMonthView", function() { return MatDatetimepickerMonthView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatDatetimepickerYearView", function() { return MatDatetimepickerYearView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return MatDatetimepickerClock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return slideCalendar; });
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/core */ "./node_modules/@angular/material/esm5/core.es5.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/a11y */ "./node_modules/@angular/cdk/esm5/a11y.es5.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/fesm5/animations.js");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/bidi */ "./node_modules/@angular/cdk/esm5/bidi.es5.js");
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/portal */ "./node_modules/@angular/cdk/esm5/portal.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ "./node_modules/@angular/material/esm5/dialog.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/keycodes */ "./node_modules/@angular/cdk/esm5/keycodes.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/esm5/form-field.es5.js");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/coercion */ "./node_modules/@angular/cdk/esm5/coercion.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


















/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 * @template D
 */
var  /**
 * @abstract
 * @template D
 */
DatetimeAdapter = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__extends"])(DatetimeAdapter, _super);
    function DatetimeAdapter(_delegate) {
        var _this = _super.call(this) || this;
        _this._delegate = _delegate;
        return _this;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    DatetimeAdapter.prototype.getValidDateOrNull = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return (this.isDateInstance(obj) && this.isValid(obj)) ? obj : null;
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.compareDatetime = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first$$1, second) {
        return this.compareDate(first$$1, second) ||
            this.getHour(first$$1) - this.getHour(second) ||
            this.getMinute(first$$1) - this.getMinute(second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameDatetime = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first$$1, second) {
        if (first$$1 && second) {
            /** @type {?} */
            var firstValid = this.isValid(first$$1);
            /** @type {?} */
            var secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDatetime(first$$1, second);
            }
            return firstValid === secondValid;
        }
        return first$$1 === second;
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameYear = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first$$1, second) {
        return first$$1 && second && this.getYear(first$$1) === this.getYear(second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameDay = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first$$1, second) {
        return first$$1 && second && this.getDate(first$$1) === this.getDate(second) && this.sameMonthAndYear(first$$1, second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameHour = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first$$1, second) {
        return first$$1 && second && this.getHour(first$$1) === this.getHour(second) && this.sameDay(first$$1, second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameMinute = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first$$1, second) {
        return first$$1 && second && this.getMinute(first$$1) === this.getMinute(second) && this.sameHour(first$$1, second);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    DatetimeAdapter.prototype.sameMonthAndYear = /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    function (first$$1, second) {
        if (first$$1 && second) {
            /** @type {?} */
            var firstValid = this.isValid(first$$1);
            /** @type {?} */
            var secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !(this.getYear(first$$1) - this.getYear(second) ||
                    this.getMonth(first$$1) - this.getMonth(second));
            }
            return firstValid === secondValid;
        }
        return first$$1 === second;
    };
    // delegate
    // delegate
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.clone = 
    // delegate
    /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._delegate.clone(date);
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this._delegate.addCalendarYears(date, years);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        return this._delegate.addCalendarMonths(date, months);
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this._delegate.addCalendarDays(date, days);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getYear = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._delegate.getYear(date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._delegate.getMonth(date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getDate = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._delegate.getDate(date);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getDayOfWeek = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._delegate.getDayOfWeek(date);
    };
    /**
     * @param {?} style
     * @return {?}
     */
    DatetimeAdapter.prototype.getMonthNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style$$1) {
        return this._delegate.getMonthNames(style$$1);
    };
    /**
     * @return {?}
     */
    DatetimeAdapter.prototype.getDateNames = /**
     * @return {?}
     */
    function () {
        return this._delegate.getDateNames();
    };
    /**
     * @param {?} style
     * @return {?}
     */
    DatetimeAdapter.prototype.getDayOfWeekNames = /**
     * @param {?} style
     * @return {?}
     */
    function (style$$1) {
        return this._delegate.getDayOfWeekNames(style$$1);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getYearName = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._delegate.getYearName(date);
    };
    /**
     * @return {?}
     */
    DatetimeAdapter.prototype.getFirstDayOfWeek = /**
     * @return {?}
     */
    function () {
        return this._delegate.getFirstDayOfWeek();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getNumDaysInMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._delegate.getNumDaysInMonth(date);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.createDate = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @return {?}
     */
    function (year, month, date) {
        return this._delegate.createDate(year, month, date);
    };
    /**
     * @return {?}
     */
    DatetimeAdapter.prototype.today = /**
     * @return {?}
     */
    function () {
        return this._delegate.today();
    };
    /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    DatetimeAdapter.prototype.parse = /**
     * @param {?} value
     * @param {?} parseFormat
     * @return {?}
     */
    function (value, parseFormat) {
        return this._delegate.parse(value, parseFormat);
    };
    /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    DatetimeAdapter.prototype.format = /**
     * @param {?} date
     * @param {?} displayFormat
     * @return {?}
     */
    function (date, displayFormat) {
        return this._delegate.format(date, displayFormat);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._delegate.toIso8601(date);
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    DatetimeAdapter.prototype.isDateInstance = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return this._delegate.isDateInstance(obj);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.isValid = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._delegate.isValid(date);
    };
    /**
     * @return {?}
     */
    DatetimeAdapter.prototype.invalid = /**
     * @return {?}
     */
    function () {
        return this._delegate.invalid();
    };
    /**
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    DatetimeAdapter.prototype.clampDate = /**
     * @param {?} date
     * @param {?=} min
     * @param {?=} max
     * @return {?}
     */
    function (date, min, max) {
        if (min && this.compareDatetime(date, min) < 0) {
            return min;
        }
        if (max && this.compareDatetime(date, max) > 0) {
            return max;
        }
        return date;
    };
    return DatetimeAdapter;
}(_angular_material_core__WEBPACK_IMPORTED_MODULE_0__["DateAdapter"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MAT_DATETIME_FORMATS = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["InjectionToken"]("mat-datetime-formats");

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ɵ0 = /**
 * @param {?} i
 * @return {?}
 */
function (i) { return String(i); };
/**
 * The default hour names to use if Intl API is not available.
 * @type {?}
 */
var DEFAULT_HOUR_NAMES = range(24, (ɵ0));
var ɵ1 = /**
 * @param {?} i
 * @return {?}
 */
function (i) { return String(i); };
/**
 * The default minute names to use if Intl API is not available.
 * @type {?}
 */
var DEFAULT_MINUTE_NAMES = range(60, (ɵ1));
/**
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
var NativeDatetimeAdapter = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__extends"])(NativeDatetimeAdapter, _super);
    function NativeDatetimeAdapter(matDateLocale, _delegate) {
        var _this = _super.call(this, _delegate) || this;
        _this.setLocale(matDateLocale);
        return _this;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.clone = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this.createDatetime(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date), this.getMinute(date));
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getHour = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getHours();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getMinute = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return date.getMinutes();
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.isInNextMonth = /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var nextMonth = this.getDateInNextMonth(startDate);
        return this.sameMonthAndYear(nextMonth, endDate);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.createDatetime = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    function (year, month, date, hour, minute) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        if (hour < 0 || hour > 23) {
            throw Error("Invalid hour \"" + hour + "\". Hour has to be between 0 and 23.");
        }
        if (minute < 0 || minute > 59) {
            throw Error("Invalid minute \"" + minute + "\". Minute has to be between 0 and 59.");
        }
        /** @type {?} */
        var result = this._createDateWithOverflow(year, month, date, hour, minute);
        // Check that the date wasn't above the upper bound for the month, causing the month to overflow
        if (result.getMonth() !== month) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getDateInNextMonth = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 1, date.getHours(), date.getMinutes());
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getFirstDateOfMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var result = new Date();
        result.setFullYear(date.getFullYear(), date.getMonth(), 1);
        return result;
    };
    /**
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getHourNames = /**
     * @return {?}
     */
    function () {
        return DEFAULT_HOUR_NAMES;
    };
    /**
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.getMinuteNames = /**
     * @return {?}
     */
    function () {
        return DEFAULT_MINUTE_NAMES;
    };
    /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarYears = /**
     * @param {?} date
     * @param {?} years
     * @return {?}
     */
    function (date, years) {
        return this.addCalendarMonths(date, years * 12);
    };
    /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarMonths = /**
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    function (date, months) {
        /** @type {?} */
        var newDate = this._createDateWithOverflow(this.getYear(date), this.getMonth(date) + months, this.getDate(date), this.getHour(date), this.getMinute(date));
        // It's possible to wind up in the wrong month if the original month has more days than the new
        // month. In this case we want to go to the last day of the desired month.
        // Note: the additional + 12 % 12 ensures we end up with a positive number, since JS % doesn't
        // guarantee this.
        if (this.getMonth(newDate) !== ((this.getMonth(date) + months) % 12 + 12) % 12) {
            newDate = this._createDateWithOverflow(this.getYear(newDate), this.getMonth(newDate), 0, this.getHour(date), this.getMinute(date));
        }
        return newDate;
    };
    /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarDays = /**
     * @param {?} date
     * @param {?} days
     * @return {?}
     */
    function (date, days) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date) + days, this.getHour(date), this.getMinute(date));
    };
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarHours = /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    function (date, hours) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date) + hours, this.getMinute(date));
    };
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.addCalendarMinutes = /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    function (date, minutes) {
        return this._createDateWithOverflow(this.getYear(date), this.getMonth(date), this.getDate(date), this.getHour(date), this.getMinute(date) + minutes);
    };
    /**
     * @param {?} date
     * @return {?}
     */
    NativeDatetimeAdapter.prototype.toIso8601 = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return _super.prototype.toIso8601.call(this, date) + "T" + [
            this._2digit(date.getUTCHours()),
            this._2digit(date.getUTCMinutes())
        ].join(":");
    };
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @param str The string to strip direction characters from.
     * @returns The stripped string.
     */
    /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    NativeDatetimeAdapter.prototype._stripDirectionalityCharacters = /**
     * Strip out unicode LTR and RTL characters. Edge and IE insert these into formatted dates while
     * other browsers do not. We remove them to make output consistent and because they interfere with
     * date parsing.
     * @private
     * @param {?} str The string to strip direction characters from.
     * @return {?} The stripped string.
     */
    function (str) {
        return str.replace(/[\u200e\u200f]/g, "");
    };
    /**
     * Pads a number to make it two digits.
     * @param n The number to pad.
     * @returns The padded number.
     */
    /**
     * Pads a number to make it two digits.
     * @private
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    NativeDatetimeAdapter.prototype._2digit = /**
     * Pads a number to make it two digits.
     * @private
     * @param {?} n The number to pad.
     * @return {?} The padded number.
     */
    function (n) {
        return ("00" + n).slice(-2);
    };
    /** Creates a date but allows the month and date to overflow. */
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
    NativeDatetimeAdapter.prototype._createDateWithOverflow = /**
     * Creates a date but allows the month and date to overflow.
     * @private
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hours
     * @param {?} minutes
     * @return {?}
     */
    function (year, month, date, hours, minutes) {
        /** @type {?} */
        var result = new Date(year, month, date, hours, minutes);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(this.getYear(result) - 1900);
        }
        return result;
    };
    NativeDatetimeAdapter.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Injectable"] }
    ];
    /** @nocollapse */
    NativeDatetimeAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_14__["MAT_DATE_LOCALE"],] }] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_14__["DateAdapter"] }
    ]; };
    return NativeDatetimeAdapter;
}(DatetimeAdapter));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MAT_NATIVE_DATETIME_FORMATS = {
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
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable max-classes-per-file
var NativeDatetimeModule = /** @class */ (function () {
    function NativeDatetimeModule() {
    }
    NativeDatetimeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["NgModule"], args: [{
                    imports: [_angular_material__WEBPACK_IMPORTED_MODULE_14__["NativeDateModule"]],
                    providers: [
                        {
                            provide: DatetimeAdapter,
                            useClass: NativeDatetimeAdapter
                        }
                    ]
                },] }
    ];
    return NativeDatetimeModule;
}());
var ɵ0$1 = MAT_NATIVE_DATETIME_FORMATS;
var MatNativeDatetimeModule = /** @class */ (function () {
    function MatNativeDatetimeModule() {
    }
    MatNativeDatetimeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["NgModule"], args: [{
                    imports: [
                        NativeDatetimeModule,
                        _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatNativeDateModule"]
                    ],
                    providers: [{ provide: MAT_DATETIME_FORMATS, useValue: ɵ0$1 }]
                },] }
    ];
    return MatNativeDatetimeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * This animation fades in the background color and text content of the
 * select's options. It is time delayed to occur 100ms after the overlay
 * panel has transformed in.
 * @type {?}
 */
var fadeInContent = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])("fadeInContent", [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["state"])("showing", Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ opacity: 1 })),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])("void => showing", [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ opacity: 0 }),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])("150ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)")
    ])
]);
/** @type {?} */
var slideCalendar = Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["trigger"])("slideCalendar", [
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])("* => left", [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])(180, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["keyframes"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: "translateX(100%)", offset: 0.5 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: "translateX(-100%)", offset: 0.51 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: "translateX(0)", offset: 1 })
        ]))
    ]),
    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["transition"])("* => right", [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["animate"])(180, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["keyframes"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: "translateX(-100%)", offset: 0.5 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: "translateX(100%)", offset: 0.51 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_3__["style"])({ transform: "translateX(0)", offset: 1 })
        ]))
    ])
]);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@docs-private
 * @param {?} provider
 * @return {?}
 */
function createMissingDateImplError(provider) {
    return Error("MatDatetimepicker: No provider found for " + provider + ". You must import one of the following " +
        "modules at your application root: MatNativeDatetimeModule, MatMomentDatetimeModule, or provide a " +
        "custom implementation.");
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var MatDatetimepickerFilterType = {
    DATE: 0, HOUR: 1, MINUTE: 2,
};
MatDatetimepickerFilterType[MatDatetimepickerFilterType.DATE] = 'DATE';
MatDatetimepickerFilterType[MatDatetimepickerFilterType.HOUR] = 'HOUR';
MatDatetimepickerFilterType[MatDatetimepickerFilterType.MINUTE] = 'MINUTE';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        this._userSelection = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        this.type = "date";
        /**
         * Whether the calendar should be started in month or year view.
         */
        this.startView = "month";
        this.timeInterval = 1;
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        /**
         * Date filter for the month and year views.
         */
        this._dateFilterForViews = (/**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            return !!date &&
                (!_this.dateFilter || _this.dateFilter(date, MatDatetimepickerFilterType.DATE)) &&
                (!_this.minDate || _this._adapter.compareDate(date, _this.minDate) >= 0) &&
                (!_this.maxDate || _this._adapter.compareDate(date, _this.maxDate) <= 0);
        });
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
        this._intlChanges = _intl.changes.subscribe((/**
         * @return {?}
         */
        function () { return changeDetectorRef.markForCheck(); }));
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
        this._ngZone.runOutsideAngular((/**
         * @return {?}
         */
        function () {
            _this._ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])()).subscribe((/**
             * @return {?}
             */
            function () {
                _this._elementRef.nativeElement.focus();
            }));
        }));
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
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["LEFT_ARROW"]:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, -1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["RIGHT_ARROW"]:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, 1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["UP_ARROW"]:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, -7);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["DOWN_ARROW"]:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, 7);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["HOME"]:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, 1 - this._adapter.getDate(this._activeDate));
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["END"]:
                this._activeDate = this._adapter.addCalendarDays(this._activeDate, (this._adapter.getNumDaysInMonth(this._activeDate) -
                    this._adapter.getDate(this._activeDate)));
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["PAGE_UP"]:
                this._activeDate = event.altKey ?
                    this._adapter.addCalendarYears(this._activeDate, -1) :
                    this._adapter.addCalendarMonths(this._activeDate, -1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["PAGE_DOWN"]:
                this._activeDate = event.altKey ?
                    this._adapter.addCalendarYears(this._activeDate, 1) :
                    this._adapter.addCalendarMonths(this._activeDate, 1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["ENTER"]:
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
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["LEFT_ARROW"]:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, -1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["RIGHT_ARROW"]:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, 1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["UP_ARROW"]:
                this._activeDate = this._prevMonthInSameCol(this._activeDate);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["DOWN_ARROW"]:
                this._activeDate = this._nextMonthInSameCol(this._activeDate);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["HOME"]:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, -this._adapter.getMonth(this._activeDate));
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["END"]:
                this._activeDate = this._adapter.addCalendarMonths(this._activeDate, 11 - this._adapter.getMonth(this._activeDate));
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["PAGE_UP"]:
                this._activeDate =
                    this._adapter.addCalendarYears(this._activeDate, event.altKey ? -10 : -1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["PAGE_DOWN"]:
                this._activeDate =
                    this._adapter.addCalendarYears(this._activeDate, event.altKey ? 10 : 1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["ENTER"]:
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
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["UP_ARROW"]:
                this._activeDate = this._clockView === "hour" ?
                    this._adapter.addCalendarHours(this._activeDate, 1) :
                    this._adapter.addCalendarMinutes(this._activeDate, 1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["DOWN_ARROW"]:
                this._activeDate = this._clockView === "hour" ?
                    this._adapter.addCalendarHours(this._activeDate, -1) :
                    this._adapter.addCalendarMinutes(this._activeDate, -1);
                break;
            case _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["ENTER"]:
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Component"], args: [{
                    selector: "mat-datetimepicker-calendar",
                    template: "<div class=\"mat-datetimepicker-calendar-header\">\n  <div *ngIf=\"type !== 'time'\"\n       class=\"mat-datetimepicker-calendar-header-year\"\n       [class.active]=\"_currentView == 'year'\"\n       (click)=\"_yearClicked()\">{{ _yearLabel }}</div>\n  <div class=\"mat-datetimepicker-calendar-header-date-time\">\n    <span *ngIf=\"type !== 'time'\"\n          class=\"mat-datetimepicker-calendar-header-date\"\n          [class.active]=\"_currentView == 'month'\"\n          [class.not-clickable]=\"type === 'month'\"\n          (click)=\"_dateClicked()\">{{ _dateLabel }}</span>\n    <span *ngIf=\"type.endsWith('time')\"\n          class=\"mat-datetimepicker-calendar-header-time\"\n          [class.active]=\"_currentView == 'clock'\">\n      <span class=\"mat-datetimepicker-calendar-header-hours\"\n            [class.active]=\"_clockView == 'hour'\"\n            (click)=\"_hoursClicked()\">{{ _hoursLabel }}</span>:<span class=\"mat-datetimepicker-calendar-header-minutes\"\n                                                                     [class.active]=\"_clockView == 'minute'\"\n                                                                     (click)=\"_minutesClicked()\">{{ _minutesLabel }}</span>\n    </span>\n  </div>\n</div>\n<div class=\"mat-datetimepicker-calendar-content\" [ngSwitch]=\"_currentView\">\n  <div class=\"mat-month-content\" *ngIf=\"_currentView === 'month' || _currentView === 'year'\">\n    <div class=\"mat-datetimepicker-calendar-controls\">\n      <div class=\"mat-datetimepicker-calendar-previous-button\"\n           [class.disabled]=\"!_previousEnabled()\" (click)=\"_previousClicked()\"\n           aria-label=\"Previous month\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"></path>\n        </svg>\n      </div>\n      <div class=\"mat-datetimepicker-calendar-period-button\" [@slideCalendar]=\"_calendarState\" (@slideCalendar.done)=\"_calendarStateDone()\">\n        <strong>{{ _monthYearLabel }}</strong>\n      </div>\n      <div class=\"mat-datetimepicker-calendar-next-button\"\n           [class.disabled]=\"!_nextEnabled()\" (click)=\"_nextClicked()\"\n           aria-label=\"Next month\">\n        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\">\n          <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"></path>\n        </svg>\n      </div>\n    </div>\n  </div>\n  <mat-datetimepicker-month-view *ngSwitchCase=\"'month'\"\n                  [activeDate]=\"_activeDate\"\n                  [type]=\"type\"\n                  [selected]=\"selected\"\n                  [dateFilter]=\"_dateFilterForViews\"\n                  (selectedChange)=\"_dateSelected($event)\"\n                  (_userSelection)=\"_userSelected()\">\n  </mat-datetimepicker-month-view>\n  <mat-datetimepicker-year-view *ngSwitchCase=\"'year'\"\n                 [activeDate]=\"_activeDate\"\n                 [type]=\"type\"\n                 [selected]=\"selected\"\n                 [dateFilter]=\"_dateFilterForViews\"\n                 (selectedChange)=\"_monthSelected($event)\"\n                 (_userSelection)=\"_userSelected()\">\n  </mat-datetimepicker-year-view>\n  <mat-datetimepicker-clock *ngSwitchDefault\n             [startView]=\"_clockView\"\n             [interval]=\"timeInterval\"\n             [minDate]=\"minDate\"\n             [maxDate]=\"maxDate\"\n             [dateFilter]=\"dateFilter\"\n             [selected]=\"_activeDate\"\n             (activeDateChange)=\"_onActiveDateChange($event)\"\n             (selectedChange)=\"_timeSelected($event)\"\n             (_userSelection)=\"_userSelected()\">\n  </mat-datetimepicker-clock>\n</div>\n",
                    host: {
                        "[class.mat-datetimepicker-calendar]": "true",
                        "tabindex": "0",
                        "(keydown)": "_handleCalendarBodyKeydown($event)"
                    },
                    animations: [slideCalendar],
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ViewEncapsulation"].None,
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ChangeDetectionStrategy"].OnPush,
                    styles: [".mat-datetimepicker-calendar{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:block;outline:0}.mat-datetimepicker-calendar[mode=landscape]{display:flex}.mat-datetimepicker-calendar-header{padding:16px;font-size:14px;color:#fff;box-sizing:border-box}[mode=landscape] .mat-datetimepicker-calendar-header{width:150px;min-width:150px}.mat-datetimepicker-calendar-header-date-time,.mat-datetimepicker-calendar-header-year{width:100%;font-weight:500;white-space:nowrap}.mat-datetimepicker-calendar-header-date-time{font-size:30px;line-height:34px}[mode=landscape] .mat-datetimepicker-calendar-header-date-time{white-space:normal;word-wrap:break-word}.mat-datetimepicker-calendar-header-date:not(.active),.mat-datetimepicker-calendar-header-hours:not(.active),.mat-datetimepicker-calendar-header-minutes:not(.active),.mat-datetimepicker-calendar-header-year:not(.active){cursor:pointer;opacity:.6}.mat-datetimepicker-calendar-header-date.not-clickable,.mat-datetimepicker-calendar-header-hours.not-clickable,.mat-datetimepicker-calendar-header-minutes.not-clickable,.mat-datetimepicker-calendar-header-year.not-clickable{cursor:initial}.mat-datetimepicker-calendar-header-time{padding-left:8px}.mat-datetimepicker-calendar-header-time:not(.active){opacity:.6}.mat-datetimepicker-calendar-header-time:not(.active) .mat-datetimepicker-calendar-header-hours,.mat-datetimepicker-calendar-header-time:not(.active) .mat-datetimepicker-calendar-header-minutes{cursor:pointer;opacity:1}[mode=landscape] .mat-datetimepicker-calendar-header-time{display:block;padding-left:0}.mat-datetimepicker-calendar-content{width:100%;padding:0 8px 8px;outline:0;box-sizing:border-box;overflow:hidden}[mode=landscape] .mat-datetimepicker-calendar-content{padding-top:8px}.mat-datetimepicker-calendar-controls{display:flex;justify-content:space-between}.mat-datetimepicker-calendar-period-button{display:inline-block;height:48px;padding:12px;outline:0;border:0;background:0 0;box-sizing:border-box}.mat-datetimepicker-calendar-next-button,.mat-datetimepicker-calendar-previous-button{display:inline-block;width:48px;height:48px;padding:12px;outline:0;border:0;cursor:pointer;background:0 0;box-sizing:border-box}.mat-datetimepicker-calendar-next-button.disabled,.mat-datetimepicker-calendar-previous-button.disabled{color:rgba(0,0,0,.38);pointer-events:none}.mat-datetimepicker-calendar-next-button svg,.mat-datetimepicker-calendar-previous-button svg{fill:currentColor;vertical-align:top}.mat-datetimepicker-calendar-table{border-spacing:0;border-collapse:collapse;width:100%}.mat-datetimepicker-calendar-table-header{color:rgba(0,0,0,.38)}.mat-datetimepicker-calendar-table-header th{text-align:center;font-size:11px;padding:0 0 8px}@media (min-width:480px){.mat-datetimepicker-calendar[mode=auto]{display:flex}.mat-datetimepicker-calendar[mode=auto] .mat-datetimepicker-calendar-header{width:150px;min-width:150px}.mat-datetimepicker-calendar[mode=auto] .mat-datetimepicker-calendar-header-date-time{white-space:normal;word-wrap:break-word}.mat-datetimepicker-calendar[mode=auto] .mat-datetimepicker-calendar-header-time{display:block;padding-left:0}.mat-datetimepicker-calendar[mode=auto] .mat-datetimepicker-calendar-content{padding-top:8px}}"]
                }] }
    ];
    /** @nocollapse */
    MatDatetimepickerCalendar.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ElementRef"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatDatepickerIntl"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["NgZone"] },
        { type: DatetimeAdapter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Inject"], args: [MAT_DATETIME_FORMATS,] }] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ChangeDetectorRef"] }
    ]; };
    MatDatetimepickerCalendar.propDecorators = {
        _userSelection: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }],
        type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        startAt: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        startView: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        minDate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        maxDate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        timeInterval: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        dateFilter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selectedChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }]
    };
    return MatDatetimepickerCalendar;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
var  /**
 * An internal class that represents the data corresponding to a single calendar cell.
 * \@docs-private
 */
MatDatetimepickerCalendarCell = /** @class */ (function () {
    function MatDatetimepickerCalendarCell(value, displayValue, ariaLabel, enabled) {
        this.value = value;
        this.displayValue = displayValue;
        this.ariaLabel = ariaLabel;
        this.enabled = enabled;
    }
    return MatDatetimepickerCalendarCell;
}());
/**
 * An internal component used to display calendar data in a table.
 * \@docs-private
 */
var MatDatetimepickerCalendarBody = /** @class */ (function () {
    function MatDatetimepickerCalendarBody() {
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
        this.selectedValueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
    }
    /**
     * @param {?} cell
     * @return {?}
     */
    MatDatetimepickerCalendarBody.prototype._cellClicked = /**
     * @param {?} cell
     * @return {?}
     */
    function (cell) {
        if (!this.allowDisabledSelection && !cell.enabled) {
            return;
        }
        this.selectedValueChange.emit(cell.value);
    };
    Object.defineProperty(MatDatetimepickerCalendarBody.prototype, "_firstRowOffset", {
        /** The number of blank cells to put at the beginning for the first row. */
        get: /**
         * The number of blank cells to put at the beginning for the first row.
         * @return {?}
         */
        function () {
            return this.rows && this.rows.length && this.rows[0].length ?
                this.numCols - this.rows[0].length : 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    MatDatetimepickerCalendarBody.prototype._isActiveCell = /**
     * @param {?} rowIndex
     * @param {?} colIndex
     * @return {?}
     */
    function (rowIndex, colIndex) {
        /** @type {?} */
        var cellNumber = rowIndex * this.numCols + colIndex;
        // Account for the fact that the first row may not have as many cells.
        if (rowIndex) {
            cellNumber -= this._firstRowOffset;
        }
        return cellNumber === this.activeCell;
    };
    MatDatetimepickerCalendarBody.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Component"], args: [{
                    // tslint:disable-next-line:component-selector
                    selector: "[mat-datetimepicker-calendar-body]",
                    template: "<!--\n  If there's not enough space in the first row, create a separate label row. We mark this row as\n  aria-hidden because we don't want it to be read out as one of the weeks in the month.\n-->\n<tr *ngIf=\"_firstRowOffset < labelMinRequiredCells\" aria-hidden=\"true\">\n  <td class=\"mat-datetimepicker-calendar-body-label\" [attr.colspan]=\"numCols\" >{{ label }}</td>\n</tr>\n\n<!-- Create the first row separately so we can include a special spacer cell. -->\n<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\">\n  <!--\n    We mark this cell as aria-hidden so it doesn't get read out as one of the days in the week.\n  -->\n  <td *ngIf=\"rowIndex === 0 && _firstRowOffset\"\n      aria-hidden=\"true\"\n      class=\"mat-datetimepicker-calendar-body-label\"\n      [attr.colspan]=\"_firstRowOffset\">\n    {{ _firstRowOffset >= labelMinRequiredCells ? label : '' }}\n  </td>\n  <td *ngFor=\"let item of row; let colIndex = index\"\n      role=\"gridcell\"\n      class=\"mat-datetimepicker-calendar-body-cell\"\n      [class.mat-datetimepicker-calendar-body-disabled]=\"!item.enabled\"\n      [class.mat-datetimepicker-calendar-body-active]=\"_isActiveCell(rowIndex, colIndex)\"\n      [attr.aria-label]=\"item.ariaLabel\"\n      [attr.aria-disabled]=\"!item.enabled || null\"\n      (click)=\"_cellClicked(item)\">\n    <div class=\"mat-datetimepicker-calendar-body-cell-content\"\n         [class.mat-datetimepicker-calendar-body-selected]=\"selectedValue === item.value\"\n         [class.mat-datetimepicker-calendar-body-today]=\"todayValue === item.value\">\n      {{ item.displayValue }}\n    </div>\n  </td>\n</tr>\n",
                    host: {
                        "class": "mat-datetimepicker-calendar-body"
                    },
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ViewEncapsulation"].None,
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ChangeDetectionStrategy"].OnPush,
                    styles: [".mat-datetimepicker-calendar-body{font-size:13px;min-width:224px}.mat-datetimepicker-calendar-body-label{padding:7.14286% 0 7.14286% 7.14286%;height:0;line-height:0;color:rgba(0,0,0,.54);-webkit-transform:translateX(-6px);transform:translateX(-6px);text-align:left}.mat-datetimepicker-calendar-body-cell{position:relative;width:14.28571%;height:0;line-height:0;padding:7.14286% 0;text-align:center;outline:0;cursor:pointer}.mat-datetimepicker-calendar-body-disabled{cursor:default;pointer-events:none}.mat-datetimepicker-calendar-body-cell-content{position:absolute;top:5%;left:5%;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:90%;height:90%;color:rgba(0,0,0,.87);border:1px solid transparent;border-radius:50%}.mat-datetimepicker-calendar-body-disabled>.mat-datetimepicker-calendar-body-cell-content:not(.mat-datetimepicker-calendar-body-selected){color:rgba(0,0,0,.38)}.mat-calendar:focus .mat-datetimepicker-calendar-body-active>.mat-datetimepicker-calendar-body-cell-content:not(.mat-datetimepicker-calendar-body-selected),:not(.mat-datetimepicker-calendar-body-disabled):hover>.mat-datetimepicker-calendar-body-cell-content:not(.mat-datetimepicker-calendar-body-selected){background-color:rgba(0,0,0,.12)}.mat-datetimepicker-calendar-body-disabled>.mat-datetimepicker-calendar-body-today:not(.mat-datetimepicker-calendar-body-selected){border-color:rgba(0,0,0,.18)}[dir=rtl] .mat-datetimepicker-calendar-body-label{padding:0 7.14286% 0 0;-webkit-transform:translateX(6px);transform:translateX(6px);text-align:right}"]
                }] }
    ];
    MatDatetimepickerCalendarBody.propDecorators = {
        label: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        rows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        todayValue: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selectedValue: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        labelMinRequiredCells: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        numCols: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        allowDisabledSelection: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        activeCell: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selectedValueChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }]
    };
    return MatDatetimepickerCalendarBody;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CLOCK_RADIUS = 50;
/** @type {?} */
var CLOCK_INNER_RADIUS = 27.5;
/** @type {?} */
var CLOCK_OUTER_RADIUS = 41.25;
/** @type {?} */
var CLOCK_TICK_RADIUS = 7.0833;
/**
 * A clock that is used as part of the datepicker.
 * \@docs-private
 * @template D
 */
var MatDatetimepickerClock = /** @class */ (function () {
    function MatDatetimepickerClock(_element, _adapter) {
        var _this = this;
        this._element = _element;
        this._adapter = _adapter;
        this._userSelection = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        this._timeChanged = false;
        this.interval = 1;
        this.twelvehour = false;
        /**
         * Emits when the currently selected date changes.
         */
        this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        this.activeDateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        /**
         * Hours and Minutes representing the clock view.
         */
        this._hours = [];
        this._minutes = [];
        /**
         * Whether the clock is in hour view.
         */
        this._hourView = true;
        this.mouseMoveListener = (/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            _this._handleMousemove(event);
        });
        this.mouseUpListener = (/**
         * @return {?}
         */
        function () {
            _this._handleMouseup();
        });
    }
    Object.defineProperty(MatDatetimepickerClock.prototype, "activeDate", {
        /**
         * The date to display in this clock view.
         */
        get: /**
         * The date to display in this clock view.
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
            this._activeDate = this._adapter.clampDate(value, this.minDate, this.maxDate);
            if (!this._adapter.sameMinute(oldActiveDate, this._activeDate)) {
                this._init();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "selected", {
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
            this._selected = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
            if (this._selected) {
                this.activeDate = this._selected;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "minDate", {
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
            this._minDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "maxDate", {
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
            this._maxDate = this._adapter.getValidDateOrNull(this._adapter.deserialize(value));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "startView", {
        /** Whether the clock should be started in hour or minute view. */
        set: /**
         * Whether the clock should be started in hour or minute view.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._hourView = value != "minute";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerClock.prototype, "_hand", {
        get: /**
         * @return {?}
         */
        function () {
            this._selectedHour = this._adapter.getHour(this.activeDate);
            this._selectedMinute = this._adapter.getMinute(this.activeDate);
            /** @type {?} */
            var deg = 0;
            /** @type {?} */
            var radius = CLOCK_OUTER_RADIUS;
            if (this._hourView) {
                /** @type {?} */
                var outer = this._selectedHour > 0 && this._selectedHour < 13;
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
                "transform": "rotate(" + deg + "deg)",
                "height": radius + "%",
                "margin-top": 50 - radius + "%"
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerClock.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this.activeDate = this._activeDate || this._adapter.today();
        this._init();
    };
    /** Handles mousedown events on the clock body. */
    /**
     * Handles mousedown events on the clock body.
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerClock.prototype._handleMousedown = /**
     * Handles mousedown events on the clock body.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._timeChanged = false;
        this.setTime(event);
        document.addEventListener("mousemove", this.mouseMoveListener);
        document.addEventListener("touchmove", this.mouseMoveListener);
        document.addEventListener("mouseup", this.mouseUpListener);
        document.addEventListener("touchend", this.mouseUpListener);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerClock.prototype._handleMousemove = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        this.setTime(event);
    };
    /**
     * @return {?}
     */
    MatDatetimepickerClock.prototype._handleMouseup = /**
     * @return {?}
     */
    function () {
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
    };
    /** Initializes this clock view. */
    /**
     * Initializes this clock view.
     * @private
     * @return {?}
     */
    MatDatetimepickerClock.prototype._init = /**
     * Initializes this clock view.
     * @private
     * @return {?}
     */
    function () {
        this._hours.length = 0;
        this._minutes.length = 0;
        /** @type {?} */
        var hourNames = this._adapter.getHourNames();
        /** @type {?} */
        var minuteNames = this._adapter.getMinuteNames();
        if (this.twelvehour) {
            for (var i = 1; i < (hourNames.length / 2) + 1; i++) {
                /** @type {?} */
                var radian = i / 6 * Math.PI;
                /** @type {?} */
                var radius = CLOCK_OUTER_RADIUS;
                /** @type {?} */
                var date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), i + 1, 0);
                /** @type {?} */
                var enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) &&
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
            for (var i = 0; i < hourNames.length; i++) {
                /** @type {?} */
                var radian = i / 6 * Math.PI;
                /** @type {?} */
                var outer = i > 0 && i < 13;
                /** @type {?} */
                var radius = outer ? CLOCK_OUTER_RADIUS : CLOCK_INNER_RADIUS;
                /** @type {?} */
                var date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), i, 0);
                /** @type {?} */
                var enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) &&
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
        for (var i = 0; i < minuteNames.length; i += 5) {
            /** @type {?} */
            var radian = i / 30 * Math.PI;
            /** @type {?} */
            var date = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), this._adapter.getMonth(this.activeDate), this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), i);
            /** @type {?} */
            var enabled = (!this.minDate || this._adapter.compareDatetime(date, this.minDate) >= 0) &&
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
    };
    /**
     * Set Time
     * @param event
     */
    /**
     * Set Time
     * @private
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerClock.prototype.setTime = /**
     * Set Time
     * @private
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var trigger$$1 = this._element.nativeElement;
        /** @type {?} */
        var triggerRect = trigger$$1.getBoundingClientRect();
        /** @type {?} */
        var width = trigger$$1.offsetWidth;
        /** @type {?} */
        var height = trigger$$1.offsetHeight;
        /** @type {?} */
        var pageX = event.pageX !== undefined ? event.pageX : event.touches[0].pageX;
        /** @type {?} */
        var pageY = event.pageY !== undefined ? event.pageY : event.touches[0].pageY;
        /** @type {?} */
        var x = (width / 2) - (pageX - triggerRect.left - window.pageXOffset);
        /** @type {?} */
        var y = (height / 2) - (pageY - triggerRect.top - window.pageYOffset);
        /** @type {?} */
        var radian = Math.atan2(-x, y);
        /** @type {?} */
        var unit = Math.PI / (this._hourView ? 6 : (this.interval ? (30 / this.interval) : 30));
        /** @type {?} */
        var z = Math.sqrt(x * x + y * y);
        /** @type {?} */
        var outer = this._hourView && z > ((width * (CLOCK_OUTER_RADIUS / 100)) +
            (width * (CLOCK_INNER_RADIUS / 100))) / 2;
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        /** @type {?} */
        var value = Math.round(radian / unit);
        /** @type {?} */
        var date;
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
        var clamped = this._adapter.clampDate(date, this.minDate, this.maxDate);
        if (date === clamped) {
            this._timeChanged = true;
            this.activeDate = clamped;
            this.activeDateChange.emit(this.activeDate);
        }
    };
    MatDatetimepickerClock.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Component"], args: [{
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
    MatDatetimepickerClock.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ElementRef"] },
        { type: DatetimeAdapter }
    ]; };
    MatDatetimepickerClock.propDecorators = {
        _userSelection: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }],
        activeDate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        minDate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        maxDate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        startView: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        dateFilter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        interval: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        twelvehour: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selectedChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }],
        activeDateChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }]
    };
    return MatDatetimepickerClock;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Used to generate a unique ID for each datepicker instance.
 * @type {?}
 */
var datetimepickerUid = 0;
/**
 * Component used as the content for the datepicker dialog and popup. We use this instead of using
 * MatCalendar directly as the content so we can control the initial focus. This also gives us a
 * place to put additional features of the popup that are not part of the calendar itself in the
 * future. (e.g. confirmation buttons).
 * \@docs-private
 * @template D
 */
var MatDatetimepickerContent = /** @class */ (function () {
    function MatDatetimepickerContent() {
    }
    /**
     * @return {?}
     */
    MatDatetimepickerContent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._calendar._focusActiveCell();
    };
    /**
     * Handles keydown event on datepicker content.
     * @param event The event.
     */
    /**
     * Handles keydown event on datepicker content.
     * @param {?} event The event.
     * @return {?}
     */
    MatDatetimepickerContent.prototype._handleKeydown = /**
     * Handles keydown event on datepicker content.
     * @param {?} event The event.
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["ESCAPE"]) {
            this.datetimepicker.close();
            event.preventDefault();
            event.stopPropagation();
        }
    };
    MatDatetimepickerContent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Component"], args: [{
                    selector: "mat-datetimepicker-content",
                    template: "<mat-datetimepicker-calendar class=\"mat-typography\" cdkTrapFocus\n              [id]=\"datetimepicker.id\"\n              [attr.mode]=\"datetimepicker.mode\"\n              [startView]=\"datetimepicker.startView\"\n              [type]=\"datetimepicker.type\"\n              [timeInterval]=\"datetimepicker.timeInterval\"\n              [minDate]=\"datetimepicker._minDate\"\n              [maxDate]=\"datetimepicker._maxDate\"\n              [dateFilter]=\"datetimepicker._dateFilter\"\n              [selected]=\"datetimepicker._selected\"\n              [startAt]=\"datetimepicker.startAt\"\n              (selectedChange)=\"datetimepicker._select($event)\"\n              (_userSelection)=\"datetimepicker.close()\">\n</mat-datetimepicker-calendar>\n",
                    host: {
                        "class": "mat-datetimepicker-content",
                        "[class.mat-datetimepicker-content-touch]": "datetimepicker?.touchUi",
                        "(keydown)": "_handleKeydown($event)"
                    },
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ViewEncapsulation"].None,
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ChangeDetectionStrategy"].OnPush,
                    styles: [".mat-datetimepicker-content{box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12);display:block;background-color:#fff;border-radius:2px;overflow:hidden}.mat-datetimepicker-calendar{width:296px;height:405px}.mat-datetimepicker-calendar[mode=landscape]{width:446px;height:328px}@media (min-width:480px){.mat-datetimepicker-calendar[mode=auto]{width:446px;height:328px}}.mat-datetimepicker-content-touch{box-shadow:0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);display:block;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.cdk-global-overlay-wrapper,.cdk-overlay-container{pointer-events:none;top:0;left:0;height:100%;width:100%}.cdk-overlay-container{position:fixed;z-index:1000}.cdk-global-overlay-wrapper{display:flex;position:absolute;z-index:1000}.cdk-overlay-pane{position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000}.cdk-overlay-backdrop{position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;pointer-events:auto;transition:opacity .4s cubic-bezier(.25,.8,.25,1);opacity:0}.cdk-overlay-backdrop.cdk-overlay-backdrop-showing{opacity:.48}.cdk-overlay-dark-backdrop{background:rgba(0,0,0,.6)}.mat-datetimepicker-dialog .mat-dialog-container{padding:0}"]
                }] }
    ];
    MatDatetimepickerContent.propDecorators = {
        _calendar: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ViewChild"], args: [MatDatetimepickerCalendar,] }]
    };
    return MatDatetimepickerContent;
}());
/**
 * @template D
 */
var MatDatetimepicker = /** @class */ (function () {
    function MatDatetimepicker(_dialog, _overlay, _ngZone, _viewContainerRef, _scrollStrategy, _dateAdapter, _dir, _document) {
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
        this.selectedChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        /**
         * Emits when the datepicker has been opened.
         */
        // tslint:disable-next-line:no-output-rename
        this.openedStream = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        /**
         * Emits when the datepicker has been closed.
         */
        // tslint:disable-next-line:no-output-rename
        this.closedStream = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        /**
         * Whether the calendar is open.
         */
        this.opened = false;
        /**
         * The id for the datepicker calendar.
         */
        this.id = "mat-datetimepicker-" + datetimepickerUid++;
        this._validSelected = null;
        /**
         * The element that was focused before the datepicker was opened.
         */
        this._focusedElementBeforeOpen = null;
        this._inputSubscription = rxjs__WEBPACK_IMPORTED_MODULE_15__["Subscription"].EMPTY;
        /**
         * Emits when the datepicker is disabled.
         */
        this._disabledChange = new rxjs__WEBPACK_IMPORTED_MODULE_15__["Subject"]();
        if (!this._dateAdapter) {
            throw createMissingDateImplError("DateAdapter");
        }
    }
    Object.defineProperty(MatDatetimepicker.prototype, "startAt", {
        /** The date to open the calendar to initially. */
        get: /**
         * The date to open the calendar to initially.
         * @return {?}
         */
        function () {
            // If an explicit startAt is set we start there, otherwise we start at whatever the currently
            // selected value is.
            return this._startAt || (this._datepickerInput ? this._datepickerInput.value : null);
        },
        set: /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            this._startAt = this._dateAdapter.getValidDateOrNull(date);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "openOnFocus", {
        get: /**
         * @return {?}
         */
        function () { return this._openOnFocus; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._openOnFocus = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_13__["coerceBooleanProperty"])(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepicker.prototype._handleFocus = /**
     * @return {?}
     */
    function () {
        if (!this.opened && this.openOnFocus) {
            this.open();
        }
    };
    Object.defineProperty(MatDatetimepicker.prototype, "type", {
        get: /**
         * @return {?}
         */
        function () {
            return this._type;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._type = value || "date";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "touchUi", {
        /**
         * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
         * than a popup and elements have more padding to allow for bigger touch targets.
         */
        get: /**
         * Whether the calendar UI is in touch mode. In touch mode the calendar opens in a dialog rather
         * than a popup and elements have more padding to allow for bigger touch targets.
         * @return {?}
         */
        function () {
            return this._touchUi;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._touchUi = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_13__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "disabled", {
        /** Whether the datepicker pop-up should be disabled. */
        get: /**
         * Whether the datepicker pop-up should be disabled.
         * @return {?}
         */
        function () {
            return this._disabled === undefined && this._datepickerInput ?
                this._datepickerInput.disabled : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_13__["coerceBooleanProperty"])(value);
            if (newValue !== this._disabled) {
                this._disabled = newValue;
                this._disabledChange.next(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "_selected", {
        /** The currently selected date. */
        get: /**
         * The currently selected date.
         * @return {?}
         */
        function () {
            return this._validSelected;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._validSelected = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "_minDate", {
        /** The minimum selectable date. */
        get: /**
         * The minimum selectable date.
         * @return {?}
         */
        function () {
            return this._datepickerInput && this._datepickerInput.min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "_maxDate", {
        /** The maximum selectable date. */
        get: /**
         * The maximum selectable date.
         * @return {?}
         */
        function () {
            return this._datepickerInput && this._datepickerInput.max;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepicker.prototype, "_dateFilter", {
        get: /**
         * @return {?}
         */
        function () {
            return this._datepickerInput && this._datepickerInput._dateFilter;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepicker.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.close();
        this._inputSubscription.unsubscribe();
        this._disabledChange.complete();
        if (this._popupRef) {
            this._popupRef.dispose();
        }
    };
    /** Selects the given date */
    /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    MatDatetimepicker.prototype._select = /**
     * Selects the given date
     * @param {?} date
     * @return {?}
     */
    function (date) {
        /** @type {?} */
        var oldValue = this._selected;
        this._selected = date;
        if (!this._dateAdapter.sameDatetime(oldValue, this._selected)) {
            // tslint:disable-next-line deprecation
            this.selectedChanged.emit(date);
        }
    };
    /**
     * Register an input with this datepicker.
     * @param input The datepicker input to register with this datepicker.
     */
    /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    MatDatetimepicker.prototype._registerInput = /**
     * Register an input with this datepicker.
     * @param {?} input The datepicker input to register with this datepicker.
     * @return {?}
     */
    function (input) {
        var _this = this;
        if (this._datepickerInput) {
            throw Error("A MatDatepicker can only be associated with a single input.");
        }
        this._datepickerInput = input;
        this._inputSubscription =
            this._datepickerInput._valueChange.subscribe((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return _this._selected = value; }));
    };
    /** Open the calendar. */
    /**
     * Open the calendar.
     * @return {?}
     */
    MatDatetimepicker.prototype.open = /**
     * Open the calendar.
     * @return {?}
     */
    function () {
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
    };
    /** Close the calendar. */
    /**
     * Close the calendar.
     * @return {?}
     */
    MatDatetimepicker.prototype.close = /**
     * Close the calendar.
     * @return {?}
     */
    function () {
        var _this = this;
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
        var completeClose = (/**
         * @return {?}
         */
        function () {
            // The `_opened` could've been reset already if
            // we got two events in quick succession.
            if (_this.opened) {
                _this.opened = false;
                _this.closedStream.emit();
                _this._focusedElementBeforeOpen = null;
            }
        });
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
    };
    /** Open the calendar as a dialog. */
    /**
     * Open the calendar as a dialog.
     * @private
     * @return {?}
     */
    MatDatetimepicker.prototype._openAsDialog = /**
     * Open the calendar as a dialog.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._dialogRef = this._dialog.open(MatDatetimepickerContent, {
            direction: this._dir ? this._dir.value : "ltr",
            viewContainerRef: this._viewContainerRef,
            panelClass: "mat-datetimepicker-dialog"
        });
        this._dialogRef.afterClosed().subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
        this._dialogRef.componentInstance.datetimepicker = this;
    };
    /** Open the calendar as a popup. */
    /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    MatDatetimepicker.prototype._openAsPopup = /**
     * Open the calendar as a popup.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this._calendarPortal) {
            this._calendarPortal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_6__["ComponentPortal"](MatDatetimepickerContent, this._viewContainerRef);
        }
        if (!this._popupRef) {
            this._createPopup();
        }
        if (!this._popupRef.hasAttached()) {
            /** @type {?} */
            var componentRef = this._popupRef.attach(this._calendarPortal);
            componentRef.instance.datetimepicker = this;
            // Update the position once the calendar has rendered.
            this._ngZone.onStable.asObservable().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_9__["first"])()).subscribe((/**
             * @return {?}
             */
            function () {
                _this._popupRef.updatePosition();
            }));
        }
        this._popupRef.backdropClick().subscribe((/**
         * @return {?}
         */
        function () { return _this.close(); }));
    };
    /** Create the popup. */
    /**
     * Create the popup.
     * @private
     * @return {?}
     */
    MatDatetimepicker.prototype._createPopup = /**
     * Create the popup.
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var overlayConfig = new _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["OverlayConfig"]({
            positionStrategy: this._createPopupPositionStrategy(),
            hasBackdrop: true,
            backdropClass: "mat-overlay-transparent-backdrop",
            direction: this._dir ? this._dir.value : "ltr",
            scrollStrategy: this._scrollStrategy(),
            panelClass: "mat-datetimepicker-popup"
        });
        this._popupRef = this._overlay.create(overlayConfig);
    };
    /** Create the popup PositionStrategy. */
    /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    MatDatetimepicker.prototype._createPopupPositionStrategy = /**
     * Create the popup PositionStrategy.
     * @private
     * @return {?}
     */
    function () {
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
    };
    MatDatetimepicker.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Component"], args: [{
                    selector: "mat-datetimepicker",
                    exportAs: "matDatetimepicker",
                    template: "",
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ChangeDetectionStrategy"].OnPush,
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ViewEncapsulation"].None,
                    preserveWhitespaces: false
                }] }
    ];
    /** @nocollapse */
    MatDatetimepicker.ctorParameters = function () { return [
        { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__["MatDialog"] },
        { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["Overlay"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["NgZone"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ViewContainerRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_14__["MAT_DATEPICKER_SCROLL_STRATEGY"],] }] },
        { type: DatetimeAdapter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }] },
        { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_4__["Directionality"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DOCUMENT"],] }] }
    ]; };
    MatDatetimepicker.propDecorators = {
        startAt: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        startView: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        mode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        timeInterval: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        openOnFocus: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        touchUi: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selectedChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }],
        panelClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        openedStream: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"], args: ["opened",] }],
        closedStream: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"], args: ["closed",] }]
    };
    return MatDatetimepicker;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable no-use-before-declare
/** @type {?} */
var MAT_DATETIMEPICKER_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_16__["forwardRef"])((/**
     * @return {?}
     */
    function () { return MatDatetimepickerInput; })),
    multi: true
};
/** @type {?} */
var MAT_DATETIMEPICKER_VALIDATORS = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_11__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_16__["forwardRef"])((/**
     * @return {?}
     */
    function () { return MatDatetimepickerInput; })),
    multi: true
};
/**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
var  /**
 * An event used for datepicker input and change events. We don't always have access to a native
 * input or change event because the event may have been triggered by the user clicking on the
 * calendar popup. For consistency, we always use MatDatepickerInputEvent instead.
 * @template D
 */
MatDatetimepickerInputEvent = /** @class */ (function () {
    function MatDatetimepickerInputEvent(target, targetElement) {
        this.target = target;
        this.targetElement = targetElement;
        this.value = this.target.value;
    }
    return MatDatetimepickerInputEvent;
}());
/**
 * Directive used to connect an input to a MatDatepicker.
 * @template D
 */
var MatDatetimepickerInput = /** @class */ (function () {
    function MatDatetimepickerInput(_elementRef, _dateAdapter, _dateFormats, _formField) {
        var _this = this;
        this._elementRef = _elementRef;
        this._dateAdapter = _dateAdapter;
        this._dateFormats = _dateFormats;
        this._formField = _formField;
        /**
         * Emits when a `change` event is fired on this `<input>`.
         */
        this.dateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        /**
         * Emits when an `input` event is fired on this `<input>`.
         */
        this.dateInput = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        /**
         * Emits when the value changes (either due to user input or programmatic change).
         */
        this._valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        /**
         * Emits when the disabled state has changed
         */
        this._disabledChange = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        this._onTouched = (/**
         * @return {?}
         */
        function () {
        });
        this._cvaOnChange = (/**
         * @return {?}
         */
        function () {
        });
        this._validatorOnChange = (/**
         * @return {?}
         */
        function () {
        });
        this._datepickerSubscription = rxjs__WEBPACK_IMPORTED_MODULE_15__["Subscription"].EMPTY;
        this._localeSubscription = rxjs__WEBPACK_IMPORTED_MODULE_15__["Subscription"].EMPTY;
        /**
         * The form control validator for whether the input parses.
         */
        this._parseValidator = (/**
         * @return {?}
         */
        function () {
            return _this._lastValueValid ?
                null : { "matDatepickerParse": { "text": _this._elementRef.nativeElement.value } };
        });
        /**
         * The form control validator for the min date.
         */
        this._minValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this._dateAdapter.getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return (!_this.min || !controlValue ||
                _this._dateAdapter.compareDatetime(_this.min, controlValue) <= 0) ?
                null : { "matDatepickerMin": { "min": _this.min, "actual": controlValue } };
        });
        /**
         * The form control validator for the max date.
         */
        this._maxValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this._dateAdapter.getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return (!_this.max || !controlValue ||
                _this._dateAdapter.compareDatetime(_this.max, controlValue) >= 0) ?
                null : { "matDatepickerMax": { "max": _this.max, "actual": controlValue } };
        });
        /**
         * The form control validator for the date filter.
         */
        this._filterValidator = (/**
         * @param {?} control
         * @return {?}
         */
        function (control) {
            /** @type {?} */
            var controlValue = _this._dateAdapter.getValidDateOrNull(_this._dateAdapter.deserialize(control.value));
            return !_this._dateFilter || !controlValue || _this._dateFilter(controlValue, MatDatetimepickerFilterType.DATE) ?
                null : { "matDatepickerFilter": true };
        });
        /**
         * The combined form control validator for this input.
         */
        this._validator = _angular_forms__WEBPACK_IMPORTED_MODULE_11__["Validators"].compose([this._parseValidator, this._minValidator, this._maxValidator, this._filterValidator]);
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
        this._localeSubscription = _dateAdapter.localeChanges.subscribe((/**
         * @return {?}
         */
        function () {
            _this.value = _this.value;
        }));
    }
    Object.defineProperty(MatDatetimepickerInput.prototype, "matDatetimepicker", {
        /** The datepicker that this input is associated with. */
        set: /**
         * The datepicker that this input is associated with.
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.registerDatepicker(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerDatepicker = /**
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this._datepicker = value;
            this._datepicker._registerInput(this);
        }
    };
    Object.defineProperty(MatDatetimepickerInput.prototype, "matDatepickerFilter", {
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this._dateFilter = filter;
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerInput.prototype, "value", {
        /** The value of the input. */
        get: /**
         * The value of the input.
         * @return {?}
         */
        function () {
            return this._value;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            value = this._dateAdapter.deserialize(value);
            this._lastValueValid = !value || this._dateAdapter.isValid(value);
            value = this._dateAdapter.getValidDateOrNull(value);
            /** @type {?} */
            var oldDate = this.value;
            this._value = value;
            this._formatValue(value);
            // use timeout to ensure the datetimepicker is instantiated and we get the correct format
            setTimeout((/**
             * @return {?}
             */
            function () {
                if (!_this._dateAdapter.sameDatetime(oldDate, value)) {
                    _this._valueChange.emit(value);
                }
            }));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    MatDatetimepickerInput.prototype.getDisplayFormat = /**
     * @private
     * @return {?}
     */
    function () {
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
    };
    /**
     * @private
     * @return {?}
     */
    MatDatetimepickerInput.prototype.getParseFormat = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var parseFormat;
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
    };
    Object.defineProperty(MatDatetimepickerInput.prototype, "min", {
        /** The minimum valid date. */
        get: /**
         * The minimum valid date.
         * @return {?}
         */
        function () {
            return this._min;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._min = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerInput.prototype, "max", {
        /** The maximum valid date. */
        get: /**
         * The maximum valid date.
         * @return {?}
         */
        function () {
            return this._max;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._max = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
            this._validatorOnChange();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerInput.prototype, "disabled", {
        /** Whether the datepicker-input is disabled. */
        get: /**
         * Whether the datepicker-input is disabled.
         * @return {?}
         */
        function () {
            return !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var newValue = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_13__["coerceBooleanProperty"])(value);
            if (this._disabled !== newValue) {
                this._disabled = newValue;
                this._disabledChange.emit(newValue);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._datepicker) {
            // tslint:disable-next-line deprecation
            this._datepickerSubscription = this._datepicker.selectedChanged.subscribe((/**
             * @param {?} selected
             * @return {?}
             */
            function (selected) {
                _this.value = selected;
                _this._cvaOnChange(selected);
                _this._onTouched();
                _this.dateInput.emit(new MatDatetimepickerInputEvent(_this, _this._elementRef.nativeElement));
                _this.dateChange.emit(new MatDatetimepickerInputEvent(_this, _this._elementRef.nativeElement));
            }));
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._datepickerSubscription.unsubscribe();
        this._localeSubscription.unsubscribe();
        this._valueChange.complete();
        this._disabledChange.complete();
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerOnValidatorChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._validatorOnChange = fn;
    };
    /**
     * @param {?} c
     * @return {?}
     */
    MatDatetimepickerInput.prototype.validate = /**
     * @param {?} c
     * @return {?}
     */
    function (c) {
        return this._validator ? this._validator(c) : null;
    };
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return The element to connect the popup to.
     */
    /**
     * Gets the element that the datepicker popup should be connected to.
     * @return {?} The element to connect the popup to.
     */
    MatDatetimepickerInput.prototype.getConnectedOverlayOrigin = /**
     * Gets the element that the datepicker popup should be connected to.
     * @return {?} The element to connect the popup to.
     */
    function () {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._elementRef;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype.writeValue = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerOnChange = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._cvaOnChange = fn;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    MatDatetimepickerInput.prototype.registerOnTouched = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} disabled
     * @return {?}
     */
    MatDatetimepickerInput.prototype.setDisabledState = 
    // Implemented as part of ControlValueAccessor
    /**
     * @param {?} disabled
     * @return {?}
     */
    function (disabled) {
        this.disabled = disabled;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // tslint:disable-next-line:deprecation
        if (event.altKey && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_10__["DOWN_ARROW"]) {
            this._datepicker.open();
            event.preventDefault();
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        /** @type {?} */
        var date = this._dateAdapter.parse(value, this.getParseFormat());
        this._lastValueValid = !date || this._dateAdapter.isValid(date);
        date = this._dateAdapter.getValidDateOrNull(date);
        this._value = date;
        this._cvaOnChange(date);
        this._valueChange.emit(date);
        this.dateInput.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
    };
    /**
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onChange = /**
     * @return {?}
     */
    function () {
        this.dateChange.emit(new MatDatetimepickerInputEvent(this, this._elementRef.nativeElement));
    };
    /** Handles blur events on the input. */
    /**
     * Handles blur events on the input.
     * @return {?}
     */
    MatDatetimepickerInput.prototype._onBlur = /**
     * Handles blur events on the input.
     * @return {?}
     */
    function () {
        // Reformat the input only if we have a valid value.
        if (this.value) {
            this._formatValue(this.value);
        }
        this._onTouched();
    };
    /** Formats a value and sets it on the input element. */
    /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    MatDatetimepickerInput.prototype._formatValue = /**
     * Formats a value and sets it on the input element.
     * @private
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this._elementRef.nativeElement.value =
            value ? this._dateAdapter.format(value, this.getDisplayFormat()) : "";
    };
    MatDatetimepickerInput.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Directive"], args: [{
                    selector: "input[matDatetimepicker]",
                    providers: [
                        MAT_DATETIMEPICKER_VALUE_ACCESSOR,
                        MAT_DATETIMEPICKER_VALIDATORS,
                        { provide: _angular_material__WEBPACK_IMPORTED_MODULE_14__["MAT_INPUT_VALUE_ACCESSOR"], useExisting: MatDatetimepickerInput },
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
    MatDatetimepickerInput.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ElementRef"] },
        { type: DatetimeAdapter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Inject"], args: [MAT_DATETIME_FORMATS,] }] },
        { type: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__["MatFormField"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }] }
    ]; };
    MatDatetimepickerInput.propDecorators = {
        matDatetimepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        matDatepickerFilter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        min: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        max: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        dateChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }],
        dateInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }]
    };
    return MatDatetimepickerInput;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @template D
 */
var MatDatetimepickerToggle = /** @class */ (function () {
    function MatDatetimepickerToggle(_intl, _changeDetectorRef) {
        this._intl = _intl;
        this._changeDetectorRef = _changeDetectorRef;
        this._stateChanges = rxjs__WEBPACK_IMPORTED_MODULE_15__["Subscription"].EMPTY;
    }
    Object.defineProperty(MatDatetimepickerToggle.prototype, "disabled", {
        /** Whether the toggle button is disabled. */
        get: /**
         * Whether the toggle button is disabled.
         * @return {?}
         */
        function () {
            return this._disabled === undefined ? this.datetimepicker.disabled : !!this._disabled;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_13__["coerceBooleanProperty"])(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    MatDatetimepickerToggle.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.datepicker) {
            this._watchStateChanges();
        }
    };
    /**
     * @return {?}
     */
    MatDatetimepickerToggle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._stateChanges.unsubscribe();
    };
    /**
     * @return {?}
     */
    MatDatetimepickerToggle.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._watchStateChanges();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatDatetimepickerToggle.prototype._open = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.datetimepicker && !this.disabled) {
            this.datetimepicker.open();
            event.stopPropagation();
        }
    };
    /**
     * @private
     * @return {?}
     */
    MatDatetimepickerToggle.prototype._watchStateChanges = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var datepickerDisabled = this.datetimepicker ? this.datetimepicker._disabledChange : Object(rxjs__WEBPACK_IMPORTED_MODULE_15__["of"])();
        /** @type {?} */
        var inputDisabled = this.datetimepicker && this.datetimepicker._datepickerInput ?
            this.datetimepicker._datepickerInput._disabledChange : Object(rxjs__WEBPACK_IMPORTED_MODULE_15__["of"])();
        this._stateChanges.unsubscribe();
        this._stateChanges = Object(rxjs__WEBPACK_IMPORTED_MODULE_15__["merge"])(this._intl.changes, datepickerDisabled, inputDisabled)
            .subscribe((/**
         * @return {?}
         */
        function () { return _this._changeDetectorRef.markForCheck(); }));
    };
    MatDatetimepickerToggle.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Component"], args: [{
                    selector: "mat-datetimepicker-toggle",
                    template: "<button mat-icon-button type=\"button\" [attr.aria-label]=\"_intl.openCalendarLabel\"\n        [disabled]=\"disabled\" (click)=\"_open($event)\">\n  <mat-icon [ngSwitch]=\"datetimepicker.type\">\n    <svg *ngSwitchCase=\"'time'\" viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" fill=\"currentColor\"\n            style=\"vertical-align: top\" focusable=\"false\">\n      <path d=\"M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z\"></path>\n    </svg>\n    <svg *ngSwitchCase=\"'datetime'\" viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" fill=\"currentColor\"\n            style=\"vertical-align: top\" focusable=\"false\">\n      <path d=\"M15,13H16.5V15.82L18.94,17.23L18.19,18.53L15,16.69V13M19,8H5V19H9.67C9.24,18.09 9,17.07 9,16A7,7 0 0,1 16,9C17.07,9 18.09,9.24 19,9.67V8M5,21C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H6V1H8V3H16V1H18V3H19A2,2 0 0,1 21,5V11.1C22.24,12.36 23,14.09 23,16A7,7 0 0,1 16,23C14.09,23 12.36,22.24 11.1,21H5M16,11.15A4.85,4.85 0 0,0 11.15,16C11.15,18.68 13.32,20.85 16,20.85A4.85,4.85 0 0,0 20.85,16C20.85,13.32 18.68,11.15 16,11.15Z\"></path>\n    </svg>\n    <svg *ngSwitchDefault viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" fill=\"currentColor\"\n        style=\"vertical-align: top\" focusable=\"false\">\n      <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n      <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\n    </svg>\n  </mat-icon>\n</button>\n",
                    host: {
                        "class": "mat-datetimepicker-toggle"
                    },
                    exportAs: "matDatetimepickerToggle",
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ViewEncapsulation"].None,
                    preserveWhitespaces: false,
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ChangeDetectionStrategy"].OnPush
                }] }
    ];
    /** @nocollapse */
    MatDatetimepickerToggle.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatDatepickerIntl"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ChangeDetectorRef"] }
    ]; };
    MatDatetimepickerToggle.propDecorators = {
        datetimepicker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"], args: ["for",] }],
        disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }]
    };
    return MatDatetimepickerToggle;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        this._userSelection = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        /**
         * Emits when a new date is selected.
         */
        this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Component"], args: [{
                    selector: "mat-datetimepicker-month-view",
                    template: "<table class=\"mat-datetimepicker-calendar-table\">\n  <thead class=\"mat-datetimepicker-calendar-table-header\">\n    <tr><th *ngFor=\"let day of _weekdays\" [attr.aria-label]=\"day.long\">{{day.narrow}}</th></tr>\n  </thead>\n  <tbody [@slideCalendar]=\"_calendarState\"\n         (@slideCalendar.done)=\"_calendarStateDone()\"\n         mat-datetimepicker-calendar-body\n         role=\"grid\"\n         [rows]=\"_weeks\"\n         [todayValue]=\"_todayDate\"\n         [selectedValue]=\"_selectedDate\"\n         [activeCell]=\"_adapter.getDate(activeDate) - 1\"\n         (selectedValueChange)=\"_dateSelected($event)\"></tbody>\n</table>\n",
                    animations: [slideCalendar],
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ViewEncapsulation"].None,
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ChangeDetectionStrategy"].OnPush
                }] }
    ];
    /** @nocollapse */
    MatDatetimepickerMonthView.ctorParameters = function () { return [
        { type: DatetimeAdapter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Inject"], args: [MAT_DATETIME_FORMATS,] }] }
    ]; };
    MatDatetimepickerMonthView.propDecorators = {
        type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        _userSelection: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }],
        activeDate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        dateFilter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selectedChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }]
    };
    return MatDatetimepickerMonthView;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * An internal component used to display a single year in the datepicker.
 * \@docs-private
 * @template D
 */
var MatDatetimepickerYearView = /** @class */ (function () {
    function MatDatetimepickerYearView(_adapter, _dateFormats) {
        this._adapter = _adapter;
        this._dateFormats = _dateFormats;
        this._userSelection = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        this.type = "date";
        /**
         * Emits when a new month is selected.
         */
        this.selectedChange = new _angular_core__WEBPACK_IMPORTED_MODULE_16__["EventEmitter"]();
        if (!this._adapter) {
            throw createMissingDateImplError("DatetimeAdapter");
        }
        if (!this._dateFormats) {
            throw createMissingDateImplError("MAT_DATETIME_FORMATS");
        }
        this._activeDate = this._adapter.today();
    }
    Object.defineProperty(MatDatetimepickerYearView.prototype, "activeDate", {
        /** The date to display in this year view (everything other than the year is ignored). */
        get: /**
         * The date to display in this year view (everything other than the year is ignored).
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
                !this._adapter.sameYear(oldActiveDate, this._activeDate)) {
                this._init();
                // if (oldActiveDate < this._activeDate) {
                //  this.calendarState('right');
                // } else {
                //  this.calendarState('left');
                // }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatDatetimepickerYearView.prototype, "selected", {
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
            this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatDatetimepickerYearView.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._init();
    };
    /** Handles when a new month is selected. */
    /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._monthSelected = /**
     * Handles when a new month is selected.
     * @param {?} month
     * @return {?}
     */
    function (month) {
        this.selectedChange.emit(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, this._adapter.getDate(this.activeDate), this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)));
        if (this.type === "month") {
            this._userSelection.emit();
        }
    };
    /** Initializes this month view. */
    /**
     * Initializes this month view.
     * @private
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._init = /**
     * Initializes this month view.
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this._selectedMonth = this._getMonthInCurrentYear(this.selected);
        this._todayMonth = this._getMonthInCurrentYear(this._adapter.today());
        this._yearLabel = this._adapter.getYearName(this.activeDate);
        /** @type {?} */
        var monthNames = this._adapter.getMonthNames("short");
        // First row of months only contains 5 elements so we can fit the year label on the same row.
        this._months = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9, 10, 11]].map((/**
         * @param {?} row
         * @return {?}
         */
        function (row) { return row.map((/**
         * @param {?} month
         * @return {?}
         */
        function (month) { return _this._createCellForMonth(month, monthNames[month]); })); }));
    };
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     */
    /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._getMonthInCurrentYear = /**
     * Gets the month in this year that the given Date falls on.
     * Returns null if the given Date is in another year.
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return this._adapter.sameYear(date, this.activeDate) ?
            this._adapter.getMonth(date) : null;
    };
    /** Creates an MdCalendarCell for the given month. */
    /**
     * Creates an MdCalendarCell for the given month.
     * @private
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._createCellForMonth = /**
     * Creates an MdCalendarCell for the given month.
     * @private
     * @param {?} month
     * @param {?} monthName
     * @return {?}
     */
    function (month, monthName) {
        /** @type {?} */
        var ariaLabel = this._adapter.format(this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate)), this._dateFormats.display.monthYearA11yLabel);
        return new MatDatetimepickerCalendarCell(month, monthName.toLocaleUpperCase(), ariaLabel, this._isMonthEnabled(month));
    };
    /** Whether the given month is enabled. */
    /**
     * Whether the given month is enabled.
     * @private
     * @param {?} month
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._isMonthEnabled = /**
     * Whether the given month is enabled.
     * @private
     * @param {?} month
     * @return {?}
     */
    function (month) {
        if (!this.dateFilter) {
            return true;
        }
        /** @type {?} */
        var firstOfMonth = this._adapter.createDatetime(this._adapter.getYear(this.activeDate), month, 1, this._adapter.getHour(this.activeDate), this._adapter.getMinute(this.activeDate));
        // If any date in the month is enabled count the month as enabled.
        for (var date = firstOfMonth; this._adapter.getMonth(date) == month; date = this._adapter.addCalendarDays(date, 1)) {
            if (this.dateFilter(date)) {
                return true;
            }
        }
        return false;
    };
    // private calendarState(direction: string): void {
    //   this._calendarState = direction;
    // }
    // private calendarState(direction: string): void {
    //   this._calendarState = direction;
    // }
    /**
     * @return {?}
     */
    MatDatetimepickerYearView.prototype._calendarStateDone = 
    // private calendarState(direction: string): void {
    //   this._calendarState = direction;
    // }
    /**
     * @return {?}
     */
    function () {
        this._calendarState = "";
    };
    MatDatetimepickerYearView.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Component"], args: [{
                    selector: "mat-datetimepicker-year-view",
                    template: "<table class=\"mat-datetimepicker-calendar-table\">\n  <thead class=\"mat-datetimepicker-calendar-table-header\"></thead>\n  <tbody [@slideCalendar]=\"_calendarState\"\n         (@slideCalendar.done)=\"_calendarStateDone()\"\n         mat-datetimepicker-calendar-body\n         role=\"grid\"\n         allowDisabledSelection=\"true\"\n         [label]=\"_yearLabel\"\n         [rows]=\"_months\"\n         [todayValue]=\"_todayMonth\"\n         [selectedValue]=\"_selectedMonth\"\n         [labelMinRequiredCells]=\"2\"\n         [activeCell]=\"_adapter.getMonth(activeDate)\"\n         (selectedValueChange)=\"_monthSelected($event)\"></tbody>\n</table>\n",
                    animations: [slideCalendar],
                    encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ViewEncapsulation"].None,
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_16__["ChangeDetectionStrategy"].OnPush
                }] }
    ];
    /** @nocollapse */
    MatDatetimepickerYearView.ctorParameters = function () { return [
        { type: DatetimeAdapter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Inject"], args: [MAT_DATETIME_FORMATS,] }] }
    ]; };
    MatDatetimepickerYearView.propDecorators = {
        _userSelection: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }],
        type: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        activeDate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        dateFilter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Input"] }],
        selectedChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["Output"] }]
    };
    return MatDatetimepickerYearView;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MatDatetimepickerModule = /** @class */ (function () {
    function MatDatetimepickerModule() {
    }
    MatDatetimepickerModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_16__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_7__["CommonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatButtonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatDialogModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatIconModule"],
                        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_5__["OverlayModule"],
                        _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_2__["A11yModule"]
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
    return MatDatetimepickerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=mat-datetimepicker-core.js.map

/***/ }),

/***/ "./dist/moment/fesm5/mat-datetimepicker-moment.js":
/*!********************************************************!*\
  !*** ./dist/moment/fesm5/mat-datetimepicker-moment.js ***!
  \********************************************************/
/*! exports provided: MomentDatetimeModule, MatMomentDatetimeModule, MomentDatetimeAdapter, MAT_MOMENT_DATETIME_FORMATS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MomentDatetimeModule", function() { return MomentDatetimeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatMomentDatetimeModule", function() { return MatMomentDatetimeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MomentDatetimeAdapter", function() { return MomentDatetimeAdapter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_MOMENT_DATETIME_FORMATS", function() { return MAT_MOMENT_DATETIME_FORMATS; });
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material-moment-adapter */ "./node_modules/@angular/material-moment-adapter/esm5/material-moment-adapter.es5.js");
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mat-datetimepicker/core */ "./dist/core/fesm5/mat-datetimepicker-core.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var moment = moment__WEBPACK_IMPORTED_MODULE_5__;
/**
 * @template T
 * @param {?} length
 * @param {?} valueFunction
 * @return {?}
 */
function range(length, valueFunction) {
    /** @type {?} */
    var valuesArray = Array(length);
    for (var i = 0; i < length; i++) {
        valuesArray[i] = valueFunction(i);
    }
    return valuesArray;
}
var MomentDatetimeAdapter = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_1__["__extends"])(MomentDatetimeAdapter, _super);
    function MomentDatetimeAdapter(matDateLocale, _delegate) {
        var _this = _super.call(this, _delegate) || this;
        _this.setLocale(matDateLocale || moment.locale());
        return _this;
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.setLocale = /**
     * @param {?} locale
     * @return {?}
     */
    function (locale) {
        var _this = this;
        _super.prototype.setLocale.call(this, locale);
        /** @type {?} */
        var momentLocaleData = moment.localeData(locale);
        this._localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return _super.prototype.createDate.call(_this, 2017, 0, i + 1).format("D"); })),
            hours: range(24, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return _this.createDatetime(2017, 0, 1, i, 0).format("H"); })),
            minutes: range(60, (/**
             * @param {?} i
             * @return {?}
             */
            function (i) { return _this.createDatetime(2017, 0, 1, 1, i).format("m"); })),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getHour = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return _super.prototype.clone.call(this, date).hour();
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getMinute = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return _super.prototype.clone.call(this, date).minute();
    };
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.isInNextMonth = /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    function (startDate, endDate) {
        /** @type {?} */
        var nextMonth = this.getDateInNextMonth(startDate);
        return _super.prototype.sameMonthAndYear.call(this, nextMonth, endDate);
    };
    /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.createDatetime = /**
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    function (year, month, date, hour, minute) {
        // Check for invalid month and date (except upper bound on date which we have to check after
        // creating the Date).
        if (month < 0 || month > 11) {
            throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
        }
        if (date < 1) {
            throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
        }
        if (hour < 0 || hour > 23) {
            throw Error("Invalid hour \"" + hour + "\". Hour has to be between 0 and 23.");
        }
        if (minute < 0 || minute > 59) {
            throw Error("Invalid minute \"" + minute + "\". Minute has to be between 0 and 59.");
        }
        // const result = moment({year, month, date, hour, minute}).locale(this.locale);
        /** @type {?} */
        var result = moment({ year: year, month: month, date: date, hour: hour, minute: minute });
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
            throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
        }
        return result;
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getDateInNextMonth = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return _super.prototype.clone.call(this, date).date(1).add({ month: 1 });
    };
    /**
     * @param {?} date
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getFirstDateOfMonth = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return _super.prototype.clone.call(this, date).startOf("month");
    };
    /**
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getHourNames = /**
     * @return {?}
     */
    function () {
        return this._localeData.hours;
    };
    /**
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.getMinuteNames = /**
     * @return {?}
     */
    function () {
        return this._localeData.minutes;
    };
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.addCalendarHours = /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    function (date, hours) {
        return _super.prototype.clone.call(this, date).add({ hours: hours });
    };
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.addCalendarMinutes = /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    function (date, minutes) {
        return _super.prototype.clone.call(this, date).add({ minutes: minutes });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    MomentDatetimeAdapter.prototype.deserialize = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return this._delegate.deserialize(value);
    };
    MomentDatetimeAdapter.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"] }
    ];
    /** @nocollapse */
    MomentDatetimeAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_3__["MAT_DATE_LOCALE"],] }] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"] }
    ]; };
    return MomentDatetimeAdapter;
}(_mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["DatetimeAdapter"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var MAT_MOMENT_DATETIME_FORMATS = {
    parse: {
        dateInput: "L",
        monthInput: "MMMM",
        timeInput: "LT",
        datetimeInput: "L LT"
    },
    display: {
        dateInput: "L",
        monthInput: "MMMM",
        datetimeInput: "L LT",
        timeInput: "LT",
        monthYearLabel: "MMM YYYY",
        dateA11yLabel: "LL",
        monthYearA11yLabel: "MMMM YYYY",
        popupHeaderDateLabel: "ddd, DD MMM"
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MomentDatetimeModule = /** @class */ (function () {
    function MomentDatetimeModule() {
    }
    MomentDatetimeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"], args: [{
                    imports: [_angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_0__["MomentDateModule"]],
                    providers: [
                        {
                            provide: _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["DatetimeAdapter"],
                            useClass: MomentDatetimeAdapter
                        }
                    ]
                },] }
    ];
    return MomentDatetimeModule;
}());
var ɵ0 = MAT_MOMENT_DATETIME_FORMATS;
var MatMomentDatetimeModule = /** @class */ (function () {
    function MatMomentDatetimeModule() {
    }
    MatMomentDatetimeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"], args: [{
                    imports: [MomentDatetimeModule, _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_0__["MatMomentDateModule"]],
                    providers: [{ provide: _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["MAT_DATETIME_FORMATS"], useValue: ɵ0 }]
                },] }
    ];
    return MatMomentDatetimeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */



//# sourceMappingURL=mat-datetimepicker-moment.js.map

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{ title }}!\n  </h1>\n  <img width=\"300\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n</div>\n\n<app-native-datetime></app-native-datetime>\n<app-moment-datetime></app-moment-datetime>\n\n<ul>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/tutorial\">Tour of Heroes</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://github.com/angular/angular-cli/wiki\">CLI Documentation</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.angular.io/\">Angular blog</a></h2>\n  </li>\n</ul>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = "app";
    }
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-root",
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_common_locales_de__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/locales/de */ "./node_modules/@angular/common/locales/de.js");
/* harmony import */ var _angular_common_locales_de__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_de__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _moment_moment_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./moment/moment.module */ "./src/app/moment/moment.module.ts");
/* harmony import */ var _native_native_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./native/native.module */ "./src/app/native/native.module.ts");










Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["registerLocaleData"])(_angular_common_locales_de__WEBPACK_IMPORTED_MODULE_2___default.a);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            providers: [
                {
                    provide: _angular_core__WEBPACK_IMPORTED_MODULE_3__["LOCALE_ID"],
                    useValue: "de-DE"
                },
                {
                    provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_DATE_LOCALE"],
                    useExisting: _angular_core__WEBPACK_IMPORTED_MODULE_3__["LOCALE_ID"]
                }
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"],
                _moment_moment_module__WEBPACK_IMPORTED_MODULE_8__["AppMomentModule"],
                _native_native_module__WEBPACK_IMPORTED_MODULE_9__["AppNativeModule"]
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_7__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/date.component.html":
/*!*************************************!*\
  !*** ./src/app/date.component.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2>Date types with: {{ type }}</h2>\n<form [formGroup]=\"group\">\n  <mat-form-field>\n    <mat-placeholder>DateTime</mat-placeholder>\n    <mat-datetimepicker-toggle [for]=\"datetimePicker\" matSuffix></mat-datetimepicker-toggle>\n    <mat-datetimepicker #datetimePicker type=\"datetime\" startView=\"month\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\n    <input matInput formControlName=\"dateTime\" [min]=\"today\" [max]=\"tomorrow\" [matDatetimepicker]=\"datetimePicker\" required autocomplete=\"false\">\n    <mat-error *ngIf=\"group.get('dateTime').errors?.required\">required</mat-error>\n    <mat-error *ngIf=\"group.get('dateTime').errors?.matDatepickerMin\">min</mat-error>\n    <mat-error *ngIf=\"group.get('dateTime').errors?.matDatepickerMax\">max</mat-error>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-placeholder>Time</mat-placeholder>\n    <mat-datetimepicker-toggle [for]=\"timePicker\" matSuffix></mat-datetimepicker-toggle>\n    <mat-datetimepicker #timePicker type=\"time\" openOnFocus=\"true\" timeInterval=\"5\"></mat-datetimepicker>\n    <input matInput formControlName=\"time\" [matDatetimepicker]=\"timePicker\" required>\n    <mat-error *ngIf=\"group.get('time').errors?.required\">required</mat-error>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-placeholder>Date</mat-placeholder>\n    <mat-datetimepicker-toggle [for]=\"datePicker\" matSuffix></mat-datetimepicker-toggle>\n    <mat-datetimepicker #datePicker type=\"date\" openOnFocus=\"true\"></mat-datetimepicker>\n    <input matInput formControlName=\"date\" [matDatetimepicker]=\"datePicker\" required>\n    <mat-error *ngIf=\"group.get('date').errors?.required\">required</mat-error>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-placeholder>Month</mat-placeholder>\n    <mat-datetimepicker-toggle [for]=\"monthPicker\" matSuffix></mat-datetimepicker-toggle>\n    <mat-datetimepicker #monthPicker type=\"month\" openOnFocus=\"true\" mode=\"portrait\"></mat-datetimepicker>\n    <input matInput formControlName=\"month\" [matDatetimepicker]=\"monthPicker\" required>\n    <mat-error *ngIf=\"group.get('month').errors?.required\">required</mat-error>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-placeholder>Min/Max Test</mat-placeholder>\n    <input matInput formControlName=\"mintest\" [min]=\"min\" [max]=\"max\" [matDatetimepicker]=\"minTestPicker\" required>\n    <mat-datetimepicker-toggle [for]=\"minTestPicker\" matSuffix></mat-datetimepicker-toggle>\n    <mat-datetimepicker #minTestPicker type=\"datetime\" openOnFocus=\"true\" mode=\"landscape\" timeInterval=\"5\"></mat-datetimepicker>\n    <mat-error *ngIf=\"group.get('mintest').errors?.required\">required</mat-error>\n    <mat-error *ngIf=\"group.get('mintest').errors?.matDatepickerMin\">min</mat-error>\n    <mat-error *ngIf=\"group.get('mintest').errors?.matDatepickerMax\">max</mat-error>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-placeholder>Filter Test</mat-placeholder>\n    <input matInput formControlName=\"filtertest\" [matDatepickerFilter]=\"filter\" [matDatetimepicker]=\"filterTestPicker\" required>\n    <mat-datetimepicker-toggle [for]=\"filterTestPicker\" matSuffix></mat-datetimepicker-toggle>\n    <mat-datetimepicker #filterTestPicker type=\"datetime\" openOnFocus=\"true\" mode=\"landscape\" timeInterval=\"5\"></mat-datetimepicker>\n    <mat-error *ngIf=\"group.get('filtertest').errors?.required\">required</mat-error>\n    <mat-error *ngIf=\"group.get('filtertest').errors?.matDatepickerFilter\">filter</mat-error>\n  </mat-form-field>\n  <mat-form-field>\n    <mat-placeholder>TouchUi</mat-placeholder>\n    <input matInput formControlName=\"touch\" [min]=\"min\" [matDatetimepicker]=\"touch\" required>\n    <mat-datetimepicker-toggle [for]=\"touch\" matSuffix></mat-datetimepicker-toggle>\n    <mat-datetimepicker #touch type=\"datetime\" openOnFocus=\"true\" mode=\"portrait\" timeInterval=\"5\" touchUi=\"true\"></mat-datetimepicker>\n  </mat-form-field>\n</form>\n"

/***/ }),

/***/ "./src/app/moment/moment.component.ts":
/*!********************************************!*\
  !*** ./src/app/moment/moment.component.ts ***!
  \********************************************/
/*! exports provided: MomentDatetimeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MomentDatetimeComponent", function() { return MomentDatetimeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material-moment-adapter */ "./node_modules/@angular/material-moment-adapter/esm5/material-moment-adapter.es5.js");
/* harmony import */ var _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @mat-datetimepicker/core */ "./dist/core/fesm5/mat-datetimepicker-core.js");
/* harmony import */ var _mat_datetimepicker_moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mat-datetimepicker/moment */ "./dist/moment/fesm5/mat-datetimepicker-moment.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment/moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment_moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment_moment__WEBPACK_IMPORTED_MODULE_7__);








var MomentDatetimeComponent = /** @class */ (function () {
    function MomentDatetimeComponent(fb) {
        this.type = "moment";
        this.today = Object(moment_moment__WEBPACK_IMPORTED_MODULE_7__["utc"])();
        this.tomorrow = Object(moment_moment__WEBPACK_IMPORTED_MODULE_7__["utc"])().date(Object(moment_moment__WEBPACK_IMPORTED_MODULE_7__["utc"])().date() + 1);
        this.min = this.today.clone().year(2018).month(10).date(3).hour(11).minute(10);
        this.max = this.min.clone().date(4).minute(45);
        this.start = this.today.clone().year(1930).month(9).date(28);
        this.filter = function (date, type) {
            switch (type) {
                case _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_5__["MatDatetimepickerFilterType"].DATE:
                    return date.year() % 2 === 0 &&
                        date.month() % 2 === 0 &&
                        date.date() % 2 === 0;
                case _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_5__["MatDatetimepickerFilterType"].HOUR:
                    return date.hour() % 2 === 0;
                case _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_5__["MatDatetimepickerFilterType"].MINUTE:
                    return date.minute() % 2 === 0;
            }
        };
        this.group = fb.group({
            dateTime: [new Date("2017-11-09T12:10:00.000Z"), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            date: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            time: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            month: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            mintest: [this.today, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            filtertest: [this.today, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            touch: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    }
    MomentDatetimeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-moment-datetime",
            template: __webpack_require__(/*! ../date.component.html */ "./src/app/date.component.html"),
            providers: [
                {
                    provide: _angular_material__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"],
                    useClass: _angular_material_moment_adapter__WEBPACK_IMPORTED_MODULE_4__["MomentDateAdapter"]
                },
                {
                    provide: _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_5__["DatetimeAdapter"],
                    useClass: _mat_datetimepicker_moment__WEBPACK_IMPORTED_MODULE_6__["MomentDatetimeAdapter"]
                },
                {
                    provide: _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_5__["MAT_DATETIME_FORMATS"],
                    useValue: {
                        parse: {
                            dateInput: "L",
                            monthInput: "MMMM",
                            timeInput: "LT",
                            datetimeInput: "L LT"
                        },
                        display: {
                            dateInput: "L",
                            monthInput: "MMMM",
                            datetimeInput: "L LT",
                            timeInput: "LT",
                            monthYearLabel: "MMM YYYY",
                            dateA11yLabel: "LL",
                            monthYearA11yLabel: "MMMM YYYY",
                            popupHeaderDateLabel: "ddd, DD MMM"
                        }
                    }
                }
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], MomentDatetimeComponent);
    return MomentDatetimeComponent;
}());



/***/ }),

/***/ "./src/app/moment/moment.module.ts":
/*!*****************************************!*\
  !*** ./src/app/moment/moment.module.ts ***!
  \*****************************************/
/*! exports provided: AppMomentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppMomentModule", function() { return AppMomentModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mat-datetimepicker/core */ "./dist/core/fesm5/mat-datetimepicker-core.js");
/* harmony import */ var _moment_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./moment.component */ "./src/app/moment/moment.component.ts");








var AppMomentModule = /** @class */ (function () {
    function AppMomentModule() {
    }
    AppMomentModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _moment_component__WEBPACK_IMPORTED_MODULE_7__["MomentDatetimeComponent"]
            ],
            exports: [
                _moment_component__WEBPACK_IMPORTED_MODULE_7__["MomentDatetimeComponent"]
            ],
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDatepickerModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
                _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_6__["MatDatetimepickerModule"]
            ]
        })
    ], AppMomentModule);
    return AppMomentModule;
}());



/***/ }),

/***/ "./src/app/native/native.component.ts":
/*!********************************************!*\
  !*** ./src/app/native/native.component.ts ***!
  \********************************************/
/*! exports provided: NativeDatetimeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeDatetimeComponent", function() { return NativeDatetimeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mat-datetimepicker/core */ "./dist/core/fesm5/mat-datetimepicker-core.js");





var NativeDatetimeComponent = /** @class */ (function () {
    function NativeDatetimeComponent(fb) {
        this.type = "native";
        this.today = new Date();
        this.tomorrow = new Date();
        this.min = new Date();
        this.max = new Date();
        this.start = new Date();
        this.tomorrow.setDate(this.tomorrow.getDate() + 1);
        this.min.setFullYear(2018, 10, 3);
        this.min.setHours(11);
        this.min.setMinutes(10);
        this.max.setFullYear(2018, 10, 4);
        this.max.setHours(11);
        this.max.setMinutes(45);
        this.start.setFullYear(1930, 9, 28);
        this.filter = function (date, type) {
            switch (type) {
                case _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["MatDatetimepickerFilterType"].DATE:
                    return date.getUTCFullYear() % 2 === 0 &&
                        date.getMonth() % 2 === 0 &&
                        date.getDate() % 2 === 0;
                case _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["MatDatetimepickerFilterType"].HOUR:
                    return date.getHours() % 2 === 0;
                case _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["MatDatetimepickerFilterType"].MINUTE:
                    return date.getMinutes() % 2 === 0;
            }
        };
        this.group = fb.group({
            dateTime: [new Date("2017-11-09T12:10:00.000Z"), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            date: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            time: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            month: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            mintest: [this.today, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            filtertest: [this.today, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            touch: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
    }
    NativeDatetimeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: "app-native-datetime",
            template: __webpack_require__(/*! ../date.component.html */ "./src/app/date.component.html"),
            providers: [
                {
                    provide: _angular_material__WEBPACK_IMPORTED_MODULE_3__["DateAdapter"],
                    useClass: _angular_material__WEBPACK_IMPORTED_MODULE_3__["NativeDateAdapter"]
                },
                {
                    provide: _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["DatetimeAdapter"],
                    useClass: _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["NativeDatetimeAdapter"]
                },
                {
                    provide: _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["MAT_DATETIME_FORMATS"],
                    useValue: _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_4__["MAT_NATIVE_DATETIME_FORMATS"]
                }
            ]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"]])
    ], NativeDatetimeComponent);
    return NativeDatetimeComponent;
}());



/***/ }),

/***/ "./src/app/native/native.module.ts":
/*!*****************************************!*\
  !*** ./src/app/native/native.module.ts ***!
  \*****************************************/
/*! exports provided: AppNativeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppNativeModule", function() { return AppNativeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @mat-datetimepicker/core */ "./dist/core/fesm5/mat-datetimepicker-core.js");
/* harmony import */ var _native_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./native.component */ "./src/app/native/native.component.ts");








var AppNativeModule = /** @class */ (function () {
    function AppNativeModule() {
    }
    AppNativeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _native_component__WEBPACK_IMPORTED_MODULE_7__["NativeDatetimeComponent"]
            ],
            exports: [
                _native_component__WEBPACK_IMPORTED_MODULE_7__["NativeDatetimeComponent"]
            ],
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["BrowserAnimationsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["BrowserModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDatepickerModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatFormFieldModule"],
                _mat_datetimepicker_core__WEBPACK_IMPORTED_MODULE_6__["MatDatetimepickerModule"]
            ]
        })
    ], AppNativeModule);
    return AppNativeModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/viclefev/IdeaProjects2/mat-datetimepicker/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map