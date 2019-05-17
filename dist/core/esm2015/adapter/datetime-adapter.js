/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DateAdapter } from "@angular/material/core";
/**
 * @abstract
 * @template D
 */
export class DatetimeAdapter extends DateAdapter {
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
    compareDatetime(first, second) {
        return this.compareDate(first, second) ||
            this.getHour(first) - this.getHour(second) ||
            this.getMinute(first) - this.getMinute(second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameDatetime(first, second) {
        if (first && second) {
            /** @type {?} */
            const firstValid = this.isValid(first);
            /** @type {?} */
            const secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDatetime(first, second);
            }
            return firstValid === secondValid;
        }
        return first === second;
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameYear(first, second) {
        return first && second && this.getYear(first) === this.getYear(second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameDay(first, second) {
        return first && second && this.getDate(first) === this.getDate(second) && this.sameMonthAndYear(first, second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameHour(first, second) {
        return first && second && this.getHour(first) === this.getHour(second) && this.sameDay(first, second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameMinute(first, second) {
        return first && second && this.getMinute(first) === this.getMinute(second) && this.sameHour(first, second);
    }
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    sameMonthAndYear(first, second) {
        if (first && second) {
            /** @type {?} */
            const firstValid = this.isValid(first);
            /** @type {?} */
            const secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !(this.getYear(first) - this.getYear(second) ||
                    this.getMonth(first) - this.getMonth(second));
            }
            return firstValid === secondValid;
        }
        return first === second;
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
    getMonthNames(style) {
        return this._delegate.getMonthNames(style);
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
    getDayOfWeekNames(style) {
        return this._delegate.getDayOfWeekNames(style);
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
if (false) {
    /**
     * @type {?}
     * @protected
     */
    DatetimeAdapter.prototype._delegate;
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getHour = function (date) { };
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getMinute = function (date) { };
    /**
     * @abstract
     * @param {?} date
     * @return {?}
     */
    DatetimeAdapter.prototype.getFirstDateOfMonth = function (date) { };
    /**
     * @abstract
     * @param {?} startDate
     * @param {?} endDate
     * @return {?}
     */
    DatetimeAdapter.prototype.isInNextMonth = function (startDate, endDate) { };
    /**
     * @abstract
     * @return {?}
     */
    DatetimeAdapter.prototype.getHourNames = function () { };
    /**
     * @abstract
     * @return {?}
     */
    DatetimeAdapter.prototype.getMinuteNames = function () { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarHours = function (date, months) { };
    /**
     * @abstract
     * @param {?} date
     * @param {?} months
     * @return {?}
     */
    DatetimeAdapter.prototype.addCalendarMinutes = function (date, months) { };
    /**
     * @abstract
     * @param {?} year
     * @param {?} month
     * @param {?} date
     * @param {?} hour
     * @param {?} minute
     * @return {?}
     */
    DatetimeAdapter.prototype.createDatetime = function (year, month, date, hour, minute) { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXQtZGF0ZXRpbWVwaWNrZXIvY29yZS8iLCJzb3VyY2VzIjpbImFkYXB0ZXIvZGF0ZXRpbWUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7OztBQUVyRCxNQUFNLE9BQWdCLGVBQW1CLFNBQVEsV0FBYzs7OztJQUU3RCxZQUFzQixTQUF5QjtRQUM3QyxLQUFLLEVBQUUsQ0FBQztRQURZLGNBQVMsR0FBVCxTQUFTLENBQWdCO0lBRS9DLENBQUM7Ozs7O0lBb0JELGtCQUFrQixDQUFDLEdBQVE7UUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0RSxDQUFDOzs7Ozs7SUFFRCxlQUFlLENBQUMsS0FBUSxFQUFFLE1BQVM7UUFDakMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7O0lBRUQsWUFBWSxDQUFDLEtBQWUsRUFBRSxNQUFnQjtRQUM1QyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7O2tCQUNiLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzs7a0JBQ2hDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUN4QyxJQUFJ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QUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGOzs7Ozs7SUEzS2Esb0NBQW1DOzs7Ozs7SUFJL0Msd0RBQWtDOzs7Ozs7SUFFbEMsMERBQW9DOzs7Ozs7SUFFcEMsb0VBQXlDOzs7Ozs7O0lBRXpDLDRFQUEwRDs7Ozs7SUFFMUQseURBQWtDOzs7OztJQUVsQywyREFBb0M7Ozs7Ozs7SUFFcEMseUVBQXNEOzs7Ozs7O0lBRXRELDJFQUF3RDs7Ozs7Ozs7OztJQUV4RCwwRkFBb0ciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlQWRhcHRlciB9IGZyb20gXCJAYW5ndWxhci9tYXRlcmlhbC9jb3JlXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBEYXRldGltZUFkYXB0ZXI8RD4gZXh0ZW5kcyBEYXRlQWRhcHRlcjxEPiB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9kZWxlZ2F0ZTogRGF0ZUFkYXB0ZXI8RD4pIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgYWJzdHJhY3QgZ2V0SG91cihkYXRlOiBEKTogbnVtYmVyO1xuXG4gIGFic3RyYWN0IGdldE1pbnV0ZShkYXRlOiBEKTogbnVtYmVyO1xuXG4gIGFic3RyYWN0IGdldEZpcnN0RGF0ZU9mTW9udGgoZGF0ZTogRCk6IEQ7XG5cbiAgYWJzdHJhY3QgaXNJbk5leHRNb250aChzdGFydERhdGU6IEQsIGVuZERhdGU6IEQpOiBib29sZWFuO1xuXG4gIGFic3RyYWN0IGdldEhvdXJOYW1lcygpOiBzdHJpbmdbXTtcblxuICBhYnN0cmFjdCBnZXRNaW51dGVOYW1lcygpOiBzdHJpbmdbXTtcblxuICBhYnN0cmFjdCBhZGRDYWxlbmRhckhvdXJzKGRhdGU6IEQsIG1vbnRoczogbnVtYmVyKTogRDtcblxuICBhYnN0cmFjdCBhZGRDYWxlbmRhck1pbnV0ZXMoZGF0ZTogRCwgbW9udGhzOiBudW1iZXIpOiBEO1xuXG4gIGFic3RyYWN0IGNyZWF0ZURhdGV0aW1lKHllYXI6IG51bWJlciwgbW9udGg6IG51bWJlciwgZGF0ZTogbnVtYmVyLCBob3VyOiBudW1iZXIsIG1pbnV0ZTogbnVtYmVyKTogRDtcblxuICBnZXRWYWxpZERhdGVPck51bGwob2JqOiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuICh0aGlzLmlzRGF0ZUluc3RhbmNlKG9iaikgJiYgdGhpcy5pc1ZhbGlkKG9iaikpID8gb2JqIDogbnVsbDtcbiAgfVxuXG4gIGNvbXBhcmVEYXRldGltZShmaXJzdDogRCwgc2Vjb25kOiBEKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jb21wYXJlRGF0ZShmaXJzdCwgc2Vjb25kKSB8fFxuICAgICAgdGhpcy5nZXRIb3VyKGZpcnN0KSAtIHRoaXMuZ2V0SG91cihzZWNvbmQpIHx8XG4gICAgICB0aGlzLmdldE1pbnV0ZShmaXJzdCkgLSB0aGlzLmdldE1pbnV0ZShzZWNvbmQpO1xuICB9XG5cbiAgc2FtZURhdGV0aW1lKGZpcnN0OiBEIHwgbnVsbCwgc2Vjb25kOiBEIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIGlmIChmaXJzdCAmJiBzZWNvbmQpIHtcbiAgICAgIGNvbnN0IGZpcnN0VmFsaWQgPSB0aGlzLmlzVmFsaWQoZmlyc3QpO1xuICAgICAgY29uc3Qgc2Vjb25kVmFsaWQgPSB0aGlzLmlzVmFsaWQoc2Vjb25kKTtcbiAgICAgIGlmIChmaXJzdFZhbGlkICYmIHNlY29uZFZhbGlkKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jb21wYXJlRGF0ZXRpbWUoZmlyc3QsIHNlY29uZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmlyc3RWYWxpZCA9PT0gc2Vjb25kVmFsaWQ7XG4gICAgfVxuICAgIHJldHVybiBmaXJzdCA9PT0gc2Vjb25kO1xuICB9XG5cbiAgc2FtZVllYXIoZmlyc3Q6IEQsIHNlY29uZDogRCkge1xuICAgIHJldHVybiBmaXJzdCAmJiBzZWNvbmQgJiYgdGhpcy5nZXRZZWFyKGZpcnN0KSA9PT0gdGhpcy5nZXRZZWFyKHNlY29uZCk7XG4gIH1cblxuICBzYW1lRGF5KGZpcnN0OiBELCBzZWNvbmQ6IEQpIHtcbiAgICByZXR1cm4gZmlyc3QgJiYgc2Vjb25kICYmIHRoaXMuZ2V0RGF0ZShmaXJzdCkgPT09IHRoaXMuZ2V0RGF0ZShzZWNvbmQpICYmIHRoaXMuc2FtZU1vbnRoQW5kWWVhcihmaXJzdCwgc2Vjb25kKTtcbiAgfVxuXG4gIHNhbWVIb3VyKGZpcnN0OiBELCBzZWNvbmQ6IEQpIHtcbiAgICByZXR1cm4gZmlyc3QgJiYgc2Vjb25kICYmIHRoaXMuZ2V0SG91cihmaXJzdCkgPT09IHRoaXMuZ2V0SG91cihzZWNvbmQpICYmIHRoaXMuc2FtZURheShmaXJzdCwgc2Vjb25kKTtcbiAgfVxuXG4gIHNhbWVNaW51dGUoZmlyc3Q6IEQsIHNlY29uZDogRCkge1xuICAgIHJldHVybiBmaXJzdCAmJiBzZWNvbmQgJiYgdGhpcy5nZXRNaW51dGUoZmlyc3QpID09PSB0aGlzLmdldE1pbnV0ZShzZWNvbmQpICYmIHRoaXMuc2FtZUhvdXIoZmlyc3QsIHNlY29uZCk7XG4gIH1cblxuICBzYW1lTW9udGhBbmRZZWFyKGZpcnN0OiBEIHwgbnVsbCwgc2Vjb25kOiBEIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIGlmIChmaXJzdCAmJiBzZWNvbmQpIHtcbiAgICAgIGNvbnN0IGZpcnN0VmFsaWQgPSB0aGlzLmlzVmFsaWQoZmlyc3QpO1xuICAgICAgY29uc3Qgc2Vjb25kVmFsaWQgPSB0aGlzLmlzVmFsaWQoc2Vjb25kKTtcbiAgICAgIGlmIChmaXJzdFZhbGlkICYmIHNlY29uZFZhbGlkKSB7XG4gICAgICAgIHJldHVybiAhKHRoaXMuZ2V0WWVhcihmaXJzdCkgLSB0aGlzLmdldFllYXIoc2Vjb25kKSB8fFxuICAgICAgICAgIHRoaXMuZ2V0TW9udGgoZmlyc3QpIC0gdGhpcy5nZXRNb250aChzZWNvbmQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaXJzdFZhbGlkID09PSBzZWNvbmRWYWxpZDtcbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0ID09PSBzZWNvbmQ7XG4gIH1cblxuICAvLyBkZWxlZ2F0ZVxuICBjbG9uZShkYXRlOiBEKTogRCB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmNsb25lKGRhdGUpO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJZZWFycyhkYXRlOiBELCB5ZWFyczogbnVtYmVyKTogRCB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmFkZENhbGVuZGFyWWVhcnMoZGF0ZSwgeWVhcnMpO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJNb250aHMoZGF0ZTogRCwgbW9udGhzOiBudW1iZXIpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuYWRkQ2FsZW5kYXJNb250aHMoZGF0ZSwgbW9udGhzKTtcbiAgfVxuXG4gIGFkZENhbGVuZGFyRGF5cyhkYXRlOiBELCBkYXlzOiBudW1iZXIpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuYWRkQ2FsZW5kYXJEYXlzKGRhdGUsIGRheXMpO1xuICB9XG5cbiAgZ2V0WWVhcihkYXRlOiBEKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZ2V0WWVhcihkYXRlKTtcbiAgfVxuXG4gIGdldE1vbnRoKGRhdGU6IEQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5nZXRNb250aChkYXRlKTtcbiAgfVxuXG4gIGdldERhdGUoZGF0ZTogRCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmdldERhdGUoZGF0ZSk7XG4gIH1cblxuICBnZXREYXlPZldlZWsoZGF0ZTogRCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmdldERheU9mV2VlayhkYXRlKTtcbiAgfVxuXG4gIGdldE1vbnRoTmFtZXMoc3R5bGUpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmdldE1vbnRoTmFtZXMoc3R5bGUpO1xuICB9XG5cbiAgZ2V0RGF0ZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZ2V0RGF0ZU5hbWVzKCk7XG4gIH1cblxuICBnZXREYXlPZldlZWtOYW1lcyhzdHlsZSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZ2V0RGF5T2ZXZWVrTmFtZXMoc3R5bGUpO1xuICB9XG5cbiAgZ2V0WWVhck5hbWUoZGF0ZTogRCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmdldFllYXJOYW1lKGRhdGUpO1xuICB9XG5cbiAgZ2V0Rmlyc3REYXlPZldlZWsoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZ2V0Rmlyc3REYXlPZldlZWsoKTtcbiAgfVxuXG4gIGdldE51bURheXNJbk1vbnRoKGRhdGU6IEQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5nZXROdW1EYXlzSW5Nb250aChkYXRlKTtcbiAgfVxuXG4gIGNyZWF0ZURhdGUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuY3JlYXRlRGF0ZSh5ZWFyLCBtb250aCwgZGF0ZSk7XG4gIH1cblxuICB0b2RheSgpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUudG9kYXkoKTtcbiAgfVxuXG4gIHBhcnNlKHZhbHVlOiBhbnksIHBhcnNlRm9ybWF0OiBhbnkpOiBEIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLnBhcnNlKHZhbHVlLCBwYXJzZUZvcm1hdCk7XG4gIH1cblxuICBmb3JtYXQoZGF0ZTogRCwgZGlzcGxheUZvcm1hdDogYW55KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZm9ybWF0KGRhdGUsIGRpc3BsYXlGb3JtYXQpO1xuICB9XG5cbiAgdG9Jc284NjAxKGRhdGU6IEQpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS50b0lzbzg2MDEoZGF0ZSk7XG4gIH1cblxuICBpc0RhdGVJbnN0YW5jZShvYmo6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5pc0RhdGVJbnN0YW5jZShvYmopO1xuICB9XG5cbiAgaXNWYWxpZChkYXRlOiBEKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmlzVmFsaWQoZGF0ZSk7XG4gIH1cblxuICBpbnZhbGlkKCk6IEQge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5pbnZhbGlkKCk7XG4gIH1cblxuICBjbGFtcERhdGUoZGF0ZTogRCwgbWluPzogRCB8IG51bGwsIG1heD86IEQgfCBudWxsKTogRCB7XG4gICAgaWYgKG1pbiAmJiB0aGlzLmNvbXBhcmVEYXRldGltZShkYXRlLCBtaW4pIDwgMCkge1xuICAgICAgcmV0dXJuIG1pbjtcbiAgICB9XG4gICAgaWYgKG1heCAmJiB0aGlzLmNvbXBhcmVEYXRldGltZShkYXRlLCBtYXgpID4gMCkge1xuICAgICAgcmV0dXJuIG1heDtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGU7XG4gIH1cbn1cbiJdfQ==