import { Pipe } from '@angular/core';
var HtmlToPlaintextPipe = /** @class */ (function () {
    function HtmlToPlaintextPipe() {
    }
    /**
     * Transform
     *
     * @param {string} value
     * @param {any[]} args
     * @returns {string}
     */
    HtmlToPlaintextPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = []; }
        return value ? String(value).replace(/<[^>]+>/gm, '') : '';
    };
    HtmlToPlaintextPipe.decorators = [
        { type: Pipe, args: [{ name: 'htmlToPlaintext' },] }
    ];
    return HtmlToPlaintextPipe;
}());
export { HtmlToPlaintextPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbFRvUGxhaW50ZXh0LnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJwaXBlcy9odG1sVG9QbGFpbnRleHQucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUVwRDtJQUFBO0lBY0EsQ0FBQztJQVhHOzs7Ozs7T0FNRztJQUNILHVDQUFTLEdBQVQsVUFBVSxLQUFhLEVBQUUsSUFBZ0I7UUFBaEIscUJBQUEsRUFBQSxTQUFnQjtRQUVyQyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRCxDQUFDOztnQkFiSixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUM7O0lBYy9CLDBCQUFDO0NBQUEsQUFkRCxJQWNDO1NBYlksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7bmFtZTogJ2h0bWxUb1BsYWludGV4dCd9KVxuZXhwb3J0IGNsYXNzIEh0bWxUb1BsYWludGV4dFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtXG57XG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBhcmdzXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgYXJnczogYW55W10gPSBbXSk6IHN0cmluZ1xuICAgIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID8gU3RyaW5nKHZhbHVlKS5yZXBsYWNlKC88W14+XSs+L2dtLCAnJykgOiAnJztcbiAgICB9XG59XG4iXX0=