import { Pipe } from '@angular/core';
export class GetByIdPipe {
    /**
     * Transform
     *
     * @param {any[]} value
     * @param {number} id
     * @param {string} property
     * @returns {any}
     */
    transform(value, id, property) {
        const foundItem = value.find(item => {
            if (item.id !== undefined) {
                return item.id === id;
            }
            return false;
        });
        if (foundItem) {
            return foundItem[property];
        }
    }
}
GetByIdPipe.decorators = [
    { type: Pipe, args: [{
                name: 'getById',
                pure: false
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QnlJZC5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsicGlwZXMvZ2V0QnlJZC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBTXBELE1BQU0sT0FBTyxXQUFXO0lBRXBCOzs7Ozs7O09BT0c7SUFDSCxTQUFTLENBQUMsS0FBWSxFQUFFLEVBQVUsRUFBRSxRQUFnQjtRQUVoRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQUssSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLEVBQzFCO2dCQUNJLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDekI7WUFFRCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUssU0FBUyxFQUNkO1lBQ0ksT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDOUI7SUFDTCxDQUFDOzs7WUE3QkosSUFBSSxTQUFDO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxLQUFLO2FBQ2QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZ2V0QnlJZCcsXG4gICAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgR2V0QnlJZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtXG57XG4gICAgLyoqXG4gICAgICogVHJhbnNmb3JtXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueVtdfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnlbXSwgaWQ6IG51bWJlciwgcHJvcGVydHk6IHN0cmluZyk6IGFueVxuICAgIHtcbiAgICAgICAgY29uc3QgZm91bmRJdGVtID0gdmFsdWUuZmluZChpdGVtID0+IHtcbiAgICAgICAgICAgIGlmICggaXRlbS5pZCAhPT0gdW5kZWZpbmVkIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5pZCA9PT0gaWQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCBmb3VuZEl0ZW0gKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZm91bmRJdGVtW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==