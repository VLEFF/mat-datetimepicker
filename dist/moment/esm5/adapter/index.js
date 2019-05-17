/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { MatMomentDateModule, MomentDateModule } from "@angular/material-moment-adapter";
import { DatetimeAdapter, MAT_DATETIME_FORMATS } from "@mat-datetimepicker/core";
import { MomentDatetimeAdapter } from "./moment-datetime-adapter";
import { MAT_MOMENT_DATETIME_FORMATS } from "./moment-datetime-formats";
export { MomentDatetimeAdapter } from "./moment-datetime-adapter";
export { MAT_MOMENT_DATETIME_FORMATS } from "./moment-datetime-formats";
var MomentDatetimeModule = /** @class */ (function () {
    function MomentDatetimeModule() {
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
    return MomentDatetimeModule;
}());
export { MomentDatetimeModule };
var ɵ0 = MAT_MOMENT_DATETIME_FORMATS;
var MatMomentDatetimeModule = /** @class */ (function () {
    function MatMomentDatetimeModule() {
    }
    MatMomentDatetimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MomentDatetimeModule, MatMomentDateModule],
                    providers: [{ provide: MAT_DATETIME_FORMATS, useValue: ɵ0 }]
                },] }
    ];
    return MatMomentDatetimeModule;
}());
export { MatMomentDatetimeModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWF0LWRhdGV0aW1lcGlja2VyL21vbWVudC8iLCJzb3VyY2VzIjpbImFkYXB0ZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixnQkFBZ0IsRUFDakIsTUFBTSxrQ0FBa0MsQ0FBQztBQUMxQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLG9CQUFvQixFQUNyQixNQUFNLDBCQUEwQixDQUFDO0FBQ2xDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXhFLHNDQUFjLDJCQUEyQixDQUFDO0FBQzFDLDRDQUFjLDJCQUEyQixDQUFDO0FBRTFDO0lBQUE7SUFVQSxDQUFDOztnQkFWQSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzNCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsZUFBZTs0QkFDeEIsUUFBUSxFQUFFLHFCQUFxQjt5QkFDaEM7cUJBQ0Y7aUJBQ0Y7O0lBRUQsMkJBQUM7Q0FBQSxBQVZELElBVUM7U0FEWSxvQkFBb0I7U0FLdUIsMkJBQTJCO0FBRm5GO0lBQUE7SUFLQSxDQUFDOztnQkFMQSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsbUJBQW1CLENBQUM7b0JBQ3BELFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsSUFBNkIsRUFBQyxDQUFDO2lCQUNwRjs7SUFFRCw4QkFBQztDQUFBLEFBTEQsSUFLQztTQURZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7XG4gIE1hdE1vbWVudERhdGVNb2R1bGUsXG4gIE1vbWVudERhdGVNb2R1bGVcbn0gZnJvbSBcIkBhbmd1bGFyL21hdGVyaWFsLW1vbWVudC1hZGFwdGVyXCI7XG5pbXBvcnQge1xuICBEYXRldGltZUFkYXB0ZXIsXG4gIE1BVF9EQVRFVElNRV9GT1JNQVRTXG59IGZyb20gXCJAbWF0LWRhdGV0aW1lcGlja2VyL2NvcmVcIjtcbmltcG9ydCB7IE1vbWVudERhdGV0aW1lQWRhcHRlciB9IGZyb20gXCIuL21vbWVudC1kYXRldGltZS1hZGFwdGVyXCI7XG5pbXBvcnQgeyBNQVRfTU9NRU5UX0RBVEVUSU1FX0ZPUk1BVFMgfSBmcm9tIFwiLi9tb21lbnQtZGF0ZXRpbWUtZm9ybWF0c1wiO1xuXG5leHBvcnQgKiBmcm9tIFwiLi9tb21lbnQtZGF0ZXRpbWUtYWRhcHRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vbW9tZW50LWRhdGV0aW1lLWZvcm1hdHNcIjtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01vbWVudERhdGVNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBEYXRldGltZUFkYXB0ZXIsXG4gICAgICB1c2VDbGFzczogTW9tZW50RGF0ZXRpbWVBZGFwdGVyXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIE1vbWVudERhdGV0aW1lTW9kdWxlIHtcbn1cblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW01vbWVudERhdGV0aW1lTW9kdWxlLCBNYXRNb21lbnREYXRlTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE1BVF9EQVRFVElNRV9GT1JNQVRTLCB1c2VWYWx1ZTogTUFUX01PTUVOVF9EQVRFVElNRV9GT1JNQVRTfV1cbn0pXG5leHBvcnQgY2xhc3MgTWF0TW9tZW50RGF0ZXRpbWVNb2R1bGUge1xufVxuIl19