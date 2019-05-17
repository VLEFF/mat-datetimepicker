/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, Optional } from "@angular/core";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material";
import { DatetimeAdapter } from "@mat-datetimepicker/core";
import * as moment_ from "moment";
/** @type {?} */
const moment = moment_;
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
export class MomentDatetimeAdapter extends DatetimeAdapter {
    /**
     * @param {?} matDateLocale
     * @param {?} _delegate
     */
    constructor(matDateLocale, _delegate) {
        super(_delegate);
        this.setLocale(matDateLocale || moment.locale());
    }
    /**
     * @param {?} locale
     * @return {?}
     */
    setLocale(locale) {
        super.setLocale(locale);
        /** @type {?} */
        const momentLocaleData = moment.localeData(locale);
        this._localeData = {
            firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
            longMonths: momentLocaleData.months(),
            shortMonths: momentLocaleData.monthsShort(),
            dates: range(31, (i) => super.createDate(2017, 0, i + 1).format("D")),
            hours: range(24, (i) => this.createDatetime(2017, 0, 1, i, 0).format("H")),
            minutes: range(60, (i) => this.createDatetime(2017, 0, 1, 1, i).format("m")),
            longDaysOfWeek: momentLocaleData.weekdays(),
            shortDaysOfWeek: momentLocaleData.weekdaysShort(),
            narrowDaysOfWeek: momentLocaleData.weekdaysMin()
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getHour(date) {
        return super.clone(date).hour();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getMinute(date) {
        return super.clone(date).minute();
    }
    /**
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    isInNextMonth(startDate, endDate) {
        /** @type {?} */
        const nextMonth = this.getDateInNextMonth(startDate);
        return super.sameMonthAndYear(nextMonth, endDate);
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
        // const result = moment({year, month, date, hour, minute}).locale(this.locale);
        /** @type {?} */
        const result = moment({ year, month, date, hour, minute });
        // If the result isn't valid, the date must have been out of bounds for this month.
        if (!result.isValid()) {
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
        return super.clone(date).date(1).add({ month: 1 });
    }
    /**
     * @param {?} date
     * @return {?}
     */
    getFirstDateOfMonth(date) {
        return super.clone(date).startOf("month");
    }
    /**
     * @return {?}
     */
    getHourNames() {
        return this._localeData.hours;
    }
    /**
     * @return {?}
     */
    getMinuteNames() {
        return this._localeData.minutes;
    }
    /**
     * @param {?} date
     * @param {?} hours
     * @return {?}
     */
    addCalendarHours(date, hours) {
        return super.clone(date).add({ hours });
    }
    /**
     * @param {?} date
     * @param {?} minutes
     * @return {?}
     */
    addCalendarMinutes(date, minutes) {
        return super.clone(date).add({ minutes });
    }
    /**
     * @param {?} value
     * @return {?}
     */
    deserialize(value) {
        return this._delegate.deserialize(value);
    }
}
MomentDatetimeAdapter.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MomentDatetimeAdapter.ctorParameters = () => [
    { type: String, decorators: [{ type: Optional }, { type: Inject, args: [MAT_DATE_LOCALE,] }] },
    { type: DateAdapter }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    MomentDatetimeAdapter.prototype._localeData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9tZW50LWRhdGV0aW1lLWFkYXB0ZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWF0LWRhdGV0aW1lcGlja2VyL21vbWVudC8iLCJzb3VyY2VzIjpbImFkYXB0ZXIvbW9tZW50LWRhdGV0aW1lLWFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxNQUFNLEVBQ04sVUFBVSxFQUNWLFFBQVEsRUFDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0wsV0FBVyxFQUNYLGVBQWUsRUFDaEIsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFM0QsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPOzs7Ozs7O0FBRXRCLFNBQVMsS0FBSyxDQUFJLE1BQWMsRUFBRSxhQUFtQzs7VUFDN0QsV0FBVyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMvQixXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25DO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUdELE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxlQUF1Qjs7Ozs7SUFjaEUsWUFBaUQsYUFBcUIsRUFBRSxTQUE4QjtRQUNwRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBYztRQUN0QixLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztjQUVsQixnQkFBZ0IsR0FBRyxNQUFNLENBQUMs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SW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBPcHRpb25hbFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgRGF0ZUFkYXB0ZXIsXG4gIE1BVF9EQVRFX0xPQ0FMRVxufSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IERhdGV0aW1lQWRhcHRlciB9IGZyb20gXCJAbWF0LWRhdGV0aW1lcGlja2VyL2NvcmVcIjtcblxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tIFwibW9tZW50XCI7XG5pbXBvcnQgeyBNb21lbnQgfSBmcm9tIFwibW9tZW50XCI7XG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5mdW5jdGlvbiByYW5nZTxUPihsZW5ndGg6IG51bWJlciwgdmFsdWVGdW5jdGlvbjogKGluZGV4OiBudW1iZXIpID0+IFQpOiBUW10ge1xuICBjb25zdCB2YWx1ZXNBcnJheSA9IEFycmF5KGxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YWx1ZXNBcnJheVtpXSA9IHZhbHVlRnVuY3Rpb24oaSk7XG4gIH1cbiAgcmV0dXJuIHZhbHVlc0FycmF5O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZXRpbWVBZGFwdGVyIGV4dGVuZHMgRGF0ZXRpbWVBZGFwdGVyPE1vbWVudD4ge1xuXG4gIHByaXZhdGUgX2xvY2FsZURhdGE6IHtcbiAgICBmaXJzdERheU9mV2VlazogbnVtYmVyLFxuICAgIGxvbmdNb250aHM6IHN0cmluZ1tdLFxuICAgIHNob3J0TW9udGhzOiBzdHJpbmdbXSxcbiAgICBkYXRlczogc3RyaW5nW10sXG4gICAgaG91cnM6IHN0cmluZ1tdLFxuICAgIG1pbnV0ZXM6IHN0cmluZ1tdLFxuICAgIGxvbmdEYXlzT2ZXZWVrOiBzdHJpbmdbXSxcbiAgICBzaG9ydERheXNPZldlZWs6IHN0cmluZ1tdLFxuICAgIG5hcnJvd0RheXNPZldlZWs6IHN0cmluZ1tdXG4gIH07XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChNQVRfREFURV9MT0NBTEUpIG1hdERhdGVMb2NhbGU6IHN0cmluZywgX2RlbGVnYXRlOiBEYXRlQWRhcHRlcjxNb21lbnQ+KSB7XG4gICAgc3VwZXIoX2RlbGVnYXRlKTtcbiAgICB0aGlzLnNldExvY2FsZShtYXREYXRlTG9jYWxlIHx8IG1vbWVudC5sb2NhbGUoKSk7XG4gIH1cblxuICBzZXRMb2NhbGUobG9jYWxlOiBzdHJpbmcpIHtcbiAgICBzdXBlci5zZXRMb2NhbGUobG9jYWxlKTtcblxuICAgIGNvbnN0IG1vbWVudExvY2FsZURhdGEgPSBtb21lbnQubG9jYWxlRGF0YShsb2NhbGUpO1xuICAgIHRoaXMuX2xvY2FsZURhdGEgPSB7XG4gICAgICBmaXJzdERheU9mV2VlazogbW9tZW50TG9jYWxlRGF0YS5maXJzdERheU9mV2VlaygpLFxuICAgICAgbG9uZ01vbnRoczogbW9tZW50TG9jYWxlRGF0YS5tb250aHMoKSxcbiAgICAgIHNob3J0TW9udGhzOiBtb21lbnRMb2NhbGVEYXRhLm1vbnRoc1Nob3J0KCksXG4gICAgICBkYXRlczogcmFuZ2UoMzEsIChpKSA9PiBzdXBlci5jcmVhdGVEYXRlKDIwMTcsIDAsIGkgKyAxKS5mb3JtYXQoXCJEXCIpKSxcbiAgICAgIGhvdXJzOiByYW5nZSgyNCwgKGkpID0+IHRoaXMuY3JlYXRlRGF0ZXRpbWUoMjAxNywgMCwgMSwgaSwgMCkuZm9ybWF0KFwiSFwiKSksXG4gICAgICBtaW51dGVzOiByYW5nZSg2MCwgKGkpID0+IHRoaXMuY3JlYXRlRGF0ZXRpbWUoMjAxNywgMCwgMSwgMSwgaSkuZm9ybWF0KFwibVwiKSksXG4gICAgICBsb25nRGF5c09mV2VlazogbW9tZW50TG9jYWxlRGF0YS53ZWVrZGF5cygpLFxuICAgICAgc2hvcnREYXlzT2ZXZWVrOiBtb21lbnRMb2NhbGVEYXRhLndlZWtkYXlzU2hvcnQoKSxcbiAgICAgIG5hcnJvd0RheXNPZldlZWs6IG1vbWVudExvY2FsZURhdGEud2Vla2RheXNNaW4oKVxuICAgIH07XG4gIH1cblxuICBnZXRIb3VyKGRhdGU6IE1vbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHN1cGVyLmNsb25lKGRhdGUpLmhvdXIoKTtcbiAgfVxuXG4gIGdldE1pbnV0ZShkYXRlOiBNb21lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBzdXBlci5jbG9uZShkYXRlKS5taW51dGUoKTtcbiAgfVxuXG4gIGlzSW5OZXh0TW9udGgoc3RhcnREYXRlOiBNb21lbnQsIGVuZERhdGU6IE1vbWVudCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5leHRNb250aCA9IHRoaXMuZ2V0RGF0ZUluTmV4dE1vbnRoKHN0YXJ0RGF0ZSk7XG4gICAgcmV0dXJuIHN1cGVyLnNhbWVNb250aEFuZFllYXIobmV4dE1vbnRoLCBlbmREYXRlKTtcbiAgfVxuXG4gIGNyZWF0ZURhdGV0aW1lKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyLCBob3VyOiBudW1iZXIsIG1pbnV0ZTogbnVtYmVyKTogTW9tZW50IHtcbiAgICAvLyBDaGVjayBmb3IgaW52YWxpZCBtb250aCBhbmQgZGF0ZSAoZXhjZXB0IHVwcGVyIGJvdW5kIG9uIGRhdGUgd2hpY2ggd2UgaGF2ZSB0byBjaGVjayBhZnRlclxuICAgIC8vIGNyZWF0aW5nIHRoZSBEYXRlKS5cbiAgICBpZiAobW9udGggPCAwIHx8IG1vbnRoID4gMTEpIHtcbiAgICAgIHRocm93IEVycm9yKGBJbnZhbGlkIG1vbnRoIGluZGV4IFwiJHttb250aH1cIi4gTW9udGggaW5kZXggaGFzIHRvIGJlIGJldHdlZW4gMCBhbmQgMTEuYCk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGUgPCAxKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBkYXRlIFwiJHtkYXRlfVwiLiBEYXRlIGhhcyB0byBiZSBncmVhdGVyIHRoYW4gMC5gKTtcbiAgICB9XG5cbiAgICBpZiAoaG91ciA8IDAgfHwgaG91ciA+IDIzKSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBob3VyIFwiJHtob3VyfVwiLiBIb3VyIGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDIzLmApO1xuICAgIH1cblxuICAgIGlmIChtaW51dGUgPCAwIHx8IG1pbnV0ZSA+IDU5KSB7XG4gICAgICB0aHJvdyBFcnJvcihgSW52YWxpZCBtaW51dGUgXCIke21pbnV0ZX1cIi4gTWludXRlIGhhcyB0byBiZSBiZXR3ZWVuIDAgYW5kIDU5LmApO1xuICAgIH1cblxuICAgIC8vIGNvbnN0IHJlc3VsdCA9IG1vbWVudCh7eWVhciwgbW9udGgsIGRhdGUsIGhvdXIsIG1pbnV0ZX0pLmxvY2FsZSh0aGlzLmxvY2FsZSk7XG4gICAgY29uc3QgcmVzdWx0ID0gbW9tZW50KHt5ZWFyLCBtb250aCwgZGF0ZSwgaG91ciwgbWludXRlfSk7XG5cbiAgICAvLyBJZiB0aGUgcmVzdWx0IGlzbid0IHZhbGlkLCB0aGUgZGF0ZSBtdXN0IGhhdmUgYmVlbiBvdXQgb2YgYm91bmRzIGZvciB0aGlzIG1vbnRoLlxuICAgIGlmICghcmVzdWx0LmlzVmFsaWQoKSkge1xuICAgICAgdGhyb3cgRXJyb3IoYEludmFsaWQgZGF0ZSBcIiR7ZGF0ZX1cIiBmb3IgbW9udGggd2l0aCBpbmRleCBcIiR7bW9udGh9XCIuYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0RGF0ZUluTmV4dE1vbnRoKGRhdGU6IE1vbWVudCkge1xuICAgIHJldHVybiBzdXBlci5jbG9uZShkYXRlKS5kYXRlKDEpLmFkZCh7bW9udGg6IDF9KTtcbiAgfVxuXG4gIGdldEZpcnN0RGF0ZU9mTW9udGgoZGF0ZTogTW9tZW50KTogTW9tZW50IHtcbiAgICByZXR1cm4gc3VwZXIuY2xvbmUoZGF0ZSkuc3RhcnRPZihcIm1vbnRoXCIpO1xuICB9XG5cbiAgZ2V0SG91ck5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5ob3VycztcbiAgfVxuXG4gIGdldE1pbnV0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYWxlRGF0YS5taW51dGVzO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJIb3VycyhkYXRlOiBNb21lbnQsIGhvdXJzOiBudW1iZXIpOiBNb21lbnQge1xuICAgIHJldHVybiBzdXBlci5jbG9uZShkYXRlKS5hZGQoe2hvdXJzfSk7XG4gIH1cblxuICBhZGRDYWxlbmRhck1pbnV0ZXMoZGF0ZTogTW9tZW50LCBtaW51dGVzOiBudW1iZXIpOiBNb21lbnQge1xuICAgIHJldHVybiBzdXBlci5jbG9uZShkYXRlKS5hZGQoe21pbnV0ZXN9KTtcbiAgfVxuXG4gIGRlc2VyaWFsaXplKHZhbHVlOiBhbnkpOiBNb21lbnQgfCBudWxsIHtcbiAgICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmRlc2VyaWFsaXplKHZhbHVlKTtcbiAgIH1cbn1cbiJdfQ==