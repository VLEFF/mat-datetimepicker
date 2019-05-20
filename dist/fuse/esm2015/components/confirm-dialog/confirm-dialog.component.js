import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export class FuseConfirmDialogComponent {
    /**
     * Constructor
     *
     * @param {MatDialogRef<FuseConfirmDialogComponent>} dialogRef
     */
    constructor(dialogRef) {
        this.dialogRef = dialogRef;
    }
}
FuseConfirmDialogComponent.decorators = [
    { type: Component, args: [{
                selector: 'fuse-confirm-dialog',
                template: "<h1 matDialogTitle>Confirm</h1>\n<div mat-dialog-content>{{confirmMessage}}</div>\n<div mat-dialog-actions class=\"pt-24\">\n    <button mat-raised-button class=\"mat-accent mr-16\" (click)=\"dialogRef.close(true)\">Confirm</button>\n    <button mat-button (click)=\"dialogRef.close(false)\">Cancel</button>\n</div>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
FuseConfirmDialogComponent.ctorParameters = () => [
    { type: MatDialogRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kaWFsb2cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQG1kdC9mdXNlLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPakQsTUFBTSxPQUFPLDBCQUEwQjtJQUluQzs7OztPQUlHO0lBQ0gsWUFDVyxTQUFtRDtRQUFuRCxjQUFTLEdBQVQsU0FBUyxDQUEwQztJQUc5RCxDQUFDOzs7WUFsQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBSyxxQkFBcUI7Z0JBQ2xDLHlVQUE4Qzs7YUFFakQ7Ozs7WUFOUSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yICAgOiAnZnVzZS1jb25maXJtLWRpYWxvZycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHMgIDogWycuL2NvbmZpcm0tZGlhbG9nLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnVzZUNvbmZpcm1EaWFsb2dDb21wb25lbnRcbntcbiAgICBwdWJsaWMgY29uZmlybU1lc3NhZ2U6IHN0cmluZztcblxuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01hdERpYWxvZ1JlZjxGdXNlQ29uZmlybURpYWxvZ0NvbXBvbmVudD59IGRpYWxvZ1JlZlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8RnVzZUNvbmZpcm1EaWFsb2dDb21wb25lbnQ+XG4gICAgKVxuICAgIHtcbiAgICB9XG5cbn1cbiJdfQ==