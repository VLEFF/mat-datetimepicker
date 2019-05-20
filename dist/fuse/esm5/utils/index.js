import * as tslib_1 from "tslib";
var FuseUtils = /** @class */ (function () {
    function FuseUtils() {
    }
    /**
     * Filter array by string
     *
     * @param mainArr
     * @param searchText
     * @returns {any}
     */
    FuseUtils.filterArrayByString = function (mainArr, searchText) {
        var _this = this;
        if (searchText === '') {
            return mainArr;
        }
        searchText = searchText.toLowerCase();
        return mainArr.filter(function (itemObj) {
            return _this.searchInObj(itemObj, searchText);
        });
    };
    /**
     * Search in object
     *
     * @param itemObj
     * @param searchText
     * @returns {boolean}
     */
    FuseUtils.searchInObj = function (itemObj, searchText) {
        for (var prop in itemObj) {
            if (!itemObj.hasOwnProperty(prop)) {
                continue;
            }
            var value = itemObj[prop];
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }
            else if (Array.isArray(value)) {
                if (this.searchInArray(value, searchText)) {
                    return true;
                }
            }
            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
    };
    /**
     * Search in array
     *
     * @param arr
     * @param searchText
     * @returns {boolean}
     */
    FuseUtils.searchInArray = function (arr, searchText) {
        var e_1, _a;
        try {
            for (var arr_1 = tslib_1.__values(arr), arr_1_1 = arr_1.next(); !arr_1_1.done; arr_1_1 = arr_1.next()) {
                var value = arr_1_1.value;
                if (typeof value === 'string') {
                    if (this.searchInString(value, searchText)) {
                        return true;
                    }
                }
                if (typeof value === 'object') {
                    if (this.searchInObj(value, searchText)) {
                        return true;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (arr_1_1 && !arr_1_1.done && (_a = arr_1.return)) _a.call(arr_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /**
     * Search in string
     *
     * @param value
     * @param searchText
     * @returns {any}
     */
    FuseUtils.searchInString = function (value, searchText) {
        return value.toLowerCase().includes(searchText);
    };
    /**
     * Generate a unique GUID
     *
     * @returns {string}
     */
    FuseUtils.generateGUID = function () {
        function S4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return S4() + S4();
    };
    /**
     * Toggle in array
     *
     * @param item
     * @param array
     */
    FuseUtils.toggleInArray = function (item, array) {
        if (array.indexOf(item) === -1) {
            array.push(item);
        }
        else {
            array.splice(array.indexOf(item), 1);
        }
    };
    /**
     * Handleize
     *
     * @param text
     * @returns {string}
     */
    FuseUtils.handleize = function (text) {
        return text.toString().toLowerCase();
    };
    return FuseUtils;
}());
export { FuseUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJ1dGlscy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFBQTtJQXlKQSxDQUFDO0lBdkpHOzs7Ozs7T0FNRztJQUNXLDZCQUFtQixHQUFqQyxVQUFrQyxPQUFPLEVBQUUsVUFBVTtRQUFyRCxpQkFZQztRQVZHLElBQUssVUFBVSxLQUFLLEVBQUUsRUFDdEI7WUFDSSxPQUFPLE9BQU8sQ0FBQztTQUNsQjtRQUVELFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFdEMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQUEsT0FBTztZQUN6QixPQUFPLEtBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNXLHFCQUFXLEdBQXpCLFVBQTBCLE9BQU8sRUFBRSxVQUFVO1FBRXpDLEtBQU0sSUFBTSxJQUFJLElBQUksT0FBTyxFQUMzQjtZQUNJLElBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUNsQztnQkFDSSxTQUFTO2FBQ1o7WUFFRCxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFNUIsSUFBSyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQzlCO2dCQUNJLElBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQzNDO29CQUNJLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7aUJBRUksSUFBSyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUM5QjtnQkFDSSxJQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUMxQztvQkFDSSxPQUFPLElBQUksQ0FBQztpQkFDZjthQUNKO1lBRUQsSUFBSyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQzlCO2dCQUNJLElBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQ3hDO29CQUNJLE9BQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7U0FDSjtJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVyx1QkFBYSxHQUEzQixVQUE0QixHQUFHLEVBQUUsVUFBVTs7O1lBRXZDLEtBQXFCLElBQUEsUUFBQSxpQkFBQSxHQUFHLENBQUEsd0JBQUEseUNBQ3hCO2dCQURNLElBQU0sS0FBSyxnQkFBQTtnQkFFYixJQUFLLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFDOUI7b0JBQ0ksSUFBSyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsRUFDM0M7d0JBQ0ksT0FBTyxJQUFJLENBQUM7cUJBQ2Y7aUJBQ0o7Z0JBRUQsSUFBSyxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQzlCO29CQUNJLElBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLEVBQ3hDO3dCQUNJLE9BQU8sSUFBSSxDQUFDO3FCQUNmO2lCQUNKO2FBQ0o7Ozs7Ozs7OztJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDVyx3QkFBYyxHQUE1QixVQUE2QixLQUFLLEVBQUUsVUFBVTtRQUUxQyxPQUFPLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDVyxzQkFBWSxHQUExQjtRQUVJLFNBQVMsRUFBRTtZQUVQLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7aUJBQ3BDLFFBQVEsQ0FBQyxFQUFFLENBQUM7aUJBQ1osU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFFRCxPQUFPLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNXLHVCQUFhLEdBQTNCLFVBQTRCLElBQUksRUFBRSxLQUFLO1FBRW5DLElBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFDL0I7WUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BCO2FBRUQ7WUFDSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDVyxtQkFBUyxHQUF2QixVQUF3QixJQUFJO1FBRXhCLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFDTCxnQkFBQztBQUFELENBQUMsQUF6SkQsSUF5SkMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRnVzZVV0aWxzXG57XG4gICAgLyoqXG4gICAgICogRmlsdGVyIGFycmF5IGJ5IHN0cmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIG1haW5BcnJcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGV4dFxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBmaWx0ZXJBcnJheUJ5U3RyaW5nKG1haW5BcnIsIHNlYXJjaFRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIGlmICggc2VhcmNoVGV4dCA9PT0gJycgKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gbWFpbkFycjtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlYXJjaFRleHQgPSBzZWFyY2hUZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgcmV0dXJuIG1haW5BcnIuZmlsdGVyKGl0ZW1PYmogPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoSW5PYmooaXRlbU9iaiwgc2VhcmNoVGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlYXJjaCBpbiBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpdGVtT2JqXG4gICAgICogQHBhcmFtIHNlYXJjaFRleHRcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIHNlYXJjaEluT2JqKGl0ZW1PYmosIHNlYXJjaFRleHQpOiBib29sZWFuXG4gICAge1xuICAgICAgICBmb3IgKCBjb25zdCBwcm9wIGluIGl0ZW1PYmogKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoICFpdGVtT2JqLmhhc093blByb3BlcnR5KHByb3ApIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBpdGVtT2JqW3Byb3BdO1xuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICggdGhpcy5zZWFyY2hJblN0cmluZyh2YWx1ZSwgc2VhcmNoVGV4dCkgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbHNlIGlmICggQXJyYXkuaXNBcnJheSh2YWx1ZSkgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICggdGhpcy5zZWFyY2hJbkFycmF5KHZhbHVlLCBzZWFyY2hUZXh0KSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLnNlYXJjaEluT2JqKHZhbHVlLCBzZWFyY2hUZXh0KSApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWFyY2ggaW4gYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBhcnJcbiAgICAgKiBAcGFyYW0gc2VhcmNoVGV4dFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2VhcmNoSW5BcnJheShhcnIsIHNlYXJjaFRleHQpOiBib29sZWFuXG4gICAge1xuICAgICAgICBmb3IgKCBjb25zdCB2YWx1ZSBvZiBhcnIgKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICggdGhpcy5zZWFyY2hJblN0cmluZyh2YWx1ZSwgc2VhcmNoVGV4dCkgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmICggdGhpcy5zZWFyY2hJbk9iaih2YWx1ZSwgc2VhcmNoVGV4dCkgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VhcmNoIGluIHN0cmluZ1xuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIHNlYXJjaFRleHRcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgc2VhcmNoSW5TdHJpbmcodmFsdWUsIHNlYXJjaFRleHQpOiBhbnlcbiAgICB7XG4gICAgICAgIHJldHVybiB2YWx1ZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRleHQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIGEgdW5pcXVlIEdVSURcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZW5lcmF0ZUdVSUQoKTogc3RyaW5nXG4gICAge1xuICAgICAgICBmdW5jdGlvbiBTNCgpOiBzdHJpbmdcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBTNCgpICsgUzQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgaW4gYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSBpdGVtXG4gICAgICogQHBhcmFtIGFycmF5XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyB0b2dnbGVJbkFycmF5KGl0ZW0sIGFycmF5KTogdm9pZFxuICAgIHtcbiAgICAgICAgaWYgKCBhcnJheS5pbmRleE9mKGl0ZW0pID09PSAtMSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBhcnJheS5zcGxpY2UoYXJyYXkuaW5kZXhPZihpdGVtKSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVpemVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0ZXh0XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGhhbmRsZWl6ZSh0ZXh0KTogc3RyaW5nXG4gICAge1xuICAgICAgICByZXR1cm4gdGV4dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxufVxuIl19