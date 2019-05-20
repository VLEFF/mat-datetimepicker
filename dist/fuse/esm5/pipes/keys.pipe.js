import { Pipe } from '@angular/core';
var KeysPipe = /** @class */ (function () {
    function KeysPipe() {
    }
    /**
     * Transform
     *
     * @param value
     * @param {string[]} args
     * @returns {any}
     */
    KeysPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = []; }
        var keys = [];
        for (var key in value) {
            if (value.hasOwnProperty(key)) {
                keys.push({
                    key: key,
                    value: value[key]
                });
            }
        }
        return keys;
    };
    KeysPipe.decorators = [
        { type: Pipe, args: [{ name: 'keys' },] }
    ];
    return KeysPipe;
}());
export { KeysPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5cy5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsicGlwZXMva2V5cy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBEO0lBQUE7SUEyQkEsQ0FBQztJQXhCRzs7Ozs7O09BTUc7SUFDSCw0QkFBUyxHQUFULFVBQVUsS0FBVSxFQUFFLElBQW1CO1FBQW5CLHFCQUFBLEVBQUEsU0FBbUI7UUFFckMsSUFBTSxJQUFJLEdBQVUsRUFBRSxDQUFDO1FBRXZCLEtBQU0sSUFBTSxHQUFHLElBQUksS0FBSyxFQUN4QjtZQUNJLElBQUssS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFDOUI7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQztvQkFDTixHQUFHLEVBQUksR0FBRztvQkFDVixLQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDcEIsQ0FBQyxDQUFDO2FBQ047U0FDSjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O2dCQTFCSixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDOztJQTJCcEIsZUFBQztDQUFBLEFBM0JELElBMkJDO1NBMUJZLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtuYW1lOiAna2V5cyd9KVxuZXhwb3J0IGNsYXNzIEtleXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybVxue1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybVxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M6IHN0cmluZ1tdID0gW10pOiBhbnlcbiAgICB7XG4gICAgICAgIGNvbnN0IGtleXM6IGFueVtdID0gW107XG5cbiAgICAgICAgZm9yICggY29uc3Qga2V5IGluIHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBrZXkgIDoga2V5LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVba2V5XVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxufVxuIl19