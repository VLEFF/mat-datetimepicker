(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/material-moment-adapter'), require('@angular/core'), require('@angular/material'), require('@mat-datetimepicker/core'), require('moment')) :
    typeof define === 'function' && define.amd ? define('@mat-datetimepicker/moment', ['exports', '@angular/material-moment-adapter', '@angular/core', '@angular/material', '@mat-datetimepicker/core', 'moment'], factory) :
    (factory((global['mat-datetimepicker'] = global['mat-datetimepicker'] || {}, global['mat-datetimepicker'].moment = {}),global.ng['material-moment-adapter'],global.ng.core,global.ng.material,global.core$1,global.moment_));
}(this, (function (exports,materialMomentAdapter,core,material,core$1,moment_) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var moment = moment_;
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
        __extends(MomentDatetimeAdapter, _super);
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
                    dates: range(31, ( /**
                     * @param {?} i
                     * @return {?}
                     */function (i) { return _super.prototype.createDate.call(_this, 2017, 0, i + 1).format("D"); })),
                    hours: range(24, ( /**
                     * @param {?} i
                     * @return {?}
                     */function (i) { return _this.createDatetime(2017, 0, 1, i, 0).format("H"); })),
                    minutes: range(60, ( /**
                     * @param {?} i
                     * @return {?}
                     */function (i) { return _this.createDatetime(2017, 0, 1, 1, i).format("m"); })),
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        MomentDatetimeAdapter.ctorParameters = function () {
            return [
                { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [material.MAT_DATE_LOCALE,] }] },
                { type: material.DateAdapter }
            ];
        };
        return MomentDatetimeAdapter;
    }(core$1.DatetimeAdapter));

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
            { type: core.NgModule, args: [{
                        imports: [materialMomentAdapter.MomentDateModule],
                        providers: [
                            {
                                provide: core$1.DatetimeAdapter,
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
            { type: core.NgModule, args: [{
                        imports: [MomentDatetimeModule, materialMomentAdapter.MatMomentDateModule],
                        providers: [{ provide: core$1.MAT_DATETIME_FORMATS, useValue: ɵ0 }]
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

    exports.MomentDatetimeModule = MomentDatetimeModule;
    exports.MatMomentDatetimeModule = MatMomentDatetimeModule;
    exports.MomentDatetimeAdapter = MomentDatetimeAdapter;
    exports.MAT_MOMENT_DATETIME_FORMATS = MAT_MOMENT_DATETIME_FORMATS;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=mat-datetimepicker-moment.umd.js.map