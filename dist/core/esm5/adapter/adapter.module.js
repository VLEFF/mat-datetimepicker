/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { MatNativeDateModule, NativeDateModule } from "@angular/material";
import { DatetimeAdapter } from "./datetime-adapter";
import { MAT_DATETIME_FORMATS } from "./datetime-formats";
import { NativeDatetimeAdapter } from "./native-datetime-adapter";
import { MAT_NATIVE_DATETIME_FORMATS } from "./native-datetime-formats";
// tslint:disable max-classes-per-file
var NativeDatetimeModule = /** @class */ (function () {
    function NativeDatetimeModule() {
    }
    NativeDatetimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [NativeDateModule],
                    providers: [
                        {
                            provide: DatetimeAdapter,
                            useClass: NativeDatetimeAdapter
                        }
                    ]
                },] }
    ];
    return NativeDatetimeModule;
}());
export { NativeDatetimeModule };
var ɵ0 = MAT_NATIVE_DATETIME_FORMATS;
var MatNativeDatetimeModule = /** @class */ (function () {
    function MatNativeDatetimeModule() {
    }
    MatNativeDatetimeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        NativeDatetimeModule,
                        MatNativeDateModule
                    ],
                    providers: [{ provide: MAT_DATETIME_FORMATS, useValue: ɵ0 }]
                },] }
    ];
    return MatNativeDatetimeModule;
}());
export { MatNativeDatetimeModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRhcHRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbWF0LWRhdGV0aW1lcGlja2VyL2NvcmUvIiwic291cmNlcyI6WyJhZGFwdGVyL2FkYXB0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzFELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOztBQUd4RTtJQUFBO0lBVUEsQ0FBQzs7Z0JBVkEsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQixTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLGVBQWU7NEJBQ3hCLFFBQVEsRUFBRSxxQkFBcUI7eUJBQ2hDO3FCQUNGO2lCQUNGOztJQUVELDJCQUFDO0NBQUEsQUFWRCxJQVVDO1NBRFksb0JBQW9CO1NBUXVCLDJCQUEyQjtBQUxuRjtJQUFBO0lBUUEsQ0FBQzs7Z0JBUkEsUUFBUSxTQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxvQkFBb0I7d0JBQ3BCLG1CQUFtQjtxQkFDcEI7b0JBQ0QsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxJQUE2QixFQUFDLENBQUM7aUJBQ3BGOztJQUVELDhCQUFDO0NBQUEsQUFSRCxJQVFDO1NBRFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtcbiAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgTmF0aXZlRGF0ZU1vZHVsZVxufSBmcm9tIFwiQGFuZ3VsYXIvbWF0ZXJpYWxcIjtcbmltcG9ydCB7IERhdGV0aW1lQWRhcHRlciB9IGZyb20gXCIuL2RhdGV0aW1lLWFkYXB0ZXJcIjtcbmltcG9ydCB7IE1BVF9EQVRFVElNRV9GT1JNQVRTIH0gZnJvbSBcIi4vZGF0ZXRpbWUtZm9ybWF0c1wiO1xuaW1wb3J0IHsgTmF0aXZlRGF0ZXRpbWVBZGFwdGVyIH0gZnJvbSBcIi4vbmF0aXZlLWRhdGV0aW1lLWFkYXB0ZXJcIjtcbmltcG9ydCB7IE1BVF9OQVRJVkVfREFURVRJTUVfRk9STUFUUyB9IGZyb20gXCIuL25hdGl2ZS1kYXRldGltZS1mb3JtYXRzXCI7XG5cbi8vIHRzbGludDpkaXNhYmxlIG1heC1jbGFzc2VzLXBlci1maWxlXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbTmF0aXZlRGF0ZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IERhdGV0aW1lQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBOYXRpdmVEYXRldGltZUFkYXB0ZXJcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmF0aXZlRGF0ZXRpbWVNb2R1bGUge1xufVxuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTmF0aXZlRGF0ZXRpbWVNb2R1bGUsXG4gICAgTWF0TmF0aXZlRGF0ZU1vZHVsZVxuICBdLFxuICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTUFUX0RBVEVUSU1FX0ZPUk1BVFMsIHVzZVZhbHVlOiBNQVRfTkFUSVZFX0RBVEVUSU1FX0ZPUk1BVFN9XVxufSlcbmV4cG9ydCBjbGFzcyBNYXROYXRpdmVEYXRldGltZU1vZHVsZSB7XG59XG4iXX0=