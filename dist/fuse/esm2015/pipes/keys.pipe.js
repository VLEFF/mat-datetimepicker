import { Pipe } from '@angular/core';
export class KeysPipe {
    /**
     * Transform
     *
     * @param value
     * @param {string[]} args
     * @returns {any}
     */
    transform(value, args = []) {
        const keys = [];
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                keys.push({
                    key: key,
                    value: value[key]
                });
            }
        }
        return keys;
    }
}
KeysPipe.decorators = [
    { type: Pipe, args: [{ name: 'keys' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5cy5waXBlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsicGlwZXMva2V5cy5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBR3BELE1BQU0sT0FBTyxRQUFRO0lBRWpCOzs7Ozs7T0FNRztJQUNILFNBQVMsQ0FBQyxLQUFVLEVBQUUsT0FBaUIsRUFBRTtRQUVyQyxNQUFNLElBQUksR0FBVSxFQUFFLENBQUM7UUFFdkIsS0FBTSxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQ3hCO1lBQ0ksSUFBSyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUM5QjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNOLEdBQUcsRUFBSSxHQUFHO29CQUNWLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNwQixDQUFDLENBQUM7YUFDTjtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQzs7O1lBMUJKLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtuYW1lOiAna2V5cyd9KVxuZXhwb3J0IGNsYXNzIEtleXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybVxue1xuICAgIC8qKlxuICAgICAqIFRyYW5zZm9ybVxuICAgICAqXG4gICAgICogQHBhcmFtIHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gYXJnc1xuICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgdHJhbnNmb3JtKHZhbHVlOiBhbnksIGFyZ3M6IHN0cmluZ1tdID0gW10pOiBhbnlcbiAgICB7XG4gICAgICAgIGNvbnN0IGtleXM6IGFueVtdID0gW107XG5cbiAgICAgICAgZm9yICggY29uc3Qga2V5IGluIHZhbHVlIClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKCB2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpIClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBrZXkgIDoga2V5LFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVba2V5XVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxufVxuIl19