import { Pipe } from '@angular/core';
var GetByIdPipe = /** @class */ (function () {
    function GetByIdPipe() {
    }
    /**
     * Transform
     *
     * @param {any[]} value
     * @param {number} id
     * @param {string} property
     * @returns {any}
     */
    GetByIdPipe.prototype.transform = function (value, id, property) {
        var foundItem = value.find(function (item) {
            if (item.id !== undefined) {
                return item.id === id;
            }
            return false;
        });
        if (foundItem) {
            return foundItem[property];
        }
    };
    GetByIdPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'getById',
                    pure: false
                },] }
    ];
    return GetByIdPipe;
}());
export { GetByIdPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QnlJZC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsicGlwZXMvZ2V0QnlJZC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBRXBEO0lBQUE7SUE4QkEsQ0FBQztJQXhCRzs7Ozs7OztPQU9HO0lBQ0gsK0JBQVMsR0FBVCxVQUFVLEtBQVksRUFBRSxFQUFVLEVBQUUsUUFBZ0I7UUFFaEQsSUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7WUFDN0IsSUFBSyxJQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFDMUI7Z0JBQ0ksT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQzthQUN6QjtZQUVELE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSyxTQUFTLEVBQ2Q7WUFDSSxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM5QjtJQUNMLENBQUM7O2dCQTdCSixJQUFJLFNBQUM7b0JBQ0YsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsSUFBSSxFQUFFLEtBQUs7aUJBQ2Q7O0lBMkJELGtCQUFDO0NBQUEsQUE5QkQsSUE4QkM7U0ExQlksV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoe1xuICAgIG5hbWU6ICdnZXRCeUlkJyxcbiAgICBwdXJlOiBmYWxzZVxufSlcbmV4cG9ydCBjbGFzcyBHZXRCeUlkUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm1cbntcbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm1cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55W119IHZhbHVlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGlkXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueVtdLCBpZDogbnVtYmVyLCBwcm9wZXJ0eTogc3RyaW5nKTogYW55XG4gICAge1xuICAgICAgICBjb25zdCBmb3VuZEl0ZW0gPSB2YWx1ZS5maW5kKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKCBpdGVtLmlkICE9PSB1bmRlZmluZWQgKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLmlkID09PSBpZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIGZvdW5kSXRlbSApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmb3VuZEl0ZW1bcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19