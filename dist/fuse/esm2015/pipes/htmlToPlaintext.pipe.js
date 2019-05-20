import { Pipe } from '@angular/core';
export class HtmlToPlaintextPipe {
    /**
     * Transform
     *
     * @param {string} value
     * @param {any[]} args
     * @returns {string}
     */
    transform(value, args = []) {
        return value ? String(value).replace(/<[^>]+>/gm, '') : '';
    }
}
HtmlToPlaintextPipe.decorators = [
    { type: Pipe, args: [{ name: 'htmlToPlaintext' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbFRvUGxhaW50ZXh0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJwaXBlcy9odG1sVG9QbGFpbnRleHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUdwRCxNQUFNLE9BQU8sbUJBQW1CO0lBRTVCOzs7Ozs7T0FNRztJQUNILFNBQVMsQ0FBQyxLQUFhLEVBQUUsT0FBYyxFQUFFO1FBRXJDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQy9ELENBQUM7OztZQWJKLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe25hbWU6ICdodG1sVG9QbGFpbnRleHQnfSlcbmV4cG9ydCBjbGFzcyBIdG1sVG9QbGFpbnRleHRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybVxue1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHthbnlbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcsIGFyZ3M6IGFueVtdID0gW10pOiBzdHJpbmdcbiAgICB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA/IFN0cmluZyh2YWx1ZSkucmVwbGFjZSgvPFtePl0rPi9nbSwgJycpIDogJyc7XG4gICAgfVxufVxuIl19