import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
var FuseConfirmDialogComponent = /** @class */ (function () {
    /**
     * Constructor
     *
     * @param {MatDialogRef<FuseConfirmDialogComponent>} dialogRef
     */
    function FuseConfirmDialogComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    FuseConfirmDialogComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fuse-confirm-dialog',
                    template: "<h1 matDialogTitle>Confirm</h1>\n<div mat-dialog-content>{{confirmMessage}}</div>\n<div mat-dialog-actions class=\"pt-24\">\n    <button mat-raised-button class=\"mat-accent mr-16\" (click)=\"dialogRef.close(true)\">Confirm</button>\n    <button mat-button (click)=\"dialogRef.close(false)\">Cancel</button>\n</div>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    FuseConfirmDialogComponent.ctorParameters = function () { return [
        { type: MatDialogRef }
    ]; };
    return FuseConfirmDialogComponent;
}());
export { FuseConfirmDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFakQ7SUFTSTs7OztPQUlHO0lBQ0gsb0NBQ1csU0FBbUQ7UUFBbkQsY0FBUyxHQUFULFNBQVMsQ0FBMEM7SUFHOUQsQ0FBQzs7Z0JBbEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUsscUJBQXFCO29CQUNsQyx5VUFBOEM7O2lCQUVqRDs7OztnQkFOUSxZQUFZOztJQXNCckIsaUNBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQWZZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvciAgIDogJ2Z1c2UtY29uZmlybS1kaWFsb2cnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jb25maXJtLWRpYWxvZy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzICA6IFsnLi9jb25maXJtLWRpYWxvZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZ1c2VDb25maXJtRGlhbG9nQ29tcG9uZW50XG57XG4gICAgcHVibGljIGNvbmZpcm1NZXNzYWdlOiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtNYXREaWFsb2dSZWY8RnVzZUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+fSBkaWFsb2dSZWZcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPEZ1c2VDb25maXJtRGlhbG9nQ29tcG9uZW50PlxuICAgIClcbiAgICB7XG4gICAgfVxuXG59XG4iXX0=