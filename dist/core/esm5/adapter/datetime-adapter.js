/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DateAdapter } from "@angular/material/core";
/**
 * @abstract
 * @template D
 */
var /**
 * @abstract
 * @template D
 */
DatetimeAdapter = /** @class */ (function (_super) {
    tslib_1.__extends(DatetimeAdapter, _super);
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
    function (first, second) {
        return this.compareDate(first, second) ||
            this.getHour(first) - this.getHour(second) ||
            this.getMinute(first) - this.getMinute(second);
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
    function (first, second) {
        if (first && second) {
            /** @type {?} */
            var firstValid = this.isValid(first);
            /** @type {?} */
            var secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !this.compareDatetime(first, second);
            }
            return firstValid === secondValid;
        }
        return first === second;
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
    function (first, second) {
        return first && second && this.getYear(first) === this.getYear(second);
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
    function (first, second) {
        return first && second && this.getDate(first) === this.getDate(second) && this.sameMonthAndYear(first, second);
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
    function (first, second) {
        return first && second && this.getHour(first) === this.getHour(second) && this.sameDay(first, second);
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
    function (first, second) {
        return first && second && this.getMinute(first) === this.getMinute(second) && this.sameHour(first, second);
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
    function (first, second) {
        if (first && second) {
            /** @type {?} */
            var firstValid = this.isValid(first);
            /** @type {?} */
            var secondValid = this.isValid(second);
            if (firstValid && secondValid) {
                return !(this.getYear(first) - this.getYear(second) ||
                    this.getMonth(first) - this.getMonth(second));
            }
            return firstValid === secondValid;
        }
        return first === second;
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
    function (style) {
        return this._delegate.getMonthNames(style);
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
    function (style) {
        return this._delegate.getDayOfWeekNames(style);
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
}(DateAdapter));
/**
 * @abstract
 * @template D
 */
export { DatetimeAdapter };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXRpbWUtYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BtYXQtZGF0ZXRpbWVwaWNrZXIvY29yZS8iLCJzb3VyY2VzIjpbImFkYXB0ZXIvZGF0ZXRpbWUtYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7Ozs7QUFFckQ7Ozs7O0lBQWlELDJDQUFjO0lBRTdELHlCQUFzQixTQUF5QjtRQUEvQyxZQUNFLGlCQUFPLFNBQ1I7UUFGcUIsZUFBUyxHQUFULFNBQVMsQ0FBZ0I7O0lBRS9DLENBQUM7Ozs7O0lBb0JELDRDQUFrQjs7OztJQUFsQixVQUFtQixHQUFRO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEUsQ0FBQzs7Ozs7O0lBRUQseUNBQWU7Ozs7O0lBQWYsVUFBZ0IsS0FBUSxFQUFFLE1BQVM7UUFDakMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7WUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkQsQ0FBQzs7Ozs7O0lBRUQsc0NBQVk7Ozs7O0lBQVosVUFBYSxLQUFlLEVBQUUsTUFBZ0I7UUFDNUMsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFOztnQkFDYixVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7O2dCQUNoQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FB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QUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Ozs7SUFFRCxpQ0FBTzs7O0lBQVA7UUFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7Ozs7OztJQUVELG1DQUFTOzs7Ozs7SUFBVCxVQUFVLElBQU8sRUFBRSxHQUFjLEVBQUUsR0FBYztRQUMvQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUMsT0FBTyxHQUFHLENBQUM7U0FDWjtRQUNELElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM5QyxPQUFPLEdBQUcsQ0FBQztTQUNaO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBN0tELENBQWlELFdBQVcsR0E2SzNEOzs7Ozs7Ozs7OztJQTNLYSxvQ0FBbUM7Ozs7OztJQUkvQyx3REFBa0M7Ozs7OztJQUVsQywwREFBb0M7Ozs7OztJQUVwQyxvRUFBeUM7Ozs7Ozs7SUFFekMsNEVBQTBEOzs7OztJQUUxRCx5REFBa0M7Ozs7O0lBRWxDLDJEQUFvQzs7Ozs7OztJQUVwQyx5RUFBc0Q7Ozs7Ozs7SUFFdEQsMkVBQXdEOzs7Ozs7Ozs7O0lBRXhELDBGQUFvRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGVBZGFwdGVyIH0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsL2NvcmVcIjtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERhdGV0aW1lQWRhcHRlcjxEPiBleHRlbmRzIERhdGVBZGFwdGVyPEQ+IHtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX2RlbGVnYXRlOiBEYXRlQWRhcHRlcjxEPikge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBhYnN0cmFjdCBnZXRIb3VyKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgYWJzdHJhY3QgZ2V0TWludXRlKGRhdGU6IEQpOiBudW1iZXI7XG5cbiAgYWJzdHJhY3QgZ2V0Rmlyc3REYXRlT2ZNb250aChkYXRlOiBEKTogRDtcblxuICBhYnN0cmFjdCBpc0luTmV4dE1vbnRoKHN0YXJ0RGF0ZTogRCwgZW5kRGF0ZTogRCk6IGJvb2xlYW47XG5cbiAgYWJzdHJhY3QgZ2V0SG91ck5hbWVzKCk6IHN0cmluZ1tdO1xuXG4gIGFic3RyYWN0IGdldE1pbnV0ZU5hbWVzKCk6IHN0cmluZ1tdO1xuXG4gIGFic3RyYWN0IGFkZENhbGVuZGFySG91cnMoZGF0ZTogRCwgbW9udGhzOiBudW1iZXIpOiBEO1xuXG4gIGFic3RyYWN0IGFkZENhbGVuZGFyTWludXRlcyhkYXRlOiBELCBtb250aHM6IG51bWJlcik6IEQ7XG5cbiAgYWJzdHJhY3QgY3JlYXRlRGF0ZXRpbWUoeWVhcjogbnVtYmVyLCBtb250aDogbnVtYmVyLCBkYXRlOiBudW1iZXIsIGhvdXI6IG51bWJlciwgbWludXRlOiBudW1iZXIpOiBEO1xuXG4gIGdldFZhbGlkRGF0ZU9yTnVsbChvYmo6IGFueSk6IEQgfCBudWxsIHtcbiAgICByZXR1cm4gKHRoaXMuaXNEYXRlSW5zdGFuY2Uob2JqKSAmJiB0aGlzLmlzVmFsaWQob2JqKSkgPyBvYmogOiBudWxsO1xuICB9XG5cbiAgY29tcGFyZURhdGV0aW1lKGZpcnN0OiBELCBzZWNvbmQ6IEQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNvbXBhcmVEYXRlKGZpcnN0LCBzZWNvbmQpIHx8XG4gICAgICB0aGlzLmdldEhvdXIoZmlyc3QpIC0gdGhpcy5nZXRIb3VyKHNlY29uZCkgfHxcbiAgICAgIHRoaXMuZ2V0TWludXRlKGZpcnN0KSAtIHRoaXMuZ2V0TWludXRlKHNlY29uZCk7XG4gIH1cblxuICBzYW1lRGF0ZXRpbWUoZmlyc3Q6IEQgfCBudWxsLCBzZWNvbmQ6IEQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgaWYgKGZpcnN0ICYmIHNlY29uZCkge1xuICAgICAgY29uc3QgZmlyc3RWYWxpZCA9IHRoaXMuaXNWYWxpZChmaXJzdCk7XG4gICAgICBjb25zdCBzZWNvbmRWYWxpZCA9IHRoaXMuaXNWYWxpZChzZWNvbmQpO1xuICAgICAgaWYgKGZpcnN0VmFsaWQgJiYgc2Vjb25kVmFsaWQpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNvbXBhcmVEYXRldGltZShmaXJzdCwgc2Vjb25kKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmaXJzdFZhbGlkID09PSBzZWNvbmRWYWxpZDtcbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0ID09PSBzZWNvbmQ7XG4gIH1cblxuICBzYW1lWWVhcihmaXJzdDogRCwgc2Vjb25kOiBEKSB7XG4gICAgcmV0dXJuIGZpcnN0ICYmIHNlY29uZCAmJiB0aGlzLmdldFllYXIoZmlyc3QpID09PSB0aGlzLmdldFllYXIoc2Vjb25kKTtcbiAgfVxuXG4gIHNhbWVEYXkoZmlyc3Q6IEQsIHNlY29uZDogRCkge1xuICAgIHJldHVybiBmaXJzdCAmJiBzZWNvbmQgJiYgdGhpcy5nZXREYXRlKGZpcnN0KSA9PT0gdGhpcy5nZXREYXRlKHNlY29uZCkgJiYgdGhpcy5zYW1lTW9udGhBbmRZZWFyKGZpcnN0LCBzZWNvbmQpO1xuICB9XG5cbiAgc2FtZUhvdXIoZmlyc3Q6IEQsIHNlY29uZDogRCkge1xuICAgIHJldHVybiBmaXJzdCAmJiBzZWNvbmQgJiYgdGhpcy5nZXRIb3VyKGZpcnN0KSA9PT0gdGhpcy5nZXRIb3VyKHNlY29uZCkgJiYgdGhpcy5zYW1lRGF5KGZpcnN0LCBzZWNvbmQpO1xuICB9XG5cbiAgc2FtZU1pbnV0ZShmaXJzdDogRCwgc2Vjb25kOiBEKSB7XG4gICAgcmV0dXJuIGZpcnN0ICYmIHNlY29uZCAmJiB0aGlzLmdldE1pbnV0ZShmaXJzdCkgPT09IHRoaXMuZ2V0TWludXRlKHNlY29uZCkgJiYgdGhpcy5zYW1lSG91cihmaXJzdCwgc2Vjb25kKTtcbiAgfVxuXG4gIHNhbWVNb250aEFuZFllYXIoZmlyc3Q6IEQgfCBudWxsLCBzZWNvbmQ6IEQgfCBudWxsKTogYm9vbGVhbiB7XG4gICAgaWYgKGZpcnN0ICYmIHNlY29uZCkge1xuICAgICAgY29uc3QgZmlyc3RWYWxpZCA9IHRoaXMuaXNWYWxpZChmaXJzdCk7XG4gICAgICBjb25zdCBzZWNvbmRWYWxpZCA9IHRoaXMuaXNWYWxpZChzZWNvbmQpO1xuICAgICAgaWYgKGZpcnN0VmFsaWQgJiYgc2Vjb25kVmFsaWQpIHtcbiAgICAgICAgcmV0dXJuICEodGhpcy5nZXRZZWFyKGZpcnN0KSAtIHRoaXMuZ2V0WWVhcihzZWNvbmQpIHx8XG4gICAgICAgICAgdGhpcy5nZXRNb250aChmaXJzdCkgLSB0aGlzLmdldE1vbnRoKHNlY29uZCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZpcnN0VmFsaWQgPT09IHNlY29uZFZhbGlkO1xuICAgIH1cbiAgICByZXR1cm4gZmlyc3QgPT09IHNlY29uZDtcbiAgfVxuXG4gIC8vIGRlbGVnYXRlXG4gIGNsb25lKGRhdGU6IEQpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuY2xvbmUoZGF0ZSk7XG4gIH1cblxuICBhZGRDYWxlbmRhclllYXJzKGRhdGU6IEQsIHllYXJzOiBudW1iZXIpOiBEIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuYWRkQ2FsZW5kYXJZZWFycyhkYXRlLCB5ZWFycyk7XG4gIH1cblxuICBhZGRDYWxlbmRhck1vbnRocyhkYXRlOiBELCBtb250aHM6IG51bWJlcik6IEQge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5hZGRDYWxlbmRhck1vbnRocyhkYXRlLCBtb250aHMpO1xuICB9XG5cbiAgYWRkQ2FsZW5kYXJEYXlzKGRhdGU6IEQsIGRheXM6IG51bWJlcik6IEQge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5hZGRDYWxlbmRhckRheXMoZGF0ZSwgZGF5cyk7XG4gIH1cblxuICBnZXRZZWFyKGRhdGU6IEQpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5nZXRZZWFyKGRhdGUpO1xuICB9XG5cbiAgZ2V0TW9udGgoZGF0ZTogRCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmdldE1vbnRoKGRhdGUpO1xuICB9XG5cbiAgZ2V0RGF0ZShkYXRlOiBEKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZ2V0RGF0ZShkYXRlKTtcbiAgfVxuXG4gIGdldERheU9mV2VlayhkYXRlOiBEKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZ2V0RGF5T2ZXZWVrKGRhdGUpO1xuICB9XG5cbiAgZ2V0TW9udGhOYW1lcyhzdHlsZSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZ2V0TW9udGhOYW1lcyhzdHlsZSk7XG4gIH1cblxuICBnZXREYXRlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5nZXREYXRlTmFtZXMoKTtcbiAgfVxuXG4gIGdldERheU9mV2Vla05hbWVzKHN0eWxlKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5nZXREYXlPZldlZWtOYW1lcyhzdHlsZSk7XG4gIH1cblxuICBnZXRZZWFyTmFtZShkYXRlOiBEKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuZ2V0WWVhck5hbWUoZGF0ZSk7XG4gIH1cblxuICBnZXRGaXJzdERheU9mV2VlaygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5nZXRGaXJzdERheU9mV2VlaygpO1xuICB9XG5cbiAgZ2V0TnVtRGF5c0luTW9udGgoZGF0ZTogRCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmdldE51bURheXNJbk1vbnRoKGRhdGUpO1xuICB9XG5cbiAgY3JlYXRlRGF0ZSh5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRhdGU6IG51bWJlcik6IEQge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5jcmVhdGVEYXRlKHllYXIsIG1vbnRoLCBkYXRlKTtcbiAgfVxuXG4gIHRvZGF5KCk6IEQge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS50b2RheSgpO1xuICB9XG5cbiAgcGFyc2UodmFsdWU6IGFueSwgcGFyc2VGb3JtYXQ6IGFueSk6IEQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUucGFyc2UodmFsdWUsIHBhcnNlRm9ybWF0KTtcbiAgfVxuXG4gIGZvcm1hdChkYXRlOiBELCBkaXNwbGF5Rm9ybWF0OiBhbnkpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9kZWxlZ2F0ZS5mb3JtYXQoZGF0ZSwgZGlzcGxheUZvcm1hdCk7XG4gIH1cblxuICB0b0lzbzg2MDEoZGF0ZTogRCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLnRvSXNvODYwMShkYXRlKTtcbiAgfVxuXG4gIGlzRGF0ZUluc3RhbmNlKG9iajogYW55KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmlzRGF0ZUluc3RhbmNlKG9iaik7XG4gIH1cblxuICBpc1ZhbGlkKGRhdGU6IEQpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGVsZWdhdGUuaXNWYWxpZChkYXRlKTtcbiAgfVxuXG4gIGludmFsaWQoKTogRCB7XG4gICAgcmV0dXJuIHRoaXMuX2RlbGVnYXRlLmludmFsaWQoKTtcbiAgfVxuXG4gIGNsYW1wRGF0ZShkYXRlOiBELCBtaW4/OiBEIHwgbnVsbCwgbWF4PzogRCB8IG51bGwpOiBEIHtcbiAgICBpZiAobWluICYmIHRoaXMuY29tcGFyZURhdGV0aW1lKGRhdGUsIG1pbikgPCAwKSB7XG4gICAgICByZXR1cm4gbWluO1xuICAgIH1cbiAgICBpZiAobWF4ICYmIHRoaXMuY29tcGFyZURhdGV0aW1lKGRhdGUsIG1heCkgPiAwKSB7XG4gICAgICByZXR1cm4gbWF4O1xuICAgIH1cbiAgICByZXR1cm4gZGF0ZTtcbiAgfVxufVxuIl19