/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { MatMomentDateModule, MomentDateModule } from "@angular/material-moment-adapter";
import { DatetimeAdapter, MAT_DATETIME_FORMATS } from "@mat-datetimepicker/core";
import { MomentDatetimeAdapter } from "./moment-datetime-adapter";
import { MAT_MOMENT_DATETIME_FORMATS } from "./moment-datetime-formats";
export { MomentDatetimeAdapter } from "./moment-datetime-adapter";
export { MAT_MOMENT_DATETIME_FORMATS } from "./moment-datetime-formats";
export class MomentDatetimeModule {
}
MomentDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [MomentDateModule],
                providers: [
                    {
                        provide: DatetimeAdapter,
                        useClass: MomentDatetimeAdapter
                    }
                ]
            },] }
];
const ɵ0 = MAT_MOMENT_DATETIME_FORMATS;
export class MatMomentDatetimeModule {
}
MatMomentDatetimeModule.decorators = [
    { type: NgModule, args: [{
                imports: [MomentDatetimeModule, MatMomentDateModule],
                providers: [{ provide: MAT_DATETIME_FORMATS, useValue: ɵ0 }]
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWF0LWRhdGV0aW1lcGlja2VyL21vbWVudC8iLCJzb3VyY2VzIjpbImFkYXB0ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDakIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLG9CQUFvQixFQUNyQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXhFLHNDQUFjLDJCQUEyQixDQUFDO0FBQzFDLDRDQUFjLDJCQUEyQixDQUFDO0FBVzFDLE1BQU0sT0FBTyxvQkFBb0I7OztZQVRoQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzNCLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsZUFBZTt3QkFDeEIsUUFBUSxFQUFFLHFCQUFxQjtxQkFDaEM7aUJBQ0Y7YUFDRjs7V0FNdUQsMkJBQTJCO0FBRW5GLE1BQU0sT0FBTyx1QkFBdUI7OztZQUpuQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsbUJBQW1CLENBQUM7Z0JBQ3BELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsSUFBNkIsRUFBQyxDQUFDO2FBQ3BGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgTWF0TW9tZW50RGF0ZU1vZHVsZSxcbiAgTW9tZW50RGF0ZU1vZHVsZVxufSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWwtbW9tZW50LWFkYXB0ZXJcIjtcbmltcG9ydCB7XG4gIERhdGV0aW1lQWRhcHRlcixcbiAgTUFUX0RBVEVUSU1FX0ZPUk1BVFNcbn0gZnJvbSBcIkBtYXQtZGF0ZXRpbWVwaWNrZXIvY29yZVwiO1xuaW1wb3J0IHsgTW9tZW50RGF0ZXRpbWVBZGFwdGVyIH0gZnJvbSBcIi4vbW9tZW50LWRhdGV0aW1lLWFkYXB0ZXJcIjtcbmltcG9ydCB7IE1BVF9NT01FTlRfREFURVRJTUVfRk9STUFUUyB9IGZyb20gXCIuL21vbWVudC1kYXRldGltZS1mb3JtYXRzXCI7XG5cbmV4cG9ydCAqIGZyb20gXCIuL21vbWVudC1kYXRldGltZS1hZGFwdGVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9tb21lbnQtZGF0ZXRpbWUtZm9ybWF0c1wiO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTW9tZW50RGF0ZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IERhdGV0aW1lQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBNb21lbnREYXRldGltZUFkYXB0ZXJcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTW9tZW50RGF0ZXRpbWVNb2R1bGUge1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTW9tZW50RGF0ZXRpbWVNb2R1bGUsIE1hdE1vbWVudERhdGVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX0RBVEVUSU1FX0ZPUk1BVFMsIHVzZVZhbHVlOiBNQVRfTU9NRU5UX0RBVEVUSU1FX0ZPUk1BVFN9XVxufSlcbmV4cG9ydCBjbGFzcyBNYXRNb21lbnREYXRldGltZU1vZHVsZSB7XG59XG4iXX0=