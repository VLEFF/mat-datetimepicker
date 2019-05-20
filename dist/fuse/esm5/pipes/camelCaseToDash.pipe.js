import { Pipe } from '@angular/core';
var CamelCaseToDashPipe = /** @class */ (function () {
    function CamelCaseToDashPipe() {
    }
    /**
     * Transform
     *
     * @param {string} value
     * @param {any[]} args
     * @returns {string}
     */
    CamelCaseToDashPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = []; }
        return value ? String(value).replace(/([A-Z])/g, function (g) { return "-" + g[0].toLowerCase(); }) : '';
    };
    CamelCaseToDashPipe.decorators = [
        { type: Pipe, args: [{ name: 'camelCaseToDash' },] }
    ];
    return CamelCaseToDashPipe;
}());
export { CamelCaseToDashPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FtZWxDYXNlVG9EYXNoLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJwaXBlcy9jYW1lbENhc2VUb0Rhc2gucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRDtJQUFBO0lBY0EsQ0FBQztJQVhHOzs7Ozs7T0FNRztJQUNILHVDQUFTLEdBQVQsVUFBVSxLQUFhLEVBQUUsSUFBZ0I7UUFBaEIscUJBQUEsRUFBQSxTQUFnQjtRQUVyQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxNQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUksRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0YsQ0FBQzs7Z0JBYkosSUFBSSxTQUFDLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFDOztJQWMvQiwwQkFBQztDQUFBLEFBZEQsSUFjQztTQWJZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe25hbWU6ICdjYW1lbENhc2VUb0Rhc2gnfSlcbmV4cG9ydCBjbGFzcyBDYW1lbENhc2VUb0Rhc2hQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybVxue1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIGFyZ3M6IGFueVtdID0gW10pOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA/IFN0cmluZyh2YWx1ZSkucmVwbGFjZSgvKFtBLVpdKS9nLCAoZykgPT4gYC0ke2dbMF0udG9Mb3dlckNhc2UoKX1gKSA6ICcnO1xuICAgIH1cbn1cbiJdfQ==