import { Pipe } from '@angular/core';
import { FuseUtils } from '../utils';
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    /**
     * Transform
     *
     * @param {any[]} mainArr
     * @param {string} searchText
     * @param {string} property
     * @returns {any}
     */
    FilterPipe.prototype.transform = function (mainArr, searchText, property) {
        return FuseUtils.filterArrayByString(mainArr, searchText);
    };
    FilterPipe.decorators = [
        { type: Pipe, args: [{ name: 'filter' },] }
    ];
    return FilterPipe;
}());
export { FilterPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWR0L2Z1c2UvIiwic291cmNlcyI6WyJwaXBlcy9maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRXJDO0lBQUE7SUFlQSxDQUFDO0lBWkc7Ozs7Ozs7T0FPRztJQUNILDhCQUFTLEdBQVQsVUFBVSxPQUFjLEVBQUUsVUFBa0IsRUFBRSxRQUFnQjtRQUUxRCxPQUFPLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7Z0JBZEosSUFBSSxTQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQzs7SUFldEIsaUJBQUM7Q0FBQSxBQWZELElBZUM7U0FkWSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRnVzZVV0aWxzIH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5AUGlwZSh7bmFtZTogJ2ZpbHRlcid9KVxuZXhwb3J0IGNsYXNzIEZpbHRlclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtXG57XG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueVtdfSBtYWluQXJyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlYXJjaFRleHRcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlcbiAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIHRyYW5zZm9ybShtYWluQXJyOiBhbnlbXSwgc2VhcmNoVGV4dDogc3RyaW5nLCBwcm9wZXJ0eTogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICByZXR1cm4gRnVzZVV0aWxzLmZpbHRlckFycmF5QnlTdHJpbmcobWFpbkFyciwgc2VhcmNoVGV4dCk7XG4gICAgfVxufVxuIl19